import { useState } from 'react';
import './Sidebar.css';
import './SidebarItem.css';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { LibraryMusic } from '@material-ui/icons';
import kaminoBrand from './images/kamino-brand.png';
import { useDataLayerValue } from './DataLayer';
import { Link } from 'react-router-dom';
import CurrentlyPlaying from './CurrentlyPlaying';

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
  const [visibility, setVisibility] = useState<boolean>(false);

  const logMessage = () => {
    setVisibility(!visibility);
  };

  const currentlyPlayingClass: string = visibility ? '' : 'sidebar-three';

  return (
    <div className={`sidebar ${currentlyPlayingClass}`}>
      <div className="sidebar-logo">
        <img src={kaminoBrand} alt="Kamino logo" height={50} />
      </div>

      <div className="sidebar-playlist__controls">
        <Link to="/">
          <SidebarItem title="Home" Icon={HomeIcon} />
        </Link>
        <Link to="/search">
          <SidebarItem title="Search" Icon={SearchIcon} />
        </Link>
        <Link to="/browse">
          <SidebarItem title="Browse" Icon={ViewQuiltIcon} />
        </Link>
        <div className="sidebar-item">
          {' '}
          <button
            onClick={() => {
              setVisibility(!visibility);
            }}
          >
            TOGGLE
          </button>
        </div>
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
          <Link to={`/playlist/${playlist.id}`} key={index}>
            <SidebarItem key={index} title={playlist.name} />
          </Link>
        ))}
      </div>
      <div className="sidebar-playlist__currently-playing">
        <CurrentlyPlaying
          visibility={visibility}
          logMessage={logMessage}
          artwork={`https://i.scdn.co/image/9c6e0a8e895e0cbb8c024360c824a00b0b923b87`}
          trackTitle={'TRACK TITLE'}
          trackArtist={`Track Artist`}
        />
      </div>
    </div>
  );
};

export default Sidebar;
