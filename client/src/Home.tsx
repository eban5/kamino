import { useEffect, useState } from 'react';
import { useDataLayerValue } from './DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';
import { Container } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import ArtistDetail from './ArtistDetail';
import Browse from './Browse';
import Card from './Card';
import Category from './Category';
import Controls from './Player';
import Detail from './Detail';
import './Home.css';
import Login from './Login';
import MenuBar from './MenuBar';
import Sidebar from './Sidebar';
import { greeting } from './utils';
import YourLibrary from './YourLibrary';
import useAuth from './useAuth';

const spotify = new SpotifyWebApi();

interface TopProps {
  items: SpotifyApi.UsersTopTracksResponse | SpotifyApi.UsersTopArtistsResponse;
}

interface QuickPlaylistsProps {
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse;
}

interface RecentlyPlayedProps {
  items: SpotifyApi.UsersRecentlyPlayedTracksResponse;
}

const QuickPlaylists = (props: QuickPlaylistsProps) => {
  const { playlists } = props;

  return (
    <>
      {playlists?.items &&
        playlists?.items
          .slice(0, 8)
          .map((playlist: SpotifyApi.PlaylistBaseObject, index: number) => {
            return (
              <Link to={`/playlist/${playlist.id}`} key={index}>
                <Card
                  key={playlist.id}
                  direction="horizontal"
                  title={playlist.name}
                  image={playlist.images[0]?.url}
                  id={playlist.id}
                />
              </Link>
            );
          })}
    </>
  );
};

const RecentlyPlayed = (props: RecentlyPlayedProps) => {
  const { items } = props;

  return (
    <>
      {items?.items &&
        items?.items.slice(0, 6).map((item: any, index: number) => {
          const track: SpotifyApi.TrackObjectFull = item.track;
          return (
            <Link to={`/album/${track.album.id}`} key={index}>
              <Card
                key={index}
                direction="vertical"
                title={track.name}
                subtitle={track.artists[0].name}
                image={track.album.images[1].url}
                id={track.id}
              />
            </Link>
          );
        })}
    </>
  );
};

const Top = (props: TopProps) => {
  const { items } = props;

  return (
    <>
      {items?.items.slice(0, 6).map((item: any, index: number) => {
        if (item.album && item.album.type === 'album') {
          const album: SpotifyApi.AlbumObjectFull = item.album;
          return (
            <Link to={`/album/${album.id}`} key={index}>
              <Card
                key={index}
                direction="vertical"
                title={album.name}
                subtitle={album.artists[0].name}
                image={album.images[1].url}
                id={album.id}
              />
            </Link>
          );
        } else {
          const path: string = item.type === 'artist' ? 'artist' : 'album';
          return (
            <Link to={`/${path}/${item.id}`} key={index}>
              <Card
                key={index}
                id={item.id}
                direction="vertical"
                title={item.name}
                subtitle={item.type === 'album' ? item.artists[0].name : ''}
                image={
                  item.type === 'artist'
                    ? item.images[0].url
                    : item.type === 'album'
                    ? item.album.images[0].url
                    : ''
                }
              />
            </Link>
          );
        }
      })}
    </>
  );
};

//@ts-ignore
export const Landing = ({ spotify }) => {
  //@ts-ignore
  const [
    { playlists, recently_played, top_artists, top_tracks, albums },
  ] = useDataLayerValue();

  return (
    <>
      <h1 className="home-header">{greeting()}</h1>
      <div className="card-grid">
        <QuickPlaylists playlists={playlists} />
      </div>

      <div className="home-header-container">
        <h2 className="home-header">Recently played</h2>
        <h6 className="home-header-see-all">See All</h6>
      </div>
      <div className="card-grid">
        <RecentlyPlayed items={recently_played} />
      </div>

      <h2 className="home-header">Top Artists</h2>

      <div className="card-grid">
        <Top items={top_artists} />
      </div>
      <h2 className="home-header">Top Tracks</h2>

      <div className="card-grid">
        <Top items={top_tracks} />
      </div>

      <h2 className="home-header">Saved Albums</h2>
      <div className="card-grid">
        <Top items={albums} />
      </div>
    </>
  );
};

//@ts-ignore
const Home = ({ code }) => {
  // * Auth stuff
  const accessToken = useAuth(code);
  console.log('useAuth returned', accessToken);
  const [{ token }, dispatch]: any = useDataLayerValue();

  // TODO wire up playingTrack
  // const [playingTrack, setPlayingTrack] = useState<any>(null);

  // set the access token and user's data into our Context
  useEffect(() => {
    if (!accessToken) return;
    dispatch({
      type: 'SET_TOKEN',
      token: accessToken,
    });
    spotify.setAccessToken(accessToken);
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
    spotify.getMyTopTracks().then((top: SpotifyApi.UsersTopTracksResponse) => {
      dispatch({
        type: 'SET_TOP_TRACKS',
        top_tracks: top,
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
  }, [accessToken, dispatch]);

  // ----------------

  return (
    <div className="App">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Container maxWidth={'xl'} disableGutters>
          <MenuBar />
          <Switch>
            <Route
              exact
              path="/artist/:id"
              render={(props) => <ArtistDetail {...props} spotify={spotify} />}
            />
            <Route
              exact
              path="/album/:id"
              render={(props) => (
                <Detail {...props} type="album" spotify={spotify} />
              )}
            />
            <Route
              exact
              path="/playlist/:id"
              render={(props) => (
                <Detail {...props} type="playlist" spotify={spotify} />
              )}
            />
            <Route
              exact
              path="/category/:id"
              render={(props) => <Category {...props} spotify={spotify} />}
            />
            <Route
              exact
              path="/collections/playlists"
              render={(props) => (
                <YourLibrary {...props} type="playlists" spotify={spotify} />
              )}
            />
            <Route
              exact
              path="/collections/artists"
              render={(props) => (
                <YourLibrary {...props} type="artists" spotify={spotify} />
              )}
            />
            <Route
              exact
              path="/collections/albums"
              render={(props) => (
                <YourLibrary {...props} type="albums" spotify={spotify} />
              )}
            />
            <Route path="/browse">
              <Browse spotify={spotify} />
            </Route>

            <Route path="/home">
              <Landing spotify={spotify} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Landing spotify={spotify} />
            </Route>
          </Switch>
        </Container>
      </main>
      <footer>
        <Controls />
      </footer>
    </div>
  );
};

export default Home;
