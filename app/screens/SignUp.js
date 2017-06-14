import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn, auth, registerUser } from "../auth";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      cpassword: ""
    };
  }
  // syntax sugar if time permits
  // password.toString() === cpassword.toString() ? true : false;
  cPassword = (password, cpassword, navigation, username) => {
    if (
      password.toString() === cpassword.toString() &&
      password.toString() != ""
    ) {
      var user = {
        Username: username,
        Password: password,
        dbid: ""
      };
      registerUser(user, navigation);
    } else return false;
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Username</FormLabel>
          <FormInput
            placeholder="Username...."
            onChangeText={username => this.setState({ username })}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Password..."
            onChangeText={password => this.setState({ password })}
          />
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Confirm Password..."
            onChangeText={cpassword => this.setState({ cpassword })}
          />
          {/*<UselessTextInputMultiline />*/}
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={() => {
              this.cPassword(
                this.state.cpassword,
                this.state.password,
                navigation,
                this.state.username
              );
            }}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />
        </Card>
      </View>
    );
  }
}

// TO DO
// 1. OnLoseFocus to validate password.cpassword

// <View>
//   <Tile
//     imageSrc={{ require: zoey }}
//     title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
//     featured
//     caption="Some Caption Text"
//   />
// </View>
