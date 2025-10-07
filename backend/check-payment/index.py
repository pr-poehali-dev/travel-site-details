import json
import os
import psycopg2
from typing import Dict, Any
from yookassa import Configuration, Payment

Configuration.account_id = os.environ.get('YOOKASSA_SHOP_ID')
Configuration.secret_key = os.environ.get('YOOKASSA_SECRET_KEY')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Check payment status and save to database
    Args: event with httpMethod, queryStringParameters (payment_id)
    Returns: Payment status and subscription info
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters', {})
    payment_id = params.get('payment_id')
    
    if not payment_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'payment_id required'}),
            'isBase64Encoded': False
        }
    
    payment = Payment.find_one(payment_id)
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    if payment.status == 'succeeded':
        email = payment.metadata.get('email', 'unknown@example.com')
        amount = float(payment.amount.value)
        
        cur.execute("""
            INSERT INTO t_p92862893_travel_site_details.radar_subscriptions 
            (user_email, payment_id, status, amount, expires_at, payment_method, payment_data)
            VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP + INTERVAL '30 days', %s, %s)
            ON CONFLICT (payment_id) DO UPDATE SET status = EXCLUDED.status
        """, (email, payment_id, 'active', amount, payment.payment_method.type, json.dumps(payment.metadata)))
        
        conn.commit()
        
        cur.execute("""
            SELECT expires_at FROM t_p92862893_travel_site_details.radar_subscriptions 
            WHERE payment_id = %s
        """, (payment_id,))
        
        result = cur.fetchone()
        expires_at = result[0].isoformat() if result else None
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'status': 'succeeded',
                'subscription_active': True,
                'expires_at': expires_at
            }),
            'isBase64Encoded': False
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'status': payment.status,
            'subscription_active': False
        }),
        'isBase64Encoded': False
    }
