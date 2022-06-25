import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  AuthProvider,
  AuthError,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  NextOrObserver,
  User } from "firebase/auth";
import googleProvider from './providers/googleProvider';
import { Router } from 'vue-router';

type Providers = 'google'

const getProvider = (name: Providers): AuthProvider => {
  return googleProvider;
};

export const signIn = async (provider: Providers) => {
  
  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, getProvider(provider));
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;

    return [null, { 
      token,
      user,
    }];
    // ...
  } catch (e) {
    // Handle Errors here.
    const error = e as AuthError;
    const code = error.code;
    const message = error.message;
    return [
      {
        code,
        message,
      },
    ];
  }
};

export const onAuthStateChanged = (callback: NextOrObserver<User>) => {
  const auth = getAuth();
  return onFirebaseAuthStateChanged(auth, callback);
};

export const isAuthenticated = () => {
  return new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const configureAuthGuard = (router: Router) => {
  router.beforeResolve(async (to) => {
    const user = await isAuthenticated();
    if (to.meta.auth && !user) {
      return '/';
    }
    return true;
  });
};

export const signOut = () => {
  const auth = getAuth();
  return auth.signOut();
};
