import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./context/AuthContext"
import MainContent from "./components/MainContent/MainContent"
import ItemDetail from "./components/MainContent/ItemDetail"
import AllergenFilter from "./components/MainContent/AllergenFilter"
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
								<Route path="dish" element={<MainContent />} >
									<Route index element={<AllergenFilter />} />
									<Route path=":dishItemId" element={<ItemDetail />} />
								</Route>
								<Route path="prep" element={<MainContent />} >
									<Route index element={<AllergenFilter />} />
									<Route path=":prepItemId" element={<ItemDetail />} />
								</Route>
								<Route path="ingredient" element={<MainContent />} >
									<Route index element={<AllergenFilter />} />
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
