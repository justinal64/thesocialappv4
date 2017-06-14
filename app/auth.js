import { AsyncStorage } from "react-native";
import axios from "axios";
import Global from "./components/Global";
export let USER_KEY = "auth-demo-key";
export let USERNAME = Global.USERNAME;

export const auth = (email, password) => {
  console.log("email = ", email);
  console.log("password = ", password);
};

export const registerUser = (user, navigation) => {
  console.log("user = ", user);
  axios
    .post("http://localhost:5000/api/account", {
      Username: user.Username,
      Password: user.Password,
      dbid: user.dbid
    })
    .then(function(response) {
      Global.USERNAME = user.Username;
      onSignIn().then(() => navigation.navigate("SignedIn"));
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
