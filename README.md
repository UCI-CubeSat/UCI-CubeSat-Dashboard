# CubeSAT Satellite Server Dashboard

Contributor:

Hailey Lin: weixil4@uci.edu,

Jiaen Zhang: jiaenz@uci.edu,

Yi-Ju Tsai, Gabrielle Palar

##

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Make sure you have `git`, `brew` or `chocolatey`, `node`, `npm` installed

## API dependency

Map feature of this project is entirely dependent on Google, Bing and Mapbox map's API

Since our GitHub repo is public, API tokens are hidden in a `.env` file and stored locally to prevent accidental billing charges


Create a hidden .env file: `touch .env`

Open .env file: `open .env`

Add secret token: `REACT_APP_<KEY_NAME>=<KEY_VALUE>`

### `Google Map` [https://developers.google.com/maps/documentation/javascript](https://developers.google.com/maps/documentation/javascript)

[Getting a Google Map API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

### `Mapbox` [https://docs.mapbox.com/api/overview/](https://docs.mapbox.com/api/overview/)

[https://docs.mapbox.com/help/getting-started/access-tokens/](https://docs.mapbox.com/help/getting-started/access-tokens/)

To use the maps from [mapbox](https://www.mapbox.com/),
you need an appropriate token.
You can create one on their website by registering there.
Registration is free and all relevant things are covered for development purposes.

## Installing prerequisite

[Homebrew installation for macOS](https://brew.sh/)

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

`brew install git`

`brew install node@14`

`brew install npm`

[Chocolatey installation for Windows](https://chocolatey.org/install)

`Run Powershell as Admin`

`Set-ExecutionPolicy AllSigned`

`Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`

verify `chocolatey` is installed: `choco -?`

`choco install git`

`choco install nodejs.install`

`choco install python --version=3.10.2`

## Run React App

`git clone https://github.com/UCI-CubeSat/UCI-Cubesat-Dashboard/`

`cd UCI-Cubesat-Dashboard`

`npm install`

### Run as dev environment

`npm start`

### Run as prod environment

`npm run build`

`serve -s build`

### CRLF vs LF error on `npm start` or `npm run build`

An eslint fix command should fix any `CRLF` vs `LF` error

See [Linebreak Style](https://eslint.org/docs/rules/linebreak-style) for more details

## Deployment to Heroku

Deploying to Heroku require significant configuration

The client and server must be deploy to different dyno/app

Example: [Front End](https://uci-cubesat-dashboard.herokuapp.com/), [Back End](https://uci-cubesat-server.herokuapp.com/)

For React NodeJS client, Heroku require you to have:

Both `package.json` and `package-lock.json` at project's root directory

Adding `NodeJS` and `https://github.com/mars/create-react-app-buildpack.git` build pack

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

The basic of React file structure: [React documentation](https://www.cluemediator.com/create-react-application-multiple-components)

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
