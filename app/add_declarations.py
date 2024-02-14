from flask import Blueprint, request
from models import db
from models import DeclarationDocuments
from serializers import DeclarationDocumentsSchema

add_declarations = Blueprint('add_declarations', __name__)

declaration_documents_schema = DeclarationDocumentsSchema()

@add_declarations.route('/add_declarations', methods=['POST'])
def add_declarations_functions():
    # Parse the incoming request data
    data = request.get_json()

    # Validate and deserialize the input data
    declaration_documents, errors = declaration_documents_schema.load(data)
    if errors:
        return errors, 422

    # Check if a declaration with the given students_id already exists
    existing_declaration = DeclarationDocuments.query.filter_by(students_id=declaration_documents.students_id).first()
    if existing_declaration is not None:
        return {'message': 'A declaration with this students_id already exists.'}, 400

    # Add the new declaration details to the database
    db.session.add(declaration_documents)
    db.session.commit()

    # Return the created declaration details
    result = declaration_documents_schema.dump(DeclarationDocuments.query.get(declaration_documents.id))
    return {"message": "Declaration added successfully.", "declaration": result}, 201
