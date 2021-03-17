import './App.css';
import './Home.css';
import { Container, Grid } from '@material-ui/core';

import Sidebar from './Sidebar';
import Controls from './Controls';
import MenuBar from './MenuBar';
import Card from './Card';

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
          .map((playlist: SpotifyApi.PlaylistBaseObject) => {
            return (
              <Card
                key={playlist.id}
                direction="horizontal"
                title={playlist.name}
                image={playlist.images[0]?.url}
              />
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
        items?.items.slice(0, 10).map((item: any) => {
          const track: SpotifyApi.TrackObjectFull = item.track;
          return (
            <Card
              key={track.id}
              direction="vertical"
              title={track.name}
              subtitle={track.artists[0].name}
              image={track.album.images[1].url}
            />
          );
        })}
    </div>
  );
};

// const TopShows = () => {
//   return (
//     <div className="cards__vertical-container">
//       {dummyPodcasts.map((podcast: any, index: number) => {
//         return (
//           <Card
//             key={index}
//             direction="vertical"
//             title={podcast.name}
//             subtitle={podcast.producer}
//           />
//         );
//       })}
//     </div>
//   );
// };

const Top = (props: TopProps) => {
  const { items } = props;

  return (
    <div className="cards__vertical-container">
      {items?.items.slice(0, 10).map((item: any, index: number) => {
        return (
          <Card
            key={index}
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
    <Container maxWidth="xl">
      <MenuBar spotify={spotify} />
      <Grid container spacing={5}>
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
      {/* <Grid container spacing={5}>
        <Grid item lg={10}>
          <h2>Your top shows</h2>
          <TopShows />
        </Grid>
      </Grid> */}
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

//@ts-ignore
const Player = ({ spotify }) => {
  return (
    <div className="App">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Home spotify={spotify} />
      </main>
      <footer>
        <Controls />
      </footer>
    </div>
  );
};

export default Player;
