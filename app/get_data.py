# get_data.py
from flask import Flask,jsonify
from flask_restful import Resource, Api
from models import db, User, StudentDetails, ParentGuardian, Siblings, EducationFundingHistory, Bursary
from serializers import UserSchema, StudentDetailsSchema, ParentGuardianSchema, SiblingsSchema, EducationFundingHistorySchema, BursarySchema


class GetAllUsers(Resource):
    def get(self):
        schema = UserSchema(many=True)
        users = User.query.all()
        result = schema.dump(users)
        return result, 200

#class GetAllStudentDetails(Resource):
    #def get(self):
        #schema = StudentDetailsSchema(many=True)
        #students = StudentDetails.query.all()
       # result = schema.dump(students)
        #return result, 200

class GetAllParentGuardians(Resource):
    def get(self):
        schema = ParentGuardianSchema(many=True)
        parents = ParentGuardian.query.all()
        result = schema.dump(parents)
        return result, 200

class GetAllSiblings(Resource):
    def get(self):
        schema = SiblingsSchema(many=True)
        siblings = Siblings.query.all()
        result = schema.dump(siblings)
        return result, 200

class GetAllEducationFundingHistories(Resource):
    def get(self):
        schema = EducationFundingHistorySchema(many=True)
        histories = EducationFundingHistory.query.all()
        result = schema.dump(histories)
        return result, 200

class GetAllBursaries(Resource):
    def get(self):
        schema = BursarySchema(many=True)
        bursaries = Bursary.query.all()
        result = schema.dump(bursaries)
        return result, 200




class GetAllStudents(Resource):
    def get(self):
        schema = StudentDetailsSchema(many=True, only=('id', 'name'))
        students = StudentDetails.query.all()
        result = schema.dump(students)
        return result, 200


