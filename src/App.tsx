import { useEffect, useState } from 'react';

import './App.css';
import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();


function App() {
  //@ts-ignore
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    // reset the URL so that the access token is not shown
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((user: any) => {
        dispatch({
          type: 'SET_USER',
          user,
        });
      });
      spotify.getUserPlaylists().then((playlists: any) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists,
        });
      });
      // get Discover Weekly by ID
      spotify.getPlaylist('37i9dQZF1E34Ucml4HHx1w').then((playlist: any) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: playlist,
        });
      });
    }
  }, []);
  return (
    <>
      {token ? (
        <Player spotify={spotify} />
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
