// Some informations are ereased - if you want to play with the code,
// you have to:
// 1. Register your Github app and fill the CLIENT_ID value
// 2. Set up your Gatekeeper server (https://github.com/prose/gatekeeper)
//    and fill in the GATEKEEPER_URL value (ending with 'authenticate/'
//    - the closing '/' is also important)
// 3. Fill in the REDIRECT_URI with the URL where this app is hosted

export const CLIENT_ID = ''
export const REDIRECT_URI = ''
export const GATEKEEPER_URL = ''

export const OAUTH_URL = 'https://github.com/login/oauth/authorize'
export const SCOPE = ['public_repo']