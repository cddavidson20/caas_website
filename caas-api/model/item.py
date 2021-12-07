from flask import Flask
from flask import request, jsonify
from sqlalchemy.orm import Session
from requests.sessions import session
import requests
from sqlalchemy import *
from app import db, engine
import xmltodict
from model.parts import PartsModel
from config import SANDBOX_API_KEY, SANDBOX_LOCATION


class ItemModel(db.Model):
    #db model for Inventory class.
    __tablename__='Item'
    sku = db.Column('sku', db.Integer, primary_key=True, nullable=False)

    url = 'https://api.sandbox.ebay.com/ws/api.dll'

    def getItem(self):
        headers= {'X-EBAY-API-SITEID':'0',
                'X-EBAY-API-COMPATIBILITY-LEVEL':'967',
                'X-EBAY-API-CALL-NAME':'GetItem',
                'Accept': 'application/xml',
                'Content-Type': 'application/xml',
                'Content-Language': 'en-US'
        }

        response = requests.get(self.url, headers=headers)
        return response

    
    def createItem(self, vin, xml_data):
        headers = {'X-EBAY-API-SITEID':'0',
                'X-EBAY-API-COMPATIBILITY-LEVEL':'967',
                'X-EBAY-API-CALL-NAME':'AddItem',
                'Accept': 'application/xml',
                'Content-Type': 'application/xml',
                'Content-Language': 'en-US'}
      #  try:
        response = requests.post(self.url, headers=headers, data=xml_data)
        content = xmltodict.parse(response.content)
        item_id = content['AddItemResponse']
        item_id = item_id['ItemID']
        print('ITEM ID: ' + item_id)


        item_data = xmltodict.parse(xml_data)
        item_data = item_data['AddItemRequest']
        item_data = item_data['Item']
        item_specifics = item_data['ItemSpecifics']

        title = item_data['Title']
        description = item_data['Description']
        #quantity = item_data['Quantity']
        price = item_data['StartPrice']['#text']

        brand = item_specifics['NameValueList'][0]['Value']
        color = item_specifics['NameValueList'][1]['Value']
        part_type = item_specifics['NameValueList'][2]['Value']
        country = item_specifics['NameValueList'][3]['Value']
        print(item_id)
        part = PartsModel(part_id=item_id, vin=vin, part_type=part_type, price=int(float(price)), part_status='list', post_date='2021-12-05', title=title, description=description, brand=brand, country=country, color=color) # need a value for each parameter in def __init__ for each class in database.py
        db.session.add(part)
        db.session.commit()

#        except KeyError:
 #           print('Error: item UUID already exists')

        return response