import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class Perfil extends Component {

  constructor(){
    super();

    this.state = {
      session_id: ''
    }
  }

  componentDidMount(){

    AsyncStorage.getItem('session_id')
    .then((value) => {

      
      let link='https://api.themoviedb.org/3/account?api_key=85822ce5637e2d31d260901abc746e87&session_id='+value
      const formdata2 = new FormData();
  

      fetch(link, {
        method: 'GET',
        headers: formdata2
  
      })
        .then((response) => {
          response.json().then((data) => {
            
           
  
            this.setState({user_name:data.username, id:data.id});
            console.warn(data.id);
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

    return (
      <View flex={1} style={{ backgroundColor: '#1c1c1c' }}>
        <View style={style.container}>

          <View style={style.containerPhoto}>
            <Avatar
              xlarge
              rounded
              source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
              
              activeOpacity={0.7}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19 }}>{this.state.user_name}</Text>
            </View>



          </View>




        </View>
      </View>
    );
  }
}

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const style = StyleSheet.create({



  container: {

    top: 80,
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },


});
