import './Sidebar.css';
import './SidebarItem.css';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { LibraryMusic } from '@material-ui/icons';
import kaminoBrand from './images/kamino-brand.png';
import { useDataLayerValue } from './DataLayer';
import { Link } from 'react-router-dom';

const SidebarItem = (props: any) => {
  const title: string = props.title;
  const Icon: any = props.Icon;
  return (
    <div className="sidebar-item">
      {Icon && <Icon className="sidebar-item__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
};

const Sidebar = () => {
  //@ts-ignore
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={kaminoBrand} alt="Kamino logo" height={50} />
      </div>

      <div className="sidebar-playlist__controls">
        <Link to="/">
          <SidebarItem title="Home" Icon={HomeIcon} />
        </Link>
        <SidebarItem title="Search" Icon={SearchIcon} />
        <Link to="/collections/playlists">
          <SidebarItem title="Your Library" Icon={LibraryMusic} />
        </Link>
        <h5 className="sidebar-title">PLAYLISTS</h5>
        <SidebarItem title="Create Playlist" Icon={AddBoxIcon} />
        <SidebarItem title="Liked Songs" Icon={FavoriteIcon} />
        <br />
      </div>
      <div className="sidebar-playlist__list">
        {playlists?.items?.map((playlist: any, index: number) => (
          <SidebarItem key={index} title={playlist.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
