import { ref, reactive } from 'vue';
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import router from '../router/router'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    appId: process.env.VUE_APP_APP_ID
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

// utils
export const auth = firebase.auth()

export let user = ref(null)

export let error = reactive({
    title: "Whoops!",
    message: null
})

var authSettings = { url: "http://localhost:3000" }

export let verify = ref(false);

export const RegisterUser = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(result){
        if (result.user) {
            if (result.user.emailVerified == false) {
                result.user.sendEmailVerification(authSettings).then(function() {
                    localStorage.setItem("email", "true");
                    error.message = "Account created! Check email for verification."
                }, function(error) {
                    error.message = "Something went wrong. We couldn't verify your email at this time. Please try again later."
                });
            }
        } else {
            console.log('Not Logged In');
        }
    })
    .catch((err) => {
        error.message = err.message
        console.log(err)
    })
}

//TO-DO: Custom verification email text - https://firebase.google.com/docs/auth/admin/email-action-links#generate_email_verification_link

export const Verification = () => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
        if (firebaseUser.emailVerified == true) {
            if (localStorage.getItem("email") !== null) {
                localStorage.removeItem("email");
            }
            user.value = firebaseUser;
        }
    }
    })
}

export const PasswordlessLogin = (email) => {
    const actionCodeSettings = {
        url: "http://localhost:3000/",
        handleCodeInApp: true
    }
    auth.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(function() {
            localStorage.setItem("emailForSignIn", email)
            verify.value = true
        })
        .catch(function(err){
            console.log(err)
        })
}

export const checkForMagicLink = () => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
        var email = window.localStorage.getItem('emailForSignIn');
        if (!email){
            console.log("No Email")
        }
        auth.signInWithEmailLink(email, window.location.href)
            .then(function(result){
                window.localStorage.removeItem('emailForSignIn');
                user.value = result.user
                console.log("Success")
                console.log(user.value)
                router.push({path: "/"});
            })
            .catch(function(err){
                console.log(err)
            })
    }
}

export const SignInUser = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        error.message = null
        router.replace({name: "Dashboard"})
    })
    .catch((err) => {
        error.message = err.message
    })
}

export const SignOutUser = () => {
    auth.signOut()
    .then(() => {
      error.message = null
      router.push({name: "SignIn"})
    })
}

auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        user.value = firebaseUser
    }
    else {
        user.value = null
    }
})
