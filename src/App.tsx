import './App.css';
import './Home.css';

import { Sidebar } from './Sidebar';
import Controls from './Controls';
import { Container, Grid } from '@material-ui/core';
import Card from './Card';

const QuickPlaylists = () => {
  // TODO remove when real data is in place
  const dummyPlaylistNames = [
    'Old School Hip Hop',
    '70s Classic Rock',
    'Chill-Hop',
    'Classical',
    'Movie Soundtracks',
    'Extreme Polka',
  ];

  return (
    <div className="cards__horizontal-container">
      {dummyPlaylistNames.map((name: string) => {
        return <Card direction="horizontal" title={name} />;
      })}
    </div>
  );
};

const RecentlyPlayed = () => {
  const dummyAlbums = [
    { artist: 'Thom Yorke', name: 'The Eraser' },
    { artist: 'Everything Everything', name: 'Get To Heaven (Deluxe)' },
    { artist: 'Toto', name: 'Hold The Line' },
    { artist: 'Pink Floyd', name: 'The Wall' },
    { artist: 'Pink Floyd', name: 'Animals' },
    { artist: 'Phoebe Bridgers', name: 'Punisher' },
  ];

  return (
    <div className="cards__vertical-container">
      {dummyAlbums.map((album: any) => (
        <Card direction="vertical" title={album.name} subtitle={album.artist} />
      ))}
    </div>
  );
};

const TopShows = () => {
  const dummyPodcasts = [
    { producer: 'Podcast Producer', name: 'Sports Talk' },
    { producer: 'Podcast Producer', name: 'News 1' },
    { producer: 'Podcast Producer', name: 'News 2' },
    { producer: 'Podcast Producer', name: 'Music 1' },
    { producer: 'Podcast Producer', name: 'Music 2' },
    { producer: 'Podcast Producer', name: 'History' },
    { producer: 'Podcast Producer', name: 'Meditation' },
  ];

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
