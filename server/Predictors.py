from flask_restful import Resource, reqparse

import joblib
import base64

import tensorflow as tf
import numpy as np
import cv2
import os

class CropPredictor(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('N',
                        type=float,
                        required=True,
                        help="This field cannot be left blank.")

    parser.add_argument('P',
                        type=float,
                        required=True,
                        help="This field cannot be left blank.")

    parser.add_argument('K',
                        type=float,
                        required=True,
                        help="This field cannot be left blank.")

    parser.add_argument('temperature',
                        type=float,
                        required=True,
                        help="This field cannot be left blank.")

    parser.add_argument('humidity',
                        type=float,
                        required=True,
                        help="This field cannot be left blank.")

    parser.add_argument('ph',
                        type=float,
                        required=True,
                        help="This field cannot be left blank.")

    parser.add_argument('rainfall',
                        type=float,
                        required=True,
                        help="This field cannot be left blank.")



    def post(self):
        data= CropPredictor.parser.parse_args()

        loaded_rf = joblib.load("./crop_recomendation_model.joblib")
        X = [[data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]]

        ans= loaded_rf.predict(X)

        return ans[0], 201






class SoilPredictor(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('SoilImage',
                        type=str,
                        required=True,
                        help="This field cannot be left blank.")

    def post(self):
        data= SoilPredictor.parser.parse_args()


        soil=base64.b64decode(data["SoilImage"])
   
        filename = 'temp.jpg'
        with open(filename, 'wb') as f:
            f.write(soil)


        img = cv2.imread("temp.jpg")

        os.remove("temp.jpg")

        img = cv2.resize(img, (150, 150))

        image=[]
        image.append(img)
        model = tf.keras.models.load_model("soil_prediction_model.hdf5")

        labels = {0: 'Alluvial_Soil', 1: 'Black_Soil', 2: 'Clay_Soil', 3: 'Red_Soil'}

        pred_images = np.array(image)
        pred_images.shape
        pred_image = np.array([pred_images[0]])
        pred_class = labels[(model.predict_classes(pred_image)[0])]

        pred_prob = model.predict(pred_image).reshape(6)


        print(pred_class)
        print(pred_prob)

        return pred_class,201