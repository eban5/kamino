import "./SidebarItem.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { LibraryMusic } from "@material-ui/icons";
// import { useDataLayerValue } from "./DataLayer";
import { Icon } from "@material-ui/core";

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

export const Sidebar = () => {
	// const [{ playlists }, dispatch] = {}

	return (
		<div className="sidebar">
			<img
				className="sidebar__logo"
				src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
				alt="Spotify logo"
        height={50}
			/>

			<SidebarItem title="Home" Icon={HomeIcon} />
			<SidebarItem title="Search" Icon={SearchIcon} />
			<SidebarItem title="Your Library" Icon={LibraryMusic} />
			<br />
			<strong className="sidebar__title">PLAYLISTS</strong>
			<hr />
			{/* {playlists?.items?.map((playlist) => (
				<SidebarItem title={playlist.name} />
			))} */}
		</div>
	);
};