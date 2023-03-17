![https://nodejs.org/ja/blog/release/v14.18.1/](https://img.shields.io/badge/NodeJS-v14.18.1-blue.svg)
![https://www.passportjs.org/](https://img.shields.io/badge/Passport-1.0.12-blue.svg)
![https://www.passportjs.org/](https://img.shields.io/badge/Passport-1.0.12-blue.svg)

# Login API

This is a small API that can be used as a microservices in your infrastructure.
You can ask your users to request a Session Cookie on the ``/login`` route,
they can also retrieve this cookie on the ``/logout`` route. Your job after that,
is to create a middleware on your application's protected route that try to access ``/secret``
with the user's Session Cookie. If it returns a HTTP Code of ``200``, it means that the user is logged.

## NodeJS Example

Here's a small example with NodeJS, Axios and ExpressJS

```dos
npm install axios cookie-parser express
```

---
Middleware

```javascript
const AXIOS = require('axios');
const LOGIN_API_URL = 'http://localhost:9000/secret';
const SESSION_COOKIE = 'connect.sid'

const authenticationMiddleware = (req, res, next) => {
    AXIOS.get(LOGIN_API_URL,
        {
            headers: {
                Cookie: SESSION_COOKIE + '=' + req.cookies[SESSION_COOKIE] + ';'
            }
        })
        .then((_res) => {
            next()
        })
        .catch((err) => {
            res.status(err.response.status).json(err.response.data);
        });
};
```

---
Express route configuration

````javascript
const EXPRESS = require('express')
const COOKIE_PARSER = require("cookie-parser");
const PORT = 8080

APP.use(EXPRESS.json())
    .use(COOKIE_PARSER())
    .get('/secret_page', authenticationMiddleware, function (req, res) {
        res.send({message: "Wow, you acceded to my secret page ! Well done !"})
    })
    .listen(PORT, function () {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
````

# Environments Variables

| Variable       | Default   | Description                                                             |
|----------------|-----------|-------------------------------------------------------------------------|
| PORT           | 8080      | TCP Port exposed for the API                                            |
| SESSION_SECRET | secure_me | Secret Password for the session, please generate a secure random secret |
| AUTH_USERNAME  |           | User's username that can log in the API                                 |
| AUTH_PASSWORD  |           | User's password that can log in the API                                 |

# More Information

You can edit my code to check the USERNAME and his PASSWORD on another services. Just check my ``auth.ts`` file.