import React, { useEffect, useRef, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import './Map.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useLocation } from 'react-router';
import axios from "axios";
import Page from './Page';

const LocationPin = ({ text }) => (
    <div className="pin">
        <LocationOnIcon fontSize="16" className="pin-icon" />
        <p className="pin-text">{text || ""}</p>
    </div>
)

const Map = () => {

    const [userLocation, setUserLocation] = useState({
        lat: "",
        lng: "",
        address: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState([]);

    const stuff = useLocation().search;
    const crop = new URLSearchParams(stuff).get('crop');
    const location = new URLSearchParams(stuff).get('location');

    const zoomLevel = useRef(14);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    address: "You"
                });
                setIsLoading(false);
            }, (positionErr) => {
                setError(positionErr.message);
                setIsLoading(false);
            });
        }
    }, [])

    useEffect(() => {

        console.log(crop, location);
        if (!!crop && !!location) {

            const body = {
                location,
                crop
            }
            setIsLoading(true);
            axios.post(`https://kisaan-mitra.herokuapp.com/map/${crop}/${location}`,
                body
            ).then(res => {
                console.log(res.data);
                setLocations(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => setIsLoading(false));
        }
    }, [crop, userLocation, location])


    return <div className="map">
        <h2 className="map-h2">Crop Centres near <b>You</b></h2>

        {!isLoading && <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCbID_AwSdPafT89YHXnTNaLt9f6to8998' }}
                center={userLocation}
                defaultZoom={zoomLevel.current}
            >
                <LocationPin
                    lat={userLocation.lat}
                    lng={userLocation.lng}
                    text="You"
                />
                {console.log(locations[2])}
                {
                    locations.map((i, idx) => {
                        return <LocationPin key={idx} lat={i.lat} lng={i.lng} />
                    })
                }
            </GoogleMapReact>
        </div>
        }
    </div>
}

const MapPage = () => <Page title="Locate centres" content="Find your nearest crop centres now"><Map /></Page>

export default MapPage;