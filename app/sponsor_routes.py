from flask import Blueprint, request, jsonify
from models import db, StudentDetails, Bursary  # Import your models

sponsor_bp = Blueprint('sponsor', __name__)

@sponsor_bp.route('/add-bursary', methods=['POST'])
def add_bursary():
    new_bursary = Bursary(**request.json)
    db.session.add(new_bursary)
    db.session.commit()
    return jsonify({"message": "Bursary added successfully."}), 201

@sponsor_bp.route('/view-applications', methods=['GET'])
def view_applications():
    applications = Bursary.query.filter_by(sponsor_id=request.json.get('sponsor_id'))
    return jsonify([application.to_dict() for application in applications]), 200

@sponsor_bp.route('/award-bursary/<application_id>', methods=['POST'])
def award_bursary(application_id):
    application = Bursary.query.get(application_id)
    if application:
        application.awarded = True
        db.session.commit()
        return jsonify({"message": "Bursary awarded successfully."}), 200
    return jsonify({"message": "Application not found."}), 404

@sponsor_bp.route('/view-students', methods=['GET'])
def view_students():
    students = StudentDetails.query.all()
    return jsonify([student.to_dict() for student in students]), 200

@sponsor_bp.route('/reject-request/<application_id>', methods=['POST'])
def reject_request(application_id):
    application = Bursary.query.get(application_id)
    if application:
        application.rejected = True
        db.session.commit()
        return jsonify({"message": "Request rejected successfully."}), 200
    return jsonify({"message": "Application not found."}), 404
