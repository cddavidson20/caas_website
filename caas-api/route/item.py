from flask import Blueprint
from flask import request as rq
from requests.api import request
from model.item import ItemModel
from schema.item import ItemSchema
import xmltodict
import json


item_api = Blueprint('item-api', __name__)

@item_api.route('/item/create/<vin>', methods=['POST'])
def item_create_request(vin:str):
    if rq.method == 'POST':
        xml_data = rq.data
        result = ItemModel().createItem(vin, xml_data)
        schema = ItemSchema()
        return schema.dumps(result.content)

@item_api.route('/item/get/', methods=['GET'])
def item_get_request():
    if rq.method == 'GET':
        result = ItemModel().getItem()
        schema = ItemSchema()
        return schema.dumps(result)
