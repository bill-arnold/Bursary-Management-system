# resources.py
from flask import request
from flask_restful import Resource
from models import db, User, StudentDetails, ParentGuardian, Siblings, EducationFundingHistory
from serializers import UserSchema, StudentDetailsSchema, ParentGuardianSchema, SiblingsSchema, EducationFundingHistorySchema
from marshmallow import ValidationError
import uuid
class SignUp(Resource):
    def post(self):
        schema = UserSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400

        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User signed up successfully."}, 201

class AddContactDetails(Resource):
    def post(self, user_id):
        schema = UserSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        user_id = uuid.UUID(user_id)

        user = User.query.get(user_id)
        if user:
            user.phone = data.get('phone')
            db.session.commit()
            return {"message": "Contact details added successfully."}, 200
        return {"message": "User not found."}, 404

class AddFamilyInformation(Resource):
    def post(self, student_id):
        schema = ParentGuardianSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        # Convert student_id to a UUID
        student_id = uuid.UUID(student_id)

        new_info = ParentGuardian(student_id=student_id, **data)
        db.session.add(new_info)
        db.session.commit()
        return {"message": "Family information added successfully."}, 201

class AddSiblingInformation(Resource):
    def post(self, student_id):
        schema = SiblingsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        new_info = Siblings(student_id=student_id, **data)
        db.session.add(new_info)
        db.session.commit()
        return {"message": "Sibling information added successfully."}, 201

class AddInstitutionInformation(Resource):
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.institution_name = data.get('institution_name')
            student.institution_code = data.get('institution_code')
            student.campus = data.get('campus')
            student.level = data.get('level')
            student.course = data.get('course')
            student.mode_of_study = data.get('mode_of_study')
            student.expected_completion_year = data.get('expected_completion_year')
            db.session.commit()
            return {"message": "Institution information added successfully."}, 200
        return {"message": "Student not found."}, 404

class AddPersonalDetails(Resource):
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.firstname = data.get('firstname')
            student.lastname = data.get('lastname')
            student.contact_phone_number = data.get('contact_phone_number')
            student.photo_url = data.get('photo_url')
            student.gender = data.get('gender')
            student.dob = data.get('dob')
            student.place_of_birth = data.get('place_of_birth')
            student.village = data.get('village')
            student.ward = data.get('ward')
            student.constituency = data.get('constituency')
            db.session.commit()
            return {"message": "Personal details added successfully."}, 200
        return {"message": "Student not found."}, 404

class AddDeclarations(Resource):
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            for key, value in data.items():
                setattr(student, key, value)
            db.session.commit()
            return {"message": "Declarations added successfully."}, 200
        return {"message": "Student not found."}, 404

class AddEducationFundingHistory(Resource):
    def post(self, student_id):
        schema = EducationFundingHistorySchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        new_history = EducationFundingHistory(student_id=student_id, **data)
        db.session.add(new_history)
        db.session.commit()
        return {"message": "Education funding history added successfully."}, 201

class ReceiveBursary(Resource):
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.received_bursary = data.get('received_bursary')
            db.session.commit()
            return {"message": "Bursary received successfully."}, 200
        return {"message": "Student not found."}, 404
