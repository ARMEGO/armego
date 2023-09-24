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
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [_location, setLocation] = useLocation();

	useEffect(() => {
		setLocation(user.token ? Path.HOME : Path.LOGIN);
	}, [user.token]);

	const handleLogOut = () => {
		dispatch(signOut());
	};

	const isAdmin = user.username === "admin";

	return (
		<>
			{user.token && (
				<Header username={user.username} onLogOut={handleLogOut} />
			)}
			<Router>
				<Route path={Path.LOGIN} component={Login} />
				<Route path={Path.HOME} component={isAdmin ? Home : ReviewRequests} />
				{isAdmin && <Route path={Path.EMPLOYEE} component={Reviews} />}
			</Router>
		</>
	);
}

export default App;
