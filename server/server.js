const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

const credentials = {
  redirectUri: 'http://localhost:3000',
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
};

const payload = credentials.clientId + ':' + credentials.clientSecret;
const encodedPayload = new Buffer.from(payload).toString('base64');

const authheaders = (req, res, next) => {
  // let authheader= req.headers.authorization;
  res.setHeader('Authorization', 'Basic ' + encodedPayload);
};

app.use(cors());
app.use(authheaders);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  ---------------------------------------

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi(credentials, refreshToken);

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post('/login', (req, res) => {
  console.log("LOGIN CALLED SERVER")
  const code = req.body.code;
  console.log('LOGIN POST', code);
  const spotifyApi = new SpotifyWebApi(credentials);

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log("data", data)
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(3001);
