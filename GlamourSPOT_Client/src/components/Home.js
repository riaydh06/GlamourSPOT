import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";

class GlamourSPOT extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={{ height: 70 }}>
            <Image
              style={styles.logoStyle}
              source={require("./images/logo.png")}/>
          </View>
          <View style={styles.titleViewStyle}>
            <Text style={styles.titleStyle}>
              SEARCH, SHARE AND FAVOURITE YOUR FAVOURITE BEAUTY PRODUCTS
            </Text>
          </View>
          <View style={{ height: 355 }}>
            <Image
              style={styles.makeupImageStyle}
              source={require("./images/makeup.jpg")}/>
          </View>
          <View style={styles.registerViewStyle}>
            <TouchableOpacity
              style={styles.registerTouchableOpacityStyle}
              onPress={() => this.props.navigation.navigate("RegisterScreen")}>
              <View>
                <Text style={styles.buttonsTextStyle}>REGISTER</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.loginViewStyle}>
            <TouchableOpacity
              style={styles.loginTouchableOpacityStyle}
              onPress={() => this.props.navigation.navigate("LoginScreen")}>
              <View>
                <Text style={styles.buttonsTextStyle}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.adminLoginViewStyle}>
            <TouchableOpacity
                style={styles.adminLoginTouchableOpacityStyle}
                onPress={() => this.props.navigation.navigate("AdminLoginScreen")}>
              <View>
                <Text style={styles.buttonsTextStyle}>ADMIN USER</Text>
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
    height: 60,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
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
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  registerTouchableOpacityStyle: {
    width: "90%",
    height: "70%",
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
    height: 60,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10
  },
  loginTouchableOpacityStyle: {
    width: "90%",
    height: "70%",
    backgroundColor: "purple",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  adminLoginViewStyle: {
    height: 60,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10
  },
  adminLoginTouchableOpacityStyle: {
    width: "90%",
    height: "70%",
    backgroundColor: "green",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default GlamourSPOT;