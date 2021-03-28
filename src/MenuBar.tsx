import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import './MenuBar.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from './DataLayer';
import { useHistory } from 'react-router-dom';

// menu button
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';

const MenuBar = () => {
  let history = useHistory();

  //@ts-ignore
  const [{ user }, dispatch] = useDataLayerValue();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({
      type: 'SET_TOKEN',
      token: '',
    });
  };

  return (
    <div className="menubar">
      <Grid item>
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
      </Grid>
      <Grid item>
        <div className="menubar-user">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
            <span className="menubar-user__username">{user?.display_name}</span>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              style={{ backgroundColor: 'gray', color: 'white' }}
              onClick={handleClose}
            >
              Account
            </MenuItem>
            <MenuItem
              style={{ backgroundColor: 'gray', color: 'white' }}
              onClick={handleClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              style={{ backgroundColor: 'gray', color: 'white' }}
              onClick={handleLogout}
            >
              Log out
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    </div>
  );
};
export default withRouter(MenuBar);
