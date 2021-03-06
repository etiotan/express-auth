

## Goal

Building from scratch, integrating craigslist/kijiji type web application. Following as many conventions as possible.

## Functionality

1. Users are able to register accounts
2. Sessions created by login/signups determine which views will be rendered
3. Users are able to list items, and each item have their own page in a unique url
4. A good and better Ui than craigslist styled mostly with MaterializeCSS and SASS (comingsoon)

## Tools
    "bcryptjs": "^2.4.3",
    "bluebird": "^3.5.0",
    "body-parser": "~1.17.1",
    "client-sessions": "^0.8.0",
    "cookie-parser": "~1.4.3",
    "csurf": "^1.9.0",
    "debug": "~2.6.3",
    "express": "~4.15.2",
    "morgan": "~1.8.1",
    "pug": "~2.0.0-beta11",
    "serve-favicon": "~2.4.2",
    "shortid": "^2.2.8"

## Usage

    git clone https://github.com/etiotan/express-auth.git

    cd express-auth && npm install

    open another terminal and run mongod

    npm start
