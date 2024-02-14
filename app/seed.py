from app import create_app
from models import db, User, StudentDetails, ParentGuardian, EducationFundingHistory, Siblings, Bursary, Beneficiary, DeclarationDocuments
from datetime import datetime
import uuid

app = create_app()

with app.app_context():

    def seed_data():
        # Create a new user
        new_user = User(
            id=uuid.uuid4(),
            name='John Doe',
            email='john2@example.com',
            phone='1234567890',
            role='applicant',
            id_no=1234567890
        )

        # Add the new user to the database
        db.session.add(new_user)
        
        # Commit the user creation first to get the user ID
        db.session.commit()

        # Create new student details
        new_student_details = StudentDetails(
            id=uuid.uuid4(),
            user_id=new_user.id,
            firstname='John',
            lastname='Doe',
            contact_phone_number='1234567890',
            photo_url='',
            gender='male',
            dob=datetime.strptime('2000-01-01', '%Y-%m-%d').date(),
            place_of_birth='Nairobi',
            village='Nairobi',
            ward='Nairobi',
            constituency='Nairobi',
            institution_name='University of Nairobi',
            institution_code='UON',
            campus='Main Campus',
            level='Undergraduate',
            course='Computer Science',
            mode_of_study='Full-time',
            expected_completion_year=datetime.strptime('2024-12-31', '%Y-%m-%d').date()
        )

        # Add the new student details to the database
        db.session.add(new_student_details)
        
        # Commit the student details
        db.session.commit()

        # Create new parent/guardian details
        new_parent_guardian = ParentGuardian(
            id=uuid.uuid4(),
            student_id=new_student_details.id,
            parent='Jane Doe',
            first_name='Jane',
            last_name='Doe',
            status='Alive',
            occupation='Engineer',
            main_income_source='Job',
            other_income_source='Investments',
            employed='yes'
        )

        # Add the new parent/guardian details to the database
        db.session.add(new_parent_guardian)
        db.session.commit()

        # Create new education funding history
        new_education_funding_history = EducationFundingHistory(
            id=uuid.uuid4(),
            student_id=new_student_details.id,
            institution_type='High School',
            institution_name='Nairobi High School',
            start_date=datetime.strptime('2016-01-01', '%Y-%m-%d').date(),
            end_date=datetime.strptime('2019-12-31', '%Y-%m-%d').date(),
            funding_source='Parents',
            details='Funded by parents'
        )

        # Add the new education funding history to the database
        db.session.add(new_education_funding_history)
        db.session.commit()

        # Create new sibling details
        new_sibling = Siblings(
            id=uuid.uuid4(),
            name='James Doe',
            student_id=new_student_details.id,
            relationship='Brother',
            institution='University of Nairobi',
            level='Undergraduate',
            total_annual_fees=50000,
            paid=50000
        )

        # Add the new sibling details to the database
        db.session.add(new_sibling)
        db.session.commit()

        # Create new bursary
        new_bursary = Bursary(
            id=uuid.uuid4(),
            title='Bursary 1',
            description='This is a bursary.',
            fund_amount=100000,
            contact_person='John Doe',
            photo_url=''
        )

        # Add the new bursary to the database
        db.session.add(new_bursary)
        db.session.commit()

        # Create new beneficiary
        new_beneficiary = Beneficiary(
            id=uuid.uuid4(),
            student_id=new_student_details.id,
            bursary_id=new_bursary.id,
            amount_allocated=50000,
            date_allocated=datetime.strptime('2023-01-01', '%Y-%m-%d').date(),
            disbursed=True,
            date_disbursed=datetime.strptime('2023-01-02', '%Y-%m-%d').date()
        )

        # Add the new beneficiary to the database
        db.session.add(new_beneficiary)
        db.session.commit()

        # Create new declaration documents
        new_declaration_documents = DeclarationDocuments(
            id=uuid.uuid4(),
            student_id=new_student_details.id,
            individual_declaration='I declare that the information provided is true.',
            parent_declaration='I declare that the information provided is true.',
            religious_leader_declaration='I declare that the information provided is true.',
            local_authority_declaration='I declare that the information provided is true.'
        )

        # Add the new declaration documents to the database
        db.session.add(new_declaration_documents)
        db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        seed_data()
