import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./context/AuthContext"
import MainContent from "./components/MainContent/MainContent"
import FilterLayout from "./pages/Filter/FilterLayout"
import { customLoaders } from "./firebase/firestore"
import Home from "./pages/Home/Home"
import FilterResultLayout from "./pages/Filter/component/FilterResultLayout"
import SettingLayout from "./pages/Setting/SettingLayout"
import { UserLayout } from "./pages/User/UserLayout"

const router = createBrowserRouter([
	{
		path: "/",
		index: true,
		element: <LoginPage />,
	},
	{
		path: "/",
		element: <Dashboard />,
		loader: customLoaders,
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
			{
				path: "setting",
				element: <MainContent />,
				children: [
					{ index: true, element: <SettingLayout /> },
				],
			},
			{
				path: "user",
				element: <MainContent />,
				children: [
					{ index: true, element: <UserLayout /> },
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
