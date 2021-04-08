import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  Entypo,
  AntDesign
} from "@expo/vector-icons";
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
import styles from "./profile.css";

export default class ModalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

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

  render() {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          ><ScrollView>
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
                        marginBottom: 30,
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
                        marginBottom: 30,
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
                        marginBottom: 30,
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
                        marginBottom: 30,
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
                        marginBottom: 30,
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
                        marginBottom: 30,
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
                        marginBottom: 30,
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
