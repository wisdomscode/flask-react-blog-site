from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import datetime

# authentication
# create_access_token() to make JSON Web Tokens,
from flask_jwt_extended import create_access_token, create_refresh_token
# get_jwt_identity() to get the identity of a JWT in a protected route
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required  # jwt_required() to protect routes,
from flask_jwt_extended import JWTManager

import uuid


# create the extension
db = SQLAlchemy()

# create the app
app = Flask(__name__)
CORS(app)

# Setup the Flask-JWT-Extended extension
SECRET_KEY = uuid.uuid4().hex
app.config['JWT_SECRET_KEY'] = SECRET_KEY
jwt = JWTManager(app)


# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# initialize the app with the extension
db.init_app(app)
ma = Marshmallow(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.datetime.now)


# schema objects
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'password', 'name', 'date_created')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    author = db.Column(db.String(50))
    date_posted = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body, author):
        self.title = title
        self.body = body
        self.author = author


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'author', 'date_posted')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


with app.app_context():
    db.create_all()


# auth routes

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    user_pass = request.json.get('password', None)

    user = User.query.filter_by(email=email, password=user_pass).first()

    if user is None:
        return jsonify({'message': "Invalid credentials"})

    logged_user = User.query.get(user.id)
    result = user_schema.dump(logged_user)

    new_access_token = create_access_token(identity=email)
    new_refresh_token = create_refresh_token(identity=email)

    return jsonify(user=result, access_token=new_access_token, refresh_token=new_refresh_token)


@app.route('/api/refresh')
@jwt_required(refresh=True)
def refresh(self):

    current_user = get_jwt_identity()

    new_access_token = create_access_token(identity=current_user)

    return make_response(jsonify({"access_token": new_access_token}), 200)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected_page():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/api/users')
def users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    # return jsonify({"mesage":"works"})
    return jsonify(result)


@app.route('/api/users/<id>')
def user_detail(id):
    user = User.query.get(id)
    result = user_schema.dump(user)
    return jsonify(result)


@app.route('/api/register', methods=['POST'])
def user_create():

    email = request.json['email']
    password = request.json['password']
    name = request.json['name']

    user = User.query.filter_by(email=email).first()

    if user is None:
        new_user = User(email=email, password=password, name=name)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"})
    return jsonify({'message': "Email already taken"})


@app.route('/api/articles')
def get_articles():
    all_articles = Article.query.all()
    result = articles_schema.dump(all_articles)
    return jsonify(result)


@app.route('/api/article/<id>')
def article_detail(id):
    article = Article.query.get(id)
    result = article_schema.dump(article)
    return jsonify(result)


@app.route('/api/article/create', methods=['POST'])
def create_article():
    title = request.json['title']
    body = request.json['body']
    author = request.json['author']

    new_article = Article(title=title, body=body, author=author)
    db.session.add(new_article)
    db.session.commit()
    return jsonify({"message": "Article created successfully"})


@app.route('/api/article/update/<id>', methods=['PUT'])
def article_update(id):
    article = Article.query.get(id)
    title = request.json['title']
    body = request.json['body']
    author = request.json['author']

    article.title = title
    article.body = body
    article.author = author

    result = article_schema.dump(article)

    db.session.commit()
    return jsonify(article=result, message='Article Updated successfully')


@app.route('/api/article/delete/<id>', methods=['DELETE'])
def delete_article(id):
    article = Article.query.get(id)

    db.session.delete(article)
    db.session.commit()
    return jsonify({'message': 'Article Delete successfully'})


if __name__ == "__main__":
    app.run(debug=True)
