import { Link } from 'react-router-dom';
import { useDataLayerValue } from './DataLayer';
import './SongRow.css';

//@ts-ignore
function SongRow({ track, trackNumber }) {
  //@ts-ignore
  const [{}, dispatch] = useDataLayerValue(); //eslint-disable-line

  const onSingleClick = (currently_playing: any) => {
    console.log('onclick event', currently_playing);
  };

  const onDoubleClick = (currently_playing: any) => {
    console.log('double event', currently_playing);
    dispatch({
      type: 'SET_CURRENTLY_PLAYING',
      currently_playing: {
        artist: currently_playing.artist,
        track: currently_playing.track,
        albumArt: currently_playing.albumArt,
      },
    });
  };

  //  distinguish between single and double clicks
  let timer: any;
  const onClickHandler = (event: any, currently_playing: any) => {
    clearTimeout(timer);
    if (event.detail === 1) {
      timer = setTimeout(() => onSingleClick(currently_playing), 200);
    } else if (event.detail === 2) {
      onDoubleClick(currently_playing);
    }
  };

  const artists = track?.artists
    .map((artist: SpotifyApi.ArtistObjectFull) => artist.name)
    .join(', ');

  const albumArt: string = track?.album.images[0].url;

  return (
    <div
      onClick={(e) =>
        onClickHandler(e, {
          artist: artists,
          track: track.name,
          albumArt: albumArt,
        })
      }
      className="song-row"
    >
      <div className="song-row-index">{trackNumber}</div>
      <Link to={`/album/${track?.album.id}`}>
        <img
          className="detail-view-tracklist-art"
          src={`${albumArt}`}
          alt={`Album art ${track?.name}`}
        />
      </Link>
      <div className="song-row-info">
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
