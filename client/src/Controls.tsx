import {
  PlayCircleOutline,
  SkipPrevious,
  SkipNext,
  // PlaylistPlay,
  Shuffle,
  Repeat,
  // VolumeDown,
} from '@material-ui/icons';
import './Controls.css';

const Controls = () => {
  return (
    <div className="controls">
      <div className="footer__left">
        {/* <PlaylistPlay className="footer__icon" /> */}
      </div>
      <div className="footer__center">
        <Shuffle className="footer__green" />
        <SkipPrevious className="footer__icon" />
        <PlayCircleOutline fontSize="large" className="footer__icon" />
        <SkipNext className="footer__icon" />
        <Repeat className="footer__green" />
      </div>
      <div className="footer__right">
        {/* <VolumeDown className="footer__icon" /> */}
      </div>
    </div>
  );
};

export default Controls;
