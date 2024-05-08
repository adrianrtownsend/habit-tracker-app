import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	signInWithCustomToken,
	signOut,
	updateProfile,
	deleteUser,
} from 'firebase/auth';
import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useMemo,
	ReactNode,
} from 'react';

type User = any | null;

interface FirebaseInitialContextType {
	loading: boolean;
	user: User;
}

interface FirebaseContextType {
	loading: boolean;
	user: User;
	loginWithGooglePopup: () => void;
	logout: () => void;
	loginWithGoogleRedirect: () => void;
	registerUserWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<void>;
	loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
	deleteUserProfile: () => Promise<void>;
	getIdToken: () => boolean | Promise<string | boolean>;
	ctxSignOut: () => void;
	sendPasswordResetEmailLink: (email: string) => Promise<void>;
	updateUser: (
		displayName?: string | null,
		photoURL?: string | null
	) => Promise<void>;
}

const firebaseInitialContext = {
	user: null,
	loading: true,
};

export const FirebaseContext = createContext(firebaseInitialContext);

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const useFirebase = () => {
	const context = useContext(FirebaseContext);
	if (!context) {
		throw new Error('useFirebase must be used within a FirebaseProvider');
	}
	return context;
};

export const sendPasswordResetEmailLink = (email: string) =>
	sendPasswordResetEmail(auth, email);

export const updateUser = (
	displayName?: string | null,
	photoURL?: string | null
) =>
	new Promise((resolve, reject) => {
		if (!auth.currentUser) {
			reject(new Error('Unable to retrieve user credentials'));
		} else {
			updateProfile(auth.currentUser, { displayName, photoURL })
				.then(() => resolve(auth.currentUser))
				.catch((error) => reject(error));
		}
	});

export const loginWithGooglePopup = () =>
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			// The signed-in user info.
			const user = result.user;
			// user.getIdToken().then((token) => {
			//   dispatch({ type: "SET_USER", payload: { ...user, token } });
			// });
			// IdP data available using getAdditionalUserInfo(result)
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
		});

export const logout = () => signOut(auth);

export const loginWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const registerUserWithEmailAndPassword = (
	email: string,
	password: string,
	displayName?: string,
	photoURL?: string
) =>
	new Promise((resolve, reject) =>
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				if (displayName || photoURL) {
					updateUser(displayName, photoURL).then(() => {
						resolve(userCredential.user);
					});
				}
				resolve(userCredential.user);
			})
			.catch((error) => {
				reject(error);
			})
	);

export const loginWithEmailAndPassword = (email: string, password: string) =>
	new Promise((resolve, reject) =>
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				resolve(userCredential.user);
			})
			.catch((error) => {
				reject(error);
			})
	);

export const deleteUserProfile = () =>
	auth.currentUser && deleteUser(auth.currentUser);

export const getIdToken = () => {
	if (!auth.currentUser) return false;
	return auth.currentUser
		?.getIdToken(true)
		.then((idToken) => {
			return idToken;
		})
		.catch((error) => {
			return false;
		});
};

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
	const initialState = useMemo(() => {
		return firebaseInitialContext;
	}, []);

	type FirebaseAction =
		| { type: 'CONNECTED' }
		| { type: 'SET_USER'; payload: User }
		| { type: 'LOGOUT' };

	const firebaseReducer = (
		state: typeof initialState,
		action: FirebaseAction
	) => {
		switch (action.type) {
			case 'CONNECTED':
				return { ...state, loading: false };
			case 'SET_USER':
				return { user: action.payload, loading: false };
			case 'LOGOUT':
				return { ...state, user: null, loading: false };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(firebaseReducer, initialState);

	// Listen for Firebase authentication state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch({ type: 'SET_USER', payload: user });
			} else {
				dispatch({ type: 'LOGOUT' });
			}
			dispatch({ type: 'CONNECTED' });
		});

		return () => unsubscribe();
	}, []);

	const contextValue = useMemo(
		() => ({
			loading: state.loading,
			user: state.user,
		}),
		[state.user, state.loading]
	);

	return (
		<FirebaseContext.Provider value={contextValue}>
			{children}
		</FirebaseContext.Provider>
	);
};
