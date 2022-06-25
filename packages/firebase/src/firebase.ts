import { FirebaseOptions, initializeApp } from "firebase/app";

export const initFirebase = (config: FirebaseOptions) => {
  return initializeApp(config);  
};
