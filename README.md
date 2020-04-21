<img height="150" align="right" src="./docs/NewHorizonsLogo.png">

# Nook App

- App
  - https://github.com/maael/nook
  - https://nook.services

## Features

- :rose: Track your flower colours + cross breeding chart
- :fish: Track fish you've caught
- :bug: Track bugs you've caught
- :art: Show off and find custom designs
- :calendar: A daily checklist
- :volcano: Track fossils you've found
- :memo: Track what DIY recipes you've found
- :guitar: Track what K.K Slider Songs you've got
- :money_with_wings: Find items and easily see their sell price

## Docs

- [Auth](./docs/AUTH.md)
- [Database](./docs/DATABASE.md)

## Install

```sh
git@github.com:maael/nook.git
cd nook
yarn
```

I used `node@10.17.0` to develop it.

## NPM Scripts

| Script           | Description                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `dev`            | Starts the local development server on `http://localhost:3000`, or whatever `PORT` is specified in env. |
| `build`          | Builds server.                                                                                          |
| `start`          | Started built server.                                                                                   |
| `lint`           | Runs [tslint](https://www.npmjs.com/package/tslint) against project.                                    |
| `prettier`       | Runs [prettier](https://www.npmjs.com/package/prettier) against project, writing corrections.           |
| `prettier:check` | Runs [prettier](https://www.npmjs.com/package/prettier) against project, used by CI to check project.   |
| `test`           | ⚠️ TODO ⚠️                                                                                              |

## Config

| Environment Variable  | Description                 |
| --------------------- | --------------------------- |
| `REDDIT_OAUTH_ID`     | OAuth ID for Reddit app     |
| `REDDIT_OAUTH_SECRET` | OAuth Secret for Reddit app |
| `JWT_SECRET`          | Secret to sign JWT with     |

## API Endpoints

| URL                          | What                                         |
| ---------------------------- | -------------------------------------------- |
| `/api/login`                 | Redirects to Reddit to start OAuth flow      |
| `/api/oauth/redirect/reddit` | Reddit redirects here to continue OAuth flow |

## Contributing

- Make sure `prettier` has been run, it should do it as a pre-commit hook thanks to `husky` and `pretty-quick`.

Also fair warning, I made this quick, so while it is Typescript, it's super loose with anys all over the place.

## Todo

- [ ] The rest of the owl.
