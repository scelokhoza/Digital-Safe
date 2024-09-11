CREATE DATABASE safe_db;

USE safe_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE data_store(

    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('key', 'password'),
    app_name VARCHAR(255) NOT NULL,
    encrypted_value TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


