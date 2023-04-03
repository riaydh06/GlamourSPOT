import { Badge, Thumbnail } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { addCurrentProduct } from "../../store/actions/catatoryActions";

class SingleProduct extends Component {
  showProductDetail = () => {
    this.props.navigation.navigate("ProductScreen");
    this.props.addCurrentProduct(this.props.product);
  };

  render() {
    return (
      <View>
        {
          this.props.product ?
            <TouchableOpacity style={styles.viewStyle4} onPress={() => this.showProductDetail()}>
              <View style={styles.resultPanel}>
                <Thumbnail square large source={{ uri: this.props.product.image }} defaultSource={require('../images/camera.png')} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{this.props.product.name}</Text>
                  {
                    Boolean(this.props.product.brand) ? <Text style={styles.productBrand}>{this.props.product.brand}</Text> : null
                  }
                  {
                    Boolean(this.props.product.type) ? <Badge style={styles.badge}><Text style={styles.brandType}>{this.props.product.type}</Text></Badge> : null
                  }
                </View>
              </View>
            </TouchableOpacity> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle4: {
    backgroundColor: "#E5E4E2",
    width: "90%",
    marginBottom: 8,
    alignSelf: "center"
  },
  resultPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  productInfo: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  productBrand: {
    marginTop: 3,
    fontSize: 15,
  },
  badge: {
    marginTop: 5,
    backgroundColor: '#751c7c',
    justifyContent: 'center'
  },
  brandType: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 4,
  },
});

export default connect(
  null,
  { addCurrentProduct }
)(SingleProduct);