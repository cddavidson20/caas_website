from flask import Blueprint
from model.vin import VinModel
from schema.vin import VinSchema

vin_api = Blueprint('vin-api', __name__)

@vin_api.route('/getVIN/<vin>', methods=['GET'])
#this route returns the Make, Model, amd Model Year of the provided VIN number
def getMakeModelYear(vin:str):
    result = VinModel().getMakeModelYear(vin)
    schema = VinSchema()
    return result
