#from app import db, ma
from models import db, User, StudentDetails, ParentGuardian, EducationFundingHistory, Siblings, Bursary, Beneficiary, DeclarationDocuments
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema




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
