import { useEffect, useState } from 'react';

import './App.css';
import './Home.css';

import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';

import { Sidebar } from './Sidebar';
import Controls from './Controls';
import { Container, Grid } from '@material-ui/core';
import Card from './Card';
import { dummyAlbums, dummyPlaylistNames, dummyPodcasts } from './utils';
import MenuBar from './MenuBar';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

const QuickPlaylists = () => {
  return (
    <div className="cards__horizontal-container">
      {dummyPlaylistNames.slice(0, 6).map((name: string, index: number) => {
        return <Card key={index} direction="horizontal" title={name} />;
      })}
    </div>
  );
};

const RecentlyPlayed = () => {
  return (
    <div className="cards__vertical-container">
      {dummyAlbums.map((album: any, index: number) => (
        <Card
          key={index}
          direction="vertical"
          title={album.name}
          subtitle={album.artist}
        />
      ))}
    </div>
  );
};

const TopShows = () => {
  return (
    <div className="cards__vertical-container">
      {dummyPodcasts.map((podcast: any, index: number) => {
        return (
          <Card
            key={index}
            direction="vertical"
            title={podcast.name}
            subtitle={podcast.producer}
          />
        );
      })}
    </div>
  );
};

export const Home = () => {
  return (
    <Container maxWidth="xl">
      <MenuBar />
      <Grid container spacing={5}>
        <Grid item lg={10}>
          <Greeting />
          <QuickPlaylists />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item lg={10}>
          <h2>Recently played</h2>
          <RecentlyPlayed />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item lg={10}>
          <h2>Your top shows</h2>
          <TopShows />
        </Grid>
      </Grid>
    </Container>
  );
};

export const Greeting = () => {
  const now = new Date();
  const currentHour: number = now.getHours();
  const term: string =
    currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening';
  return <h1>Good {term}</h1>;
};

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
        <div className="App">
          <aside>
            <Sidebar />
          </aside>
          <main>
            <Home />
          </main>
          <footer>
            <Controls />
          </footer>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
