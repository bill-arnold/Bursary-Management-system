from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import db, User, ParentGuardian, EducationFundingHistory, Siblings, Bursary, Beneficiary, DeclarationDocuments,StudentDetails
from marshmallow import Schema, fields,post_load
from werkzeug.security import generate_password_hash

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session
        load_instance = True  # Optional: deserialize to model instances
        exclude = ('password_hash',)  # Exclude password_hash when dumping
    password = fields.Str(load_only=True)
    @post_load
    def hash_password(self, data, **kwargs):
        if "password" in data:
            data["password_hash"] = generate_password_hash(data["password"])
            del data["password"]
        return data

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

class StudentDetailsSchema2(Schema):
    model = StudentDetails
    sqla_session = db.session
    id = fields.UUID()
    name = fields.Function(lambda obj: f"{obj.firstname} {obj.lastname}")

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User
from marshmallow import fields, post_load

class UserSchema2(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session

    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)

class StudentDetailsSchema3(SQLAlchemyAutoSchema):
    class Meta:
        model = StudentDetails
        sqla_session = db.session
        
    student_id = fields.UUID()

from marshmallow import Schema, fields

class StudentDetails99Schema(Schema):
    model = StudentDetails
    approved = fields.Boolean()

class NeedyScoreSchema(Schema):
    model = StudentDetails
    needy_score = fields.Integer()

class ResetPasswordSchema(Schema):
    model = User
    password = fields.Str(required=True)

    #new schemas for get
class ParentGuardianSchema2(SQLAlchemyAutoSchema):
    class Meta:
        model = ParentGuardian
        include_fk = True
    student_id = fields.UUID()

class SiblingsSchema2(SQLAlchemyAutoSchema):
    class Meta:
        model = Siblings
        include_fk = True
    student_id = fields.UUID()

class EducationFundingHistorySchema2(SQLAlchemyAutoSchema):
    class Meta:
        model = EducationFundingHistory
        include_fk = True
    student_id = fields.UUID()

class BursarySchema2(SQLAlchemyAutoSchema):
    class Meta:
        model = Bursary
        include_fk = True
    student_id = fields.UUID()

class BeneficiarySchema2(SQLAlchemyAutoSchema):
    class Meta:
        model = Beneficiary
        include_fk = True
    student_id = fields.UUID()
        