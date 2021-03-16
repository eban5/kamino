import './App.css';
import './Home.css';

import { Sidebar } from './Sidebar';
import Controls from './Controls';
import { Container, Grid } from '@material-ui/core';
import Card from './Card';
import { dummyAlbums, dummyPlaylistNames, dummyPodcasts } from './utils';

const QuickPlaylists = () => {
  return (
    <div className="cards__horizontal-container">
      {dummyPlaylistNames.slice(0, 6).map((name: string) => {
        return <Card direction="horizontal" title={name} />;
      })}
    </div>
  );
};

const RecentlyPlayed = () => {
  return (
    <div className="cards__vertical-container">
      {dummyAlbums.map((album: any) => (
        <Card direction="vertical" title={album.name} subtitle={album.artist} />
      ))}
    </div>
  );
};

const TopShows = () => {
  return (
    <div className="cards__vertical-container">
      {dummyPodcasts.map((podcast: any) => {
        return (
          <Card
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
  return (
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
  );
}

export default App;
