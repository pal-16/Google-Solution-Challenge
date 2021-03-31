import { CircularProgress, Container } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Map from './Map'
import XMLParser from "react-xml-parser";

export default function Chatbot() {
    const [userLocation, setUserLocation] = useState({
        lat: "",
        lng: "",
        address: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [counter, setCounter] = useState(1);

    const BASE_URL = "https://a1763397adee.ngrok.io/";

    const crop = useParams().crop;

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
        if (!!crop && !!userLocation) {
            const body = {
                location: {
                    lat: userLocation.lat,
                    lng: userLocation.lng
                }
            }
            setIsLoading(true);
            axios.post(`https://4575b1dcf873.ngrok.io/map/${crop}`,
                body
            ).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => setIsLoading(false));
        }
    }, [crop, userLocation])

    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
    }
    return isLoading ? (<Container maxWidth="sm"><CircularProgress size="500px" /></Container>) : (
        <Container maxWidth="sm">
            {
                counter === 0 && <>
                    <iframe
                        allow="microphone;"
                        width="550"
                        height="530"
                        src="https://console.dialogflow.com/api-client/demo/embedded/b2a9a183-d33c-4be3-ae44-f4c69d484d14">
                    </iframe>
                    <df-messenger
                        intent="WELCOME"
                        chat-title="Locate Crop Centres"
                        agent-id="b2a9a183-d33c-4be3-ae44-f4c69d484d14"
                        language-code="en"
                    /></>
            }
            {counter === 1 && <Map location={userLocation} zoomLevel={17} />}
        </Container>
    )
}
