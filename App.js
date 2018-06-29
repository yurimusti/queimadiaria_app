/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import Login from './components/Login';
import Minhas from './components/Minhas';
import Perfil from './components/Perfil';
import Inicio from './components/Inicio';
import Pesquisa from './components/Pesquisa';
import ProfileMovie from './components/ProfileMovie';

import {
  Image, View, StyleSheet, Dimensions
} from 'react-native';
import {
  Icon
} from 'react-native-elements';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class App extends Component {
  render() {




    return (



      <Router>

        <Scene key='root'>

          <Scene
            hideNavBar


            title={null}
            key='_login'
            component={Login}
            initial


          />

          <Scene
            navTransparent
            hideNavBar
            key='tabbar'
            tabBarPosition='bottom'
            tabStyle={{ backgroundColor: '#1c1c1c' }}
            tabs={true}
            showLabel={false}



          >
            <Scene
              title={null}
              key='navegar'
              icon={({ focused }) => <Icon
                name='home'
                type='font-awesome'
                color={focused ? '#fff' : '#747474'} />}
              swipeEnabled={true}


            >
              <Scene
                //hideNavBar
                navTransparent
                renderTitle={() =>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Image source={require('./logo.png')} style={{ width: 200, height: 40, resizeMode: 'center' }} />
                  </View>}
                title={null}
                key='_navegar'
                component={Inicio}


              />

              <Scene
                //hideNavBar
                navTransparent
                renderTitle={() =>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Image source={require('./logo.png')} style={{ width: 200, height: 40, resizeMode: 'center' }} />
                  </View>}
                title={null}
                key='_profilemovie'
                component={ProfileMovie}

              />


            </Scene>

            <Scene

              title={null}
              key='pesquisa'
              icon={({ focused }) => <Icon
                name='search'
                type='font-awesome'
                color={focused ? '#fff' : '#747474'} />}
              swipeEnabled={true}



            >
              <Scene
                //hideNavBar
                navTransparent
                renderTitle={() =>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Image source={require('./logo.png')} style={{ width: 200, height: 40, resizeMode: 'center' }} />
                  </View>}
                title={null}
                key='_pesquisar'
                component={Pesquisa}

              />
            </Scene>

            <Scene

              title={null}
              key='meusfilmes'

              icon={({ focused }) => <Icon

                name='th-list'
                type='font-awesome'
                color={focused ? '#fff' : '#747474'} />}
              swipeEnabled={true}

            
            >
              <Scene

                navTransparent
                renderTitle={() =>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Image source={require('./logo.png')} style={{ width: 200, height: 40, resizeMode: 'center' }} />
                  </View>}
                key='_meufilmes'
                component={Minhas}

              />
            </Scene>

            <Scene

              title={null}
              key='perfil'
              icon={({ focused }) => <Icon

                name='user'
                type='font-awesome'
                color={focused ? '#fff' : '#747474'} />}
              swipeEnabled={true}

          
            >
              <Scene

                navTransparent
                renderTitle={() =>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Image source={require('./logo.png')} style={{ width: 200, height: 40, resizeMode: 'center' }} />
                  </View>}
                key='_perfil'
                component={Perfil}
               
              />
            </Scene>


          </Scene>



        </Scene>


      </Router>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000',
    height: 64,
  },
  bottom: {
    backgroundColor: '#171717',

  }
})
