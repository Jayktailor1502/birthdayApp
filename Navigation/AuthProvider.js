import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        console.log({children}),
        <>
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        console.log(email + password)
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                googleLogin: async () => {
                    try {
                      // Get the users ID token
                      const { idToken } = await GoogleSignin.signIn();
          
                      // Create a Google credential with the token
                      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          
                      // Sign-in the user with the credential
                      await auth().signInWithCredential(googleCredential)
                      // Use it only when user Sign's up, 
                      // so create different social signup function
                      // .then(() => {
                      //   //Once the user creation has happened successfully, we can add the currentUser into firestore
                      //   //with the appropriate details.
                      //   // console.log('current User', auth().currentUser);
                      //   firestore().collection('users').doc(auth().currentUser.uid)
                      //   .set({
                      //       fname: '',
                      //       lname: '',
                      //       email: auth().currentUser.email,
                      //       createdAt: firestore.Timestamp.fromDate(new Date()),
                      //       userImg: null,
                      //   })
                      //   //ensure we catch any errors at this stage to advise us if something does go wrong
                      //   .catch(error => {
                      //       console.log('Something went wrong with added user to firestore: ', error);
                      //   })
                      // })
                      //we need to catch the whole sign up process if it fails too.
                      .catch(error => {
                          console.log('Something went wrong with sign up: ', error);
                      });
                    } catch(error) {
                      console.log({error});
                    }
                  },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.error(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>      
    </>
    );
};
