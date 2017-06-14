import React, { Component } from "react";
import { View } from "react-native";
import {
  Card,
  Button,
  FormLabel,
  FormInput,
  Text
} from "react-native-elements";
import { onSignIn, auth, registerUser } from "../auth";
import axios from "axios";
import GLOBAL from "../components/Global";
import { onSignOut } from "../auth";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      company: "",
      posts: ""
    };
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Text h2>{GLOBAL.USERNAME}</Text>
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() =>
              onSignOut().then(() => navigation.navigate("SignedOut"))}
          />
        </Card>
      </View>
    );
  }
}
