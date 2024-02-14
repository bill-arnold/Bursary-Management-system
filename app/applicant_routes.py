from flask import Blueprint, request, jsonify
from models import db, User, StudentDetails, ParentGuardian, Siblings, EducationFundingHistory  # Import your models

applicant_bp = Blueprint('applicant', __name__)

@applicant_bp.route('/sign-up', methods=['POST'])
def sign_up():
    new_user = User(**request.json)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User signed up successfully."}), 201

@applicant_bp.route('/add-contact-details/<user_id>', methods=['POST'])
def add_contact_details(user_id):
    user = User.query.get(user_id)
    if user:
        user.phone = request.json.get('phone')
        db.session.commit()
        return jsonify({"message": "Contact details added successfully."}), 200
    return jsonify({"message": "User not found."}), 404

@applicant_bp.route('/add-family-information/<student_id>', methods=['POST'])
def add_family_information(student_id):
    new_info = ParentGuardian(student_id=student_id, **request.json)
    db.session.add(new_info)
    db.session.commit()
    return jsonify({"message": "Family information added successfully."}), 201

@applicant_bp.route('/add-sibling-information/<student_id>', methods=['POST'])
def add_sibling_information(student_id):
    new_info = Siblings(student_id=student_id, **request.json)
    db.session.add(new_info)
    db.session.commit()
    return jsonify({"message": "Sibling information added successfully."}), 201

@applicant_bp.route('/add-institution-information/<student_id>', methods=['POST'])
def add_institution_information(student_id):
    student = StudentDetails.query.get(student_id)
    if student:
        student.institution_name = request.json.get('institution_name')
        student.institution_code = request.json.get('institution_code')
        student.campus = request.json.get('campus')
        student.level = request.json.get('level')
        student.course = request.json.get('course')
        student.mode_of_study = request.json.get('mode_of_study')
        student.expected_completion_year = request.json.get('expected_completion_year')
        db.session.commit()
        return jsonify({"message": "Institution information added successfully."}), 200
    return jsonify({"message": "Student not found."}), 404

@applicant_bp.route('/add-personal-details/<student_id>', methods=['POST'])
def add_personal_details(student_id):
    student = StudentDetails.query.get(student_id)
    if student:
        student.firstname = request.json.get('firstname')
        student.lastname = request.json.get('lastname')
        student.contact_phone_number = request.json.get('contact_phone_number')
        student.photo_url = request.json.get('photo_url')
        student.gender = request.json.get('gender')
        student.dob = request.json.get('dob')
        student.place_of_birth = request.json.get('place_of_birth')
        student.village = request.json.get('village')
        student.ward = request.json.get('ward')
        student.constituency = request.json.get('constituency')
        db.session.commit()
        return jsonify({"message": "Personal details added successfully."}), 200
    return jsonify({"message": "Student not found."}), 404

@applicant_bp.route('/add-declarations/<student_id>', methods=['POST'])
def add_declarations(student_id):
    student = StudentDetails.query.get(student_id)
    if student:
        # Assuming declarations are a dictionary of key-value pairs
        for key, value in request.json.items():
            setattr(student, key, value)
        db.session.commit()
        return jsonify({"message": "Declarations added successfully."}), 200
    return jsonify({"message": "Student not found."}), 404

@applicant_bp.route('/add-education-funding-history/<student_id>', methods=['POST'])
def add_education_funding_history(student_id):
    new_history = EducationFundingHistory(student_id=student_id, **request.json)
    db.session.add(new_history)
    db.session.commit()
    return jsonify({"message": "Education funding history added successfully."}), 201

@applicant_bp.route('/receive-bursary/<student_id>', methods=['POST'])
def receive_bursary(student_id):
    student = StudentDetails.query.get(student_id)
    if student:
        student.received_bursary = True
        db.session.commit()
        return jsonify({"message": "Bursary received successfully."}), 200
    return jsonify({"message": "Student not found."}), 404
