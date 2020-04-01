<img height="100" align="right" src="./reddit.png">

# Reddit Auth

We use Reddit's Oauth flow to get a user `access_token`, to then check against their `/api/v1/me` endpoint, to confirm ownership of a user account. This user account is then stored in our db, and a cookie is returned with a JWT encoding basic info about their account (reddit name, icon, and our id for them).

## Steps

1. Navigate user to `/api/login`.
2. Redirect user to `https://www.reddit.com/api/v1/authorize` to get a code to our redirect uri.
3. Reddit redirects to our redirect uri `/api/oauth/redirect/reddit`.
4. Request an `access_token` from `https://www.reddit.com/api/v1/access_token` with the code received.
5. Use `access_token` to get result of `https://oauth.reddit.com/api/v1/me`.
6. Create update/our user as necessary.
7. Add cookie with JWT signed with a secret to the response.
8. Redirect user to `/`.

<img height="100" align="right" src="./discord.png">

# Discord Auth

## Steps

1.

<img height="100" align="right" src="./twitter.png">

# Twitter Auth

## Steps

1.