import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import { connect } from 'react-redux';
import { fetchCreateProduct, getAllProducts } from '../../store/actions/productActions'


class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      name: '',
      type: '',
      description: '',
      image: '',
      link: '',
      colours: [],
      hex_value: '',
      colour_name: ''
    
    };
  }

  componentDidUpdate(nextProps) {
    const { createProduct } = this.props;
    if (createProduct && !nextProps.createProduct) {
      this.props.handleGetAllProducts();
      this.props.navigation.goBack()
    }
  }

  createProduct = () => {
    const { brand, name, type, description, colours, link } = this.state;
    //colours.map((item)=>(delete item._id));
    const postData= { products: {
      brand,
      name,
      type,
      description,
      image: "https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwc135311a/typeImages/2018/Eyes/Holographic_Halo_Cream_Liner/holographichalocreamliner_main.jpg?sw=390&sh=390&sm=fit",
      link,
      colours
    }}
    this.props.handleFetchCreateProduct(postData);

  }

  addColorAndHex = () => {
    if (this.state.colour_name !== '' && this.state.hex_value !== '') {
      const filteredItems = this.state.colours.filter(item => (item.colour_name === this.state.colour_name) && (item.hex_value === this.state.hex_value));
      if (filteredItems.length === 0) {

        const newItem = {
          _id: this.uuid(),
          colour_name: this.state.colour_name,
          hex_value: this.state.hex_value,
        };
        this.setState((prevState) => {
          return {
            colours: prevState.colours.concat(newItem),
            colour_name: '',
            hex_value: ''
          };
        });
      }
    }
  }

  deleteColorAndHex = (id) => {
    const filteredItems = this.state.colours.filter(item => item._id !== id);

    this.setState({
      colours: filteredItems
    });
  }

  uuid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4()  + s4()  + s4() + s4()  + s4();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
        <View style={styles.titleViewStyle}>
            <Text style={styles.titleStyle}>
              CREATE NEW PRODUCT
            </Text>
          </View>
          
          <View style={styles.viewStyle1}>
            <View style={{marginTop: 10}}/>
            <View style={styles.viewStyle3}>
              <View style={styles.viewStyle4}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter Brand"
                  placeholderTextColor="black"
                  keyboardType="default"
                  returnKeyType="next"
                  value={this.state.brand}
                  onChangeText={text => this.setState({ brand: text })}
                  autoCorrect={false} />
              </View>
            </View>

            <View style={styles.viewStyle3}>
              <View style={styles.viewStyle4}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter Name"
                  placeholderTextColor="black"
                  returnKeyType="next"
                  value={this.state.name}
                  onChangeText={text => this.setState({ name: text })}
                  autoCorrect={false} />
              </View>
            </View>

            <View style={styles.viewStyle3}>
              <View style={styles.viewStyle4}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter Type"
                  placeholderTextColor="black"
                  returnKeyType="next"
                  value={this.state.type}
                  onChangeText={text => this.setState({ type: text })}
                  autoCorrect={false} />
              </View>
            </View>

            <View style={styles.viewStyle3}>
              <View style={[styles.viewStyle4, {height: 200}]}>
                <TextInput
                  style={[styles.textbox,{height: 200}]}
                  placeholder="Enter Description"
                  placeholderTextColor="black"
                  returnKeyType="next"
                  multiline
                  value={this.state.description}
                  onChangeText={text => this.setState({ description: text })}
                  autoCorrect={false} />
              </View>
            </View>

            <View style={styles.viewStyle3}>
              <View style={styles.viewStyle4}>
                <TextInput
                  style={styles.textbox}
                  placeholder="Enter Link"
                  placeholderTextColor="black"
                  returnKeyType="next"
                  value={this.state.link}
                  onChangeText={text => this.setState({ link: text })}
                  autoCorrect={false} />
              </View>
            </View>

            <View style={styles.viewStyle5}>
              <View style={{width: '75%'}}>
                <View style={styles.viewStyle6}>
                  <TextInput
                    style={styles.textbox}
                    placeholder="Enter Color Name"
                    placeholderTextColor="black"
                    returnKeyType="next"
                    value={this.state.colour_name}
                    onChangeText={text => this.setState({ colour_name: text })}
                    autoCorrect={false} />
                </View>
                <View style={styles.viewStyle6}>
                  <TextInput
                    style={styles.textbox}
                    placeholder="Enter Color HEX"
                    placeholderTextColor="black"
                    returnKeyType="next"
                    value={this.state.hex_value}
                    onChangeText={text => this.setState({ hex_value: text })}
                    autoCorrect={false} />
                </View>
              </View>
              <View style={{width: '25%'}}>
                <TouchableOpacity style={styles.viewStyle7} onPress={()=> this.addColorAndHex()}>
                  <Text style={{textAlign: "center"}}>{`ADD\nCOLOR`}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              {
                this.state.colours.map((item)=>(
                  <View key={item._id}  style={styles.colorStyle}>
                    <Text>{item.colour_name}</Text>
                    <Text>{item.hex_value}</Text>
                    <TouchableOpacity onPress={()=>this.deleteColorAndHex(item._id)}>
                        <Text> ❌ </Text>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>


          </View>
          <View style={styles.registerViewStyle}>
            <TouchableOpacity
              style={styles.registerTouchableOpacityStyle}
              disabled={this.state.isProcessing}
              onPress={() => this.createProduct()}>
              <View>
                {
                  this.state.isProcessing ? <Spinner size="small" color="white" /> :
                    <Text style={styles.buttonsTextStyle}>Create Product</Text>
                }
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
  titleViewStyle: {
    height: 40,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  viewStyle1: {
    flex: 1,
    backgroundColor: "pink",
    width: "95%",
    alignSelf: "center",
    marginTop: 15
  },
  viewStyle3: {
    flex: 0.8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10
  },
  viewStyle4: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    alignSelf: "center"
  },
  viewStyle5: {
    flexDirection: 'row',
    width: "96%",
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  viewStyle6: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10
  },
  viewStyle7: {
    width: "80%",
    height: "85%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10
  },
  titleStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
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
  textbox: {
    fontSize: 16,
    paddingHorizontal: 12,
    width: '100%',
    flex: 1,
  },
  colorStyle: {
    flex: 1,
    width: "80%",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10
  }
});

const mapDispatchToProps = dispatch => ({
    handleFetchCreateProduct: (postData) => {
      dispatch(fetchCreateProduct(postData));
    },
    handleGetAllProducts: () => {
      dispatch(getAllProducts());
    },
});
  
function mapStateToProps(state) {
    return {
        createProduct: state.productReducer.createProduct,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProduct);

