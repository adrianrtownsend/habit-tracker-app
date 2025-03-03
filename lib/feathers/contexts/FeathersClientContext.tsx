// habit-tracker-app/lib/feathers/contexts/FeathersClientContext.tsx
import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import feathersClient from '..';
import { LoginSchemaType } from '@/utils/schemas';

interface AuthData {
	email: string;
	password: string;
}

interface User {
	_id: string;
	// Add other properties of the Feathers user object as needed
}

interface FeathersClientContextType {
	user: User | null;
	loading: boolean;
	signup: (data: AuthData) => Promise<void>;
	login: (data: LoginSchemaType) => Promise<void>;
	logout: () => Promise<void>;
	googleOAuth: () => Promise<void>;
}

export const FeathersClientContext = createContext<FeathersClientContextType>({
	user: null,
	loading: true,
	signup: async () => {},
	login: async () => {},
	logout: async () => {},
	googleOAuth: async () => {},
});

export const FeathersClientProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const initialState = useMemo(
		() => ({
			user: null,
			loading: true,
		}),
		[]
	);

	const feathersClientReducer = (state: typeof initialState, action: any) => {
		switch (action.type) {
			case 'SET_USER':
				return {
					...state,
					user: action.user || null,
					token: action.token || null,
					loading: false,
				};
			case 'LOGOUT':
				return {
					...state,
					user: null,
					token: null,
					loading: false,
				};
			case 'SET_LOADING':
				return {
					...state,
					loading: false,
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(feathersClientReducer, initialState);

	const getUser = async () => {
		try {
			const auth = await feathersClient.reAuthenticate();
			dispatch({ type: 'SET_USER', user: auth.user, token: auth.accessToken });
		} catch (error) {
			dispatch({ type: 'SET_USER' });
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const signup = async (data: AuthData) => {
		const user = await feathersClient.service('users').create({
			email: data.email,
			password: data.password,
		});
		dispatch({ type: 'SET_USER', user });
	};

	const login = async (data: LoginSchemaType) => {
		const auth = await feathersClient.authenticate({
			strategy: 'local',
			...data,
		});
		dispatch({ type: 'SET_USER', user: auth.user, token: auth.accessToken });
	};

	const logout = async () => {
		await feathersClient.logout();
		dispatch({ type: 'LOGOUT' });
	};

	const googleOAuth = async () => {
		const user = await feathersClient.authenticate({
			strategy: 'google',
		});
		dispatch({ type: 'SET_USER', user });
	};

	const contextValue = useMemo(
		() => ({
			user: state.user,
			loading: state.loading,
			signup,
			login,
			logout,
			googleOAuth,
		}),
		[state.user]
	);

	return (
		<FeathersClientContext.Provider value={contextValue}>
			{children}
		</FeathersClientContext.Provider>
	);
};
