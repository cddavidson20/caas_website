from flask import Blueprint
from model.vehicle import VehicleModel
from flask import request, jsonify

vehicle_api = Blueprint('vehicle-api', __name__)

@vehicle_api.route('/getVehicle/', methods=["GET", "POST"])
def getVehicle():
    vin = request.args.get('vin')
    result = VehicleModel().getMakeModelYear(vin)
    return result

@vehicle_api.route('/getListingData/', methods=["GET", "POST"])
def getListingData():
    result = VehicleModel().getNumListings()
    return result

@vehicle_api.route('/getFinancialData/', methods=["GET", "POST"])
def getFinancialData():
    result = VehicleModel().getFinancial()
    return result

@vehicle_api.route('/addCar/', methods=["GET", "POST"])
def postCarData():
    car_form_vin = request.args.get('car_form_vin')
    car_form_year = request.args.get('car_form_year')
    car_form_make = request.args.get('car_form_make')
    car_form_model = request.args.get('car_form_model')
    car_form_date = request.args.get('car_form_date')
    car_form_price = request.args.get('car_form_price')
    car_form_num_parts = request.args.get('car_form_num_parts')
    result = VehicleModel().postCar(car_form_vin, car_form_year, car_form_make, car_form_model, car_form_date, car_form_price, car_form_num_parts)
    return result

@vehicle_api.route('/updateCar/', methods=["GET", "POST"])
def replaceCarData():
    car_form_vin = request.args.get('car_form_vin')
    car_form_year = request.args.get('car_form_year')
    car_form_make = request.args.get('car_form_make')
    car_form_model = request.args.get('car_form_model')
    car_form_date = request.args.get('car_form_date')
    car_form_price = request.args.get('car_form_price')
    car_form_num_parts = request.args.get('car_form_num_parts')
    result = VehicleModel().replaceCar(car_form_vin, car_form_year, car_form_make, car_form_model, car_form_date, car_form_price, car_form_num_parts)
    return result
