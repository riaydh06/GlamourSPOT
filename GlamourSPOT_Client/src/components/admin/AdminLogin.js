import axios from "axios";
import { Spinner, Text } from "native-base";
import React, { Component } from "react";
import { Alert, Image, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from "react-redux";
import { loadUser } from "../../src/store/actions/catatoryActions";
import { hostName } from "../hostConfig";

class AdminLogin extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          {/* <View style={{ height: 70 }}>
            <Image
              style={styles.logoStyle}
              source={require("./images/logo.png")} />
          </View> */}
          <View style={styles.titleViewStyle}>
            <Text style={styles.titleStyle}>ADMIN LOGIN</Text>
          </View>
          <View style={styles.viewStyle1}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Text style={styles.textStyle}>
                Please enter appropriate information in order to login
              </Text>
            </View>
            <View style={styles.viewStyle2}>
              <View style={styles.viewStyle4}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter email address"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onChangeText={text => this.setState({ email: text })}
                  autoCorrect={false} />
              </View>
            </View>
            <View style={styles.viewStyle3}>
              <View style={styles.viewStyle4}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter your password"
                  placeholderTextColor="black"
                  returnKeyType="next"
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={text => this.setState({ password: text })}
                  autoCorrect={false} />
              </View>
            </View>
          </View>
          <View style={styles.registerViewStyle}>
            <TouchableOpacity
              style={styles.registerTouchableOpacityStyle}
              disabled={this.state.isProcessing}
              onPress={() => this.loginUser()}>
              <View>
                {
                  this.state.isProcessing ? <Spinner size="small" color="white" /> :
                    <Text style={styles.buttonsTextStyle}>LOGIN</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                alignSelf: "center",
                marginTop: 10
              }}>
              Not an admin user?
            </Text>
          </View>
          <View style={styles.loginViewStyle}>
            <TouchableOpacity
              style={styles.loginTouchableOpacityStyle}
              disabled={this.state.isProcessing}
              onPress={() => this.props.navigation.navigate("HomeScreen")}>
              <View>
                <Text style={styles.buttonsTextStyle}>REGISTER/LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        marginTop: 30
      }
    })
  },
  logoStyle: {
    width: "100%",
    height: 70
  },
  titleViewStyle: {
    height: 40,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  textStyle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  viewStyle1: {
    height: 270,
    backgroundColor: "pink",
    width: "95%",
    alignSelf: "center",
    marginTop: 15
  },
  viewStyle2: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  viewStyle3: {
    flex: 0.8,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  viewStyle4: {
    width: "90%",
    height: "60%",
    backgroundColor: "white",
    alignSelf: "center"
  },
  titleStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  makeupImageStyle: {
    width: "100%",
    height: "100%",
    marginTop: 5
  },
  registerViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  registerTouchableOpacityStyle: {
    width: "90%",
    height: 60,
    backgroundColor: "purple",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsTextStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center"
  },
  loginViewStyle: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  loginTouchableOpacityStyle: {
    width: "90%",
    height: 60,
    backgroundColor: "skyblue",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  textbox: {
    fontSize: 16,
    paddingHorizontal: 12,
    width: '100%',
    flex: 1,
  }
});

export default AdminLogin;