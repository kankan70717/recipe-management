import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./context/AuthContext"
import MainContent from "./components/MainContent/MainContent"
import FilterLayout from "./components/Filter/Layout/FilterLayout"
import { getSetting } from "./firebase/firestore"
import FilterResultLayout from "./components/Filter/Layout/FilterResultLayout"
import Home from "./components/Home/Home"

const router = createBrowserRouter([
	{
		path: "/",
		index: true,
		element: <LoginPage />,
	},
	{
		path: "/",
		element: <Dashboard />,
		loader: getSetting,
		children: [
			{
				path: "home",
				element: <MainContent />,
				children: [
					{ index: true, element: <Home /> }
				],
			},
			{
				path: "search",
				element: <MainContent />,
				children: [
					{ index: true, element: <FilterLayout /> },
					{ path: "result", element: <FilterResultLayout /> },
				],
			},
		],
	},
]);

export default function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}
