import "./App.css";
import "./Home.css";

import { Sidebar } from "./Sidebar";
import Controls from "./Controls";
import { Container, Grid, Paper } from "@material-ui/core";

export const Home = () => {
	return <div className="home"></div>;
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
				<Sidebar></Sidebar>
			</aside>
			<main>
				<Container maxWidth="lg">
					<Grid container spacing={3}>
						<Grid item xs={12} md={8} lg={9}>
							<Greeting />
							<Paper>{}</Paper>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4} lg={3}>
							<h2>Recently played</h2>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<h2>Your top shows</h2>
						</Grid>
					</Grid>
				</Container>
			</main>
			<footer>
				<Controls />
			</footer>
		</div>
	);
}

export default App;
