import type { User } from "firebase/auth";

export type AuthState = {
	user: User | null;
	claims: Record<string, any> | null;
	error: string | null;
}

export type AuthAction =
	| { type: 'LOGIN', payload: User }
	| { type: 'LOGOUT' }
	| { type: 'SET_CLAIMS', payload: Record<string, any> }
	| { type: 'ERROR', payload: Error };

export default function authReducer(state: AuthState, action: AuthAction): AuthState {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				user: null,
			};
		case "SET_CLAIMS":
			return { ...state, claims: action.payload };
		default:
			return state;
	}
}