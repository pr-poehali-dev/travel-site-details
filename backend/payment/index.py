import json
import os
import uuid
from typing import Dict, Any
from yookassa import Configuration, Payment

Configuration.account_id = os.environ.get('YOOKASSA_SHOP_ID')
Configuration.secret_key = os.environ.get('YOOKASSA_SECRET_KEY')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create payment for radar subscription via YooKassa
    Args: event with httpMethod, body (email, amount)
    Returns: Payment URL and payment_id
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    email = body_data.get('email')
    amount = body_data.get('amount', 990)
    
    if not email:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email required'}),
            'isBase64Encoded': False
        }
    
    idempotence_key = str(uuid.uuid4())
    
    payment = Payment.create({
        "amount": {
            "value": str(amount),
            "currency": "RUB"
        },
        "confirmation": {
            "type": "redirect",
            "return_url": f"{body_data.get('return_url', 'https://example.com')}/radar?payment=success"
        },
        "capture": True,
        "description": f"Подписка на Радар Странника для {email}",
        "metadata": {
            "email": email
        }
    }, idempotence_key)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'payment_url': payment.confirmation.confirmation_url,
            'payment_id': payment.id
        }),
        'isBase64Encoded': False
    }
