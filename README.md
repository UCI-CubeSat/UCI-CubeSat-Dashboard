# CubeSAT Satellite Server Dashboard

## Contributor:
Katherine Hsu: kaishih@uci.edu,

Hailey Lin: weixil4@uci.edu,

Jiaen Zhang: jiaenz@uci.edu,

Yi-Ju Tsai, 

Gabrielle Palar

##

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Make sure you have `node`, `npm`, `git`, `brew`[maxOS/Linux] or `chocolatey`[Windows] installed

## MAP API dependency

Map-related features of this project is entirely dependent on Mapbox's API.

Since our GitHub repo is public, API tokens are hidden in a `.env` file and stored locally to prevent accidental billing charges

Create .env file 
   1. Create a new file under the UCI-CubeSat-Dashboard root folder, named `.env`
   2. Get an API token after signing up for [Mapbox](https://www.mapbox.com).
   3. Inside .env file, type 
      - `REACT_APP_MAPBOX_TOKEN=<Default_Public_Token>`
      - `REACT_APP_SERVER_URL=http://127.0.0.1:5000`


## Installing prerequisite

Double check `node` is installed

[Homebrew installation for macOS](https://brew.sh/)

    `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

    `brew install git`

    `brew install node`

[Chocolatey installation for Windows](https://chocolatey.org/install)

    `Run Powershell as Admin`

    `Set-ExecutionPolicy AllSigned`

    `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`

    verify `chocolatey` is installed: `choco -?`

    `choco install git`

    `choco install nodejs.install`

## Run React App

1. Clone Repository and cd to folder

`git clone https://github.com/UCI-CubeSat/UCI-Cubesat-Dashboard/`

`cd UCI-Cubesat-Dashboard`

2. Npm install: `npm install`

3. Run Frontend Server:
   1. run as dev environment [test]: `npm start`
   2. run as prod environment [confirm]: `npm run build`, `serve -s build`

## Run FullStack Web App
1. cd to UCI-CubeSat-Server: 
   
   create [venv environment](https://github.com/UCI-CubeSat/UCI-CubeSat-Server#setting-up-the-pythonflask-backend-server-locally) 
   
   `flask run`
2. cd to UCI-CubeSat-Dashboard: 
     
   `npm start`


## Deployment to Heroku

Deploying to Heroku require significant configuration

The client and server must be deploy to different dyno/app

Example: [Front End](https://uci-cubesat-dashboard.herokuapp.com/), [Back End](https://uci-cubesat-server.herokuapp.com/)

For React NodeJS client, Heroku require you to have:

Both `package.json` and `package-lock.json` at project's root directory

Adding `NodeJS` and `https://github.com/mars/create-react-app-buildpack.git` build pack

