import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./context/AuthContext"
import MainContent from "./components/MainContent/MainContent"
import FilterLayout from "./components/Filter/Layout/FilterLayout"
import { getSetting } from "./firebase/firestore"
import FilterResultLayout from "./components/Filter/Layout/FilterResultLayout"

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		loader: getSetting,
		children: [
			{
				path: "dish",
				element: <MainContent />,
				children: [
					{ index: true, element: <FilterLayout /> },
					{ path: ":filterCondition", element: <FilterResultLayout /> },
				],
			},
			{
				path: "prep",
				element: <MainContent />,
				children: [
					{ index: true, element: <FilterLayout /> },
					{ path: ":filterCondition", element: <FilterResultLayout /> },
				],
			},
			{
				path: "ingredient",
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
