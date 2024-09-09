import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from cryptography.fernet import Fernet
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


load_dotenv()

app = Flask(__name__)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


app.config['JWT_SECRET_KEY'] =os.getenv('JWT_SECRET_KEY')
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.config['MYSQL_CURSORCLASS'] = os.getenv('MYSQL_CURSORCLASS')

mysql = MySQL(app)

ENCRYPTION_KEY = os.getenv('ENCRYPTION_KEY')
cipher_suite = Fernet(ENCRYPTION_KEY)