from flask import Blueprint, request
from models import db
from models import StudentDetails
from serializers import StudentDetailsSchema

add_institution_information = Blueprint('add_institution_information', __name__)

student_details_schema = StudentDetailsSchema()

@add_institution_information.route('/add_institution_information', methods=['POST'])
def add_institution_information_function():
    # Parse the incoming request data
    data = request.get_json()

    # Validate and deserialize the input data
    student_details, errors = student_details_schema.load(data)
    if errors:
        return errors, 422

    # Check if a student with the given user_id already exists
    existing_student = StudentDetails.query.filter_by(user_id=student_details.user_id).first()
    if existing_student is not None:
        return {'message': 'A student with this user_id already exists.'}, 400

    # Add the new student details to the database
    db.session.add(student_details)
    db.session.commit()

    # Return the created student details
    result = student_details_schema.dump(StudentDetails.query.get(student_details.id))
    return {"message": "Institution information added successfully.", "student_details": result}, 201
