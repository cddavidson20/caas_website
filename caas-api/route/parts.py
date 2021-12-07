from flask import Blueprint
from model.parts import PartsModel
from flask import request, jsonify

parts_api = Blueprint('parts-api', __name__)

@parts_api.route('/parts_data/', methods=["GET", "POST"])
def getPart():
    part_id = request.args.get('part_id')
    result = PartsModel().getPartData(part_id)
    return result

@parts_api.route('/getEngagementData/', methods=["GET", "POST"])
def getEngagementData():
    result = PartsModel().getEngagement()
    return result

@parts_api.route('/addPart/', methods=["GET", "POST"])
def postPartData():
    part_form_vin = request.args.get('part_form_vin')
    part_form_type = request.args.get('part_form_type')
    part_form_price = request.args.get('part_form_price')
    part_form_date = request.args.get('part_form_date')
    part_form_status = request.args.get('part_form_status')
    part_form_title = request.args.get('part_form_title')
    part_form_description = request.args.get('part_form_description')
    part_form_brand = request.args.get('part_form_brand')
    part_form_country = request.args.get('part_form_country')
    part_form_color = request.args.get('part_form_color')
    result = PartsModel().postPart(part_form_vin, part_form_type, part_form_price, part_form_date, part_form_status, part_form_title,
            part_form_description, part_form_brand, part_form_country, part_form_color)
    return result

@parts_api.route('/updatePart/', methods=["GET", "POST"])
def replacePartData():
    part_form_vin = request.args.get('part_form_vin')
    part_form_type = request.args.get('part_form_type')
    part_form_price = request.args.get('part_form_price')
    part_form_date = request.args.get('part_form_date')
    part_form_status = request.args.get('part_form_status')
    part_form_title = request.args.get('part_form_title')
    part_form_description = request.args.get('part_form_description')
    part_form_brand = request.args.get('part_form_brand')
    part_form_country = request.args.get('part_form_country')
    part_form_color = request.args.get('part_form_color')
    result = PartsModel().replacePart(part_form_vin, part_form_type, part_form_price, part_form_date, part_form_status, part_form_title,
            part_form_description, part_form_brand, part_form_country, part_form_color)
    return result