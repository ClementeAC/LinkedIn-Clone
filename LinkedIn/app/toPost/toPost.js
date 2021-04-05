import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput
} from "react-native";
import styles from "./toPost.css";
import Img from "../utils/img";

export default class toPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: null,
      publicationText: "",
    };
  }

  async componentDidMount() {
    let res = await AsyncStorage.getItem("user");
    this.setState({
      username: JSON.parse(res).username
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.prueba){
      return (
        <Img prueba={true}/* Subir imagen *//>
      );
    }
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
    return (
      <View style={{
        height: "100%",
      }}>
        <ScrollView>
        <View style={{
          flexDirection: "row",
          marginLeft: 5,
          marginTop: 3
        }}>
          <TouchableOpacity onPress={() => Alert.alert("Perfil")}>
            <Ionicons name="person-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}>{this.state.username}</Text>
        </View>
        <TextInput
          multiline={true}
          style={{
            minHeight: 40,
            backgroundColor: "#eee",
            borderRadius: 4,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "#eee",
          }}
          placeholderTextColor="#999"
          placeholder="What do you want to talk about?"
          onChangeText={(text) => this.setState({ publicationText: text })}
        />
        <Img publication={this.state.publicationText}/* Subir imagen *//>
        </ScrollView>
      </View>
    );
  }
}