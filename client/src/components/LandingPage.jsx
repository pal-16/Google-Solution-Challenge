import React from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.css"

export default function LandingPage() {
    return (
        <div>
            <div className="banner">
                <div className="container">
                    <div className="banner-main">
                        <h3>We Predict Future From past Experiences.</h3>
                        <p>find out future prediction for crops before growing them. </p>
                        <Link to="/predict">Predict Now</Link>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>

            <div className="we-do" style={{ marginTop: "2em" }}>
                <h1 className="text-center text-capitalize" style={{ color: "#956295", fontFamily: 'Viga-Regular', fontSize: "2.4em", fontWeight: 400, width: "100%", margin: "0 auto", paddingBttom: "0.3em" }}> What do we do?</h1><br />
                <div className="container">
                    <div className="wedo-main">
                        <div className="col-md-4 wedo-grid">
                            <span className="glyphicon glyphicon-leaf" aria-hidden="true"> </span>
                            <h3>Agriculture Crop Produce</h3>
                            <p>For beginner farmers, we provide them a way to determine their soil type that can be used in further evaluations, using only an image of the soil.</p>
                            <br /><br />
                        </div>
                        <div className="col-md-4 wedo-grid">
                            <span className="glyphicon glyphicon-user" aria-hidden="true"> </span>
                            <h3>Analysing and Prediction</h3>
                            <p>Based on multiple parameters, a model is used to evaluate the perfect crop that you need to grow on your farm.</p>
                        </div>
                        <div className="col-md-4 wedo-grid">
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"> </span>
                            <h3>Locate </h3>
                            <p>Once you have your crop, we provide you the nearest locations where you can find your crop.</p>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>

            <div className="latest-new">
                <h1 className="text-center text-capitalize" style={{ color: "#956295", fontFamily: 'Viga-Regular', fontSize: "2.4em", fontWeight: 400, width: "100%", margin: "0 auto", paddingBottom: "0.3em" }}>
                    Proud to be Helpful!
                </h1>
                <br />
            </div>
        </div>
    )
}
