from flask import Blueprint, request
from models import db
from models import Bursary
from serializers import BursarySchema

add_bursary = Blueprint('add_bursary', __name__)

bursary_schema = BursarySchema()

@add_bursary.route('/add_bursary', methods=['POST'])
def add_bursary_function():
    # Parse the incoming request data
    data = request.get_json()

    # Validate and deserialize the input data
    bursary, errors = bursary_schema.load(data)
    if errors:
        return errors, 422

    # Add the new bursary to the database
    db.session.add(bursary)
    db.session.commit()

    # Return the created bursary
    result = bursary_schema.dump(Bursary.query.get(bursary.id))
    return {"message": "Bursary added successfully.", "bursary": result}, 201
