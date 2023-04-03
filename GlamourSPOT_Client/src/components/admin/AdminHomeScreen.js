import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
  } from "react-native";

class AdminHomeSCreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
            {/* <View style={{ height: 70 }}>
                <Image
                style={styles.logoStyle}
                source={require("./images/logo.png")}/>
            </View> */}
            <View style={styles.titleViewStyle}>
                <Text style={styles.titleStyle}>
                CREATE, UPDATE AND DELETE PRODUCTS
                </Text>
            </View>
            <View style={styles.productViewStyle}>
                <TouchableOpacity
                style={styles.productTouchableOpacityStyle}
                onPress={() => this.props.navigation.navigate("ProductsCUDScreen")}>
                <View>
                    <Text style={styles.buttonsTextStyle}>BEAUTY PRODUCTS</Text>
                </View>
                </TouchableOpacity>
            </View>
            <View style={styles.userViewStyle}>
                <TouchableOpacity
                style={styles.userTouchableOpacityStyle}
                onPress={() => this.props.navigation.navigate("UserDScreen")}>
                <View>
                    <Text style={styles.buttonsTextStyle}>APPLICATION USERS</Text>
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
    productViewStyle: {
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    productTouchableOpacityStyle: {
      width: "90%",
      height: "70%",
      backgroundColor: "orange",
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
    userViewStyle: {
      height: 60,
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    userTouchableOpacityStyle: {
      width: "90%",
      height: "70%",
      backgroundColor: "red",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center"
    }
  });
  

export default AdminHomeSCreen;
