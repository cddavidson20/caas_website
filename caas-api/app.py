import time
from flask import render_template
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import config
import route

app = Flask(__name__)

# SQLAlchemy Settings + Heroku connection
SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://bfed7c4b55409a:9a910418@us-cdbr-east-04.cleardb.com/heroku_4a4b7ecd5ac38f3'
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_RECYCLE'] = 299

engine = create_engine(SQLALCHEMY_DATABASE_URI)

db = SQLAlchemy(app)
db.init_app(app)

# create app
#def create_app():
    #db = SQLAlchemy(app)
    #db.init_app(app)
    #db.create_all()
    #return db

from route.auth import auth_api
from route.vehicle import vehicle_api
from route.item import item_api
from route.parts import parts_api
from route.vin import vin_api


app.register_blueprint(auth_api)
app.register_blueprint(vehicle_api)
app.register_blueprint(item_api)
app.register_blueprint(parts_api)
app.register_blueprint(vin_api)

app.config.from_object(config)

@app.route('/time')
def get_current_time():
    print(app.config.get("SANDBOX_API_KEY"))
    return {'time': time.time()}

@item_api.route('/get-item/<sku>', methods=['GET'])
def getItem():
    return render_template(route.item.item_api)    
