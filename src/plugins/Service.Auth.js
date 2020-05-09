import * as firebase from 'firebase/app';
import BaseError from './../models/Error';

export default {
  authenticateUser() {
    let self = this;

    return new Promise((resolve, reject) => {
      let credential = self.$services().getCredential();

      if (credential) {
        resolve();
      } else {
        self
          .$services()
          .signOut()
          .then(function () {
            reject(
              new BaseError('auth/invalid-credential', 'Invalid credential.')
            );
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },
  getCredential() {
    let credential = null;

    try {
      let credentialString = localStorage.getItem('ec:auth:credential');

      if (credentialString) {
        credential = firebase.auth.AuthCredential.fromJSON(credentialString);
      }
    } catch (error) {
      console.error(`Getting credential failed.
      Error Message: ${error.message}`);
    }

    return credential;
  },
  signInWithPopup(provider) {
    let self = this;

    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (userCredential) {
          self
            .$services()
            .signedInHandler(userCredential)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          let credential = error.credential;

          console.error(`Login with provider by redirect failed. 
            Error Code: ${error.code}
            Error Message: ${error.message}
            User Email: ${error.email}
            Provider ID: ${credential.providerId}
            Credential Type: ${credential.signInMethod}`);

          reject(error);
        });
    });
  },
  signedInHandler(userCredential) {
    let self = this;

    return new Promise((resolve, reject) => {
      let user = userCredential.user;
      let credential = userCredential.credential;

      if (credential) {
        self.$services().storeCredential(credential);
      }

      if (user) {
        self.$store.dispatch('updateUser', {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });

        resolve();
      } else {
        reject();
      }
    });
  },
  signOut() {
    let self = this;

    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          self.$store.dispatch('clearUser');
          localStorage.removeItem('ec:auth:credential');
          self.$router.push('/');

          resolve();
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;

          console.error(
            `Signing out failed. Error Code: ${errorCode}. Error Message: ${errorMessage}`
          );

          reject(error);
        });
    });
  },
  storeCredential(credential) {
    try {
      localStorage.setItem('ec:auth:credential', JSON.stringify(credential));
    } catch (error) {
      console.error(`Setting credential failed.
      Error Code: ${error.code}
      Error Message: ${error.message}`);
    }
  },
};
