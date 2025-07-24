import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./context/AuthContext"
import MainContent from "./components/MainContent/MainContent"
import ItemDetail from "./components/MainContent/ItemDetail"
import ItemList from "./components/MainContent/ItemList"
import AllergenFilter from "./components/MainContent/AllergenFilter"
import AllergenResult from "./components/MainContent/AllergenResult"
import { SettingsProvider } from "./context/SettingsContext"

function App() {

	return (
		<>
			<AuthProvider>
				<SettingsProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<LoginPage />} />
							<Route path="/dashboard" element={<Dashboard />} >
								<Route path="allergen_search" element={<MainContent />} >
									<Route index element={<AllergenFilter />} />
									<Route path="result" element={<AllergenResult />} />
								</Route>
								<Route path="dish_list" element={<MainContent />} >
									<Route index element={<ItemList />} />
									<Route path=":dishItemId" element={<ItemDetail />} />
								</Route>
								<Route path="prep_list" element={<MainContent />} >
									<Route index element={<ItemList />} />
									<Route path=":prepItemId" element={<ItemDetail />} />
								</Route>
								<Route path="ingredient_list" element={<MainContent />} >
									<Route index element={<ItemList />} />
									<Route path=":ingredientItemId" element={<ItemDetail />} />
								</Route>
							</Route>
						</Routes>
					</BrowserRouter>
				</SettingsProvider>
			</AuthProvider>
		</>
	)
}

export default App
