import os

class Config:

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key_here'
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
#postgres://ken:I4GZXo4iTQecYgRqfSzrgydrzm6nUx4W@dpg-ckvlrgeb0mos73aq0600-a.oregon-postgres.render.com/charities_donor

    SQLALCHEMY_DATABASE_URI = 'sqlite:///bursary.db'  # Use your own database URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False
