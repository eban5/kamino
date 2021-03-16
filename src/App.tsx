import "./App.css";
import "./Home.css";

import { Sidebar } from "./Sidebar";
import Controls from "./Controls";
import { Container, Grid, Paper } from "@material-ui/core";

const QuickPlaylists = () => {
	// TODO remove when real data is in place
	const dummyPlaylistNames = [
		"Old School Hip Hop",
		"70s Classic Rock",
		"Chill-Hop",
		"Classical",
		"Movie Soundtracks",
		"Extreme Polka",
	];

	return (
		<div className="quick-playlist-container">
			{dummyPlaylistNames.map((name: string) => {
				return (
					<div className="quick-playlist-item">
						<div className="quick-playlist-item__image"></div>
						<div className="quick-playlist-item__name">
							<h3>{name}</h3>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const RecentlyPlayed = () => {
	const dummyAlbums = [
		{ artist: "Thom Yorke", name: "The Eraser" },
		{ artist: "Everything Everything", name: "Get To Heaven (Deluxe)" },
		{ artist: "Toto", name: "Hold The Line" },
		{ artist: "Pink Floyd", name: "The Wall" },
		{ artist: "Pink Floyd", name: "Animals" },
		{ artist: "Phoebe Bridgers", name: "Punisher" },
	];

	return (
		<div className="recently-played-container">
			{dummyAlbums.map((album: any) => {
				return (
					<div className="recently-played-item">
						<div className="recently-played-item__image"></div>
						<div className="recently-played-item__name">
							<h3>{album.name}</h3>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export const Home = () => {
	return (
		<Container maxWidth="lg">
			<Grid container spacing={2}>
				<Grid item lg={10}>
					<Greeting />
					<QuickPlaylists />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item lg={10}>
					<h2>Recently played</h2>
					<RecentlyPlayed />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<h2>Your top shows</h2>
				</Grid>
			</Grid>
		</Container>
	);
};

export const Greeting = () => {
	const now = new Date();
	const currentHour: number = now.getHours();
	const term: string = currentHour < 12 ? "morning" : currentHour < 17 ? "afternoon" : "evening";
	return <h1>Good {term}</h1>;
};

function App() {
	return (
		<div className="App">
			<aside>
				<Sidebar />
			</aside>
			<main>
				<Home />
			</main>
			<footer>
				<Controls />
			</footer>
		</div>
	);
}

export default App;
