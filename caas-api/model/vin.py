from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
import requests

class VinModel(db.Model):
     #db model for vin class.
    __tablename__='Vin'
    vin =  db.Column('vin', db.String(17), primary_key=True, nullable=False)
    make = db.Column('make', db.String(30), nullable=False)
    model = db.Column('model', db.String(30), nullable=False)
    model_year = db.Column('model_year', db.Integer, nullable=False)
        
    def getMakeModelYear(self, vin):
        vin_url = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/{}?format=json'
        vin_response = requests.get(vin_url.format(vin))
        vin_json = vin_response.json()
        make = vin_json['Results'][0]['Make']
        model = vin_json['Results'][0]['Model']
        model_year = vin_json['Results'][0]['ModelYear']
        return {'make': make, 'model': model, 'model_year': model_year}
        
