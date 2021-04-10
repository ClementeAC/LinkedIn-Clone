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
  FlatList,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";

export default class friendList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      DATA: [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "Clemente Castejón",
          username: "clemente.acd",
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Heberto Urribarri",
          username: "0trebeh",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          title: "Otro amigo",
          username: "notienes",
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({});
  }

  render() {
    const { navigate, route, replace } = this.props.navigation;
    const Item = ({ title, username }) => (
      <View
        style={{
          backgroundColor: "#fff",
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginVertical: 0.5,
        }}
      >
        <Text style={{ fontSize: 20 }}>{title}</Text>
        <Text style={{ fontSize: 14, color: "gray" }}>@{username}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#eee",
            width: "15%",
            alignItems: "center",
            borderRadius: 5,
            padding: 3,
            left: "80%",
          }}
        >
          <Text style={{ color: "red" }}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
    const renderItem = ({ item }) => (
      <Item title={item.title} username={item.username} />
    );
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
