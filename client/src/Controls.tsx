import { useState, useEffect } from 'react';
import {
  PlayCircleOutline,
  PauseCircleOutline,
  SkipPrevious,
  SkipNext,
  PlaylistPlay,
  Shuffle,
  Repeat,
  VolumeDown,
} from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, Slider } from '@material-ui/core';
import './Controls.css';
import { useDataLayerValue } from './DataLayer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Controls = () => {
  //@ts-ignore
  const [{ playback, currently_playing }, dispatch] = useDataLayerValue();

  const classes = useStyles();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playback === 'PLAYING') {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            dispatch({ type: 'SET_PLAYBACK', playback: 'COMPLETE' });
            return 0;
          }

          return Math.min(oldProgress + 1, 100);
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [playback, dispatch]);

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
        <div>
          <Shuffle className="footer__green" />
          <SkipPrevious className="footer__icon" />
          {playback !== 'PLAYING' ? (
            <PlayCircleOutline
              onClick={() =>
                dispatch({ type: 'SET_PLAYBACK', playback: 'PLAYING' })
              }
              fontSize="large"
              className="footer__icon"
            />
          ) : (
            <PauseCircleOutline
              onClick={() =>
                dispatch({ type: 'SET_PLAYBACK', playback: 'PAUSED' })
              }
              fontSize="large"
              className="footer__icon"
            />
          )}
          <SkipNext className="footer__icon" />
          <Repeat className="footer__green" />
        </div>
        <div className={classes.root}>
          <LinearProgress variant="determinate" value={progress} />
          <p>{progress}</p>
        </div>
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
