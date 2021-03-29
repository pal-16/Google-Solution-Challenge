import React from 'react'
import "./LandingPage.css"

export default function Footer() {
    return (
        <div class="footer">

            <div class="container">
                <div class="footer-main">
                    <div class="col-md-4 ftr-grd">
                        <h3>Get in Touch</h3>
                        <p>Veermata Jijabai Technological Institute</p>
                        <p>Matunga, India</p>
                        <p>Phone: +91 9763196167</p>
                    </div>
                    <div class="col-md-4 ftr-grd">
                        <h3>Get Social</h3>
                        <ul>
                            <li><a target="_blank" href="http://facebook.com/ashispatel0720"><span class="fa"> </span></a></li>
                            <li><a target="_blank" href="http://twitter.com/ashispatel0720"><span class="tw"> </span></a></li>
                            <li><a target="_blank" href="http://linkedin.com/ashispatel0720"><span class="in"> </span></a></li>
                        </ul>
                    </div>
                    <div class="col-md-4 ftr-grd">
                        <h3>Contact Us</h3>
                        <p>If you have any query or question, please <a href="//ashish.live/contact" target="_blank">Contact</a></p>
                    </div>
                    <div class="clearfix"> </div>
                </div>
            </div>
        </div>
    )
}
