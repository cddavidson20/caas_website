from marshmallow import Schema, fields, post_load
from model.vin import VinModel

class VinSchema(Schema):
    #schema for vin class.
    make = fields.Str()
    model = fields.Str()
    model_year = fields.Str()

    @post_load
    def make_vin(self, data):
        return VinModel(data)