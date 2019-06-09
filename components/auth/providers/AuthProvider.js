import {AuthSession} from "expo";

const REDIRECT_URL = AuthSession.getRedirectUrl();

function authUrlWithId(provider) {
    return (
        provider.baseUrl +
        `authorize` +
        `?client_id=${provider.id}` +
        `&scope=${encodeURIComponent(provider.scopes.join(' '))}`
    );
}

async function createTokenWithCode(provider, code) {
    const url =
        provider.baseUrl +
        `access_token` +
        `?client_id=${provider.id}` +
        `&client_secret=${provider.secret}` +
        `&code=${code}`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}

export async function getTokenAsync(provider) {
    try {
        const {type, params} = await AuthSession.startAsync({
            authUrl: authUrlWithId(provider.id, provider.scopes),
        });
        console.log('getGithubTokenAsync: A: ', {type, params});
        if (type !== 'success') {
            // type === 'cancel' = if you cancel out of the modal
            // type === 'error' = if you click "no" on the redirect page
            return null;
        }
        // this is different to `type === 'error'`
        if (params.error) {
            const {error, error_description, error_uri} = params;
            /*
              If you didn't set the URI to match `REDIRECT_URL` in `https://github.com/settings/applications/...`
              error: "redirect_uri_mismatch",
              error_description: "The redirect_uri MUST match the registered callback URL for this application.",
            */
            if (error === 'redirect_uri_mismatch') {
                console.warn(
                    `Please set the "Authorization callback URL" in your Github application settings to ${REDIRECT_URL}`
                );
            }
            throw new Error(`Github Auth: ${error} ${error_description}`);
        }

        const {token_type, scope, access_token} = await createTokenWithCode(provider, params.code);
        // { token_type, scope, access_token }
        console.log('getGithubTokenAsync: B: ', {
            token_type,
            scope,
            access_token,
        });
        return access_token;
    } catch ({message}) {
        throw new Error(`Github Auth: ${message}`);
    }
}