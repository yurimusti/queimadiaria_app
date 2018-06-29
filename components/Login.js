import React, { Component } from 'react';
import {
    View, AsyncStorage, Image, StyleSheet
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import { YellowBox } from 'react-native';
import { Button } from 'react-native-elements';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);




export default class componentName extends Component {


    constructor() {
        super();


    }



    login() {

        let link = 'https://api.themoviedb.org/3/authentication/token/new?api_key=85822ce5637e2d31d260901abc746e87';


        //RequestToken
        fetch(link, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'multipart/form-data',
            }),



        })
            .then((response) => {
                response.json().then((data) => {


                    //Session with login
                    fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=85822ce5637e2d31d260901abc746e87&username=yurimusti&password=marcella00&request_token=' + data.request_token, {
                        method: 'GET',
                        headers: new Headers({
                            'Content-Type': 'multipart/form-data',
                        }),



                    })
                        .then((response) => {


                            //Session
                            fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=85822ce5637e2d31d260901abc746e87&request_token=' + data.request_token, {
                                method: 'GET',
                                headers: new Headers({
                                    'Content-Type': 'multipart/form-data',
                                }),



                            })
                                .then((response) => {
                                    response.json().then((data) => {

                                        AsyncStorage.setItem('session_id', data.session_id);

                                        Actions.tabbar();

                                    })
                                })
                                .catch((error) => {
                                    console.warn(error);

                                })



                        })
                        .catch((error) => {
                            console.warn(error);

                        })


                })
            })
            .catch((error) => {
                console.warn(error);

            })

        //Session


    }


    render() {

        return (


            <View flex={1} style={style.container}>
                <View style={style.view1}>
                    <Image source={require('../logo.png')} style={style.image} />
                </View>
                <View flex={1} style={style.view2}>

                    <Button
                        title="ENTRAR"
                        onPress={() => this.login()}
                        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={style.btn_style}
                        containerStyle={{ marginTop: 20 }}
                    />
                </View>
            </View>
        )
    }
};

const style = StyleSheet.create({
    container:
    {
        backgroundColor: '#1d1d1d'
    },
    view1: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    image: { width: 300, height: 80, resizeMode: 'center' },
    view2: { alignItems: 'center', justifyContent: 'center' },
    btn_style: {
        backgroundColor: "rgba(255, 122,0, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    }




})
