from flask import Flask
from flask import request, jsonify
from sqlalchemy.orm import Session
from requests.sessions import session
from sqlalchemy import *
from app import db, engine

class UserModel(db.Model):
    #db model for User class.
    __tablename__ = 'users'
    user_id = db.Column('user_id', db.Integer, primary_key=True, nullable=False)
    email = db.Column('email', db.String(50), unique=True, nullable=False)
    password = db.Column('password',db.String(50), nullable=False)
    first_name = db.Column('first_name', db.String(30), nullable=False)
    last_name = db.Column('last_name', db.String(30), nullable=False)

    def authenticate(self, user_email):
        session = Session(engine)
        try: 
            #user = session.query(UserModel).filter(or_(UserModel.email == user_email)).first()
            user = session.query(UserModel).filter(or_(UserModel.email == user_email)).first()
            session.commit()
            if user is not None:
                return jsonify({'signed_in': True})
        except:
            session.rollback()
            raise
        finally:
            session.close()
        
        return jsonify({'signed_in': False})

    def create_user(self, user_email, user_pass, first_name, last_name):
        session = Session(engine)
        try: 
            #user = session.query(UserModel).filter(or_(UserModel.email == user_email)).first()
            session.commit()
            return jsonify({'signed_in': True})
        except:
            session.rollback()
            raise
        finally:
            session.close()
        
        return jsonify({'signed_in': False})
    
