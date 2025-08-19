import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loginError, setLoginError] = useState<boolean | null>(null);
	const { loginWithEmailPassword } = useAuth();
	const navigate = useNavigate();

	const handleLoging = async () => {
		const result = await loginWithEmailPassword(email, password);
		if (result.success) {
			navigate('/home');
		} else {
			setLoginError(result.success);
		}
	}

	return (
		<div className="flex items-center justify-center w-full h-svh bg-gray-400">

			<div className="bg-white rounded-lg p-15 w-100 flex flex-col gap-5">
				<h1 className="text-center text-3xl">Sign in / Sign up</h1>

				<input
					type="email"
					placeholder="Email"
					id="email"
					className="p-3 rounded-lg bg-gray-200 w-full"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Password"
					id="password"
					className="p-3 rounded-lg bg-gray-200 w-full"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				{loginError == false ? <div className="text-red-500">Incorrect Email or Password</div> : ""}


				<div className="flex justify-evenly">
					<button
						className="rounded-full border-1 border-black py-1 px-3 w-30 hover:bg-black hover:text-white"
						onClick={handleLoging}>
						Sign In
					</button>
				</div>
			</div>

		</div>
	);
}