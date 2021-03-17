import './App.css';
import './Home.css';
import { Container, Grid } from '@material-ui/core';

import Sidebar from './Sidebar';
import Controls from './Controls';
import MenuBar from './MenuBar';
import Card from './Card';

import { useDataLayerValue } from './DataLayer';
import { dummyAlbums, dummyPodcasts } from './utils';

const QuickPlaylists = () => {
  //@ts-ignore
  const [{ playlists }, dispatch] = useDataLayerValue();
  console.log(playlists);
  return (
    <div className="cards__horizontal-container">
      {playlists.items
        .slice(0, 6)
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

//@ts-ignore
export const Home = ({ spotify }) => {
  //@ts-ignore
  const [{ playlists, discover_weekly }, dispatch] = useDataLayerValue();

  return (
    <Container maxWidth="xl">
      <MenuBar spotify={spotify} />
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
