from flask_restx import Resource, fields, Namespace, reqparse
from flask import request
from models import db, User, StudentDetails, ParentGuardian, Siblings, EducationFundingHistory
from serializers import UserSchema, StudentDetailsSchema, ParentGuardianSchema, SiblingsSchema, EducationFundingHistorySchema
from marshmallow import ValidationError
import uuid

api = Namespace('applicant', description='Applicant related operations')

user_details = api.model('UserDetails', {
    'email': fields.String(required=True, description='Email address of the user'),
    'password': fields.String(required=True, description='Password of the user'),
})

contact_details = api.model('ContactDetails', {
    'phone': fields.String(description='Phone number of the user'),
})

parent_guardian_details = api.model('ParentGuardianDetails', {
    'name': fields.String(required=True, description='Name of the parent/guardian'),
    'relationship': fields.String(description='Relationship with the student'),
    'phone': fields.String(description='Phone number of the parent/guardian'),
})

siblings_details = api.model('SiblingsDetails', {
    'name': fields.String(required=True, description='Name of the sibling'),
    'age': fields.Integer(description='Age of the sibling'),
    'school': fields.String(description='School or institution attended by the sibling'),
})

institution_details = api.model('InstitutionDetails', {
    'institution_name': fields.String(required=True, description='Name of the institution'),
    'institution_code': fields.String(description='Code of the institution'),
    'campus': fields.String(description='Campus of the institution'),
    'level': fields.String(description='Academic level or year'),
    'course': fields.String(description='Course or program of study'),
    'mode_of_study': fields.String(description='Mode of study (e.g., full-time, part-time)'),
    'expected_completion_year': fields.Integer(description='Expected year of completion'),
})

personal_details = api.model('PersonalDetails', {
    'firstname': fields.String(required=True, description='First name of the student'),
    'lastname': fields.String(required=True, description='Last name of the student'),
    'contact_phone_number': fields.String(description='Contact phone number of the student'),
    'photo_url': fields.String(description='URL of the student\'s photo'),
    'gender': fields.String(description='Gender of the student'),
    'dob': fields.Date(description='Date of birth of the student'),
    'place_of_birth': fields.String(description='Place of birth of the student'),
    'village': fields.String(description='Village of the student'),
    'ward': fields.String(description='Ward of the student'),
    'constituency': fields.String(description='Constituency of the student'),
})

declarations_details = api.model('DeclarationsDetails', {
    'declaration_1': fields.Boolean(description='Declaration 1'),
    'declaration_2': fields.Boolean(description='Declaration 2'),
})

education_funding_history_details = api.model('EducationFundingHistoryDetails', {
    'funding_source': fields.String(description='Source of education funding'),
    'amount': fields.Float(description='Amount of funding'),
    'year': fields.Integer(description='Year of funding'),
})

@api.route('/signup')
class SignUp(Resource):
    @api.doc('signup')
    @api.expect(user_details)
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

@api.route('/add_contact_details/<user_id>')
class AddContactDetails(Resource):
    @api.doc('add_contact_details')
    @api.expect(contact_details)
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

@api.route('/add_family_information/<student_id>')
class AddFamilyInformation(Resource):
    @api.doc('add_family_information')
    @api.expect(parent_guardian_details)
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

@api.route('/add_sibling_information/<student_id>')
class AddSiblingInformation(Resource):
    @api.doc('add_sibling_information')
    @api.expect(siblings_details)
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

@api.route('/add_institution_information/<student_id>')
class AddInstitutionInformation(Resource):
    @api.doc('add_institution_information')
    @api.expect(institution_details)
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

@api.route('/add_personal_details/<student_id>')
class AddPersonalDetails(Resource):
    @api.doc('add_personal_details')
    @api.expect(personal_details)
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

@api.route('/add_declarations/<student_id>')
class AddDeclarations(Resource):
    @api.doc('add_declarations')
    @api.expect(declarations_details)
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

@api.route('/add_education_funding_history/<student_id>')
class AddEducationFundingHistory(Resource):
    @api.doc('add_education_funding_history')
    @api.expect(education_funding_history_details)
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

@api.route('/receive_bursary/<student_id>')
class ReceiveBursary(Resource):
    @api.doc('receive_bursary')
    @api.expect(personal_details)  
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
