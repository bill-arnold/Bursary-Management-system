# resources.py
from flask import request
from flask_restful import Resource
from models import db, StudentDetails, Bursary
from serializers import StudentDetailsSchema, BursarySchema
from marshmallow import ValidationError
import uuid

#from email_utils import send_bursary_awarded_email, send_bursary_rejected_email



class AddBursary(Resource):
    def post(self):
        schema = BursarySchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400

        new_bursary = Bursary(**data)
        db.session.add(new_bursary)
        db.session.commit()
        return {"message": "Bursary added successfully."}, 201

class ViewApplications(Resource):
    def get(self):
        schema = BursarySchema(many=True)
        applications = Bursary.query.all()
        result = schema.dump(applications)
        return result, 200

from uuid import UUID

class AwardBursary(Resource):
    def post(self, application_id):
        try:
            application_id = UUID(application_id)  # Convert string to UUID
        except ValueError:
            return {"message": "Invalid application ID"}, 400

        application = Bursary.query.get(application_id)
        if application:
            application.awarded = True
            db.session.commit()
            # Send an award email to the applicant

            #send_bursary_awarded_email(application)


            return {"message": "Bursary awarded successfully."}, 200
        return {"message": "Application not found."}, 404

class ViewStudents(Resource):
    def get(self):
        schema = StudentDetailsSchema(many=True)
        students = StudentDetails.query.all()
        result = schema.dump(students)
        return result, 200

class RejectRequest(Resource):
    def post(self, application_id):
        application_id = uuid.UUID(application_id)
        application = Bursary.query.get(application_id)
        
        if application:
            application.rejected = True
            db.session.commit()
             # Send an award email to the applicant

            #send_bursary_rejected_email(application)

            
            return {"message": "Request rejected successfully."}, 200
        return {"message": "Application not found."}, 404