// TODO remove when real data is in place
export const dummyPlaylistNames: string[] = [
  'Old School Hip Hop',
  '70s Classic Rock',
  'Chill-Hop',
  'Classical',
  'Movie Soundtracks',
  'Extreme Polka',
  'Alternative Rock',
  'Dance / EDM',
  'Trip-Hop',
  '60s Folk',
  'Kids Music',
  // 'Summer Jams',
  // 'Morning Run',
  // 'Workout Jams',
  // 'String Quartets'
];

export const dummyAlbums: any[] = [
  { artist: 'Thom Yorke', name: 'The Eraser' },
  { artist: 'Everything Everything', name: 'Get To Heaven (Deluxe)' },
  { artist: 'Toto', name: 'Hold The Line' },
  { artist: 'Pink Floyd', name: 'The Wall' },
  { artist: 'Pink Floyd', name: 'Animals' },
  { artist: 'Phoebe Bridgers', name: 'Punisher' },
];

export const dummyPodcasts: any[] = [
  { producer: 'Podcast Producer', name: 'Sports Talk' },
  { producer: 'Podcast Producer', name: 'News 1' },
  { producer: 'Podcast Producer', name: 'News 2' },
  { producer: 'Podcast Producer', name: 'Music 1' },
  { producer: 'Podcast Producer', name: 'Music 2' },
  { producer: 'Podcast Producer', name: 'History' },
  { producer: 'Podcast Producer', name: 'Meditation' },
];

export const greeting = () => {
  const now = new Date();
  const currentHour: number = now.getHours();
  const term: string =
    currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening';
  return `Good ${term}`;
};

// taken from somewhere on stack overflow
export const numberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const millisToMinutesAndSeconds = (ms: number): string => {
  var minutes: number = Math.floor(ms / 60000);
  var seconds: any = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const millisToAlbumDuration = (ms: number): string => {
  var minutes: number = Math.floor(ms / 60000);
  var seconds: any = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes} min ${(seconds < 10 ? '0' : '') + seconds} sec`;
};
