import axios from "axios";
import { Spinner, Text } from "native-base";
import React, { Component } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { hostName } from "../hostConfig";

class GlamourSPOT extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };
  state = {
    email: "",
    username: "",
    password: "",
    confermPassword: "",
    isProcessing: false
  };
  registerUser = () => {
    if (this.state.password === this.state.confermPassword) {
      this.setState({ isProcessing: true }, () => {
        axios
          .post(hostName + "/api/auth/signup-user", {
            user: {
              email: this.state.email,
              username: this.state.username,
              password: this.state.password
            }
          })
          .then(res => {
            const { msg, user } = res.data;
            this.setState({ email: '', username: '', password: '', confermPassword: '', isProcessing: false }, () => {
              if (user) {
                this.props.navigation.navigate("LoginScreen");
              } else {
                Alert.alert(msg);
              }
            });
          })
          .catch(err => this.setState({ isProcessing: false }, () => Alert.alert("network error")));
      });
    } else {
      Alert.alert("confirm password failed");
    }
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container} key={0}>
          <View style={{ height: 70 }} key={1}>
            <Image
              style={styles.logoStyle}
              source={require("./images/logo.png")} />
          </View>
          <View style={styles.titleViewStyle} key={2}>
            <Text style={styles.titleStyle} key={3}>
              REGISTER
          </Text>
          </View>
          <View style={styles.viewStyle1} key={4}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              key={5}>
              <Text style={styles.textStyle} key={6}>
                Please enter appropriate information in order to login
            </Text>
            </View>
            <View style={styles.viewStyle3} key={7}>
              <View style={styles.viewStyle4} key={8}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter your email address"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  returnKeyType="next"
                  key={9}
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  autoCorrect={false} />
              </View>
            </View>
            <View style={styles.viewStyle3} key={10}>
              <View style={styles.viewStyle4} key={11}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter username"
                  placeholderTextColor="black"
                  key={12}
                  value={this.state.username}
                  onChangeText={text => this.setState({ username: text })}
                  returnKeyType="next"
                  autoCorrect={false} />
              </View>
            </View>
            <View style={styles.viewStyle3} key={13}>
              <View style={styles.viewStyle4} key={14}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter password"
                  placeholderTextColor="black"
                  secureTextEntry={true}
                  textContentType="password"
                  key={15}
                  value={this.state.password}
                  onChangeText={text => this.setState({ password: text })}
                  returnKeyType="next"
                  autoCorrect={false} />
              </View>
            </View>
            <View style={styles.viewStyle3} key={16}>
              <View style={styles.viewStyle4} key={17}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Confirm password"
                  placeholderTextColor="black"
                  key={18}
                  returnKeyType="next"
                  secureTextEntry={true}
                  textContentType="password"
                  value={this.state.confermPassword}
                  onChangeText={text => this.setState({ confermPassword: text })}
                  autoCorrect={false} />
              </View>
            </View>
          </View>
          <View style={styles.registerViewStyle} key={19}>
            <TouchableOpacity
              style={styles.registerTouchableOpacityStyle}
              disabled={this.state.isProcessing}
              onPress={() => this.registerUser()}
              key={20}>
              <View key={21}>
                {
                  this.state.isProcessing ? <Spinner size="small" color="white" /> :
                    <Text style={styles.buttonsTextStyle} key={22}>REGISTER</Text>
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
                fontSize: 18,
                alignSelf: "center",
                marginTop: 12
              }}>
              Already have an account?
          </Text>
          </View>
          <View style={styles.loginViewStyle}>
            <TouchableOpacity
              style={styles.loginTouchableOpacityStyle}
              disabled={this.state.isProcessing}
              onPress={() => this.props.navigation.navigate("LoginScreen")}>
              <View>
                <Text style={styles.buttonsTextStyle}>LOGIN</Text>
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
    backgroundColor: "white"
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
    height: 330,
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
    marginTop: 10
  },
  registerTouchableOpacityStyle: {
    width: "90%",
    height: 50,
    backgroundColor: "skyblue",
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
    height: 50,
    backgroundColor: "purple",
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

export default GlamourSPOT;