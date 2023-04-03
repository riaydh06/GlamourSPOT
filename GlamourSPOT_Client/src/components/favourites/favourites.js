import { Button, Container, Content, Footer, FooterTab, Icon, Text, Spinner } from "native-base";
import React, { Component } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import SingleProduct from "./singleProduct";

class GlamourSPOT extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <View style={{ height: 70 }}>
            <Image
              style={styles.logoStyle}
              source={require("../images/logo.png")} />
          </View>
          <View style={styles.titleViewStyle}>
            <Text style={styles.textStyle}>FAVOURITES</Text>
          </View>
          <Content>
            <ScrollView>
              {
                this.props.isLoadingFavorites ? <Spinner color="red" /> :
                  this.props.favorites.map(p => (
                    <SingleProduct key={p.id} product={p} navigation={this.props.navigation} />
                  ))
              }
            </ScrollView>
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
      </SafeAreaView >
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
  }
});

const mapStateToProps = state => ({
  favorites: state.productReducer.favorites,
  isLoadingFavorites: state.productReducer.isLoadingFavorites
});

export default connect(
  mapStateToProps,
  null
)(GlamourSPOT);