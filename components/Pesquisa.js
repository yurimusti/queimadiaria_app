import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Actions } from "react-native-router-flux";

export default class Pesquisa extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }

  onchangepesquisa(query) {
    const read_api = "85822ce5637e2d31d260901abc746e87";

    const formdata = new FormData();

    let link =
      "https://api.themoviedb.org/3/search/movie?api_key=" +
      read_api +
      "&query=" +
      query +
      "&language=pt-br";

    fetch(link, {
      method: "GET",
      headers: formdata
    })
      .then(response => {
        response.json().then(data => {
          this.setState({
            data: data.results
          });
        });
      })
      .catch(error => {
        console.warn(error);
      });
  }

  render() {
      const { data } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: "#1c1c1c" }}>
        <View style={{ marginTop: 60 }}>
          <SearchBar
            containerStyle={{ backgroundColor: "#1c1c1c" }}
            placeholderTextColor={"#aaa"}
            round
            searchIcon={{ size: 24 }}
            onChangeText={text => this.onchangepesquisa(text)}
            placeholder="Digite o nome do filme"
          />
        </View>

        <View style={{ marginTop: 0 }}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <MyItem
                id={item.id}
                titulo={item.title}
                image={item.backdrop_path}
                overview={item.overview}
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
const width = Dimensions.get("screen").width;
class MyItem extends Component {
  render() {
      const { image, id, titulo } = this.props;
    const link = "https://image.tmdb.org/t/p/w500" + image;

    return (
      <TouchableHighlight
        onPress={() => Actions._profilemovie({ id })}
      >
        <View style={{ backgroundColor: "#1c1c1c", marginBottom: 20 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 5
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              {titulo}
            </Text>
          </View>
          <Image style={{ width: width, height: 220 }} source={{ uri: link }} />
        </View>
      </TouchableHighlight>
    );
  }
}
