import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import './Home.css';
import { Container, Grid, Typography } from '@material-ui/core';
import Login from './Login';
import Sidebar from './Sidebar';
import { greeting } from './utils';
import Controls from './Controls';
import MenuBar from './MenuBar';
import Card from './Card';
import Detail from './Detail';
import ArtistDetail from './ArtistDetail';
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
    <>
      {playlists?.items &&
        playlists?.items
          .slice(0, 8)
          .map((playlist: SpotifyApi.PlaylistBaseObject, index: number) => {
            return (
              <Grid item key={index}>
                <Link to={`/playlist/${playlist.id}`} key={index}>
                  <Card
                    key={playlist.id}
                    direction="horizontal"
                    title={playlist.name}
                    image={playlist.images[0]?.url}
                    id={playlist.id}
                  />
                </Link>
              </Grid>
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
        items?.items.slice(0, 10).map((item: any, index: number) => {
          const track: SpotifyApi.TrackObjectFull = item.track;
          const path: string = track.type === 'track' ? 'track' : 'album';

          return (
            <Grid item key={index}>
              <Link to={`/${path}/${track.id}`} key={index}>
                <Card
                  key={track.id}
                  direction="vertical"
                  title={track.name}
                  subtitle={track.artists[0].name}
                  image={track.album.images[1].url}
                  id={track.id}
                />
              </Link>
            </Grid>
          );
        })}
    </>
  );
};

const Top = (props: TopProps) => {
  const { items } = props;

  return (
    <>
      {items?.items.slice(0, 10).map((item: any, index: number) => {
        const path: string = item.type === 'artist' ? 'artist' : 'track';
        return (
          <Grid item key={index}>
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
          </Grid>
        );
      })}
    </>
  );
};

//@ts-ignore
export const Home = ({ spotify }) => {
  //@ts-ignore
  const [
    { playlists, recently_played, top_artists, top_tracks },
  ] = useDataLayerValue();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {greeting()}
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <QuickPlaylists playlists={playlists} />
      </Grid>

      <Typography variant="h4" gutterBottom>
        Recently played
      </Typography>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <RecentlyPlayed items={recently_played} />
      </Grid>

      <Typography variant="h4" gutterBottom>
        Top Artists
      </Typography>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Top items={top_artists} />
      </Grid>
      <Typography variant="h4" gutterBottom>
        Top Tracks
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Top items={top_tracks} />
      </Grid>
    </>
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
        <Container maxWidth={false}>
          <MenuBar />
          <Switch>
            <Route
              exact
              path="/artist/:id"
              render={(props) => (
                <ArtistDetail {...props} spotify={spotify} />
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
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home spotify={spotify} />
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
