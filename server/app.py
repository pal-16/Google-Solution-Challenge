from flask import Flask, request, session, flash, redirect, url_for, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin


from Predictors import CropPredictor, SoilPredictor

import os
import logging
from werkzeug.utils import secure_filename


import cv2
import tensorflow as tf
import numpy as np


logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


app = Flask(__name__)
# CORS(app)
api = Api(app)




api.add_resource(CropPredictor, '/crop_predictor')




UPLOAD_FOLDER = ''
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def fileUpload():
    print(request)
    print(request.files)
    print(request.files['file'])

    logger.info("welcome to upload`")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination="temp.jpg"
    file.save(destination)
    session['uploadFilePath']=destination

    img = cv2.imread("temp.jpg")

    os.remove("temp.jpg")

    img = cv2.resize(img, (150, 150))

    image = []
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

    if pred_class == 'Black_Soil':
        ans = ['Black_Soil', 'Cotton', 'Wheat', 'Jowar', 'Linseed', 'Virginia Tobacco', 'Castor', 'Sunflower',
               'Millets', 'Rice(If water is available)', 'Sugercane(If water is available)']

    elif pred_class == 'Clay_Soil':
        ans = ['Clay_Soil', 'Lettuce', 'Chard', 'Snap Beans and Other Crops with Shallow Roots', 'Broccoli',
               'Brussels Sprouts', 'Cabbage']

    elif pred_class == 'Red_Soil':
        ans = ['Red_Soil', 'Cotton', 'Wheat', 'Rice', 'Pulses', 'Millets', 'Tobacco', 'Oilseeds', 'Potatoes', 'Fruits']


    elif pred_class == 'Alluvial_Soil':
        ans = ['Alluvial_Soil', 'Rice', 'Wheat', 'Sugarcane', 'Tobacco', 'Cotton', 'Jute', 'Maize', 'Oilseeds',
               'Vegetables', 'Fruits']

    return jsonify(ans), 200






if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(port=5000, debug=True)

CORS(app, expose_headers='Authorization')