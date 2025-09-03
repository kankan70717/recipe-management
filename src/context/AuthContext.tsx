import { createContext, useContext, useEffect, useReducer } from "react";
import type { AuthState } from "./AuthReducer";
import authReducer from "./AuthReducer";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

type AuthContextType = {
	state: AuthState,
	dispatch: React.Dispatch<any>,
	loginWithEmailPassword: (email: string, password: string) => Promise<{ success: boolean }>,
	logout: () => Promise<void>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		claims: null,
		error: null
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				dispatch({ type: "LOGIN", payload: firebaseUser });

				const token = await firebaseUser.getIdTokenResult(true);
				dispatch({ type: "SET_CLAIMS", payload: token.claims });
			} else {
				dispatch({ type: "LOGOUT" });
			}
		});

		return () => unsubscribe();
	}, []);

	const loginWithEmailPassword = async (email: string, password: string) => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			dispatch({ type: 'LOGIN', payload: result.user });
			return { success: true };
		}
		catch (error) {
			if (error instanceof Error) {
				dispatch({ type: 'ERROR', payload: error });

			} else {
				dispatch({ type: 'ERROR', payload: new Error("An unknown error occurred") });
			}
			return { success: false };
		}
	}

	const logout = async () => {
		try {
			await signOut(auth);
			dispatch({ type: 'LOGOUT' });
		} catch (error) {
			if (error instanceof Error) {
				dispatch({ type: 'ERROR', payload: error });
			} else {
				dispatch({ type: 'ERROR', payload: new Error("An unknown error occurred") });
			}
		}
	}

	return (
		<AuthContext.Provider value={{ state, dispatch, loginWithEmailPassword, logout }}>
			{children}
		</AuthContext.Provider>
	);

};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}