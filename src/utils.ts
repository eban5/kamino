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

export const getPlaylistDuration = (
  playlistTracks: SpotifyApi.PlaylistTrackObject[]
): number => {
  return playlistTracks.reduce(
    (accumulator: number, track: SpotifyApi.PlaylistTrackObject) =>
      accumulator + track.track.duration_ms,
    0
  );
};
