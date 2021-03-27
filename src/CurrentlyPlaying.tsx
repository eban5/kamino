import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import "./CurrentlyPlaying.css"

interface CurrentlyPlayingProps {
  artwork: string;
  trackTitle: string;
  trackArtist: string;
}

const CurrentlyPlaying = (props: CurrentlyPlayingProps) => {
  const { artwork, trackTitle, trackArtist } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [popoutClass, setPopoutClass] = useState<string>('show');

  useEffect(() => {
    visible ? setPopoutClass('show') : setPopoutClass('hide');
  }, [visible]);

  const toggleCurrentlyPlaying = () => {
    setVisible(!visible);
  };

  return (
    <div className={`currently-playing__container ${popoutClass}`}>
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
