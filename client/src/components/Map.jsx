import React from 'react'
import GoogleMapReact from 'google-map-react'
import './Map.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const LocationPin = ({ text }) => (
    <div className="pin">
        <LocationOnIcon fontSize="16" className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)

const Map = ({ location, zoomLevel }) => (
    <div className="map">
        <h2 className="map-h2">Come Visit Us At Our Campus</h2>

        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCbID_AwSdPafT89YHXnTNaLt9f6to8998' }}
                center={location}
                defaultZoom={zoomLevel}
            >
                <LocationPin
                    lat={location.lat}
                    lng={location.lng}
                    text={location.address}
                />
            </GoogleMapReact>
        </div>
    </div>
)

export default Map