import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import {
  Text,
  Icon,
  Footer,
  FooterTab,
  Button,
  Content,
  Container,
  Thumbnail
} from "native-base";
import { loadCatagories } from "../store/actions/catatoryActions";
import { loadFavorites } from "../store/actions/productActions";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-picker";
import axios from "axios";
import { hostName } from "../hostConfig";
import { StackActions, NavigationActions } from 'react-navigation';

const options = {
  title: "my pic app",
  takePhotoButtonTitle: "Take photo with your camera",
  chooseFromLibraryButtonTitle: "Choose photo from library"
};

class GlamourSPOT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
  }
  myfun = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image Picker Error: ", response.error);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source,
          pic: response.data
        });
        let data = new FormData();
        data.append("_id", this.props.user._id);
        data.append("profileImage", source);
      }
    });
  };

  static navigationOptions = () => {
    return {
      header: null
    };
  };
  componentWillMount() {
    this.setState({ bioText: this.props.user.bio ? this.props.user.bio : "Bio.." })
    this.props.loadCatagories();
    this.props.loadFavorites();
    this.setState({ avatarSource: require('./images/profile.png') })
  }

  state = {
    bioText: ''
  };
  updateBio = () => {
    axios.post(hostName + "/api/auth/update-bio", { _id: this.props.user._id, bio: this.state.bioText })
      .then(res => {
      })
  };
  logoutUser = () => {
    AsyncStorage.removeItem("glamourSPOT0101").then(res => true).catch(err => true);
    this.props.navigation.dispatch(
      StackActions.reset({
        key: null,
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "HomeScreen" })]
      })
    );
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <View style={{ height: 70 }}>
            <Image
              style={styles.logoStyle}
              source={require("./images/logo.png")} />
          </View>
          <Content>
            <View style={styles.titleViewStyle}>
              <Text style={styles.textStyle}>MY PROFILE</Text>
            </View>
            <View style={styles.viewStyle2}>
              <Image
                source={this.state.avatarSource}
                style={{ width: 110, height: 110, borderRadius: 70 }} />
            </View>
            {/* ////// */}
            <View
              style={{
                height: 70,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginTop: 8
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#E5E4E2",
                  margin: 5,
                  padding: 5,
                  alignSelf: "center"
                }}
                onPress={this.myfun}>
                <Text style={{ color: "black" }}>Select Image</Text>
              </TouchableOpacity>
            </View>
            {/* ////// */}
            <View style={styles.viewStyle4}>
              <Text style={{ alignSelf: "center", fontSize: 18 }}>
                {this.props.user.username}
              </Text>
            </View>
            <View style={styles.viewStyle5}>
              {}
              <TextInput
                style={{
                  alignSelf: "flex-start",
                  fontSize: 18,
                  marginLeft: 10
                }}
                value={this.state.bioText}
                onChangeText={(text) => this.setState({ bioText: text })}
                onBlur={() => this.updateBio()} />
            </View>
            <View>
              <Text style={{ alignSelf: "center", fontSize: 18, marginTop: 5 }}>
                Beauty store near you
              </Text>
            </View>
            <View>
              <Thumbnail
                source={require("./images/map.png")}
                style={styles.viewStyle6} />
            </View>
            <TouchableOpacity
              onPress={() => this.logoutUser()}
              style={{ alignSelf: "center", margin: 10 }}>
              <Text style={{ color: "red" }}>Logout</Text>
            </TouchableOpacity>
          </Content>
          <Footer>
            <FooterTab style={{ backgroundColor: "#E5E4E2" }}>
              <Button onPress={() => this.props.navigation.navigate("SearchForProductsScreen")}>
                <Icon name="search" style={{ fontSize: 42, color: "black" }} />
              </Button>
              <Button onPress={() => this.props.navigation.navigate("FavouriteProductScreen")} >
                <Icon name="heart" style={{ fontSize: 42, color: "black" }} />
              </Button>
              <Button onPress={() => this.props.navigation.navigate("MyProfileScreen")} >
                <Icon name="person" style={{ fontSize: 42, color: "black" }} />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
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
    marginTop: 5,
    marginBottom: 10
  },
  imageStyle: {
    height: 110,
    width: 110,
    borderRadius: 70,
    backgroundColor: "pink"
  },
  textStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  viewStyle1: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  viewStyle2: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  viewStyle4: {
    backgroundColor: "#E5E4E2",
    width: "80%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  viewStyle5: {
    backgroundColor: "#E5E4E2",
    width: "80%",
    height: 70,
    marginTop: 8,
    alignSelf: "center"
  },
  viewStyle6: {
    width: "70%",
    height: 100,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  }
});

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapStateToProps,
  { loadCatagories, loadFavorites }
)(GlamourSPOT);