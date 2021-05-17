from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods=['POST'])
@cross_origin()
def home():
    data = request.json
    print(data)
    return "OK"

app.run()
