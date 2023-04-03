import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView , SafeAreaView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { getAllProducts, fetchDeleteProduct } from '../../store/actions/productActions'

class ProductsCUD extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    deleteProduct = (id) => {
        Alert.alert(
            'Confirm',
            'Are you sure?',
            [
              {
                text: 'Cancel',
                onPress: () => {}
              },
              {
                text: 'OK',
                onPress: () => {
                    this.props.handleFetchDeleteProduct(id);
                }
              }
            ],
            { cancelable: false }
        );
    }

    componentDidMount(){
        this.props.handleGetAllProducts();
    }

    componentDidUpdate(nextProps) {
        const { deleteProduct } = this.props;
        if (deleteProduct && !nextProps.deleteProduct) {
            this.props.handleGetAllProducts();
        }
    }

  render() {
    const {products} = this.props;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.titleViewStyle}>
                <Text style={styles.titleStyle}>PRODUCT LIST</Text>
            </View>
            <View style={styles.adminLoginViewStyle}>
                <TouchableOpacity
                    style={styles.adminLoginTouchableOpacityStyle}
                    onPress={() => this.props.navigation.navigate("CreateProductScreen")}>
                <View>
                    <Text style={styles.buttonsTextStyle}>CREATE NEW PRODUCT</Text>
                </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
            {
                products.map((item, index)=>(
                    <View  key={item._id} style={styles.productStyle}>
                        <TouchableOpacity style={styles.nameStyle} onPress={()=>this.props.navigation.navigate("UpdateProductScreen", { item: products[index]})}>
                            <Text> {item.name} </Text>   
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.deleteProduct(item._id)}>
                            <Text> ❌ </Text>
                        </TouchableOpacity>
                    </View>
                    
                ))
            }
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
    productStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginBottom: 15
    },
    nameStyle:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "70%",
    },
    adminLoginTouchableOpacityStyle: {
        width: "90%",
        height: "70%",
        backgroundColor: "green",
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
      adminLoginViewStyle: {
        height: 60,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 10
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
});

const mapDispatchToProps = dispatch => ({
    handleGetAllProducts: () => {
      dispatch(getAllProducts());
    },
    handleFetchDeleteProduct: (id) => {
      dispatch(fetchDeleteProduct(id));
    },
});
  
function mapStateToProps(state) {
    return {
        products: state.productReducer.allProducts,
        deleteProduct : state.productReducer.deleteProduct
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsCUD);

