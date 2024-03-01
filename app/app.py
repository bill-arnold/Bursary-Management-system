from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from admin_routes import VerifyStudent, ApproveStudent, AwardScore, ViewAppliedBursaries,OnboardBursary
from sponsor_routes import AddBursary, ViewApplications, AwardBursary, ViewStudents, RejectRequest
from applicant_routes import SignUp, AddContactDetails, AddFamilyInformation, AddSiblingInformation, AddInstitutionInformation, AddStudent, AddDeclarations, AddEducationFundingHistory, ReceiveBursary,Login,Logout
from get_data import GetAllUsers, GetAllParentGuardians, GetAllSiblings, GetAllEducationFundingHistories, GetAllBursaries,GetAllStudents2,GetAllBeneficiaries
#import os
from applicant_UD import UpdateContactDetails,UpdateFamilyInformation,UpdateSiblingInformation,UpdateInstitutionInformation,UpdateStudent,ResetPassword,DeleteContactDetails,DeleteFamilyInformation, DeleteSiblingInformation,DeleteInstitutionInformation,DeleteStudent,UpdateDeclaration,DeleteDeclaration,UpdateEducationFundingHistory
from flask_cors import CORS
from datetime import timedelta

def create_app():
    app = Flask(__name__)
    api = Api(app) 
    from models import db  # Importing db from models

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bursary.db'  # Use your own database URI
    app.config['JWT_SECRET_KEY'] = '8e491c3e401bbfc80d2bb16485ab0ccc35407b8773d683469afea3153ba3960a'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=10)


    # Initialize extensions
    db.init_app(app)  # Initializing db with the Flask app
    migrate = Migrate(app, db)
    #bcrypt = Bcrypt(app)
    jwt = JWTManager(app)
    CORS(app)

    # Import blueprints after initializing extensions to avoid circular import issues

    
    #from admin_routes import admin_bp
    #from sponsor_routes import sponsor_bp
    #from applicant_routes import applicant_bp
    # Register blueprints
    
    
    #app.register_blueprint(admin_bp)
    #admin_routes
    api.add_resource(VerifyStudent, '/verify-student/<string:student_id>')
    api.add_resource(ApproveStudent, '/approve-student/<string:student_id>')
    api.add_resource(AwardScore, '/award-score/<string:student_id>')
    api.add_resource(ViewAppliedBursaries, '/view_applied_bursaries')
    api.add_resource(OnboardBursary, '/onboard-bursary')
    #sponsor_routes
    api.add_resource(AddBursary, '/add-bursary')
    api.add_resource(ViewApplications, '/view-applications')
    api.add_resource(AwardBursary, '/award-bursary/<string:application_id>')
    api.add_resource(ViewStudents, '/view-students')
    api.add_resource(RejectRequest, '/reject-request/<string:application_id>')
    
    #applicant route
    api.add_resource(SignUp, '/sign-up')
    api.add_resource(AddContactDetails, '/add-contact-details/<string:user_id>')
    api.add_resource(AddFamilyInformation, '/add-family-information/<string:student_id>')
    api.add_resource(AddSiblingInformation, '/add-sibling-information/<string:student_id>')
    api.add_resource(AddInstitutionInformation, '/add-institution-information/<string:student_id>')
    api.add_resource(AddStudent, '/addstudent/<string:user_id>')
    api.add_resource(AddDeclarations, '/add-declarations/<string:student_id>')
    api.add_resource(AddEducationFundingHistory, '/add-education-funding-history/<string:student_id>')
    api.add_resource(ReceiveBursary, '/receive-bursary/<string:student_id>')
    #routes for get_data.py
    api.add_resource(GetAllUsers, '/get-all-users')
    api.add_resource(GetAllBeneficiaries, '/get-all-beneficiaries')
    # StudentDetails routes
    #api.add_resource(GetAllStudentDetails, '/get-all-student-details')
    # ParentGuardian routes
    api.add_resource(GetAllParentGuardians, '/get-all-parent-guardians')
    # Siblings routes
    api.add_resource(GetAllSiblings, '/get-all-siblings')
    # EducationFundingHistory routes
    api.add_resource(GetAllEducationFundingHistories, '/get-all-education-funding-histories')
    # Bursary routes
    api.add_resource(GetAllBursaries, '/get-all-bursaries')
    #get all students
    api.add_resource(GetAllStudents2, '/get-all-students2')

    #login
    api.add_resource(Login, '/login')

    # Add resources for applicant_UD
    api.add_resource(UpdateContactDetails, '/update_contact/<string:user_id>')
    api.add_resource(UpdateFamilyInformation, '/update_family/<string:student_id>')
    api.add_resource(UpdateSiblingInformation, '/update_sibling/<string:student_id>')
    #api.add_resource(UpdateInstitutionInformation, '/update_institution/<string:student_id>')
    api.add_resource(UpdateStudent, '/update_student/<string:student_id>')
    api.add_resource(ResetPassword, '/reset_password/<string:user_email>')
    #api.add_resource(DeleteContactDetails, '/delete_contact/<string:user_id>')
    api.add_resource(DeleteFamilyInformation, '/delete_family/<string:student_id>')
    api.add_resource(DeleteSiblingInformation, '/delete_sibling/<string:student_id>')
    api.add_resource(DeleteInstitutionInformation, '/delete_institution/<string:student_id>')
    api.add_resource(DeleteStudent, '/delete_student/<string:student_id>')
    api.add_resource(Logout, '/logout')
    # Add the UpdateDeclaration route
    api.add_resource(UpdateDeclaration, '/update_declaration/<string:student_id>')
    # Add the route for deleting declarations
    api.add_resource(DeleteDeclaration, '/delete-declaration/<string:student_id>')
    # Add the route for deleting declarations
    api.add_resource(UpdateEducationFundingHistory, '/update-education-funding-history/<string:student_id>')

    
    return app
app = create_app() 
if __name__ == "__main__":
    app.run(debug=True)
