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

const Controls = () => {
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src="https://scene360.com/wp-content/uploads/2013/10/album-covers-05.jpg"
          alt=""
        />
        <div className="footer__song-info">
          <h4>Song Title</h4>
          <p>Artist</p>
        </div>
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
