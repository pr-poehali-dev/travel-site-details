import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: User authentication and energy management system
    Args: event - dict with httpMethod, body (email, name, birth_date)
          context - object with request_id attribute
    Returns: HTTP response with user data and energy balance
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Email',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action', 'register')
            
            if action == 'claim_daily':
                user_id = body_data.get('user_id')
                if not user_id:
                    return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'user_id required'})}
                
                cur.execute("SELECT energy_balance, energy_expires_at, last_energy_claim, birth_date FROM users WHERE id = %s", (user_id,))
                user = cur.fetchone()
                if not user:
                    return {'statusCode': 404, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'User not found'})}
                
                energy_balance, energy_expires_at, last_energy_claim, birth_date = user
                now = datetime.now()
                
                if energy_expires_at and now > energy_expires_at:
                    energy_balance = 0
                
                if last_energy_claim and (now - last_energy_claim) < timedelta(hours=24):
                    return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Already claimed'})}
                
                energy_to_add = 50
                is_birthday = False
                if birth_date and birth_date.month == now.month and birth_date.day == now.day:
                    energy_to_add = 150
                    is_birthday = True
                
                new_balance = energy_balance + energy_to_add
                new_expiry = now + timedelta(minutes=30)
                
                cur.execute("UPDATE users SET energy_balance = %s, last_energy_claim = %s, energy_expires_at = %s WHERE id = %s", (new_balance, now, new_expiry, user_id))
                cur.execute("INSERT INTO energy_transactions (user_id, amount, transaction_type, description) VALUES (%s, %s, %s, %s)", (user_id, energy_to_add, 'birthday' if is_birthday else 'daily', 'Birthday!' if is_birthday else 'Daily'))
                conn.commit()
                
                return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'success': True, 'energy_balance': new_balance, 'energy_added': energy_to_add, 'is_birthday': is_birthday})}
            
            elif action == 'spend':
                user_id = body_data.get('user_id')
                amount = body_data.get('amount', 0)
                if not user_id or amount <= 0:
                    return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Invalid'})}
                
                cur.execute("SELECT energy_balance, energy_expires_at FROM users WHERE id = %s", (user_id,))
                user = cur.fetchone()
                if not user:
                    return {'statusCode': 404, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Not found'})}
                
                energy_balance, energy_expires_at = user
                now = datetime.now()
                if energy_expires_at and now > energy_expires_at:
                    energy_balance = 0
                
                if energy_balance < amount:
                    return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Insufficient energy', 'balance': energy_balance})}
                
                new_balance = energy_balance - amount
                cur.execute("UPDATE users SET energy_balance = %s WHERE id = %s", (new_balance, user_id))
                cur.execute("INSERT INTO energy_transactions (user_id, amount, transaction_type, description) VALUES (%s, %s, %s, %s)", (user_id, -amount, 'spend', body_data.get('description', 'Spent')))
                conn.commit()
                
                return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'success': True, 'energy_balance': new_balance})}
            
            else:
                email = body_data.get('email')
                name = body_data.get('name')
                birth_date = body_data.get('birth_date')
                
                if not email or not name:
                    return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Email and name required'})}
                
                cur.execute("SELECT id, energy_balance, energy_expires_at FROM users WHERE email = %s", (email,))
                user = cur.fetchone()
                
                if user:
                    user_id, energy_balance, energy_expires_at = user
                    now = datetime.now()
                    if energy_expires_at and now > energy_expires_at:
                        energy_balance = 0
                        cur.execute("UPDATE users SET energy_balance = 0, energy_expires_at = NULL WHERE id = %s", (user_id,))
                    
                    cur.execute("UPDATE users SET last_login = %s WHERE id = %s", (now, user_id))
                    conn.commit()
                    
                    return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'user_id': user_id, 'email': email, 'energy_balance': energy_balance, 'is_new': False})}
                else:
                    cur.execute("INSERT INTO users (email, name, birth_date, energy_balance) VALUES (%s, %s, %s, %s) RETURNING id", (email, name, birth_date, 50))
                    user_id = cur.fetchone()[0]
                    cur.execute("INSERT INTO energy_transactions (user_id, amount, transaction_type, description) VALUES (%s, %s, %s, %s)", (user_id, 50, 'registration', 'Welcome'))
                    conn.commit()
                    
                    return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'user_id': user_id, 'email': email, 'energy_balance': 50, 'is_new': True})}
        
        elif method == 'GET':
            email = event.get('queryStringParameters', {}).get('email')
            
            if not email:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email is required'})
                }
            
            cur.execute(
                "SELECT id, name, email, energy_balance, energy_expires_at, birth_date, last_energy_claim FROM users WHERE email = %s",
                (email,)
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User not found', 'registered': False})
                }
            
            user_id, name, email, energy_balance, energy_expires_at, birth_date, last_energy_claim = user
            
            now = datetime.now()
            if energy_expires_at and now > energy_expires_at:
                energy_balance = 0
                cur.execute("UPDATE users SET energy_balance = 0, energy_expires_at = NULL WHERE id = %s", (user_id,))
                conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'user_id': user_id,
                    'name': name,
                    'email': email,
                    'energy_balance': energy_balance,
                    'birth_date': birth_date.isoformat() if birth_date else None,
                    'last_energy_claim': last_energy_claim.isoformat() if last_energy_claim else None,
                    'registered': True
                })
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()