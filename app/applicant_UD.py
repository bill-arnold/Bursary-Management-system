from flask import request
from flask_restful import Resource
from models import db, User, StudentDetails, ParentGuardian, Siblings, EducationFundingHistory, DeclarationDocuments, Beneficiary
from serializers import UserSchema, StudentDetailsSchema, ParentGuardianSchema, SiblingsSchema,DeclarationDocumentsSchema,EducationFundingHistorySchema,ResetPasswordSchema
from marshmallow import ValidationError
from uuid import UUID
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
            #family_info.update(data)
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
            #sibling_info.update(data)
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
    def put(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400

        # Convert student_id to UUID object
        student_id = uuid.UUID(student_id)

        # Retrieve the student record from the database using the student_id
        student = StudentDetails.query.filter_by(id=student_id).first()
        if student:
            
            # Update the student record with the new data
            #student.update(data)
            db.session.commit()
            return {"message": "Student information updated successfully."}, 200
        else:
            return {"message": "Student not found."}, 404



class ResetPassword(Resource):
    def post(self, user_email):
        schema = ResetPasswordSchema()
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
        # Delete student by student_id
        student_id = UUID(student_id)
        student = StudentDetails.query.get(student_id)
        if student:
            db.session.delete(student)
            db.session.commit()
            return {"message": "Student deleted successfully."}, 200
        else:
            return {"message": "Student not found."}, 404
 



class UpdateDeclaration(Resource):
    def put(self, student_id):
        # Load the request data using the DeclarationDocumentsSchema
        schema = DeclarationDocumentsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        # Convert student_id to UUID (assuming it's a UUID)
        student_id = uuid.UUID(student_id)

        # Query the database for the declaration by student_id
        declaration = DeclarationDocuments.query.filter_by(student_id=student_id).first()
        if declaration:
            # Update the fields of the existing declaration with the new data
            declaration.individual_declaration = data['individual_declaration']
            declaration.parent_declaration = data['parent_declaration']
            declaration.religious_leader_declaration = data['religious_leader_declaration']
            declaration.local_authority_declaration = data['local_authority_declaration']
            
            # Commit the changes to the database
            db.session.commit()
            
            return {"message": "Declaration updated successfully."}, 200
        else:
            return {"message": "Declaration not found."}, 404


class DeleteDeclaration(Resource):
    def delete(self, student_id):
        # Convert student_id to UUID (assuming it's a UUID)
        student_id = uuid.UUID(student_id)

        # Query the database for the declaration by student_id
        declaration = DeclarationDocuments.query.filter_by(student_id=student_id).first()
        if declaration:
            # Delete the declaration from the database
            db.session.delete(declaration)
            db.session.commit()
            return {"message": "Declaration deleted successfully."}, 200
        else:
            return {"message": "Declaration not found."}, 404
class UpdateEducationFundingHistory(Resource):
    def put(self, student_id):
        # Load the request data using the EducationFundingHistorySchema
        schema = EducationFundingHistorySchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        
        student_id = uuid.UUID(student_id)

        # Query the database for the funding history by student ID and other criteria
        funding_history = EducationFundingHistory.query.filter_by(student_id=student_id, institution_name=data['institution_name']).first()
        if funding_history:
            # Update the fields of the existing funding history with the new data
           
            # Commit the changes to the database
            db.session.commit()
            
            return {"message": "Education funding history updated successfully."}, 200
        else:
            return {"message": "Education funding history not found."}, 404
        
