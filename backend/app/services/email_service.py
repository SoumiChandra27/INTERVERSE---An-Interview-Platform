import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
EMAIL_ADDRESS = "interverse.interview@gmail.com"
EMAIL_PASSWORD = "pxwb qmdh htgs hpzv"
def send_reset_email(
    receiver_email,
    reset_link
):
    subject = "INTERVRSE Password Reset"
    body = f"""
Hello,
Click the link below to reset your password:
{reset_link}
If you did not request this,
please ignore this email.
INTERVRSE Team
"""
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = receiver_email
    msg["Subject"] = subject
    msg.attach(
        MIMEText(body, "plain")
    )
    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )
    server.starttls()
    server.login(
        EMAIL_ADDRESS,
        EMAIL_PASSWORD
    )
    server.sendmail(
        EMAIL_ADDRESS,
        receiver_email,
        msg.as_string()
    )
    server.quit()