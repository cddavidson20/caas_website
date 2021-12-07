from marshmallow import Schema, fields, post_load
from model.parts import PartsModel

class PartsSchema(Schema):

    part_id = fields.Str()
    vehicle_id = fields.Str()
    part_type = fields.Str()
    price = fields.Str()
    part_status = fields.Str()
    post_date = fields.Str()

    @post_load
    def make_part(self, data):
        return PartsModel(data)
