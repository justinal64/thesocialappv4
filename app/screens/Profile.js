import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import {
  Card,
  Button,
  FormLabel,
  FormInput,
  Text,
  List,
  ListItem,
  Icon
} from "react-native-elements";
import { onSignIn, auth, registerUser } from "../auth";
import axios from "axios";
import GLOBAL from "../components/Global";
import { onSignOut } from "../auth";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      username: "",
      company: "",
      posts: ""
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/request/${GLOBAL.USERNAME}`)
      .then(res => {
        this.setState({ userData: res.data });
      });
  }

  removeFromDb = dbid => {
    axios.delete(`http://localhost:5000/api/request/${dbid}`).then(
      axios
        .get(`http://localhost:5000/api/request/${GLOBAL.USERNAME}`)
        .then(res => {
          this.setState({ userData: res.data });
        })
    );
  };

  render() {
    if (this.state.userData === null) return null;
    const navigation = this.props.navigation;
    return (
      <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
        <Card>
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
            <Text style={{ color: "white", fontSize: 28 }}>
              {GLOBAL.USERNAME}
            </Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() =>
              onSignOut().then(() => navigation.navigate("SignedOut"))}
          />
        </Card>
        <View>
          <Text h4>Activity</Text>
          {this.state.userData.map((user, key) =>
            <Card key={user.dbid} title={user.username}>
              <Text style={{ marginBottom: 10 }}>
                {user.posts}
                <Icon
                  raised
                  name="delete"
                  type="material-icons"
                  color="#f50"
                  onPress={() => this.removeFromDb(user.dbid)}
                />
              </Text>
              {/*<Badge value={3} textStyle={{ color: "orange" }} />*/}
            </Card>
          )}
        </View>
      </ScrollView>
    );
  }
}
