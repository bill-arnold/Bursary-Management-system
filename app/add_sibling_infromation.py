from flask import Blueprint, request
from models import db
from models import Siblings
from serializers import SiblingsSchema

add_sibling_information = Blueprint('add_sibling_information', __name__)

siblings_schema = SiblingsSchema()

@add_sibling_information.route('/add_sibling_information', methods=['POST'])
def add_sibling_information_function():
    # Parse the incoming request data
    data = request.get_json()

    # Validate and deserialize the input data
    sibling, errors = siblings_schema.load(data)
    if errors:
        return errors, 422

    # Check if a sibling with the given student_id already exists
    existing_sibling = Siblings.query.filter_by(student_id=sibling.student_id).first()
    if existing_sibling is not None:
        return {'message': 'A sibling with this student_id already exists.'}, 400

    # Add the new sibling details to the database
    db.session.add(sibling)
    db.session.commit()

    # Return the created sibling details
    result = siblings_schema.dump(Siblings.query.get(sibling.id))
    return {"message": "Sibling information added successfully.", "sibling": result}, 201
