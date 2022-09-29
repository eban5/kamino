import { Link } from 'react-router-dom';
import { useDataLayerValue } from './DataLayer';
import { CurrentlyPlaying } from './reducer';
import './SongRow.css';
import { millisToMinutesAndSeconds, numberWithCommas } from './utils/utils';

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

  const PopularityDots = (popularityScore: number) => {
    const numFilledDots =
      popularityScore < 33 ? 1 : popularityScore > 66 ? 3 : 2;
    const numEmptyDots = 3 - numFilledDots;

    console.log({ popularityScore, numFilledDots, numEmptyDots });

    return [
      ...[...Array(numFilledDots)].map((e, i) => (
        <span className="popularity-dot" key={i}></span>
      )),
      [
        ...[...Array(numEmptyDots)].map((e, i) => (
          <span className="popularity-dot empty-dot" key={i}></span>
        )),
      ],
    ];
  };

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
      <div className="song-row-info">
        <h1>{_track.name}</h1>
        <p>{artists}</p>
      </div>
      <div className="spacer"></div>
      <div className="song-row-popularity">
        {PopularityDots(_track.popularity)}
      </div>
      <div className="song-row-duration">
        {millisToMinutesAndSeconds(_track.duration_ms)}
      </div>
    </div>
  );
}

export default SongRow;
