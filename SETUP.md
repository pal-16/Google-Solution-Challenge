# Setup

## Repository structure

Our repository is structured as follows

```
.
├── server # The flask server for machine learning
├── google-actions # The express server for google actions
└── client # The UI of our website.
```

## Installation

Based on the folder that you wish to choose:
1. server
```bash
$ cd server
$ python3 -m venv .venv
$ source .venv/bin/activate
(.venv)$ pip install -r requirements.txt
```
2. google-actions
```bash
$ cd google-actions/server
$ npm i
```
3. client
```bash
$ cd client
$ npm i
```

## Starting things up

Based on the folder that you wish to choose:
1. server
```bash
(.venv)$ flask run app.py
```
Flask server will be running on port **5000**.

2. google-actions
```bash
$ npm start
```
Google Actions server will be running on port **8000**.

3. client
```bash
$ npm start
```
React development server will be running on port **3000**.

## Variables

Our project uses API Keys from Google Cloud to interact with APIs. Feel free to customize those and use a default OAuth Screen or Generate new credentials and use them.

## Got stuck?

We have tried our best to help you set this up. If you've run into some error, please let us know by creating a [new issue](https://github.com/ShubhankarKG/SolutionChallenge/issues/new).