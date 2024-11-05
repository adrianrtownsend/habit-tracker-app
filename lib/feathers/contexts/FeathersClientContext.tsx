// habit-tracker-app/lib/feathers/contexts/FeathersClientContext.tsx
import React, {
	createContext,
	useState,
	useEffect,
	useMemo,
	useReducer,
} from 'react';
import feathersClient from '..';

interface AuthData {
	email: string;
	password: string;
}

interface SignupResponse {
	id: string;
	email: string;
}

interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

type User = any | null;

type FeathersClientAction =
	| {
			user: User;
			type: 'SET_USER';
	  }
	| { type: 'LOGOUT' };

export const FeathersClientContext = createContext();

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

	const feathersClientReducer = (
		state: typeof initialState,
		action: FeathersClientAction
	) => {
		switch (action.type) {
			case 'SET_USER':
				return {
					...state,
					user: action.user,
					loading: false,
				};
			case 'LOGOUT':
				return {
					...state,
					user: null,
					loading: false,
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(feathersClientReducer, initialState);

	const getUser = async () => {
		try {
			const user = await feathersClient.get('authentication');
			console.log('context user: ', user);
			dispatch({ type: 'SET_USER', user });
		} catch (error) {
			dispatch({ type: 'SET_USER', user: null });
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const signup = async (data: AuthData) => {
		try {
			await feathersClient.service('users').create(data);
		} catch (error) {
			throw error;
		}
	};

	const login = async (data: AuthData) => {
		try {
			await feathersClient.authenticate({
				strategy: 'local',
				...data,
			});
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await feathersClient.logout();
			dispatch({ type: 'LOGOUT' });
		} catch (error) {
			throw error;
		}
	};

	const googleOAuth = async () => {
		try {
			await feathersClient.authenticate({
				strategy: 'google',
			});
		} catch (error) {
			throw error;
		}
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
