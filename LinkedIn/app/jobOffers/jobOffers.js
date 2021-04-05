import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput
} from "react-native";
import styles from "./jobOffers.css";

export default class jobOffers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      publications: []
    };
  }

  componentDidMount() {
  }

  search = (string) => {
   /* if(string !== ""){
      let tasksSearch = tasks.filter(function(res) { 
        return res.value.toLowerCase().indexOf(string.toLowerCase()) > -1;
      });
      //setTask( tasksSearch );
    }
    else {
      //setTask( tasks );
    }    */
  }

  render() {
    const { navigate } = this.props.navigation;
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
        <View style={{
            paddingLeft: 5,
            justifyContent: "center",
            backgroundColor: "#eee",
            alignSelf: "stretch",
            flexDirection: "row",
            borderTopWidth: 1,
            borderColor: "#eee",
        }}>
            <TextInput
                style={{
                    flex: 1,
                    height: 40,
                    backgroundColor: "#eee",
                    borderRadius: 4,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: "#eee",
                  }}
                placeholderTextColor="#999"
                placeholder="Search"
                onChangeText={(text) => search(text)}
            />
            <Ionicons 
                name="search-outline" 
                style={{
                    marginVertical: "auto",
                    paddingRight: 5,
                    marginTop: 5,
                }} 
                size={25} 
                color="#000"
            />
        </View>

      </View>
    );
  }
}