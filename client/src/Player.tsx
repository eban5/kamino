import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import './Home.css';
import { Container } from '@material-ui/core';
import Login from './Login';
import Sidebar from './Sidebar';
import { greeting } from './utils';
import Controls from './Controls';
import MenuBar from './MenuBar';
import Category from './Category';
import Card from './Card';
import Detail from './Detail';
import ArtistDetail from './ArtistDetail';
import Browse from './Browse';
import YourLibrary from './YourLibrary';
import { useDataLayerValue } from './DataLayer';
const getColors = require('get-image-colors');

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
export const Home = ({ spotify }) => {
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
const Player = ({ spotify }) => {
  //@ts-ignore
  const [{ top_tracks }] = useDataLayerValue();
  const defaultBackground = `linear-gradient(0deg, #000000 0%, #000000 70%, #23597d 100%)`;

  const buildGradient = (color: string) => {
    return `linear-gradient(0deg, #000000 0%, #000000 70%, ${color} 100%)`;
  };

  const getRandomColor = (top_tracks: SpotifyApi.UsersTopTracksResponse) => {
    if (top_tracks) {
      // get all of the top_track's artwork
      const top_track_artwork = top_tracks.items
        .slice(0, 6)
        .map((i: SpotifyApi.TrackObjectFull) => i.album.images[1].url);

      // get color palette of all
      let top_track_colors: string[] = [];
      top_track_artwork.map((i: string) => {
        getColors(i).then((colors: any) => {
          const top = colors[0];

          // `colors` is an array of color objects
          top_track_colors.push(
            `rgba(${top._rgb[0]}, ${top._rgb[1]}, ${top._rgb[2]}, ${top._rgb[3]})`
          );
        });
      });

      // pick random from this set for background gradient primary
      return top_track_colors[
        Math.floor(Math.random() * top_track_colors.length)
      ];
    } else {
      return `#23597d`;
    }
  };
  const randomColor: string = getRandomColor(top_tracks);
  console.log('randomColor', randomColor);

  const backgroundColor: string =
    buildGradient(randomColor) || defaultBackground;

  console.log('backgroundColor', backgroundColor);

  return (
    <div className="App">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <div style={{ background: backgroundColor }}>
          <Container maxWidth={'xl'} disableGutters>
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
        </div>
      </main>
      <footer>
        <Controls />
      </footer>
    </div>
  );
};

export default Player;
