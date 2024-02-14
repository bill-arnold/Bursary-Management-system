from flask import Blueprint, request
from models import db
from models import EducationFundingHistory
from serializers import EducationFundingHistorySchema

add_education_funding_history = Blueprint('add_education_funding_history', __name__)

education_funding_history_schema = EducationFundingHistorySchema()

@add_education_funding_history.route('/add_education_funding_history', methods=['POST'])
def add_education_funding_history_function():
    # Parse the incoming request data
    data = request.get_json()

    # Validate and deserialize the input data
    education_funding_history, errors = education_funding_history_schema.load(data)
    if errors:
        return errors, 422

    # Check if a funding history with the given student_id already exists
    existing_funding_history = EducationFundingHistory.query.filter_by(student_id=education_funding_history.student_id).first()
    if existing_funding_history is not None:
        return {'message': 'A funding history with this student_id already exists.'}, 400

    # Add the new funding history to the database
    db.session.add(education_funding_history)
    db.session.commit()

    # Return the created funding history
    result = education_funding_history_schema.dump(EducationFundingHistory.query.get(education_funding_history.id))
    return {"message": "Education funding history added successfully.", "education_funding_history": result}, 201
