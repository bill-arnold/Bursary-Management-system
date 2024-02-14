from flask import Blueprint, request
from models import db
from models import ParentGuardian
from serializers import ParentGuardianSchema

add_family_information = Blueprint('add_family_information', __name__)

parent_guardian_schema = ParentGuardianSchema()

@add_family_information.route('/add_family_information', methods=['POST'])
def add_family_information_function():
    # Parse the incoming request data
    data = request.get_json()

    # Validate and deserialize the input data
    parent_guardian, errors = parent_guardian_schema.load(data)
    if errors:
        return errors, 422

    # Check if a parent/guardian with the given student_id already exists
    existing_parent_guardian = ParentGuardian.query.filter_by(student_id=parent_guardian.student_id).first()
    if existing_parent_guardian is not None:
        return {'message': 'A parent/guardian with this student_id already exists.'}, 400

    # Add the new parent/guardian details to the database
    db.session.add(parent_guardian)
    db.session.commit()

    # Return the created parent/guardian details
    result = parent_guardian_schema.dump(ParentGuardian.query.get(parent_guardian.id))
    return {"message": "Family information added successfully.", "parent_guardian": result}, 201
