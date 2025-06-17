import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./context/AuthContext"

function App() {

	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	)
}

export default App
