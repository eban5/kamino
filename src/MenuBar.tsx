import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Avatar } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface MenuBarProps {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export const SimpleTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Playlists" {...a11yProps(0)} />
        <Tab label="Artists" {...a11yProps(1)} />
        <Tab label="Albums" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </div>
  );
};

const MenuBar = (props: MenuBarProps) => {
  // const { spotify } = props;

  //@ts-ignore
  const [{ user }] = useDataLayerValue();

  return (
    <div className="menubar">
      <div className="menubar-arrows">
        <ArrowBackIosIcon className="menubar-arrows__back" />
        <ArrowForwardIosIcon className="menubar-arrows__forward" />
      </div>
      <div className="menubar-tabs">
        <SimpleTabs />
      </div>
      <div className="menubar-user">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};
export default MenuBar;
