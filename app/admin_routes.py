from flask import request
from flask_restful import Resource
from models import  StudentDetails, Bursary
from serializers import StudentDetailsSchema, BursarySchema,StudentDetails99Schema,NeedyScoreSchema,BeneficiarySchema
from marshmallow import ValidationError
import uuid
from app import db


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
    
#add beneficiary
#class BeneficiaryPost(Resource):
    #def post(self):
        #data = request.get_json()

        # Ensure required fields are present
        #if 'student_id' not in data or 'bursary_id' not in data:
            #return {"error": "Both student_id and bursary_id are required"}, 400

        # Convert student_id and bursary_id to UUID objects
        #student_id = uuid.UUID(data['student_id'])
        #bursary_id = uuid.UUID(data['bursary_id'])

        #student = StudentDetails.query.get(student_id)
        #bursary = Bursary.query.get(bursary_id)

        # Check if the provided IDs are valid
        #if not student:
            #return {"error": "Student not found"}, 404
        #if not bursary:
            #return {"error": "Bursary not found"}, 404


        # Create a new Beneficiary instance
        #beneficiary = Beneficiary(
            #student_id=student_id,
            #bursary_id=bursary_id,
            #amount_allocated=data.get('amount_allocated', 0),
            #date_allocated=data.get('date_allocated'),
            #disbursed=data.get('disbursed', False),
            #date_disbursed=data.get('date_disbursed')
       # )

        # Add the new beneficiary to the database
        #db.session.add(beneficiary)
        #db.session.commit()

       # return {"message": "Beneficiary added successfully", "beneficiary_id": str(beneficiary.id)}, 201
