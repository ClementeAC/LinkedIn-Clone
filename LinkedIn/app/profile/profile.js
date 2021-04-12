import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import styles from "./profile.css";

export default class profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: false,
      username: null,
      name: null,
      lastName: null,
      password: null,
      email: null,
      title: null,
      currentJobTitle: null,
      country: null,
      phone: null,
      education: null,
      skills: null,
      id: null,
    };
  }

  componentDidMount() {
    this.getUser();
    this.setState({
      name: "Clemente",
      lastName: null,
      title: "Student at Universidad Rafael Urdaneta",
      currentJobTitle: null,
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
    console.log("llego");
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

  logout = async (replace) => {
    Alert.alert(
      "Logout",
      "Are you sure you want log out?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Log out",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("user");
              replace("Root");
            } catch (error) {
              // Error retrieving data
            }
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  render() {
    const { navigate, replace } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <View
            style={{
              backgroundColor: "white",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Image
              source={require("../../assets/profile.png")}
              style={{
                width: 125,
                height: 125,
                borderRadius: 60,
                resizeMode: "contain",
                marginTop: 20,
              }}
            />
            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
              {this.state.username}
            </Text>
            <Text style={{ color: "gray", marginTop: 5 }}>
              {this.state.name != null ? this.state.name : null}{" "}
              {this.state.lastName != null ? this.state.lastName : null}
            </Text>
            <Text style={{ color: "gray", marginBottom: 2 }}>
              {this.state.email != null ? this.state.email : null}
            </Text>
            <Text style={{ color: "gray", marginBottom: 10 }}>
              {this.state.phone != null ? this.state.phone : null}
            </Text>
            <Text
              style={{ marginBottom: 10, fontWeight: "bold", fontSize: 17 }}
            >
              {this.state.title}
            </Text>
            <TouchableOpacity onPress={() => navigate("friendList")}>
              <View
                style={{
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "blue",
                  paddingVertical: 8,
                  width: 120,
                  borderRadius: 23,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Connections
                </Text>
                <Text style={{}}>69</Text>
              </View>
            </TouchableOpacity>
            <Entypo name="dot-single" color="blue" size={15} />
            <TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "blue",
                  paddingVertical: 8,
                  width: 120,
                  borderRadius: 23,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Posts</Text>
                <Text style={{}}>100</Text>
              </View>
            </TouchableOpacity>
            <View>
              {(this.state.name == null) |
              (this.state.lastName == null) |
              (this.state.title == null) |
              (this.state.currentJobTitle == null) |
              (this.state.education == null) |
              (this.state.skills == null) |
              (this.state.country == null) ? (
                <View
                  style={{
                    borderColor: "blue",
                    borderWidth: 2,
                    padding: 15,
                    borderRadius: 30,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                    Add some more information to complete your profile
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}
                    style={{
                      marginHorizontal: 70,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      backgroundColor: "blue",
                      borderRadius: 23,
                      height: 40,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginHorizontal: 10,
                      }}
                    >
                      Complete your profile
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            <View>
              {this.state.currentJobTitle != null ? (
                <View style={{ alignItems: "center" }}>
                  <MaterialIcons name="work" color="blue" size={24} />
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Current Job Title
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 17 }}>
                    {this.state.currentJobTitle}
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              {this.state.country != null ? (
                <View style={{ alignItems: "center" }}>
                  <MaterialIcons
                    name="place"
                    color="blue"
                    size={24}
                    style={{ marginTop: 20 }}
                  />
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Country of residence
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 17 }}>
                    {this.state.country}
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              {this.state.education != null ? (
                <View style={{ alignItems: "center" }}>
                  <FontAwesome5
                    name="user-graduate"
                    color="blue"
                    size={23}
                    style={{ marginTop: 20 }}
                  />
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Education
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 17 }}>
                    {this.state.education[0]}
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              {this.state.skills != null ? (
                <View style={{ alignItems: "center" }}>
                  <Entypo name="dot-single" color="blue" size={15} />
                  <Text style={{ fontSize: 17 }}>
                    {this.state.education[1]}
                  </Text>
                  <MaterialIcons
                    name="lightbulb"
                    color="blue"
                    size={24}
                    style={{ marginTop: 20 }}
                  />
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Skills and Proficiencies
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 17 }}>
                    {this.state.skills[3]}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            style={{ paddingVertical: 15 }}
            onPress={() => this.logout(replace)}
          >
            <Text style={{ color: "#d8412e", alignSelf: "center" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <ScrollView>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 5,
                  paddingVertical: 15,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <AntDesign
                  name="checkcircleo"
                  size={30}
                  color="blue"
                  style={{ marginBottom: 7 }}
                />
                <Text
                  style={{
                    marginBottom: 5,
                    fontWeight: "bold",
                    fontSize: 17,
                    textAlign: "center",
                  }}
                >
                  Let's complete your profile!
                </Text>
                <Text style={{ color: "gray", marginBottom: 15 }}>
                  Here's your missing profile information:
                </Text>
                <View>
                  {this.state.name == null ? (
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
                        width: 250,
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
                        placeholder="Name"
                        placeholderTextColor="#444"
                        style={{ paddingHorizontal: 25 }}
                        onChangeText={(name) => this.setState({ name: name })}
                      />
                    </View>
                  ) : null}
                </View>
                <View>
                  {this.state.lastName == null ? (
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
                        width: 250,
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
                        placeholder="Last Name"
                        placeholderTextColor="#444"
                        style={{ paddingHorizontal: 25 }}
                        onChangeText={(lastName) =>
                          this.setState({ lastName: lastName })
                        }
                      />
                    </View>
                  ) : null}
                </View>
                <View>
                  {this.state.title == null ? (
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
                        width: 250,
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
                        placeholder="Description"
                        placeholderTextColor="#444"
                        style={{ paddingHorizontal: 25 }}
                        onChangeText={(title) =>
                          this.setState({ title: title })
                        }
                      />
                    </View>
                  ) : null}
                </View>
                <View>
                  {this.state.currentJobTitle == null ? (
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
                        width: 250,
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
                        placeholder="Current Job Title"
                        placeholderTextColor="#444"
                        style={{ paddingHorizontal: 25 }}
                        onChangeText={(currentJobTitle) =>
                          this.setState({ currentJobTitle: currentJobTitle })
                        }
                      />
                    </View>
                  ) : null}
                </View>
                <View>
                  {this.state.education == null ? (
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
                        width: 250,
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
                  ) : null}
                </View>
                <View>
                  {this.state.skills == null ? (
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
                        width: 250,
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
                        onChangeText={(skills) =>
                          this.setState({ skills: skills })
                        }
                      />
                    </View>
                  ) : null}
                </View>
                <View>
                  {this.state.country == null ? (
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
                        width: 250,
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
                        placeholder="Country of residence"
                        placeholderTextColor="#444"
                        style={{ paddingHorizontal: 25 }}
                        onChangeText={(country) =>
                          this.setState({ country: country })
                        }
                      />
                    </View>
                  ) : null}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "blue",
                    borderRadius: 23,
                    height: 40,
                    width: 100,
                    marginTop: 25,
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
                <TouchableOpacity
                  style={{ marginTop: 15 }}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                >
                  <Text style={{ color: "red" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}
