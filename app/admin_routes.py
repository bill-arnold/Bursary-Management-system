from flask import request
from flask_restful import Resource
from models import db, StudentDetails, Bursary
from serializers import StudentDetailsSchema, BursarySchema,StudentDetails99Schema,NeedyScoreSchema
from marshmallow import ValidationError
import uuid
#from email_utils import send_student_approved_email, send_score_awarded_email


class VerifyStudent(Resource):
    
    def post(self, student_id):
        data = request.get_json()
        if "column_to_update" not in data:
            return {"error": "Column to update not specified"}, 400
        
        column_to_update = data["column_to_update"]
        if column_to_update not in ["verified", "approved"]:
            return {"error": "Invalid column specified"}, 400
        
        student_id = uuid.UUID(student_id)
        student = StudentDetails.query.get(student_id)
        
        if not student:
            return {"message": "Student not found"}, 404
        
        # Update the specified column
        setattr(student, column_to_update, True)
        db.session.commit()
        
        return {"message": f"Student {column_to_update} successfully updated"}, 200


class ApproveStudent(Resource):
    
    def post(self, student_id):
        schema = StudentDetails99Schema()  # Using the new schema
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.approved = data['approved']  # Update the approved field based on the payload
            db.session.commit()

            # Send an approval email to the student
            # send_student_approved_email(student)

            return {"message": "Student approved successfully."}, 200
        return {"message": "Student not found."}, 404



class AwardScore(Resource):
    def post(self, student_id):
        schema = NeedyScoreSchema()  # Use NeedyScoreSchema for validation
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            needy_score = data.get('needy_score')
            if needy_score is not None:
                student.needy_score = needy_score
                db.session.commit()

                # Send a score awarded email to the student
                # send_score_awarded_email(student)

                return {"message": "Score awarded successfully."}, 200
            else:
                return {"error": "Needy score not provided."}, 400
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
