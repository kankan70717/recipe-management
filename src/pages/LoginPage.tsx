export default function LoginPage() {
	return (
		<div className="flex items-center justify-center w-full h-svh bg-gray-400">

			<div className="bg-white rounded-lg p-15 w-100 flex flex-col gap-5">
				<h1 className="text-center text-3xl">Sign in / Sign up</h1>

				<input
					type="email"
					placeholder="Email"
					id="email"
					className="p-3 rounded-lg bg-gray-200 w-full"
				/>

				<input
					type="password"
					placeholder="Password"
					id="password"
					className="p-3 rounded-lg bg-gray-200 w-full"

				/>

				<div className="flex justify-evenly mt-5">
					<button className="rounded-full border-1 border-black py-1 px-3 w-30 hover:bg-black hover:text-white">Sign In</button>
				</div>
			</div>

		</div>
	);
}