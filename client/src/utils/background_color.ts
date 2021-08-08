import { prominent } from 'color.js';

export const buildGradient = (color: string) => {
  return `linear-gradient(0deg, #000000 0%, #000000 70%, ${color} 100%)`;
};

export const defaultKaminoBrandColor = '#23597d';

export const defaultBackground = `linear-gradient(0deg, #000000 0%, #000000 70%, #23597d 100%)`;

export const getRandomColor = (
  top_tracks: SpotifyApi.UsersTopTracksResponse
): Promise<string> => {
  // get all of the top_track's artwork
  const top_track_artwork = top_tracks.items
    .slice(0, 6)
    .map((i: SpotifyApi.TrackObjectFull) => i.album.images[1].url)
    .sort(() => Math.random() - 0.5);

  const artworkUrl: string = top_track_artwork[0];
  return prominent(artworkUrl, { amount: 1 }).then(
    (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  );
};
