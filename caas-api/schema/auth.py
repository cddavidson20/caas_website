from marshmallow import Schema, fields, post_load
from model.auth import UserModel

class UserSchema(Schema):

    uid = fields.Str()
    email = fields.Str()
    password = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()

    @post_load
    #this will be used for sign-up
    def create_user(self, data):
        return UserModel(data)