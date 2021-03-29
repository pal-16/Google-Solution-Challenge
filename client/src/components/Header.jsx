import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <div className="header">
                <div className="container">
                    <div className="header-main">
                        <div className="head-left">
                            <div className="phone">
                                <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/ShubhankarKG/SolutionChallenge2k21" style={{ color: "#956295" }}><i className="fa fa-github fa-2x"></i></a></p>
                            </div>
                            <div className="phone">
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                        <div className="header-right">
                            <div className="logo">
                                <h1><Link to="/">Kisan&nbsp;Mitra</Link></h1>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="top-navg-main">
                <div className="container">
                    <div className="top-navg">
                        <span className="menu"> <img src="https://kisanmitra.herokuapp.com/images/icon.png" alt="" /></span>
                        <ul className="res">
                            <li><Link to="/" className="active hvr-sweep-to-bottom">Home</Link></li>
                            <li><Link to="/predict" className="active hvr-sweep-to-bottom">Predict</Link></li>
                            <li><Link className="hvr-sweep-to-bottom" to="/about">About Kisanmitra</Link></li>
                            <li><Link className="hvr-sweep-to-bottom" to="/discuss">Feedback</Link></li>
                            <li><Link className="hvr-sweep-to-bottom" to="/team">Team</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
