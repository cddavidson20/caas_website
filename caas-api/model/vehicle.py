from datetime import datetime
from json import dumps
from flask import Flask
from flask import request, jsonify
from sqlalchemy import cast, Date
from sqlalchemy.orm import Session
from requests.sessions import session
from sqlalchemy import *
from app import db, engine

class VehicleModel(db.Model):
    #db model for vehicle class.
    __tablename__ = 'vehicles'
    vin = db.Column('vin', db.String(17), primary_key=True, unique=True, nullable=False)
    vehicle_year = db.Column('vehicle_year', db.Integer, nullable=False)
    vehicle_make = db.Column('vehicle_make', db.String(30), nullable=False)
    vehicle_model = db.Column('vehicle_model', db.String(30), nullable=False)
    purchase_date = db.Column('purchase_date', db.Date)
    purchase_price = db.Column('purchase_price', db.Float)
    profit_loss = db.Column('profit_loss', db.Float)
    number_of_parts = db.Column('number_of_parts', db.Integer)

    def getMakeModelYear(self, vin):
        session = Session(engine)
        try: 
            vehicles_list = []

            if vin :
                vehicles = session.query(VehicleModel).filter(VehicleModel.vin == vin).first()
                if vehicles is not None:
                    vehicles_list.append({
                            'vin': vehicles.vin,
                            'vehicle_year': vehicles.vehicle_year,
                            'vehicle_make': vehicles.vehicle_make,
                            'vehicle_model': vehicles.vehicle_model,
                            'purchase_date': vehicles.purchase_date,
                            'purchase_price': vehicles.purchase_price,
                            'profit_loss': vehicles.profit_loss,
                            'number_of_parts': vehicles.number_of_parts
                        })
            else:
                vehicles = session.query(VehicleModel).all()
                for vehicle in vehicles:
                    vehicles_list.append({
                        'vin': vehicle.vin,
                        'vehicle_year': vehicle.vehicle_year,
                        'vehicle_make': vehicle.vehicle_make,
                        'vehicle_model': vehicle.vehicle_model,
                        'purchase_date': vehicle.purchase_date,
                        'purchase_price': vehicle.purchase_price,
                        'profit_loss': vehicle.profit_loss,
                        'number_of_parts': vehicle.number_of_parts
                    })
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()
        
        return jsonify(vehicles_list)
    
    def getNumListings(self) :
        session = Session(engine)
        try:
            listing_data = session.query(VehicleModel.vehicle_make, func.sum(VehicleModel.number_of_parts).label('number_of_parts')).group_by(VehicleModel.vehicle_make).all()
            session.commit()
            listing_data_dict = [dict(row) for row in listing_data]

            for i in range(len(listing_data_dict)):
                listing_data_dict[i]['x'] = listing_data_dict[i].pop('vehicle_make')
                listing_data_dict[i]['y'] = int(listing_data_dict[i].pop('number_of_parts'))

            return jsonify(listing_data_dict)
        except:
            session.rollback()
            raise
        finally:
            session.close()

    def getFinancial(self) :
        session = Session(engine)
        try: 
            financial_data = session.query(VehicleModel.purchase_date, func.sum(VehicleModel.purchase_price).label('purchase_price')).group_by(VehicleModel.purchase_date.asc()).all()
            session.commit()
            financial_data_dict = [dict(row) for row in financial_data]
            print(financial_data_dict)
            for i in range(len(financial_data_dict)):
                financial_data_dict[i]['x'] = financial_data_dict[i].pop('purchase_date')
                financial_data_dict[i]['y'] = financial_data_dict[i].pop('purchase_price')

            return jsonify(financial_data_dict)
        except:
            session.rollback()
            raise
        finally:
            session.close()

    def postCar(self, car_form_vin, car_form_year, car_form_make, car_form_model, car_form_date, car_form_price, car_form_num_parts):
        session = Session(engine)
        try:
            car = VehicleModel(vin=str(car_form_vin),vehicle_year=int(car_form_year),vehicle_make=str(car_form_make),vehicle_model=str(car_form_model),
                                purchase_date=cast(car_form_date, Date),purchase_price=float(car_form_price),number_of_parts=int(car_form_num_parts))
            session.add(car)
            session.commit()
            return jsonify({'posted': True})
        except:
            session.rollback()
            return jsonify({'posted': False})
        finally:
            session.close()

    def replaceCar(self, car_form_vin, car_form_year, car_form_make, car_form_model, car_form_date, car_form_price, car_form_num_parts):
        session = Session(engine)
        try:
            vehicle = session.query(VehicleModel).filter(VehicleModel.vin == str(car_form_vin)).first()
            if vehicle:
                vehicle.vehicle_year = int(car_form_year)
                vehicle.vehicle_model = str(car_form_model)
                vehicle.vehicle_make = str(car_form_make)
                vehicle.purchase_date = cast(car_form_date, Date)
                vehicle.purchase_price = float(car_form_price)
                vehicle.number_of_parts = int(car_form_num_parts)
                session.add(vehicle)
            session.commit()
            return jsonify({'posted': True})
        except:
            session.rollback()
            raise
            return jsonify({'posted': False})
        finally:
            session.close()