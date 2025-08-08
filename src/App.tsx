import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./context/AuthContext"
import MainContent from "./components/MainContent/MainContent"
import ItemDetail from "./components/MainContent/ItemDetail"
import FilterLayout from "./components/Filter/Layout/FilterLayout"
import { getSetting } from "./firebase/firestore"

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
					{ path: ":dishItemId", element: <ItemDetail /> },
				],
			},
			{
				path: "prep",
				element: <MainContent />,
				children: [
					{ index: true, element: <FilterLayout /> },
					{ path: ":prepItemId", element: <ItemDetail /> },
				],
			},
			{
				path: "ingredient",
				element: <MainContent />,
				children: [
					{ index: true, element: <FilterLayout /> },
					{ path: ":ingredientItemId", element: <ItemDetail /> },
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
