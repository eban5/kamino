import { useState } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from './DataLayer';
import { Link, useHistory } from 'react-router-dom';

// menu button
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MenuBar = () => {
  let history = useHistory();

  //@ts-ignore
  const [{ user }] = useDataLayerValue();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
          <h4>{user?.display_name}</h4>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Account</MenuItem>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Log out</MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export default MenuBar;
