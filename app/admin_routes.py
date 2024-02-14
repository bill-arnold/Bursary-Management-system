from flask import Blueprint, request, jsonify
from models import db, StudentDetails, Bursary  # Import your models

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/verify-student/<student_id>', methods=['POST'])
def verify_student(student_id):
    student = StudentDetails.query.get(student_id)
    if student:
        student.verified = True
        db.session.commit()
        return jsonify({"message": "Student verified successfully."}), 200
    return jsonify({"message": "Student not found."}), 404

@admin_bp.route('/approve-student/<student_id>', methods=['POST'])
def approve_student(student_id):
    student = StudentDetails.query.get(student_id)
    if student:
        student.approved = True
        db.session.commit()
        return jsonify({"message": "Student approved successfully."}), 200
    return jsonify({"message": "Student not found."}), 404

@admin_bp.route('/award-score/<student_id>', methods=['POST'])
def award_score(student_id):
    student = StudentDetails.query.get(student_id)
    if student:
        student.needy_score = request.json.get('score')
        db.session.commit()
        return jsonify({"message": "Score awarded successfully."}), 200
    return jsonify({"message": "Student not found."}), 404

@admin_bp.route('/view-applied-bursaries', methods=['GET'])
def view_applied_bursaries():
    applications = Bursary.query.all()
    return jsonify([application.to_dict() for application in applications]), 200
