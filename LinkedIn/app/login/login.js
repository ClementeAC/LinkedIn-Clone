import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import styles from "./login.css";

export default class login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: "",
      password: "",
      log: false,
    };
  }

  async componentDidMount() {
    var value = null;
    try {
      value = await AsyncStorage.getItem("user");
      console.log(value);
    } catch (error) {
      // Error retrieving data
    }

    if (value !== null) {
      this.props.navigation.replace("Home");
    }
  }

  login = async () => {
    this.setState({ loading: true });
    const res = await axios.post(
      "https://linckedin.herokuapp.com/api/users/login",
      {
        username: this.state.username,
        password: this.state.password,
      }
    );

    if (res.data[0].status == 404) {
      Alert.alert("User not found");
    } else {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(res.data[0]));
        this.props.navigation.replace("Home");
      } catch (e) {
        //error
      }
    }

    this.setState({ loading: false });
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE",
          }}
        >
          <ActivityIndicator animating size="small" color="#999999" />
        </View>
      );
    }

    const { navigate, replace } = this.props.navigation;
    return (
      
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <ScrollView>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <Image
            source={require("../../assets/fondo.png")}
            style={styles.image}
          />
          <Text style={styles.text1}>Get connected!</Text>

          <Text style={styles.text2}>
            x-app is an app to help you build and find connections with people that you work in the same field as you!
          </Text>

          <View style={styles.input}>
            <AntDesign name="user" color="blue" size={24} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#444"
              style={styles.textInput}
              onChangeText={(username) => this.setState({ username: username })}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="exclamationcircleo" color="blue" size={24} />
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#444"
              style={styles.textInput}
              onChangeText={(password) => this.setState({ password: password })}
            />
          </View>
          <TouchableOpacity
            id="loginBtn"
            disabled={(this.state.username == "") | (this.state.password == "")}
            onPress={() => this.login()}
            style={
              this.state.username == "" || this.state.password == ""
                ? styles.buttonLoginDisabled
                : styles.buttonLogin
            }
          >
            <Text style={styles.textButton}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginVertical: 30 }}
            onPress={() => navigate("Register")}
          >
            <Text style={styles.buttonNavigation}>New User</Text>
          </TouchableOpacity>
        </View> 
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
