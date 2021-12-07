from marshmallow import Schema, fields, post_load
from model.vehicle import VehicleModel

class VehicleSchema(Schema):
    #schema for vehicle class.
    sku = fields.Str()
    vin = fields.Str()
    vehicle_id = fields.Str()
    vehicle_year = fields.Str()
    vehicle_make = fields.Str()
    vehicle_model = fields.Str()
    purchase_date = fields.Str()
    purchase_price = fields.Str()
    profit_loss = fields.Str()
    number_of_parts = fields.Str()

    def make_vehicle(self, data):
        return VehicleModel(data)
