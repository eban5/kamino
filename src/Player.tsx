import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import './Home.css';
import { Container, Grid } from '@material-ui/core';

import Sidebar from './Sidebar';
import Greeting from './Greeting';
import Controls from './Controls';
import MenuBar from './MenuBar';
import Card from './Card';
import Detail from './Detail';
import YourLibrary from './YourLibrary';
import { useDataLayerValue } from './DataLayer';

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
    <div className="cards__horizontal-container">
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
    </div>
  );
};

const RecentlyPlayed = (props: RecentlyPlayedProps) => {
  const { items } = props;

  return (
    <div className="cards__vertical-container">
      {items?.items &&
        items?.items.slice(0, 10).map((item: any, index: number) => {
          const track: SpotifyApi.TrackObjectFull = item.track;
          if (track.type === 'track') {
            return (
              <Link to={`/track/${item.id}`} key={index}>
                <Card
                  key={track.id}
                  direction="vertical"
                  title={track.name}
                  subtitle={track.artists[0].name}
                  image={track.album.images[1].url}
                  id={track.id}
                />
              </Link>
            );
          } else {
            return (
              <Link to={`/album/${item.id}`}>
                <Card
                  key={track.id}
                  direction="vertical"
                  title={track.name}
                  subtitle={track.artists[0].name}
                  image={track.album.images[1].url}
                  id={track.id}
                />
              </Link>
            );
          }
        })}
    </div>
  );
};

const Top = (props: TopProps) => {
  const { items } = props;

  return (
    <div className="cards__vertical-container">
      {items?.items.slice(0, 10).map((item: any, index: number) => {
        const path: string = item.type === 'artist' ? 'artist' : 'track';
        return (
          <Link to={`/${path}/${item.id}`} key={index}>
            <Card
              key={index}
              id={item.id}
              direction="vertical"
              title={item.name}
              subtitle={item.type === 'track' ? item.artists[0].name : ''}
              image={
                item.type === 'artist'
                  ? item.images[0].url
                  : item.type === 'track'
                  ? item.album.images[0].url
                  : ''
              }
            />
          </Link>
        );
      })}
    </div>
  );
};

//@ts-ignore
export const Home = ({ spotify }) => {
  //@ts-ignore
  const [
    { playlists, recently_played, top_artists, top_tracks },
  ] = useDataLayerValue();

  return (
    <Container disableGutters={true} maxWidth={false}>
      <Grid container spacing={8}>
        <Grid item xl={12}>
          <Greeting />
          <QuickPlaylists playlists={playlists} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xl={12}>
          <h2>Recently played</h2>
          <RecentlyPlayed items={recently_played} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xl={12}>
          <h2>Top Artists</h2>
          <Top items={top_artists} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xl={12}>
          <h2>Top Tracks</h2>
          <Top items={top_tracks} />
        </Grid>
      </Grid>
    </Container>
  );
};

//@ts-ignore
const Player = ({ spotify }) => {
  return (
    <div className="App">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Container>
          <MenuBar />
          <Switch>
            <Route
              exact
              path="/artist/:id"
              render={(props) => (
                <Detail {...props} type="artist" spotify={spotify} />
              )}
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
            <Route path="/home">
              <Home spotify={spotify} />
            </Route>
            <Route path="/">
              <Home spotify={spotify} />
              {/* <YourLibrary spotify={spotify} /> */}
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

export default Player;
