import React, { Component } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Avatar } from "react-native-elements";

export default class Perfil extends Component {
  constructor() {
    super();

    this.state = {
      session_id: ""
    };
  }

  componentDidMount() {
    const { id } = this.state;
    AsyncStorage.getItem("session_id")
      .then(value => {
        let link =
          "https://api.themoviedb.org/3/account?api_key=85822ce5637e2d31d260901abc746e87&session_id=" +
          value;
        const formdata2 = new FormData();

        fetch(link, {
          method: "GET",
          headers: formdata2
        })
          .then(response => {
            response.json().then(data => {
              this.setState({ user_name: data.username, id: data.id });
            });
          })
          .catch(error => {
          });
      })
      .done();

    AsyncStorage.setItem("id", id);
  }

  render() {
    const { user_name } = this.state;
    return (
      <View flex={1} style={{ backgroundColor: "#1c1c1c" }}>
        <View style={style.container}>
          <View style={style.containerPhoto}>
            <Avatar
              xlarge
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              }}
              activeOpacity={0.7}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 5
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 19 }}>
                {user_name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const width = Dimensions.get("screen").width;

const style = StyleSheet.create({
  container: {
    top: 80,
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  }
});
