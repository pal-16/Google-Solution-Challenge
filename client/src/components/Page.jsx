import React from 'react';
import { Helmet } from "react-helmet";

export default function Page({ title, content, children }) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={content} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={content} />
            </Helmet>
            { children}
        </>
    )
}
