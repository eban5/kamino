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
  const [{ user }] = useDataLayerValue();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
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
      </Grid>
    </Grid>
  );
};
export default MenuBar;
