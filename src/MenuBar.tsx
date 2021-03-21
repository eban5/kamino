import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from './DataLayer';
import { Link, useHistory } from 'react-router-dom';

const MenuBar = () => {
  let history = useHistory();

  //@ts-ignore
  const [{ user }] = useDataLayerValue();

  return (
    <div className="menubar">
      <div className="menubar-arrows">
        <ArrowBackIosIcon
          className="menubar-arrows__back"
          onClick={() => history.goBack()}
        />
        <ArrowForwardIosIcon
          className="menubar-arrows__forward"
          onClick={() => history.goForward()}
        />
      </div>
      <div className="menubar-links">
        <Link to="/collections/playlists">
          <h3 className="menubar-links-link">Playlists</h3>
        </Link>
        <Link to="/collections/artists">
          <h3 className="menubar-links-link">Artists</h3>
        </Link>
        <Link to="/collections/albums">
          <h3 className="menubar-links-link">Albums</h3>
        </Link>
      </div>
      <div className="menubar-user">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};
export default MenuBar;
