import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getAllUsers, fetchDeleteUser }  from '../../store/actions/userActions';

class UserD extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    deleteuser = (id) => {
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
                    this.props.handleFetchDeleteUser(id);
                }
              }
            ],
            { cancelable: false }
        );
        
    }

    componentDidMount(){
        this.props.handleGetAllUsers();
          
    }

    componentDidUpdate(nextProps) {
        const { deleteUser } = this.props;
        if (deleteUser && !nextProps.deleteUser) {
            this.props.handleGetAllUsers();
        }
    }

  render() {
    const { users } = this.props;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.titleViewStyle}>
                <Text style={styles.titleStyle}>USER LIST</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    {
                        users.map(item=>(
                            <View  key={item._id} style={styles.userStyle}>
                                <View style={styles.nameStyle}> 
                                    <Text> {item.username} </Text>
                                </View>
                                <TouchableOpacity onPress={()=>this.deleteuser(item._id)}>
                                    <Text> ❌ </Text>
                                </TouchableOpacity>
                            </View>
                            
                        ))
                    }
                
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 10
    },
    userStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginBottom: 10
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
    nameStyle:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "70%",
    }
});

const mapDispatchToProps = dispatch => ({
    handleGetAllUsers: () => {
      dispatch(getAllUsers());
    },
    handleFetchDeleteUser: (id) => {
      dispatch(fetchDeleteUser(id));
    },
});
  
function mapStateToProps(state) {
    return {
        users: state.userReducer.getAllUsers,
        deleteUser : state.userReducer.deleteUser
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserD);

