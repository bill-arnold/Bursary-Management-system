from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate

# Initialize Flask app
def create_app():
    app = Flask(__name__)
    from models import db  # Importing db from models

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bursary.db'  # Use your own database URI
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Use your own secret key

    # Initialize extensions
    db.init_app(app)  # Initializing db with the Flask app
    migrate = Migrate(app, db)
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)
    CORS(app)

    # Import blueprints after initializing extensions to avoid circular import issues

    from signup import signup
    from add_contact_details import add_contact_details
    from add_family_information import add_family_information
    from add_sibling_infromation import add_sibling_information
    from add_institution_information import add_institution_information
    from add_personal_details import add_personal_details
    from add_declarations import add_declarations
    from add_beneficiary import add_beneficiary_bp, view_beneficiaries_bp

    # Register blueprints
    app.register_blueprint(signup)
    app.register_blueprint(add_contact_details)
    app.register_blueprint(add_family_information)
    app.register_blueprint(add_sibling_information)
    app.register_blueprint(add_institution_information)
    app.register_blueprint(add_personal_details)
    app.register_blueprint(add_declarations)
    app.register_blueprint(add_beneficiary_bp)
    app.register_blueprint(view_beneficiaries_bp)
    

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
