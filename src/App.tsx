import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { Login, Home, Reviews, ReviewRequests } from "./pages";
import { Route, Router, useLocation } from "wouter";
import { Path } from "./routes";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Header } from "./components";
import { useEffect } from "react";
import { signOut } from "./store/userSlice";

function App() {
	// get user from store to decide landing page
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [_location, setLocation] = useLocation();

	useEffect(() => {
		// if authenticated go home otherwise log in
		setLocation(user.token ? Path.HOME : Path.LOGIN);
	}, [user.token]);

	const handleLogOut = () => {
		dispatch(signOut());
	};

	const isAdmin = user.username === "admin";

	return (
		<>
			{/* header is visible only to authenticated user */}
			{user.token && (
				<Header username={user.username} onLogOut={handleLogOut} />
			)}
			<Router>
				<Route path={Path.LOGIN} component={Login} />
				{/* employee can only see reviews requested by admin */}
				<Route path={Path.HOME} component={isAdmin ? Home : ReviewRequests} />
				{/* list of employee page is visible only to admin */}
				{isAdmin && <Route path={Path.EMPLOYEE} component={Reviews} />}
			</Router>
		</>
	);
}

export default App;
