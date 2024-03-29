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
  FontAwesome,
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
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>
            Edit your data
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              borderWidth: 2,
              marginTop: 15,
              borderColor: "blue",
              borderRadius: 23,
              paddingVertical: 2,
              width: "80%",
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="user-circle"
              color="blue"
              size={24}
              style={{ left: 5 }}
            />
            <TextInput
              placeholder={this.state.name == null ? "Name" : this.state.name}
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 25 }}
              onChangeText={(name) => this.setState({ name: name })}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              borderWidth: 2,
              marginTop: 15,
              borderColor: "blue",
              borderRadius: 23,
              paddingVertical: 2,
              width: "80%",
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="user-circle-o"
              color="blue"
              size={24}
              style={{ left: 5 }}
            />
            <TextInput
              placeholder={
                this.state.lastName == null ? "Last name" : this.state.lastName
              }
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 25 }}
              onChangeText={(lastName) => this.setState({ lastName: lastName })}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              borderWidth: 2,
              marginTop: 15,
              borderColor: "blue",
              borderRadius: 23,
              paddingVertical: 2,
              width: "80%",
              marginBottom: 10,
            }}
          >
            <MaterialIcons
              name="title"
              color="blue"
              size={24}
              style={{ left: 5 }}
            />
            <TextInput
              placeholder={
                this.state.title == null ? "Description" : this.state.title
              }
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 25 }}
              onChangeText={(title) => this.setState({ title: title })}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              borderWidth: 2,
              marginTop: 15,
              borderColor: "blue",
              borderRadius: 23,
              paddingVertical: 2,
              width: "80%",
              marginBottom: 10,
            }}
          >
            <MaterialIcons
              name="work"
              color="blue"
              size={24}
              style={{ left: 5 }}
            />
            <TextInput
              placeholder={
                this.state.currentJobTitle == null
                  ? "Current Job Title"
                  : this.state.currentJobTitle
              }
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 25 }}
              onChangeText={(currentJobTitle) =>
                this.setState({ currentJobTitle: currentJobTitle })
              }
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              borderWidth: 2,
              marginTop: 15,
              borderColor: "red",
              borderRadius: 23,
              paddingVertical: 2,
              width: "80%",
              marginBottom: 10,
            }}
          >
            <FontAwesome5
              name="user-graduate"
              color="blue"
              size={23}
              style={{ left: 7 }}
            />
            <TextInput
              placeholder="Education"
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 25 }}
              onChangeText={(education) =>
                this.setState({ education: education })
              }
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              borderWidth: 2,
              marginTop: 15,
              borderColor: "red",
              borderRadius: 23,
              paddingVertical: 2,
              width: "80%",
              marginBottom: 10,
            }}
          >
            <MaterialIcons
              name="lightbulb"
              color="blue"
              size={24}
              style={{ left: 5 }}
            />
            <TextInput
              secureTextEntry
              placeholder="Skills and Proficiencies"
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 25 }}
              onChangeText={(skills) => this.setState({ skills: skills })}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 5,
              borderWidth: 2,
              marginTop: 15,
              borderColor: "blue",
              borderRadius: 23,
              paddingVertical: 2,
              width: "80%",
              marginBottom: 10,
            }}
          >
            <MaterialIcons
              name="place"
              color="blue"
              size={24}
              style={{ left: 5 }}
            />
            <TextInput
              secureTextEntry
              placeholder={
                this.state.country == null
                  ? "Country of residence"
                  : this.state.country
              }
              placeholderTextColor="#444"
              style={{ paddingHorizontal: 25 }}
              onChangeText={(country) => this.setState({ country: country })}
            />
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "blue",
              borderRadius: 23,
              height: 40,
              width: 100,
              marginTop: 5,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
