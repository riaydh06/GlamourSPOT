import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { loadProductList } from "../../store/actions/catatoryActions";

class SingleProduct extends Component {
  showProducts = () => {
    this.props.loadProductList(this.props.catagoryName);
    this.props.navigation.navigate("SearchingResultsScreen");
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.viewStyle4}
          onPress={() => this.showProducts()}>
          <View>
            <Text style={{ alignSelf: "center", fontSize: 16 }}>
              {this.props.catagoryName ? this.props.catagoryName : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  { loadProductList }
)(SingleProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  viewStyle4: {
    backgroundColor: "#E5E4E2",
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5
  }
});