import Axios from 'axios';
import { Button } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { ButtonGroup, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showToast } from '../../../components/toast';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomColor: '#F5F5F6',
    borderBottomWidth: 4,
  },

  backIconNavbar: {
    fontSize: 30,
    color: '#FFF',
  },
  textNavbar: {fontWeight: 'bold', fontSize: 16, color: '#555'},
  dummyIcon: {color: '#FFF'},

  mainForm: {flex: 1, backgroundColor: '#FFF', padding: 20},
  textIntro: {marginBottom: 15, color: '#444'},

  textPasswordContainer: {marginBottom: 15},
  textPassword: {paddingLeft: 15, backgroundColor: '#FFF', borderRadius: 10},

  textEmailContainer: {marginBottom: 15},
  textEmail: {paddingLeft: 15, backgroundColor: '#FFF', borderRadius: 10},

  textButtonSubmit: {color: 'white', fontWeight: 'bold'},
  textButtonSubmitContainer: {borderRadius: 5, backgroundColor: '#00B444'},
});

class Register extends Component {
  state = {
    role: 1,
    selectedIndex: 0,
    user_type: 'buyer',
    email: '',
    name_user: '',
    password: '',
    registered: false,
  };

  onClickSubmit = async () => {
    let data = {
      name_user: this.state.name_user,
      email: this.state.email,
      password: this.state.password,
    };

    let nameValidate = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,50}$/.test(
      this.state.name_user,
    );
    let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      this.state.email,
    );
    let passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(
      this.state.password,
    );

    if (nameValidate && emailValidate && passwordValidate) {
      let url = API_URL + '/register/' + this.state.role;
      await Axios.post(url, data)
        .then(res => {
          if (res.data.msg === 'Email already exist') {
            showToast(`Email already Exist`, `warning`);
          } else {
            showToast(`Register Success, please Login `, `Success`);
            this.props.navigation.navigate('Login');
          }
        })
        .catch(err => console.log(err.msg));
    } else if (!nameValidate && !emailValidate && !passwordValidate) {
      showToast(`Form Input Error, Please Fill The Form Correctly`, `warning`);
    } else if (!nameValidate) {
      showToast(
        `Name Incorrect Format, Name First Letter Must Be Uppercase`,
        `warning`,
      );
    } else if (!emailValidate) {
      showToast(
        `Email Incorrect Format', 'Email not in correct format`,
        `warning`,
      );
    } else if (!passwordValidate) {
      showToast(
        `Password must be at least 8 characters and must consist minimal 1 Uppercase, 1 lowercase and 1 number`,
        `warning`,
      );
    }
  };
  
  render() {
    const role = ['Buyer', 'Seller'];
    return (
      <>
        <View style={styles.container}>
          {/* Navbar */}
          <Ionicons
            name="ios-arrow-back"
            style={styles.backIconNavbar}></Ionicons>
          <Text style={styles.textNavbar}>Daftar</Text>
          <Ionicons name="ios-arrow-back" style={styles.dummyIcon}></Ionicons>
        </View>

        <View style={styles.mainForm}>
          {/* Intro */}
          <Text style={styles.textIntro}>
            Buat akun di Tokoo-in untuk kemudahan memesan dan memantau order
            Anda
          </Text>

          <Input
            inputContainerStyle={{marginLeft: -10, height: 35, marginBottom:15}}
            labelStyle={{
              marginHorizontal: -10,
              fontSize: 12,
            }}
            inputStyle={{fontSize: 12}}
            placeholder="Nama Lengkap"
            label="Name"
            value={this.state.name_user}
            onChangeText={name_user => this.setState({name_user})}
          />

          <Input
            inputContainerStyle={{marginLeft: -10, height: 35, marginBottom:15}}
            labelStyle={{
              marginHorizontal: -10,
              fontSize: 12,
            }}
            inputStyle={{fontSize: 12}}
            placeholder="Input Email"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />


          <Input
            inputContainerStyle={{marginLeft: -10, height: 35, marginBottom:15}}
            labelStyle={{
              marginHorizontal: -10,
              fontSize: 12,
            }}
            secureTextEntry={true}
            inputStyle={{fontSize: 12}}
            placeholder="Input Password"
            value={this.state.password}
            label="Password"
            onChangeText={password => this.setState({password})
          }
          />
          <ButtonGroup
            onPress={selectedIndex => {
              this.setState({selectedIndex});
              if (selectedIndex === 0) {
                this.setState({user_type: 'buyer'});
                this.setState({role: 1});
              } else if (selectedIndex === 1) {
                this.setState({user_type: 'seller'});
                this.setState({role: 2});
              }
            }}
            selectedIndex={this.state.selectedIndex}
            buttonStyle={{backgroundColor: '#FFF'}}
            selectedButtonStyle={{backgroundColor: '#00B444'}}
            buttons={role}
            containerStyle={{
              marginTop:20,
              borderRadius: 10,
              marginBottom: 20,
              marginLeft: 0,
              marginRight: 0,
            }}
          />

          {/* color="#00B444" */}
          <Button
            block
            style={styles.textButtonSubmitContainer}
            onPress={e => {
              this.onClickSubmit();
            }}>
            <Text style={styles.textButtonSubmit}>Daftar Sekarang</Text>
          </Button>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'gray',
                }}>
                Sudah punya akun?
              </Text>
              <Text> </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}>
                <Text
                  style={{
                    color: '#62BA67',
                    fontSize: 12,
                    textDecorationLine: 'underline',
                  }}>
                  Sign In disini
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default Register;
