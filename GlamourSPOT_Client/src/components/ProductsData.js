import { Button, Container, Content, Footer, FooterTab, Icon, Text, Thumbnail, Spinner } from "native-base";
import React, { Component } from "react";
import { Image, Platform, SafeAreaView, StyleSheet, View, Linking } from "react-native";
import Share from 'react-native-share';
import { connect } from "react-redux";
import { addToFavorite, removeFavorite, getVideoUrl } from '../store/actions/productActions';

class GlamourSPOT extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  componentWillMount() {
    let { product } = this.props;
    this.props.getVideoUrl(`${product.brand} ${product.type} ${product.name}`);
  }

  shareProduct = () => {
    let { product } = this.props;
    // Prepare share options
    let options = Platform.select({
      ios: {
        url: product.link,
        excludedActivityTypes: [ // Remove unwanted share options in iOS
          "com.apple.UIKit.activity.Print",
          "com.apple.UIKit.activity.CopyToPasteboard",
          "com.apple.UIKit.activity.AssignToContact",
          "com.apple.UIKit.activity.SaveToCameraRoll",
          "com.apple.UIKit.activity.AddToReadingList",
          "com.apple.UIKit.activity.AirDrop",
          "com.apple.UIKit.activity.OpenInIBooks",
          "com.apple.UIKit.activity.MarkupAsPDF",
          "com.apple.reminders.RemindersEditorExtension",
          "com.apple.mobilenotes.SharingExtension",
        ]
      },
      android: {
        url: product.link,
        message: product.name,
      }
    });
    // Share product details
    Share.open(options);
  }

  updateFavourite = () => {
    let { product, favorites } = this.props;
    if (product.isFavorite === false)
      // Mark as favorite
      this.props.addToFavorite(product);
    else {
      let favorite = favorites.find(f => f.name === product.name && f.brand === product.brand && f.type === product.type);
      // Remove from favorites
      this.props.removeFavorite(favorite);
    }
  }

  openVideo = () => {
    if (Boolean(this.props.productVideoUrl))
      Linking.openURL(this.props.productVideoUrl);
  }

  render() {
    let { product, favorites } = this.props;
    product.isFavorite = Boolean(favorites.find(f => f.name === product.name && f.brand === product.brand && f.type === product.type));
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <View style={{ height: 70 }}>
            <Image
              style={styles.logoStyle}
              source={require("./images/logo.png")} />
          </View>
          <Content>
            {
              this.props.isLoadingDetails ? <Spinner color="red" /> :
                <View>
                  <View style={styles.titleViewStyle}>
                    <Text style={styles.textStyle}>{product.name}</Text>
                  </View>
                  <View style={styles.titleViewStyle}>
                    <Text style={styles.textStyle}>{product.brand}</Text>
                  </View>
                  <View style={styles.titleViewStyle}>
                    <Text style={styles.textStyle}>{product.type}</Text>
                  </View>
                  <View style={styles.viewStyle2}>
                    <Thumbnail
                      source={{ uri: product.image }}
                      style={styles.imageStyle}
                      defaultSource={require('./images/camera.png')} />
                  </View>
                  <View style={styles.viewStyle5}>
                    <FooterTab
                      style={{
                        backgroundColor: "#E5E4E2"
                      }}>
                      <Button onPress={this.updateFavourite}>
                        <Icon name="heart" style={{ fontSize: 42, color: product.isFavorite ? "#f796e1" : "black" }} />
                      </Button>
                      <Button onPress={this.openVideo}>
                        <Icon name="logo-youtube" style={{ fontSize: 42, color: "black" }} />
                      </Button>
                      <Button onPress={this.shareProduct}>
                        <Icon name="share" style={{ fontSize: 42, color: "black" }} />
                      </Button>
                    </FooterTab>
                  </View>
                  <View style={styles.viewStyle6}>
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        fontSize: 18,
                        marginLeft: 10,
                        marginTop: 5
                      }}>
                      {product.description
                        ? product.description
                        : "Information about product missing"}
                    </Text>
                  </View>
                </View>
            }
          </Content>
          <Footer>
            <FooterTab style={{ backgroundColor: "#E5E4E2" }}>
              <Button onPress={() => this.props.navigation.navigate("SearchForProductsScreen")}>
                <Icon name="search" style={{ fontSize: 42, color: "black" }} />
              </Button>
              <Button onPress={() => this.props.navigation.navigate("FavouriteProductScreen")}>
                <Icon name="heart" style={{ fontSize: 42, color: "black" }} />
              </Button>
              <Button onPress={() => this.props.navigation.navigate("MyProfileScreen")}>
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
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    paddingVertical: 6,
  },
  imageStyle: {
    height: 115,
    width: 115,
    borderRadius: (115 / 2)
  },
  textStyle: {
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },
  viewStyle1: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  viewStyle2: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "pink"
  },
  viewStyle4: {
    backgroundColor: "#E5E4E2",
    width: "80%",
    height: 35,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  viewStyle5: {
    backgroundColor: "#E5E4E2",
    width: "90%",
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row"
  },
  viewStyle6: {
    backgroundColor: "#E5E4E2",
    width: "90%",
    marginTop: 5,
    alignSelf: "center"
  }
});

const mapStateToProps = state => ({
  product: state.catagoryReducer.curentSingleProduct,
  favorites: state.productReducer.favorites,
  isLoadingDetails: state.productReducer.isLoadingDetails,
  productVideoUrl: state.productReducer.productVideoUrl,
});

export default connect(
  mapStateToProps,
  { addToFavorite, removeFavorite, getVideoUrl }
)(GlamourSPOT);