'use client'
import {Button} from "@mui/material";
import crypto from 'crypto';
import * as querystring from "querystring";
import {useEffect, useState} from "react";

export default function LoginButton() {
    const [authorizationUrl, setAuthorizationUrl] = useState<string>('')

    useEffect(() => {
        const authorizationBaseUrl = process.env.NEXT_PUBLIC_OIDC_AUTHORIZE_URL
        //  query params
        const clientId = process.env.NEXT_PUBLIC_OIDC_CLIENT_ID
        const redirectUri = process.env.NEXT_PUBLIC_OIDC_REDIRECT_URL
        const scope = process.env.NEXT_PUBLIC_OIDC_SCOPE ?? "openid profile email"
        //  generate random nonce and state
        const nonce = crypto.randomBytes(16).toString('hex')

        const queryData = {
            "client_id": clientId,
            "redirect_uri": redirectUri,
            "response_type": "code",
            "response_mode": "form_post",
            "scope": scope,
            "nonce": nonce,
        }

        //  make query string
        const searchParams = querystring.stringify(queryData);
        //  make url
        setAuthorizationUrl(`${authorizationBaseUrl}?${searchParams}`)
    }, [])

    //  display name
    const buttonDisplayName = process.env.NEXT_PUBLIC_OIDC_DISPLAY_NAME ?? "Login"

    return (
        <Button
            variant="contained"
            color="primary"
            href={authorizationUrl}
        >
            {buttonDisplayName}
        </Button>
    );
}
