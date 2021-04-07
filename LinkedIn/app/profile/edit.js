import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import styles from "./profile.css";

export default class profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: false,
      username: "",
      name: "",
      lastName: "",
      password: "",
      email: "",
      title: "",
      currentJobTitle: "",
      country: "",
      phone: "",
      education: [],
      skills: [],
      editData: false,
      id: 0,
    };
  }

  componentDidMount() {
    this.getUser();
    this.setState({
      name: "Clemente",
      lastName: "Castejón",
      title: "Student at Universidad Rafael Urdaneta",
      currentJobTitle: "English Teacher at CEVAZ",
      education: ["Colegio Alemán de Maracaibo", "Universidad Rafael Urdaneta"],
      skills: [
        "English",
        "Spanish",
        "Web development",
        "Networking experience",
      ],
      country: null,
    });
  }

  getUser = async () => {
    let res = "";
    try {
      res = await AsyncStorage.getItem("user");
    } catch (error) {
      // Error retrieving data
    }
    this.setState({
      username: JSON.parse(res).username,
      email: JSON.parse(res).email,
      id: JSON.parse(res).user_id,
      phone: JSON.parse(res).phone,
    });
  };

  async saveData() {
    const form = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    let id = this.state.id;
    console.log(id.toString(), form);
    const res = await axios.put(
      "https://listical.herokuapp.com/api/users/" + id.toString(),
      form
    );
    console.log(res);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(res.data[0]));
      this.setState({ editData: false });
    } catch (e) {
      //error
    }
  }

  render() {
    const { navigate, route, replace } = this.props.navigation;
      return (
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Edit your data
          </Text>
          <Text style={{ fontSize: 20, marginTop: 15 }}>Username:</Text>
          <TextInput
            style={{ marginTop: 15, fontSize: 15 }}
            placeholder="Enter new username"
            placeholderTextColor="#d8412e"
            onChangeText={(username) => this.setState({ username: username })}
          />
          <Text style={{ fontSize: 20, marginTop: 15 }}>Password:</Text>
          <TextInput
            style={{
              marginTop: 20,
              fontSize: 15,
              borderColor: "#d8412e",
              marginBottom: 15,
            }}
            placeholder="Enter new password"
            placeholderTextColor="#d8412e"
            onChangeText={(password) => this.setState({ password: password })}
          />
          <TouchableOpacity
            onPress={() => this.saveData()}
            style={{
              marginHorizontal: 90,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              backgroundColor: "#d8412e",
              paddingVertical: 13,
              paddingHorizontal: 25,
              borderRadius: 23,
              height: 40,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        </View>
      );
  }
}
