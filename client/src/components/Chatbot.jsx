import { Container } from '@material-ui/core'
import React from 'react'

export default function Chatbot(props) {
    return (
        <Container maxWidth="sm">
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
            />
        </Container>
    )
}
