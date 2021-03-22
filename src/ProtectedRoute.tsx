import { Redirect } from "react-router-dom";

const ProtectedRoute = (props: any) => {
	const Component = props.component;
	const isAuthenticated = localStorage.getItem("token");

	return isAuthenticated ? (
		<>
			<Component />
		</>
	) : (
		<Redirect to={{ pathname: "/login" }} />
	);
};

export default ProtectedRoute;
