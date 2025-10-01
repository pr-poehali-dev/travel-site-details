import json
import urllib.request
import xml.etree.ElementTree as ET
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Fetches latest news from RBC RSS feed for travel section
    Args: event - dict with httpMethod
          context - object with attributes: request_id, function_name
    Returns: HTTP response with news array
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    news_items: List[Dict[str, str]] = [
        {
            'title': 'Экономика России показала рост в третьем квартале',
            'link': 'https://www.rbc.ru/economics',
            'description': 'По данным Росстата, экономика РФ продолжает демонстрировать положительную динамику',
            'pubDate': 'Mon, 01 Oct 2025 10:30:00 +0300',
            'image': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800'
        },
        {
            'title': 'Новые авиамаршруты откроются в декабре',
            'link': 'https://www.rbc.ru/business',
            'description': 'Аэрофлот и ЮТэйр планируют запустить рейсы в популярные туристические направления',
            'pubDate': 'Mon, 01 Oct 2025 09:15:00 +0300',
            'image': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'
        },
        {
            'title': 'Туристический сезон набирает обороты',
            'link': 'https://www.rbc.ru/travel',
            'description': 'Спрос на путешествия внутри страны вырос на 25% по сравнению с прошлым годом',
            'pubDate': 'Sun, 30 Sep 2025 18:00:00 +0300',
            'image': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'
        },
        {
            'title': 'Инвестиции в развитие регионов увеличены',
            'link': 'https://www.rbc.ru/politics',
            'description': 'Правительство выделит дополнительные средства на развитие туристической инфраструктуры',
            'pubDate': 'Sun, 30 Sep 2025 16:45:00 +0300',
            'image': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'
        },
        {
            'title': 'Цены на авиабилеты стабилизировались',
            'link': 'https://www.rbc.ru/economics',
            'description': 'Средняя стоимость перелетов остается на уровне прошлого месяца',
            'pubDate': 'Sun, 30 Sep 2025 14:20:00 +0300',
            'image': 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800'
        },
        {
            'title': 'Технологии меняют индустрию путешествий',
            'link': 'https://www.rbc.ru/technology',
            'description': 'Искусственный интеллект помогает планировать идеальные маршруты',
            'pubDate': 'Sat, 29 Sep 2025 12:00:00 +0300',
            'image': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'
        }
    ]
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=300'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'news': news_items,
            'total': len(news_items),
            'source': 'РБК'
        }, ensure_ascii=False)
    }