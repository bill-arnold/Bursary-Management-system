from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from config import Config
from models import User
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restx import Api
# from admin_routes import * #VerifyStudent, ApproveStudent, AwardScore, ViewAppliedBursaries,OnboardBursary
# from sponsor_routes import * #AddBursary, ViewApplications, AwardBursary, ViewStudents, RejectRequest
# from applicant_routes import * #SignUp, AddContactDetails, AddFamilyInformation, AddSiblingInformation, AddInstitutionInformation, AddPersonalDetails, AddDeclarations, AddEducationFundingHistory, ReceiveBursary
# from get_data import GetAllUsers, GetAllStudentDetails, GetAllParentGuardians, GetAllSiblings, GetAllEducationFundingHistories, GetAllBursaries
import secrets

app = Flask(__name__)
app.config.from_object(Config)

# api = Api(app, version='1.0', title='Bursary_management', description='Bursary Management System Platform API')
# from models import db  # Importing db from models


# Generate a JWT secret key
def generate_jwt_secret_key():
    secret_key = secrets.token_urlsafe(32)
    return secret_key
    # Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bursary.db'  # Use your own database URI
# app.config['JWT_SECRET_KEY'] = 'kiptoo32'  # Use your own secret key

# Set the JWT secret key using the generated value
app.config['JWT_SECRET_KEY'] = generate_jwt_secret_key()

    # Initialize extensions
jwt = JWTManager(app)

# db.init_app(app)  # Initializing db with the Flask app
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

# CORS(app)


    #Flask-Mail config
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'rotichrotich70@gmail.com'
app.config['MAIL_PASSWORD'] = 'simw mswg zscy orjf'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

    # Import blueprints after initializing extensions to avoid circular import issues

    
    #from admin_routes import admin_bp
    #from sponsor_routes import sponsor_bp
    #from applicant_routes import applicant_bp
    # Register blueprints
    


    #app.register_blueprint(admin_bp)
    #admin_routes
# api.add_resource(VerifyStudent, '/verify-student/<string:student_id>')
# api.add_resource(ApproveStudent, '/approve-student/<string:student_id>')
# api.add_resource(AwardScore, '/award-score/<string:student_id>')
# api.add_resource(ViewAppliedBursaries, '/view_applied_bursaries')
# api.add_resource(OnboardBursary, '/onboard-bursary')
#     #sponsor_routes
# api.add_resource(AddBursary, '/add-bursary')
# api.add_resource(ViewApplications, '/view-applications')
# api.add_resource(AwardBursary, '/award-bursary/<string:application_id>')
# api.add_resource(ViewStudents, '/view-students')
# api.add_resource(RejectRequest, '/reject-request/<string:application_id>')
#     #applicant route
# api.add_resource(SignUp, '/sign-up')
# api.add_resource(AddContactDetails, '/add-contact-details/<string:user_id>')
# api.add_resource(AddFamilyInformation, '/add-family-information/<string:student_id>')
# api.add_resource(AddSiblingInformation, '/add-sibling-information/<string:student_id>')
# api.add_resource(AddInstitutionInformation, '/add-institution-information/<string:student_id>')
# api.add_resource(AddPersonalDetails, '/add-personal-details/<string:student_id>')
# api.add_resource(AddDeclarations, '/add-declarations/<string:student_id>')
# api.add_resource(AddEducationFundingHistory, '/add-education-funding-history/<string:student_id>')
# api.add_resource(ReceiveBursary, '/receive-bursary/<string:student_id>')
#     #routes for get_data.py
# api.add_resource(GetAllUsers, '/get-all-users')
#     # StudentDetails routes
# api.add_resource(GetAllStudentDetails, '/get-all-student-details')
#     # ParentGuardian routes
# api.add_resource(GetAllParentGuardians, '/get-all-parent-guardians')
#     # Siblings routes
# api.add_resource(GetAllSiblings, '/get-all-siblings')
#     # EducationFundingHistory routes
# api.add_resource(GetAllEducationFundingHistories, '/get-all-education-funding-histories')
#     # Bursary routes
# api.add_resource(GetAllBursaries, '/get-all-bursaries')

CORS(app)

api = Api(app, version='1.0', title='Bursary_management', description='Bursary Management System Platform API')

from admin_routes import * #VerifyStudent, ApproveStudent, AwardScore, ViewAppliedBursaries,OnboardBursary
from sponsor_routes import * #AddBursary, ViewApplications, AwardBursary, ViewStudents, RejectRequest
from applicant_routes import * #SignUp, AddContactDetails, AddFamilyInformation, AddSiblingInformation, AddInstitutionInformation, AddPersonalDetails, AddDeclarations, AddEducationFundingHistory, ReceiveBursary


if __name__ == "__main__":
    app.run(debug=True)
