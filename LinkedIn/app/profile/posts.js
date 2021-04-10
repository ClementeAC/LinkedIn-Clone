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

export default class posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.setState({});
  }

  render() {
    const { navigate, route, replace } = this.props.navigation;
    return (
      <View>
        <Text>Clemente es marico</Text>
      </View>
    );
  }
}
