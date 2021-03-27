import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {Ionicons, AntDesign} from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./register.css";


export default class register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    };
  }

  register = async () => {
    const res = await axios.post("https://listical.herokuapp.com/api/users/", {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    });

    this.props.navigation.replace("Home");
    try {
      await AsyncStorage.setItem("user", JSON.stringify(res.data[0]));
      this.props.navigation.replace("Home");
    } catch (e) {
      return;
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Image
            source={require("../../assets/fondo.png")}
            style={styles.image}
          />
          <Text style={styles.text1}>Get connected!</Text>

          <Text style={styles.text2}>
          x-app is an app to help you build and find connections with people that you work in the same field as you!
          </Text>

          <View style={styles.input}>
            <AntDesign name="user" color="#75FF95" size={24} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#75FF95"
              style={{ paddingHorizontal: 70 }}
              onChangeText={(username) => this.setState({ username: username })}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="mail" color="#75FF95" size={24} />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#75FF95"
              style={{ paddingHorizontal: 82 }}
              onChangeText={(email) => this.setState({ email: email })}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="exclamationcircleo" color="#75FF95" size={24} />
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#75FF95"
              style={{ paddingHorizontal: 70 }}
              onChangeText={(password) => this.setState({ password: password })}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="exclamationcircleo" color="#75FF95" size={24} />
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="#75FF95"
              style={{ paddingHorizontal: 48 }}
              onChangeText={(confirmPassword) =>
                this.setState({ confirmPassword: confirmPassword })
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => this.register()}
            disabled={(this.state.username == "") | (this.state.password == "")}
            style={
              this.state.username == "" ||
              this.state.password == "" ||
              this.state.email == "" ||
              this.state.confirmPassword == ""
                ? styles.buttonRegisterDisabled
                : styles.buttonRegister
            }
          >
            <Text style={styles.textButton}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginVertical: 30 }}
            onPress={() => navigate("Login")}
          >
            <Text style={styles.buttonNavigation}>Already a user</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
