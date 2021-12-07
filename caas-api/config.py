from os import environ
from dotenv import load_dotenv

load_dotenv(".env")
SANDBOX_API_KEY = environ.get("SANDBOX_API_KEY")
SANDBOX_LOCATION = environ.get("SANDBOX_LOCATION")
SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")

class Config(object):
    SANDBOX_API_KEY = environ.get("SANDBOX_API_KEY")
    SANDBOX_LOCATION = environ.get("SANDBOX_LOCATION")
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")

class ProductionConfig(Config):
    DEVELOPMENT=False
    DEBUG=False
