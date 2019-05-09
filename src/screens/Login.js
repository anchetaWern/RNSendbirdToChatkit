import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import SendBird from "sendbird";

class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };


  state = {
    username: "",
    is_loading: false
  };


  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>

          <View style={styles.main}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Enter your username</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
              />
            </View>

            {!this.state.is_loading && (
              <Button title="Login" color="#0064e1" onPress={this.login} />
            )}

            {this.state.is_loading && (
              <Text style={styles.loadingText}>Loading...</Text>
            )}
          </View>
        </View>
      </View>
    );
  }


  login = () => {
    const username = this.state.username;
    this.setState({
      is_loading: true
    });

    const sb = new SendBird({ 'appId': 'YOUR SENDBIRD APP ID' });
    sb.connect(username, (user, error) => {
      this.props.navigation.navigate("Rooms", {
        id: username
      });
    });
  }
}

export default Login;

const styles = {
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF"
  },
  fieldContainer: {
    marginTop: 20
  },
  label: {
    fontSize: 16
  },
  textInput: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eaeaea",
    padding: 5
  },
  loadingText: {
    alignSelf: "center"
  }
};