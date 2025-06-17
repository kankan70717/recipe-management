import type { User } from "firebase/auth";

export type AuthState = {
	user: User | null;
}

export type AuthAction =
	| { type: 'LOGIN', payload: User }
	| { type: 'LOGOUT' }
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
		default:
			return state;
	}
}