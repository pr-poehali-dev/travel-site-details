import json
import os
from typing import Dict, Any
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получает реальные данные о самолётах в воздухе через AviationStack API
    Args: event - dict с httpMethod, queryStringParameters
          context - object с request_id
    Returns: HTTP response с данными о рейсах
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    api_key = os.environ.get('AVIATIONSTACK_API_KEY', '')
    
    if not api_key:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'flights': [],
                'error': 'API key not configured',
                'message': 'Добавьте AVIATIONSTACK_API_KEY в секреты проекта'
            })
        }
    
    try:
        params = urllib.parse.urlencode({
            'access_key': api_key,
            'limit': 50
        })
        
        url = f'http://api.aviationstack.com/v1/flights?{params}'
        
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode())
        
        flights = []
        for flight_data in data.get('data', []):
            if not flight_data.get('flight_status') == 'active':
                continue
                
            flight_info = flight_data.get('flight', {})
            departure = flight_data.get('departure', {})
            arrival = flight_data.get('arrival', {})
            aircraft = flight_data.get('aircraft', {})
            airline = flight_data.get('airline', {})
            live = flight_data.get('live', {})
            
            flights.append({
                'id': flight_data.get('flight_date', '') + '-' + flight_info.get('iata', ''),
                'callsign': flight_info.get('iata') or flight_info.get('icao', 'N/A'),
                'airline': airline.get('name', 'Unknown'),
                'aircraft': aircraft.get('registration', 'N/A'),
                'aircraft_model': aircraft.get('iata', 'Unknown'),
                'departure': departure.get('iata', 'N/A'),
                'departure_city': departure.get('airport', 'Unknown'),
                'arrival': arrival.get('iata', 'N/A'),
                'arrival_city': arrival.get('airport', 'Unknown'),
                'altitude': live.get('altitude', 0) if live else 0,
                'speed': live.get('speed_horizontal', 0) if live else 0,
                'heading': live.get('direction', 0) if live else 0,
                'latitude': live.get('latitude', 0) if live else 0,
                'longitude': live.get('longitude', 0) if live else 0,
                'status': flight_data.get('flight_status', 'unknown'),
                'is_on_ground': live.get('is_ground', False) if live else False
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'flights': flights,
                'total': len(flights),
                'timestamp': data.get('pagination', {}).get('count', 0)
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'flights': [],
                'error': str(e),
                'message': 'Не удалось получить данные о рейсах'
            })
        }
