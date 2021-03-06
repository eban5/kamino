import { useEffect } from 'react';

import './App.css';
import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from './utils/spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';
import { getRandomColor, buildGradient } from './utils/background_color';

const spotify = new SpotifyWebApi();

function App() {
  //@ts-ignore
  const [{ token }, dispatch] = useDataLayerValue();

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
      spotify
        .getMe()
        .then((user: SpotifyApi.UserProfileResponse) => {
          dispatch({
            type: 'SET_USER',
            user,
          });
          return user;
        })
        .then((user: SpotifyApi.UserProfileResponse) => {
          spotify
            .getUserPlaylists(user.id, { limit: 50 })
            .then((playlists: any) => {
              dispatch({
                type: 'SET_PLAYLISTS',
                playlists,
              });
            });
        });

      // get Discover Weekly by ID
      spotify.getPlaylist('37i9dQZF1E34Ucml4HHx1w').then((playlist: any) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: playlist,
        });
      });
      spotify.getMyRecentlyPlayedTracks().then((tracks: any) => {
        dispatch({
          type: 'SET_RECENTLY_PLAYED',
          recently_played: tracks,
        });
      });
      // get user's top artists
      spotify
        .getMyTopArtists()
        .then((top: SpotifyApi.UsersTopArtistsResponse) => {
          dispatch({
            type: 'SET_TOP_ARTISTS',
            top_artists: top,
          });
        });
      // get user's saved albums
      spotify
        .getMySavedAlbums()
        .then((albums: SpotifyApi.UsersSavedAlbumsResponse) => {
          dispatch({
            type: 'SET_SAVED_ALBUMS',
            albums,
          });
        });
      // get user's top tracks
      spotify
        .getMyTopTracks()
        .then((top: SpotifyApi.UsersTopTracksResponse) => {
          dispatch({
            type: 'SET_TOP_TRACKS',
            top_tracks: top,
          });

          // set the Player background based on the primary colors extracted from top tracks
          let randomColor: Promise<string> = getRandomColor(top);
          randomColor
            .then((result: string) => buildGradient(result))
            .then((bgColor: string) => {
              dispatch({
                type: 'SET_BG_COLOR',
                bg_color: bgColor,
              });
            });
        });

      // get user's available devices
      spotify.getMyDevices().then((devices: SpotifyApi.UserDevicesResponse) => {
        dispatch({
          type: 'SET_DEVICES',
          devices: devices,
        });
      });

      // get list of categories to browse through
      spotify
        .getCategories()
        .then((categories: SpotifyApi.MultipleCategoriesResponse) => {
          dispatch({
            type: 'SET_CATEGORIES',
            categories: categories,
          });
        });
    }
  }, [dispatch]);
  return <>{token ? <Player spotify={spotify} /> : <Login />}</>;
}

export default App;
