Improved error handling for Firebase Authentication:

```javascript
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// ... Firebase configuration

const auth = getAuth();

function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User created successfully:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/invalid-email') {
        console.error('Invalid email address:', errorMessage);
      } else if (errorCode === 'auth/network-request-failed') {
        console.error('Network request failed:', errorMessage);
      } else {
        console.error('An unexpected error occurred:', errorCode, errorMessage);
      }
    });
}

// ... Other Firebase functions

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log('User signed in:', uid);
  } else {
    // User is signed out
    console.log('User signed out');
  }
});

//Example usage
createUser('invalid@email', 'password');
```