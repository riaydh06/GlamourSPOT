import { Button, Container, Footer, FooterTab, Icon, Input, Item, Text, Spinner } from "native-base";
import React, { Component } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { loadSearchedProducts } from '../../store/actions/catatoryActions';
import SearchedProducts from '../Results/singleSearchedProduct';
import SingleProduct from "./singleProduct";

class GlamourSPOT extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };
  state = {
    searchText: '',
    searchEnabled: false
  };
  handleSearchTextChange = (text) => {
    this.setState({ searchText: text });
    this.props.loadSearchedProducts(text.toLowerCase());
  };
  toggleSearch = () => {
    this.setState({ searchEnabled: !this.state.searchEnabled });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <ScrollView style={styles.container}> */}
        <Container>
          <View style={{ height: 70 }}>
            <Image
              style={styles.logoStyle}
              source={require("../images/logo.png")} />
          </View>
          <View style={styles.titleViewStyle}>
            <Text style={styles.textStyle}>SEARCH FOR PRODUCT</Text>
          </View>
          <View style={styles.viewStyle1}>
            <Item style={styles.searchBarStyle}>
              {
                this.state.searchEnabled ?
                  <Icon
                    name="ios-close"
                    style={{ marginLeft: 15, fontSize: 30 }}
                    onPress={() => this.toggleSearch()} /> :
                  <Icon
                    name="ios-search"
                    style={{ marginLeft: 15, fontSize: 30 }}
                    onPress={() => this.toggleSearch()} />
              }
              {
                this.state.searchEnabled ?
                  <Input
                    placeholder="Search for product by brand"
                    onChangeText={this.handleSearchTextChange}
                  /> : false
              }
            </Item>
          </View>
          <View style={styles.viewStyle2}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 5
              }}>
              {this.state.searchEnabled ?
                "Products by Brand" :
                "Products by Catagory"}
            </Text>
          </View>
          <ScrollView style={{ flex: 1 }}>{
            this.state.searchEnabled ?
              (this.props.isLoadingProducts ? <Spinner color="red" /> :
                <View style={styles.viewStyle3}>{
                  this.props.searchedProducts.map(p => (
                    <SearchedProducts
                      key={p._id}
                      product={p}
                      navigation={this.props.navigation} />
                  ))
                }
                </View>)
              :
              <View style={styles.viewStyle3}>
                {this.props.catagories.map((c, index) => (
                  <SingleProduct
                    key={index}
                    catagoryName={c}
                    navigation={this.props.navigation} />
                ))}
              </View>
          }
          </ScrollView>

        </Container>
        <Footer>
          <FooterTab style={{ backgroundColor: "#E5E4E2" }}>
            <Button>
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
        {/* </ScrollView> */}
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
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  viewStyle3: {
    flex: 1
  },
  searchBarStyle: {
    backgroundColor: "#E5E4E2",
    alignSelf: "center",
    width: "90%",
    height: 40,
    borderRadius: 10,
    marginTop: 10
  }
});

const mapStateToProps = state => ({
  catagories: state.catagoryReducer.catagories,
  searchedProducts: state.catagoryReducer.searchedProducts,
  isLoadingProducts: state.catagoryReducer.isLoadingProducts
});

export default connect(
  mapStateToProps,
  { loadSearchedProducts }
)(GlamourSPOT);