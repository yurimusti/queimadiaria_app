import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class Inicio extends Component {

  constructor() {
    super()

    this.state = {
      data: [

      ],
      principal: {
        backdrop_path: ''
      }
    }
  }

  componentDidMount() {


    //RequestToken
    let link2 = 'https://api.themoviedb.org/3/movie/500?api_key=85822ce5637e2d31d260901abc746e87&language=pt-BR'
    fetch(link2, {
      method: 'GET',
      headers: formdata2

    })
      .then((response) => {
        response.json().then((data) => {

          this.setState({
            principal: data
          })

        })

      })
      .catch((error) => {
        console.warn(error);

      })




    const formdata2 = new FormData();


    let link = 'https://api.themoviedb.org/3/movie/popular?api_key=85822ce5637e2d31d260901abc746e87&language=pt-BR&page=1';

    fetch(link, {
      method: 'GET',
      headers: formdata2

    })
      .then((response) => {
        response.json().then((data) => {


          //Actions.tabbar();
          this.setState({
            data: data.results
          })



        })

      })
      .catch((error) => {
        console.warn(error);

      })

    AsyncStorage.getItem('session_id')
      .then((value) => {


        let link = 'https://api.themoviedb.org/3/account?api_key=85822ce5637e2d31d260901abc746e87&session_id=' + value
        const formdata2 = new FormData();


        fetch(link, {
          method: 'GET',
          headers: formdata2

        })
          .then((response) => {
            response.json().then((data) => {



              this.setState({ id: data.id });

              //

            })

          })
          .catch((error) => {
            console.warn(error);

          })
      }).done();

    AsyncStorage.setItem('id', this.state.id)




  }


  render() {

    AsyncStorage.getItem('id')
      .then((value) => {


        this.setState({
          id: value
        })


      }).done();

    return (
      <View style={style.container}>

        <View style={style.view1}>
          <Image style={style.view1_image} source={{ uri: 'https://image.tmdb.org/t/p/w500' + this.state.principal.backdrop_path }} />
          <View style={style.absolute}>
            <Image style={style.view1_image2} source={{ uri: 'https://image.tmdb.org/t/p/w500' + this.state.principal.poster_path }} />
            <View style={style.view1_margin}>
              <Text style={style.text_title}>{this.state.principal.title}</Text>
              <Text style={style.text_overview}>{this.state.principal.overview}</Text>
              <TouchableHighlight onPress={() => Actions._profilemovie({ id: this.state.principal.id, account_id: this.state.value })}>
                <View style={style.btn_detalhes}>
                  <Text style={style.text_detalhes}>+Detalhes</Text>
                </View>
              </TouchableHighlight>
            </View>

          </View>
        </View>

        <View flex={1}>
          <Text style={style.text_populares}>Populares</Text>
          <FlatList
            horizontal
            data={this.state.data}
            renderItem={({ item, index }) =>
              <MyItem id={item.id} titulo={item.title} image={item.poster_path} vote_average={item.vote_average} />

            }
            keyExtractor={item => item.nome_empresa}
          />
        </View>

      </View>
    );
  }
}

class MyItem extends Component {


  render() {

    const link = 'https://image.tmdb.org/t/p/w500' + this.props.image;



    return (
      <View style={style.container_myitem}>
        <TouchableHighlight onPress={() => Actions._profilemovie({ id: this.props.id })}>
          <Image style={style.image_myitem} source={{ uri: link }} />
        </TouchableHighlight>



      </View >




    );
  }

}

const style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1c1c1c'
  },
  view1: { flex: 0.8, marginTop: 60 },
  view1_image: {
    flex: 1,
    opacity: .3
  },
  absolute: {
    position: 'absolute',
    margin: 30,
    flexDirection: 'row'
  },
  view1_image2: {
    width: 140,
    height: 210,
    marginTop: 0
  },
  view1_margin: {
    marginLeft: 30,
    flex: 1
  },
  text_title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19
  },
  text_overview: {
    color: '#fff',
    fontSize: 10
  },
  btn_detalhes: {
    height: 25,
    backgroundColor: '#db0000',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  text_detalhes: {
    color: '#fff',
    fontWeight: 'bold'
  },
  text_populares: {
    color: '#fff',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 14
  },




  container_myitem: {
    margin: 5,
    borderRadius: 0
  },
  image_myitem: {
    width: 150,
    height: 280,
  }
});
