from flask_restx import Resource, fields, Namespace, reqparse
from flask import request
from models import db, StudentDetails, Bursary
from serializers import StudentDetailsSchema, BursarySchema
from marshmallow import ValidationError
import uuid

api = Namespace('sponsor', description='Sponsor related operations')

bursary_details = api.model('BursaryDetails', {
    'name': fields.String(required=True, description='Name of the bursary'),
})

@api.route('/add_bursary')
class AddBursary(Resource):
    @api.doc('add_bursary')
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
        return {"message": "Bursary added successfully."}, 201

@api.route('/view_applications')
class ViewApplications(Resource):
    @api.doc('view_applications')
    @api.marshal_list_with(bursary_details)
    def get(self):
        schema = BursarySchema(many=True)
        applications = Bursary.query.all()
        result = schema.dump(applications)
        return result, 200

@api.route('/award_bursary/<application_id>')
class AwardBursary(Resource):
    @api.doc('award_bursary')
    def post(self, application_id):
        application = Bursary.query.get(application_id)
        application_id = uuid.UUID(application_id)
        if application:
            application.awarded = True
            db.session.commit()
            return {"message": "Bursary awarded successfully."}, 200
        return {"message": "Application not found."}, 404

@api.route('/view_students')
class ViewStudents(Resource):
    @api.doc('view_students')
    def get(self):
        schema = StudentDetailsSchema(many=True)
        students = StudentDetails.query.all()
        result = schema.dump(students)
        return result, 200

@api.route('/reject_request/<application_id>')
class RejectRequest(Resource):
    @api.doc('reject_request')
    def post(self, application_id):
        application = Bursary.query.get(application_id)
        application_id = uuid.UUID(application_id)
        if application:
            application.rejected = True
            db.session.commit()
            return {"message": "Request rejected successfully."}, 200
        return {"message": "Application not found."}, 404
