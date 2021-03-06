import { Link } from 'react-router-dom';
import { useDataLayerValue } from './DataLayer';
import { CurrentlyPlaying } from './reducer';
import './SongRow.css';
import { millisToMinutesAndSeconds } from './utils/utils';

//@ts-ignore
function SongRow({ track, trackNumber }) {
  //@ts-ignore
  const [{}, dispatch] = useDataLayerValue(); //eslint-disable-line
  const _track: SpotifyApi.TrackObjectFull = track;
  // const onSingleClick = (currently_playing: any) => {};

  const onDoubleClick = (currently_playing: CurrentlyPlaying) => {
    dispatch({
      type: 'SET_CURRENTLY_PLAYING',
      currently_playing: {
        artist: currently_playing.artist,
        track: currently_playing.track,
        albumArt: currently_playing.albumArt,
        duration: currently_playing.duration,
      },
    });

    dispatch({
      type: 'SET_PLAYBACK',
      playback: 'PLAYING',
    });
  };

  //  distinguish between single and double clicks
  let timer: any;
  const onClickHandler = (event: any, currently_playing: CurrentlyPlaying) => {
    clearTimeout(timer);
    if (event.detail === 1) {
      // timer = setTimeout(() => onSingleClick(currently_playing), 200);
    } else if (event.detail === 2) {
      onDoubleClick(currently_playing);
    }
  };

  const artists = _track?.artists
    .map((artist: SpotifyApi.ArtistObjectSimplified) => artist.name)
    .join(', ');

  const albumArt: string = _track?.album.images[0].url;

  return (
    <div
      onClick={(e) =>
        onClickHandler(e, {
          artist: artists,
          track: _track.name,
          albumArt: albumArt,
          duration: millisToMinutesAndSeconds(_track.duration_ms).toString(),
        })
      }
      className="song-row"
    >
      <div className="song-row-index">{trackNumber}</div>
      <Link to={`/album/${_track?.album.id}`}>
        <img
          className="detail-view-tracklist-art"
          src={`${albumArt}`}
          alt={`Album art ${_track?.name}`}
        />
      </Link>
      <div className="song-row-info">
        <h1>{_track.name}</h1>
        <p>
          {artists}
          {_track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
