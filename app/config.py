import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")  # Use your own database URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = '8e491c3e401bbfc80d2bb16485ab0ccc35407b8773d683469afea3153ba3960a'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=10)