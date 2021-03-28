import { Typography } from '@material-ui/core';
import './CurrentlyPlaying.css';

interface CurrentlyPlayingProps {
  artwork: string;
  trackTitle: string;
  trackArtist: string;
  visibility: boolean;
  setCurrentlyPlayingVisibility: Function;
}

const CurrentlyPlaying = (props: CurrentlyPlayingProps) => {
  const { artwork, trackTitle, trackArtist, visibility, setCurrentlyPlayingVisibility } = props;

  return (
    <div
      className={`currently-playing__container ${visibility ? 'show' : 'hide'}`}
    >
      <div
        onClick={() => {
          setCurrentlyPlayingVisibility();
        }}
        className="close"
      >
        <span>X</span>
      </div>
      <div className="currently-playing__artwork">
        <img src={artwork} alt={`Currently Playing Artwork`} />
      </div>
      <div className="currently-playing__track-title">
        <Typography variant="body1" gutterBottom>
          {trackTitle}
        </Typography>
      </div>
      <div className="currently-playing__track-artist">
        <Typography variant="body2" gutterBottom>
          {trackArtist}
        </Typography>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
