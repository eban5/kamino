// Adapted from https://medium.com/cleverprogrammer/spotify-clone-using-reactjs-the-ultimate-guide-2a47977a1e4f

// The authEndpoint is the URL where we need to authenticate using Spotify. All Spotify Authentication requests must be passed through this URL.
export const authEndpoint = 'https://accounts.spotify.com/authorize';

// The redirectUri is the one which we gave in the Spotify Web API settings, this states where to take back the user if the Spotify login was successful.
const redirectUri =
  process.env.NODE_ENV === 'production'
    ? 'https://kamino.netlify.app/'
    : 'http://localhost:3000/';

// The clientId is the Client ID provided to you by the Spotify Web API
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

// scopes are basically permissions which you need to ask Spotify for. More such permissions are available on Spotify API Documentation.
const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-library-read',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
];

// extract the Access Token from the URL once we get it from Spotify after successful login.
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial: any, item: string) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

// The loginUrl is the final URL which needs to be called in order to authorize an user for our Spotify Clone app. This URL contains the Client ID and all the permissions so that Spotify knows about our app and allows user authentication.
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;
