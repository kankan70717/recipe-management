import { createContext, useContext } from "react";

type User = {
	email: string;
};

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: {
	children: React.ReactNode
}) => {
	const user = { email: "user@example.com" }

	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => useContext(UserContext);
