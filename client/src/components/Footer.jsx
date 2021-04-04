import React from 'react'
import "./LandingPage.css"

export default function Footer() {
    return (
        <div className="footer">

            <div className="container">
                <div className="footer-main">
                    <div className="col-md-4 ftr-grd">
                        <h3>Get in Touch</h3>
                        <p>Veermata Jijabai Technological Institute</p>
                        <p>Matunga, India</p>
                        <p>Phone: +91 9763196167</p>
                    </div>
                    <div className="col-md-4 ftr-grd">
                    </div>
                    <div className="col-md-4 ftr-grd">
                        <h3>Contact Us</h3>
                        <p>If you have any query or question, please <a href="mailto:shubhankar.gupto.11@gmail.com" target="_blank" rel="noreferrer noopener">Contact</a></p>
                    </div>
                    <div className="clearfix"> </div>
                </div>
            </div>
        </div>
    )
}
