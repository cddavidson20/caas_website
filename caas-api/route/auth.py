from flask import Blueprint
from flask import request, jsonify
from model.auth import UserModel
from schema.auth import UserSchema

auth_api = Blueprint('user-api', __name__)

@auth_api.route('/login/', methods=["GET", "POST"])
def login_post():
    user_email = request.args.get('email')
    result = UserModel().authenticate(user_email)
    return result

@auth_api.route('/signup/', methods=["GET", "POST"])
def signup_post():
    user_email = request.args.get('email')
    user_password = request.args.get('password')
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    result = UserModel().create_user(user_email, user_password, first_name, last_name)
    return result
    
