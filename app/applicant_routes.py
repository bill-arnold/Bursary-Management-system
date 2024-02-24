# resources.py
from flask import request,make_response
from flask_restful import Resource
from models import db, User, StudentDetails, ParentGuardian, Siblings, EducationFundingHistory,DeclarationDocuments,Beneficiary
from serializers import UserSchema, StudentDetailsSchema, ParentGuardianSchema, SiblingsSchema, EducationFundingHistorySchema,DeclarationDocumentsSchema,BeneficiarySchema,UserSchema2
from marshmallow import ValidationError
import uuid
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token,get_jwt_identity, unset_jwt_cookies,jwt_required
from werkzeug.security import generate_password_hash, check_password_hash


class SignUp(Resource):
    def post(self):
        schema = UserSchema()
        try:
            data = request.get_json()  # Get the JSON data from the request
        except ValidationError as err:
            return err.messages, 400

        # Create a new User instance with the hashed password
        new_user = User(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            role=data['role'],
            id_no=data['id_no'],
            password_hash=generate_password_hash(data['password'])  # Hash the password
        )

        try: 
            db.session.add(new_user)
            db.session.commit()
            return {"message": "User signed up successfully."}, 201
        except IntegrityError:
            db.session.rollback()
            return {"message": "A user with this email already exists."}, 400


        

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






class AddStudent(Resource):
    def post(self, user_id):
        schema = StudentDetailsSchema()
        try:
            # Load the JSON data from the request into the schema
            student_data = schema.load(request.get_json())
        except ValidationError as err:
            # If the data is invalid, return the errors
            return {'errors': err.messages}, 400
        user_id = uuid.UUID(user_id)

        # Add the user_id to the student_data
        student_data['user_id'] = user_id

        # Create a new StudentDetails instance and add it to the database
        new_student = StudentDetails(**student_data)
        db.session.add(new_student)
        db.session.commit()

        return {"message": "Student added successfully."}, 201





class AddDeclarations(Resource):
    def post(self, student_id):
        # Load schema for validation
        schema = DeclarationDocumentsSchema()
        try:
            data = schema.load(request.get_json())  # Load only specified fields
        except ValidationError as err:
            return err.messages, 400
        
        # Convert student_id to UUID
        student_id = uuid.UUID(student_id)

        # Check if the student exists
        student = StudentDetails.query.get(student_id)
        if student:
            # Create a new DeclarationDocuments instance with the loaded data
            declarations = DeclarationDocuments(
                student_id=student_id,
                individual_declaration=data['individual_declaration'],
                parent_declaration=data['parent_declaration'],
                religious_leader_declaration=data['religious_leader_declaration'],
                local_authority_declaration=data['local_authority_declaration']
            )
            
            # Add the new declaration documents to the database session
            db.session.add(declarations)
            
            # Commit the changes to the database
            db.session.commit()
            
            return {"message": "Declarations added successfully."}, 200
        else:
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
    def get(self, student_id):
        # Check if the student has received a bursary
        student_id = uuid.UUID(student_id)
        beneficiary = Beneficiary.query.filter_by(student_id=student_id).first()
        if not beneficiary:
            return {"message": "Student has not received a bursary."}, 404

        # Serialize the beneficiary object using BeneficiarySchema
        beneficiary_schema = BeneficiarySchema()
        student_data = beneficiary_schema.dump(beneficiary)

        return ({"student_data": student_data}), 200



class Login(Resource):
    def post(self):
        schema = UserSchema2(only=("email", "password"))
        try:
            data = request.get_json()
        except ValidationError as err:
            return {"message": "Validation error", "errors": err.messages}, 400

        if 'email' not in data or 'password' not in data:
            return {"message": "Email and password are required."}, 400

        user = User.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password_hash, data['password']):
            # User provided correct password
            access_token = create_access_token(identity=user.id)
            return {"message": "Logged in successfully.", "access_token": access_token}, 200
        else:
            # User provided incorrect email or password
            return {"message": "Invalid email or password."}, 401  # Use 401 for authentication failure


class Logout(Resource):
    @jwt_required()
    def post(self):
        # Get the identity of the current user from the JWT token
        current_user = get_jwt_identity()
        # Unset JWT cookies to perform logout
        response = make_response({"message": "Logged out successfully."}, 200)
        unset_jwt_cookies(response)
        return response
       
