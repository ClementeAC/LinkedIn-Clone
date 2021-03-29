import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import styles from "./register.css";


export default class register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      verify: false,
      code: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      confirmPassword: "",
    };
  }

  register = async () => {
    this.setState({ loading: true });
    const res = await axios.post("https://linckedin.herokuapp.com/api/users/", {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      phone: "+58" + this.state.phone,
    });
    this.props.navigation.replace("Home");
    try {
      await AsyncStorage.setItem("user", JSON.stringify(res.data[0]));
      this.props.navigation.replace("Home");
    } catch (e) {
      return;
    }
    this.setState({ loading: false });
  };

  verifyPhone = async () => {
    this.setState({ verify: true })
    const res = await axios.post("https://linckedin.herokuapp.com/api/users/code/", {
      phone: "+58" + this.state.phone.toString()
    });
  }

  verifyCode = async () => {
    const res = await axios.delete("https://linckedin.herokuapp.com/api/users/code/"+ this.state.code);
    if(res.data != 0){
      this.register();
    }
  }

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
    if (this.state.verify) {
      return (
        <View style={styles.container}>
          <View style={styles.input}>
            <FontAwesome name="barcode" size={24} color="black" />
            <TextInput
              keyboardType="numeric"
              placeholder="Verify code"
              maxLength={6}
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 48 }}
              onChangeText={(code) =>
                this.setState({ code: code })
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => this.verifyCode()}
            disabled={(this.state.code == "")}
            style={
              this.state.code == ""
                ? styles.buttonRegisterDisabled
                : styles.buttonRegister
            }
          >
            <Text style={styles.textButton}>Verify</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
      <ScrollView>
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
            <AntDesign name="user" color="blue" size={24} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 70 }}
              onChangeText={(username) => this.setState({ username: username })}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="mail" color="blue" size={24} />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 82 }}
              onChangeText={(email) => this.setState({ email: email })}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="phone" color="blue" size={24} />
            <Text>+58</Text>
            <TextInput
              placeholder="Phone"
              maxLength={10}
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 82 }}
              onChangeText={(phone) => this.setState({ phone: phone })}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="exclamationcircleo" color="blue" size={24} />
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 70 }}
              onChangeText={(password) => this.setState({ password: password })}
            />
          </View>
          <View style={styles.input}>
            <AntDesign name="exclamationcircleo" color="blue" size={24} />
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 48 }}
              onChangeText={(confirmPassword) =>
                this.setState({ confirmPassword: confirmPassword })
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => this.verifyPhone()}
            disabled={(this.state.username == "") && (this.state.password == "")}
            style={
              this.state.username == "" &&
              this.state.password == "" &&
              this.state.email == "" &&
              this.state.phone == "" &&
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
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
