import logging
from flask_restx import Resource, fields, Namespace, reqparse
from flask import request
from email_utils import send_student_approved_email, send_score_awarded_email
from models import db, StudentDetails, Bursary
from serializers import StudentDetailsSchema, BursarySchema
from marshmallow import ValidationError
import uuid

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

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

score_parser = reqparse.RequestParser()
score_parser.add_argument('score', type=int, required=True, help='Needy score to award', location='json')

@api.route('/verify_student/<student_id>')
class VerifyStudent(Resource):
    @api.doc('verify_student')
    @api.expect(student_details)
    def post(self, student_id):
        logging.debug(f"Attempting to verify student with ID: {student_id}")
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            logging.error(f"Validation error: {err.messages}")
            return err.messages, 400

        student_id = uuid.UUID(student_id)
        student = StudentDetails.query.get(student_id)
        if student:
            student.verified = data.get('verified')
            db.session.commit()
            logging.info(f"Student verified successfully: {student_id}")
            return {"message": "Student verified successfully."}, 200
        logging.warning(f"Student not found: {student_id}")
        return {"message": "Student not found."}, 404

@api.route('/approve_student/<student_id>')
class ApproveStudent(Resource):
    @api.doc('approve_student')
    @api.expect(student_details)
    def post(self, student_id):
        logging.debug(f"Attempting to approve student with ID: {student_id}")
        schema = StudentDetailsSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            logging.error(f"Validation error: {err.messages}")
            return err.messages, 400

        student_id = uuid.UUID(student_id)
        student = StudentDetails.query.get(student_id)
        if student:
            student.approved = data.get('approved')
            db.session.commit()

            # Send an approval email to the student
            send_student_approved_email(student)
            logging.info(f"Student approved successfully: {student_id}")
            return {"message": "Student approved successfully."}, 200
        logging.warning(f"Student not found: {student_id}")
        return {"message": "Student not found."}, 404

@api.route('/award_score/<student_id>')
@api.expect(score_parser)
class AwardScore(Resource):
    @api.doc('award_score')
    def post(self, student_id):
        logging.debug(f"Attempting to award score to student with ID: {student_id}")
        args = score_parser.parse_args()
        student_id = uuid.UUID(student_id)

        student = StudentDetails.query.get(student_id)
        if student:
            student.needy_score = args['score']
            db.session.commit()

            # Send a score awarded email to the student
            send_score_awarded_email(student)
            logging.info(f"Score awarded successfully to student: {student_id}")
            return {"message": "Score awarded successfully."}, 200
        logging.warning(f"Student not found: {student_id}")
        return {"message": "Student not found."}, 404

@api.route('/view_applied_bursaries')
class ViewAppliedBursaries(Resource):
    @api.doc('view_applied_bursaries')
    @api.marshal_list_with(bursary_details)
    def get(self):
        logging.debug("Fetching list of applied bursaries")
        bursaries = Bursary.query.all()
        schema = BursarySchema(many=True)
        result = schema.dump(bursaries)
        return result, 200

@api.route('/onboard_bursary')
class OnboardBursary(Resource):
    @api.doc('onboard_bursary')
    @api.expect(bursary_details)
    def post(self):
        logging.debug("Attempting to onboard a new bursary")
        schema = BursarySchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            logging.error(f"Validation error: {err.messages}")
            return err.messages, 400

        new_bursary = Bursary(**data)
        db.session.add(new_bursary)
        db.session.commit()
        logging.info("New bursary onboarded successfully")
        return {"message": "New bursary onboarded successfully."}, 201
