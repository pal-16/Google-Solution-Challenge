import { Container } from '@material-ui/core'
import React from 'react'
import Page from './Page'

function Chatbot() {
    return (
        <Container maxWidth="sm">
            <iframe
                allow="microphone;"
                width="550"
                height="530"
                title="Predict your crop"
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

const ChatbotPage = () => <Page title="Find crop" content="Use our chatbot to find the perfect crop for your soil"><Chatbot /></Page>

export default ChatbotPage;