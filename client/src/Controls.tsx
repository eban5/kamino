import {
  PlayCircleOutline,
  SkipPrevious,
  SkipNext,
  PlaylistPlay,
  Shuffle,
  Repeat,
  VolumeDown,
} from '@material-ui/icons';
import { Grid, Slider } from '@material-ui/core';
import './Controls.css';
import { useDataLayerValue } from './DataLayer';

const Controls = () => {
  //@ts-ignore
  const [{ currently_playing }] = useDataLayerValue();

  return (
    <div className="footer">
      <div className="footer__left">
        {currently_playing && (
          <>
            <img
              className="footer__albumLogo"
              src={`${currently_playing.albumArt}`}
              alt=""
            />
            <div className="footer__song-info">
              <h4>{currently_playing.track}</h4>
              <p>{currently_playing.artist}</p>
            </div>
          </>
        )}
      </div>
      <div className="footer__center">
        <Shuffle className="footer__green" />
        <SkipPrevious className="footer__icon" />
        <PlayCircleOutline fontSize="large" className="footer__icon" />
        <SkipNext className="footer__icon" />
        <Repeat className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlay className="footer__icon" />
          </Grid>
          <Grid item>
            <VolumeDown className="footer__icon" />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Controls;
