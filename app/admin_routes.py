# resources.py
from flask import request
from flask_restful import Resource
from models import db, StudentDetails, Bursary
from serializers import StudentDetailsSchema, BursarySchema
from marshmallow import ValidationError
import uuid

class VerifyStudent(Resource):
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.verified = True
            db.session.commit()
            return {"message": "Student verified successfully."}, 200
        return {"message": "Student not found."}, 404

class ApproveStudent(Resource):
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.approved = True
            db.session.commit()
            return {"message": "Student approved successfully."}, 200
        return {"message": "Student not found."}, 404

class AwardScore(Resource):
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.needy_score = data.get('score')
            db.session.commit()
            return {"message": "Score awarded successfully."}, 200
        return {"message": "Student not found."}, 404

class ViewAppliedBursaries(Resource):
    def get(self):
        schema = BursarySchema(many=True)
        applications = Bursary.query.all()
        result = schema.dump(applications)
        return result, 200
class OnboardBursary(Resource):
    def post(self):
        schema = BursarySchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400

        new_bursary = Bursary(**data)
        db.session.add(new_bursary)
        db.session.commit()
        return {"message": "New bursary onboarded successfully."}, 201