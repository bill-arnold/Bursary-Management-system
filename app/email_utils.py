#from flask import current_app
#from flask_mail import Message
#from flask_mail import Mail

#def send_bursary_awarded_email(student):
    #subject = "Bursary Awarded"
    #recipients = [student.email]  
    #sender = current_app.config['MAIL_USERNAME']  

    #message = "Congratulations! You have been awarded a bursary."

    #msg = Message(subject, sender=sender, recipients=recipients)
    #msg.body = message

    #mail = Mail(current_app)
    #mail.send(msg)

#def send_bursary_rejected_email(student):
    #subject = "Bursary Rejected"
    #recipients = [student.email]  
    #sender = current_app.config['MAIL_USERNAME']  

    #message = "We regret to inform you that your bursary application has been rejected."

    #msg = Message(subject, sender=sender, recipients=recipients)
    #msg.body = message

    #mail = Mail(current_app)
    #mail.send(msg)

#def send_student_approved_email(student):
    #subject = "Student Approved"
    #recipients = [student.email]  
    #sender = current_app.config['MAIL_USERNAME']  

    #message = "Congratulations! You have been approved as a student."

    #msg = Message(subject, sender=sender, recipients=recipients)
    #msg.body = message

    #mail = Mail(current_app)
    #mail.send(msg)

#def send_score_awarded_email(student, score):
    #subject = "Score Awarded"
    #recipients = [student.email]  
    #sender = current_app.config['MAIL_USERNAME']  

    #message = f"Congratulations! You have been awarded a score of {score}."

    #msg = Message(subject, sender=sender, recipients=recipients)
   # msg.body = message

   # mail = Mail(current_app)
   # mail.send(msg)
