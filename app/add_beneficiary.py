from flask import Blueprint, request, jsonify
from models import db, Beneficiary  # Import Beneficiary model
from serializers import BeneficiarySchema  # Import BeneficiarySchema

add_beneficiary_bp = Blueprint('add_beneficiary', __name__)

beneficiary_schema = BeneficiarySchema()

@add_beneficiary_bp.route('/add_beneficiary', methods=['POST'])
def add_beneficiary_route():
    # Parse the incoming request data
    data = request.get_json()

    # Validate and deserialize the input data
    beneficiary, errors = beneficiary_schema.load(data)
    if errors:
        return jsonify(errors), 422

    # Check if a beneficiary with the given student_id and bursary_id already exists
    existing_beneficiary = Beneficiary.query.filter_by(student_id=beneficiary.student_id, bursary_id=beneficiary.bursary_id).first()
    if existing_beneficiary:
        return jsonify({'message': 'A beneficiary with this student_id and bursary_id already exists.'}), 400

    # Add the new beneficiary to the database
    new_beneficiary = Beneficiary(
        student_id=data['student_id'],
        bursary_id=data['bursary_id'],
        amount_allocated=data['amount_allocated'],
        date_allocated=data['date_allocated'],
        disbursed=data['disbursed'],
        date_disbursed=data.get('date_disbursed')
    )
    db.session.add(new_beneficiary)
    db.session.commit()

    # Return the created beneficiary
    result = beneficiary_schema.dump(new_beneficiary)
    return jsonify({"message": "Beneficiary added successfully.", "beneficiary": result}), 201

view_beneficiaries_bp = Blueprint('view_beneficiaries', __name__)

@view_beneficiaries_bp.route('/view_beneficiaries', methods=['GET'])
def view_all_beneficiaries():
    # Retrieve all beneficiaries from the database
    beneficiaries = Beneficiary.query.all()

    # Create a list to store beneficiary data
    beneficiary_data = []

    # Iterate over each beneficiary and extract relevant data
    for beneficiary in beneficiaries:
        beneficiary_info = {
            'id': beneficiary.id,
            'student_id': beneficiary.student_id,
            'bursary_id': beneficiary.bursary_id,
            'amount_allocated': beneficiary.amount_allocated,
            'date_allocated': beneficiary.date_allocated,
            'disbursed': beneficiary.disbursed,
            'date_disbursed': beneficiary.date_disbursed
            # Add more fields as needed
        }
        beneficiary_data.append(beneficiary_info)

    # Return the list of beneficiary data as JSON
    return jsonify(beneficiaries=beneficiary_data)
