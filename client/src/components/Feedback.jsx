import { Container } from '@material-ui/core'
import React from 'react'

export default function Feedback() {
    return (
        <Container maxWidth="sm">
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScYHhUt23RZsoY7EVqALplV39u1YCHf09cIFpa1_psd5XTtjg/viewform?embedded=true"
                width="640"
                height="1958"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
            >
                Loading…
            </iframe>
        </Container>
    )
}
