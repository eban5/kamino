import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Avatar } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';

interface MenuBarProps {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
}

const MenuBar = (props: MenuBarProps) => {
  const { spotify } = props;
  console.log(spotify)
  //@ts-ignore
  const [{ user }] = useDataLayerValue();

  return (
    <div className="menubar">
      <div className="menubar-arrows">
        <ArrowBackIosIcon className="menubar-arrows__back" />
        <ArrowForwardIosIcon className="menubar-arrows__forward" />
      </div>
      <div className="menubar-user">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};
export default MenuBar;
