from flask import Flask, request
from flask_restful import Resource, Api



from Predictors import CropPredictor, SoilPredictor






app = Flask(__name__)

api = Api(app)





api.add_resource(CropPredictor, '/crop_predictor')
api.add_resource(SoilPredictor, '/soil_predictor')




if __name__ == "__main__":
    app.run(port=5000, debug=True)