import { Link } from 'react-router-dom';
import { useDataLayerValue } from './DataLayer';
import './SongRow.css';

//@ts-ignore
function SongRow({ track }) {
  //@ts-ignore
  const [{}, dispatch] = useDataLayerValue();

  const artists = track?.artists
    .map((artist: SpotifyApi.ArtistObjectFull) => artist.name)
    .join(', ');

  const albumArt: string = track?.album.images[0].url;

  return (
    <div className="song-row">
      <Link to={`/album/${track?.album.id}`}>
        <img
          className="detail-view-tracklist-art"
          src={`${albumArt}`}
          alt={`Album art ${track?.name}`}
        />
      </Link>
      <div
        onClick={() =>
          dispatch({
            type: 'SET_CURRENTLY_PLAYING',
            currently_playing: {
              artist: artists,
              track: track.name,
              albumArt: albumArt,
            },
          })
        }
        className="song-row-info"
      >
        <h1>{track.name}</h1>
        <p>
          {artists}
          {track.album_name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
