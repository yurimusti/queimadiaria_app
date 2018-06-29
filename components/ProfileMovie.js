import React, { Component } from 'react';
import {
    View, Text, Dimensions, Image, TouchableHighlight, AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    Rating
} from 'react-native-elements';

export default class componentName extends Component {

    constructor() {
        super();

        this.state = {
            data: []
        }
    }


    _markFavorite(media_id) {

        AsyncStorage.getItem('session_id')
            .then((value) => {
                let link = 'https://api.themoviedb.org/3/account/7751434/favorite?api_key=85822ce5637e2d31d260901abc746e87&session_id='+value
                console.warn(link)

                fetch(link, {
                    method: 'POST',
                    headers: new Headers({
                        "content-type":"application/json;charset=utf-8"
                    }),
                    body: JSON.stringify({
                        //  auth: 'yuri33@hotmail.com',
                        //  password: 'tete123',

                        "media_type": "movie",
                        "media_id": media_id,
                        "favorite": true


                    }),


                })
                    .then((response) => {
                      //  response.json().then((data) => {

                            console.warn(response)


                     //   })

                    })
                    .catch((error) => {
                        console.warn(error);

                    })

            }).done();






    }


    componentDidMount() {

        Actions.refresh({
            rightTitle:'Add',
            onRight: () => {
                this._markFavorite(this.props.id)
                alert('Filme adicionado aos favoritos.')
                Actions.meusfilmes();
            }
        })

        let link2 = 'https://api.themoviedb.org/3/movie/' + this.props.id + '?api_key=85822ce5637e2d31d260901abc746e87&language=pt-BR';


        fetch(link2, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'multipart/form-data',
            }),
            //body: formdata


        })
            .then((response) => {
                response.json().then((data) => {


                    this.setState({
                        title: data.original_title,
                        foto: data.backdrop_path,
                        sobre: data.overview,
                        vote_count: data.vote_count


                    })

                    console.warn(data);


                })

            })
            .catch((error) => {
                console.warn(error);

            })
    }


    render() {
        const width = Dimensions.get('screen').width;
        const height = Dimensions.get('screen').height;

        console.warn(this.props.id);


        const link = 'https://image.tmdb.org/t/p/w500' + this.state.foto;
        return (
            <View style={{ marginTop: 0, flex: 1, backgroundColor: '#1c1c1c' }}>

                <View style={{ marginTop: 60 }}>
                    <Image style={{ width: width, height: 250 }} source={{ uri: link }} />
                    <Text style={{ color: '#f3f3f3', fontWeight: 'bold', fontSize: 19, margin: 5 }}>{this.state.title}</Text>

                    <Text style={{ margin: 10, fontSize: 15, color: '#ccc' }}>{this.state.sobre}</Text>

                    <Text style={{ fontSize: 15, color: '#ccc' }}>Avaliação: {this.state.vote_count}/10000</Text>

                   


                </View>
            </View>
        )
    }
};
