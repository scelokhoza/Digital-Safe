import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from flask_cors import CORS
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

CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (email, password_hash) VALUES (%s, %s)", (email, hashed_password))
    mysql.connection.commit()
    cur.close()

    return jsonify(message="User registered successfully"), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cur.fetchone()
    cur.close()

    if user and bcrypt.check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity=user['id'])
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(message="Invalid credentials"), 401

@app.route('/api/items', methods=['GET', 'POST'])
@jwt_required()
def manage_items():
    user_id = get_jwt_identity()

    if request.method == 'POST':
        # Add a new key/password
        data = request.get_json()
        item_type = data['type']  # 'key' or 'password'
        app_name = data['app_name']
        value = data['value']

        # Encrypt the value
        encrypted_value = cipher_suite.encrypt(value.encode()).decode('utf-8')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO data_store (user_id, type, app_name, encrypted_value) VALUES (%s, %s, %s, %s)",
                    (user_id, item_type, app_name, encrypted_value))
        mysql.connection.commit()
        cur.close()

        return jsonify(message="Item added successfully"), 201

    else:
        # Fetch all keys/passwords
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM data_store WHERE user_id = %s", (user_id,))
        items = cur.fetchall()
        cur.close()

        # Decrypt the values before sending to the client
        for item in items:
            item['encrypted_value'] = cipher_suite.decrypt(item['encrypted_value'].encode()).decode('utf-8')

        return jsonify(items=items), 200

if __name__ == '__main__':
    app.run(debug=True)


#mysql -u root -p < setup.sql