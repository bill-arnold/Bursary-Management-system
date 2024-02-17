from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import db, User, ParentGuardian, EducationFundingHistory, Siblings, Bursary, Beneficiary, DeclarationDocuments,StudentDetails

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session

class StudentDetailsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = StudentDetails
        sqla_session = db.session

class ParentGuardianSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ParentGuardian
        sqla_session = db.session

class EducationFundingHistorySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = EducationFundingHistory
        sqla_session = db.session

class SiblingsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Siblings
        sqla_session = db.session

class BursarySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Bursary
        sqla_session = db.session

class BeneficiarySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Beneficiary
        sqla_session = db.session

class DeclarationDocumentsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = DeclarationDocuments
        sqla_session = db.session

#class StudentDetailsSchema(Schema):
   # model = StudentDetails
    #sqla_session = db.session
    #id = fields.UUID()
    #name = fields.Function(lambda obj: f"{obj.firstname} {obj.lastname}")