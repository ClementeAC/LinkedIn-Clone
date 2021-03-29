import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  Button,
  FlatList,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";
import styles from "./main.css";
import { datetime, compare } from "./utils/datetime";

export default class main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Button
          title="Profile"
          onPress={() => {
            navigate("Profile");
          }}
        />

        <Button
          title="Login"
          onPress={() => {
            navigate("Login");
          }}
        />

        <Button
          title="Register"
          onPress={() => {
            navigate("Register");
          }}
        />
      </View>
    );
  }
}
