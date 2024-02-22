from flask import request
from flask_restful import Resource
from models import db, User, StudentDetails, ParentGuardian, Siblings, EducationFundingHistory, DeclarationDocuments, Beneficiary
from serializers import UserSchema, StudentDetailsSchema, ParentGuardianSchema, SiblingsSchema, EducationFundingHistorySchema, DeclarationDocumentsSchema, BeneficiarySchema, UserSchema2
from marshmallow import ValidationError
import uuid
#from sqlalchemy.exc import IntegrityError
#from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash


class UpdateContactDetails(Resource):
    def put(self, user_id):
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
            return {"message": "Contact details updated successfully."}, 200
        return {"message": "User not found."}, 404


class UpdateFamilyInformation(Resource):
    def put(self, student_id):
        schema = ParentGuardianSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        family_info = ParentGuardian.query.filter_by(student_id=student_id).first()
        if family_info:
            family_info.update(data)
            db.session.commit()
            return {"message": "Family information updated successfully."}, 200
        return {"message": "Family information not found."}, 404


class UpdateSiblingInformation(Resource):
    def put(self, student_id):
        schema = SiblingsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        sibling_info = Siblings.query.filter_by(student_id=student_id).first()
        if sibling_info:
            sibling_info.update(data)
            db.session.commit()
            return {"message": "Sibling information updated successfully."}, 200
        return {"message": "Sibling information not found."}, 404


class UpdateInstitutionInformation(Resource):
    def put(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        institution_info = StudentDetails.query.get(student_id)
        if institution_info:
            institution_info.update(data)
            db.session.commit()
            return {"message": "Institution information updated successfully."}, 200
        return {"message": "Institution information not found."}, 404


class UpdateStudent(Resource):
    def put(self, user_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        user_id = uuid.UUID(user_id)

        student = StudentDetails.query.filter_by(user_id=user_id).first()
        if student:
            student.update(data)
            db.session.commit()
            return {"message": "Student information updated successfully."}, 200
        return {"message": "Student not found."}, 404


class ResetPassword(Resource):
    def post(self, user_email):
        schema = UserSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400

        user = User.query.filter_by(email=user_email).first()
        if user:
            user.password = data.get('password')
            db.session.commit()
            return {"message": "Password reset successfully."}, 200
        return {"message": "User not found."}, 404

class DeleteContactDetails(Resource):
    def delete(self, user_id):
        user_id = uuid.UUID(user_id)

        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {"message": "Contact details deleted successfully."}, 200
        return {"message": "User not found."}, 404


class DeleteFamilyInformation(Resource):
    def delete(self, student_id):
        student_id = uuid.UUID(student_id)

        family_info = ParentGuardian.query.filter_by(student_id=student_id).first()
        if family_info:
            db.session.delete(family_info)
            db.session.commit()
            return {"message": "Family information deleted successfully."}, 200
        return {"message": "Family information not found."}, 404


class DeleteSiblingInformation(Resource):
    def delete(self, student_id):
        student_id = uuid.UUID(student_id)

        sibling_info = Siblings.query.filter_by(student_id=student_id).first()
        if sibling_info:
            db.session.delete(sibling_info)
            db.session.commit()
            return {"message": "Sibling information deleted successfully."}, 200
        return {"message": "Sibling information not found."}, 404


class DeleteInstitutionInformation(Resource):
    def delete(self, student_id):
        student_id = uuid.UUID(student_id)

        institution_info = StudentDetails.query.get(student_id)
        if institution_info:
            db.session.delete(institution_info)
            db.session.commit()
            return {"message": "Institution information deleted successfully."}, 200
        return {"message": "Institution information not found."}, 404


class DeleteStudent(Resource):
    def delete(self, student_id):
        user_id = uuid.UUID(student_id)

        student = StudentDetails.query.filter_by(student_id=student_id).first()
        if student:
            db.session.delete(student)
            db.session.commit()
            return {"message": "Student deleted successfully."}, 200
        return {"message": "Student not found."}, 404
    

