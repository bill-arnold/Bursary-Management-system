# get_data.py
from flask import Flask,jsonify
from flask_restful import Resource, Api
from models import  User, StudentDetails, ParentGuardian, Siblings, EducationFundingHistory, Bursary,Beneficiary
from serializers import UserSchema, StudentDetailsSchema2, ParentGuardianSchema2, SiblingsSchema2, EducationFundingHistorySchema2, BursarySchema2,StudentDetailsSchema,BeneficiarySchema2
from app import app,db

class GetAllUsers(Resource):
    def get(self):
        schema = UserSchema(many=True)
        users = User.query.all()
        result = schema.dump(users)
        return result, 200

class GetAllStudentDetails(Resource):
    def get(self):
        schema = StudentDetailsSchema(many=True)
        students = StudentDetails.query.all()
        result = schema.dump(students)
        return result, 200

class GetAllParentGuardians(Resource):
    def get(self):
        schema = ParentGuardianSchema2(many=True)
        parents = ParentGuardian.query.all()
        result = schema.dump(parents)
        return result, 200

class GetAllSiblings(Resource):
    def get(self):
        schema = SiblingsSchema2(many=True)
        siblings = Siblings.query.all()
        result = schema.dump(siblings)
        return result, 200

class GetAllEducationFundingHistories(Resource):
    def get(self):
        schema = EducationFundingHistorySchema2(many=True)
        histories = EducationFundingHistory.query.all()
        result = schema.dump(histories)
        return result, 200

class GetAllBursaries(Resource):
    def get(self):
        schema = BursarySchema2(many=True)
        bursaries = Bursary.query.all()
        result = schema.dump(bursaries)
        return result, 200




class GetAllStudents2(Resource):
    def get(self):
        schema = StudentDetailsSchema2(many=True, only=('id', 'name'))
        students = StudentDetails.query.all()
        result = schema.dump(students)
        return result, 200

class GetAllBeneficiaries(Resource):
    def get(self):
        schema = BeneficiarySchema2(many=True)
        beneficiaries = Beneficiary.query.all()
        result = schema.dump(beneficiaries)
        return result, 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
