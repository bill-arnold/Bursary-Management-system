from flask import Blueprint, request
from models import db
from models import User
from serializers import UserSchema
from werkzeug.security import generate_password_hash

signup = Blueprint('signup', __name__)

user_schema = UserSchema()

@signup.route('/signup', methods=['POST'])
def signup_function():
    # Parse the incoming request data
    data = request.get_json()

    # Validate and deserialize the input data
    user, errors = user_schema.load(data)
    if errors:
        return errors, 422

    # Check if a user with the given email already exists
    existing_user = User.query.filter_by(email=user.email).first()
    if existing_user is not None:
        return {'message': 'A user with this email already exists.'}, 400

    # Hash the password
    hashed_password = generate_password_hash(user.password, method='sha256')

    # Create a new user
    new_user = User(name=user.name, email=user.email, password=hashed_password)

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Return the created user
    result = user_schema.dump(User.query.get(new_user.id))
    return {"message": "User created successfully.", "user": result}, 201
