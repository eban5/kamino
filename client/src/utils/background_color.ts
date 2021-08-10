import { prominent } from 'color.js';

/**
 * Build a linear gradient black 0% | black 70% | color 100%
 */
export const buildGradient = (color: string) => {
  return `linear-gradient(0deg, var(--color-dark-gray) 0%, var(--color-dark-gray) 70%, ${color} 100%)`;
};

/**
 * Extract the primary color from a randomly selected user's top track image.
 */
export const getRandomColor = async (
  top_tracks: SpotifyApi.UsersTopTracksResponse
): Promise<string> => {
  // get all of the top_track's artwork
  const top_track_artwork = top_tracks.items
    .slice(0, 6)
    .map((i: SpotifyApi.TrackObjectFull) => i.album.images[1].url)
    .sort(() => Math.random() - 0.5);

  const artworkUrl: string = top_track_artwork[0];
  const color = await prominent(artworkUrl, { amount: 1 });
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

export const defaultKaminoBrandColor = '#23597d';
export const defaultBackground = buildGradient(defaultKaminoBrandColor);
