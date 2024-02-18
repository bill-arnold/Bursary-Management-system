from flask_restx import Resource, fields, Namespace, reqparse
from flask import request
from email_utils import send_student_approved_email, send_score_awarded_email
from models import db, StudentDetails, Bursary
from serializers import StudentDetailsSchema, BursarySchema
from marshmallow import ValidationError
import uuid

api = Namespace('admin', description='Administration related operations')

student_details = api.model('StudentDetails', {
    'student_id': fields.String(required=True, description='The student unique identifier'),
    'verified': fields.Boolean(description='Verification status of the student'),
    'approved': fields.Boolean(description='Approval status of the student'),
    'needy_score': fields.Integer(description='Needy score of the student'),
})

bursary_details = api.model('BursaryDetails', {
    'bursary_id': fields.String(required=True, description='The bursary unique identifier'),
    'name': fields.String(required=True, description='Name of the bursary'),
})

# Student_id is part of the URL path and score is passed in the JSON body
score_parser = reqparse.RequestParser()
score_parser.add_argument('score', type=int, required=True, help='Needy score to award', location='json')

@api.route('/verify_student/<student_id>')
class VerifyStudent(Resource):
    @api.doc('verify_student')
    @api.expect(student_details)
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.verified = data.get('verified')
            db.session.commit()
            return {"message": "Student verified successfully."}, 200
        return {"message": "Student not found."}, 404

@api.route('/approve_student/<student_id>')
class ApproveStudent(Resource):
    @api.doc('approve_student')
    @api.expect(student_details)
    def post(self, student_id):
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.approved = data.get('approved')
            db.session.commit()

             # Send an award email to the Student
            send_student_approved_email(student)
                
            return {"message": "Student approved successfully."}, 200
        return {"message": "Student not found."}, 404

@api.route('/award_score/<student_id>')
@api.expect(score_parser)
class AwardScore(Resource):
    @api.doc('award_score')
    def post(self, student_id):
        args = score_parser.parse_args()
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.needy_score = args.get('score')
            db.session.commit()

            # Send an award email to the Student
            send_score_awarded_email(student)
            return {"message": "Score awarded successfully."}, 200
        return {"message": "Student not found."}, 404

@api.route('/view_applied_bursaries')
class ViewAppliedBursaries(Resource):
    @api.doc('view_applied_bursaries')
    @api.marshal_list_with(bursary_details)
    def get(self):
        schema = BursarySchema(many=True)
        applications = Bursary.query.all()
        result = schema.dump(applications)
        return result, 200

@api.route('/onboard_bursary')
class OnboardBursary(Resource):
    @api.doc('onboard_bursary')
    @api.expect(bursary_details)
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
