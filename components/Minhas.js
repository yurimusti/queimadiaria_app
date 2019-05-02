import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class Minhas extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("session_id")
      .then(value => {
        let link =
          "https://api.themoviedb.org/3/account/7751434/favorite/movies?api_key=85822ce5637e2d31d260901abc746e87&session_id=" +
          value +
          "&language=pt-BR&sort_by=created_at.asc&page=1";
        const formdata2 = new FormData();

        fetch(link, {
          method: "GET",
          headers: formdata2
        })
          .then(response => {
            response.json().then(data => {
              console.warn(data);
              this.setState({
                data: data.results
              });
              //
            });
          })
          .catch(error => {
            console.warn(error);
          });
      })
      .done();
  }

  render() {
    const { data } = this.state
    return (
      <View flex={1} style={{ backgroundColor: "#1c1c1c" }}>
        <View style={{ marginTop: 60 }}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <MyItem
                id={item.id}
                titulo={item.title}
                image={item.backdrop_path}
                vote_average={item.vote_average}
              />
            )}
            keyExtractor={item => item.nome_empresa}
          />
        </View>
      </View>
    );
  }
}

class MyItem extends Component {
  render() {
    const { image, id } = this.props;
    const link = "https://image.tmdb.org/t/p/w500" + image;

    return (
      <View style={{ margin: 5, borderRadius: 0 }}>
        <TouchableHighlight
          onPress={() => Actions._profilemovie({ id })}
        >
          <Image style={{ width: width, height: 280 }} source={{ uri: link }} />
        </TouchableHighlight>
      </View>
    );
  }
}
const width = Dimensions.get("screen").width;
