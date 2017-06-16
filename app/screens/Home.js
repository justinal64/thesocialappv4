import React, { Component } from "react";
import { View, TextInput, ScrollView } from "react-native";
import {
  Card,
  ListItem,
  Button,
  Badge,
  Avatar,
  Text
} from "react-native-elements";
import axios from "axios";
import Global from "../components/Global";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      post: ""
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/request/getall`).then(res => {
      this.setState({ userData: res.data });
      console.log(this.state.userData);
    });
  }

  submitToDb = () => {
    axios.post("http://localhost:5000/api/request", {
      Username: Global.USERNAME,
      Posts: this.state.post
    });
  };

  plusOne = post => {
    post.likes++;
    axios.put("http://localhost:5000/api/request", post).then(
      axios.get(`http://localhost:5000/api/request/getall`).then(res => {
        this.setState({ userData: res.data });
        console.log(this.state.userData);
      })
    );
  };

  render() {
    if (this.state.userData === null) return null;
    // const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
        <View>
          <Text h4>Welcome {Global.USERNAME}</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="New Post...."
            onChangeText={post => this.setState({ post })}
          />
          <Button
            raised
            buttonStyle={{ backgroundColor: "red", borderRadius: 10 }}
            textStyle={{ textAlign: "center" }}
            title={`Submit`}
            onPress={() => this.submitToDb()}
          />
        </View>
        {this.state.userData.map((user, key) =>
          <Card key={user.dbid} title={user.username}>
            <Text style={{ marginBottom: 10 }}>
              {user.posts}
            </Text>
            <Badge
              onPress={() => {
                this.plusOne(user);
              }}
              value={user.likes}
            />
          </Card>
        )}
      </ScrollView>
    );
  }
}

// Fix username not persisting after reopening the app
