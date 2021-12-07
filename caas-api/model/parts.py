from flask import Flask
from flask import request, jsonify
from random import randint
import sqlalchemy
from sqlalchemy.orm import Session
from requests.sessions import session
from sqlalchemy import *
from app import db, engine

class PartsModel(db.Model):
    #db model for parts class
    __tablename__ = 'Parts'
    part_id = db.Column('part_id', db.String(20), primary_key=True, nullable=False)
    part_type = db.Column('part_type', db.String(30), nullable=False)
    price = db.Column('price', db.Float, nullable=False)
    part_status = db.Column('part_status', db.String(30), nullable=False)
    post_date = db.Column('post_date', db.Date)
    title = db.Column('title', db.String(50), nullable=False)
    description = db.Column('description', db.String(150), nullable=False)
    brand = db.Column('brand', db.String(20), nullable=False)
    country = db.Column('country_manufactured', db.String(30), nullable=False)
    color = db.Column('color', db.String(20), nullable=False)
    interactions = db.Column('interactions', db.Integer, nullable=False)
    vin = db.Column('vin', db.String(17), sqlalchemy.ForeignKey('vehicles.vin'), unique=False, nullable=False)

    def getPartData(self, part_id):
            session = Session(engine)
            try: 
                parts_list = []
                if part_id :
                    parts = session.query(PartsModel).filter(PartsModel.part_id == part_id).first()
                    if parts is not None:
                        parts_list.append({
                                'part_id': parts.part_id,
                                'part_type': parts.part_type,
                                'price': parts.price,
                                'part_status': parts.part_status,
                                'post_date': parts.post_date,
                                'title': parts.title,
                                'description': parts.description,
                                'brand': parts.brand,
                                'country_manufactured': parts.country,
                                'color': parts.color,
                                'vin': parts.vin
                            })
                else:
                    parts = session.query(PartsModel).all()
                    for part in parts:
                        parts_list.append({
                            'part_id': part.part_id,
                            'part_type': part.part_type,
                            'price': part.price,
                            'part_status': part.part_status,
                            'post_date': part.post_date,
                            'title': part.title,
                            'description': part.description,
                            'brand': part.brand,
                            'country_manufactured': part.country,
                            'color': part.color,
                            'vin': part.vin
                        })
                session.commit()
            except:
                session.rollback()
                raise
            finally:
                session.close()
            
            return jsonify(parts_list)

    def getEngagement(self) :
        session = Session(engine)
        try: 
            engagement_data = session.query(PartsModel.part_type, func.sum(PartsModel.interactions).label('interaction')).group_by(PartsModel.part_type.asc()).all()
            engagement_data_dict = [dict(row) for row in engagement_data]
            print(engagement_data_dict)

            for i in range(len(engagement_data_dict)):
                engagement_data_dict[i]['x'] = engagement_data_dict[i].pop('part_type')
                engagement_data_dict[i]['y'] = int(engagement_data_dict[i].pop('interaction'))

            session.commit()
            return jsonify(engagement_data_dict)
        except:
            session.rollback()
            raise
        finally:
            session.close()

    def postPart(self, part_form_vin, part_form_type, part_form_price, part_form_date, part_form_status, part_form_title,
            part_form_description, part_form_brand, part_form_country, part_form_color):
        session = Session(engine)
        try:
            part = PartsModel(part_id=randint(0,99999999999999999999) ,vin=str(part_form_vin),part_type=str(part_form_type),price=float(part_form_price),post_date=cast(part_form_date, Date),
                     part_status=str(part_form_status),title=str(part_form_title),description = str(part_form_description),brand=str(part_form_brand),
                     country=str(part_form_country),color=str(part_form_color))
            session.add(part)
            session.commit()
            return jsonify({'posted': True})
        except:
            session.rollback()
            raise
        finally:
            session.close()

    def replacePart(self, part_form_vin, part_form_type, part_form_price, part_form_date, part_form_status, part_form_title,
            part_form_description, part_form_brand, part_form_country, part_form_color):
        session = Session(engine)
        try:
            part = session.query(PartsModel).filter(PartsModel.vin == str(part_form_vin)).first()
            if part:
                part.vin = str(part_form_vin)
                part.part_type = str(part_form_type)
                part.price = float(part_form_price)
                part.post_date =  cast(part_form_date, Date)
                part.part_status = str(part_form_status)
                part.title = str(part_form_title)
                part.description = str(part_form_description)
                part.brand = str(part_form_brand)
                part.country = str(part_form_country)
                part.color = str(part_form_color)
                session.add(part)
            session.commit()
            return jsonify({'posted': True})
        except:
            session.rollback()
            raise
            return jsonify({'posted': False})
        finally:
            session.close()
