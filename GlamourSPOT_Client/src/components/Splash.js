import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import {NavigationActions, StackActions} from 'react-navigation';
import {loadUser} from '../store/actions/catatoryActions';
import { connect } from "react-redux";

class GlamourSPOT extends Component {
  componentDidMount() {
    AsyncStorage.getItem("glamourSPOT0101").then(user =>{
      if(JSON.parse(user)){
        this.props.loadUser(JSON.parse(user));
        setTimeout(() => this.props.navigation.dispatch(
          StackActions.reset({
            key: null, 
            index: 0, 
            actions: [NavigationActions.navigate({routeName: "MyProfileScreen"})]
          })
        ), 5000);
      }else{
        setTimeout(() => this.props.navigation.dispatch(
          StackActions.reset({
            key: null, 
            index: 0, 
            actions: [NavigationActions.navigate({routeName: "HomeScreen"})]
          })
        ), 5000);
      }
    }).catch(err =>  {
      setTimeout(() => this.props.navigation.dispatch(
        StackActions.reset({
          key: null, 
          index: 0, 
          actions: [NavigationActions.navigate({routeName: "HomeScreen"})]
        })
      ), 5000);
    })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ImageBackground
            source={require("./images/background.png")}
            style={{
              flex: 1,
              opacity: 0.9,
              alignItems: "center",
              justifyContent: "center"}}>
            <Image
              style={styles.logoStyle}
              source={require("./images/logo.png")}/>
            <Image
              style={styles.favouriteStyle}
              source={require("./images/favourite.png")}/>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoStyle: {
    width: "100%",
    height: 80
  },
  favouriteStyle: {
    width: 120,
    height: 120
  }
});

export default connect(null, {loadUser})(GlamourSPOT);