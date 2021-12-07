from marshmallow import Schema, fields, post_load
from requests.models import Response
from model.item import ItemModel

class ItemSchema(Schema):
    
    sku = fields.Str()
    condition = fields.Str()
    product = fields.Dict(keys=fields.Str(), values=fields.Str())
    aspects = fields.Dict(keys=fields.Str(), values=fields.Str())
    product_title = fields.Str(data_key='title')

    
    @post_load
    def get_item(self, sku):
        return ItemModel().getItem(sku)
    
    @post_load
    def create_item(self, xml_file):
        return ItemModel().createItem(xml_file)