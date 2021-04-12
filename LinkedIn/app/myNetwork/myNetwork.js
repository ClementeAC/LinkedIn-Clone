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
import styles from "./myNetwork.css";

export default class MyNetwork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      notifications: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const res = [
      {
        name: "Heberto Urribarri",
        job_title: "Rey Demonio",
      },
      {
        name: "Clemente Castejon",
        job_title: "Presidente de los estados unidos"
      }
    ];
    this.setState({
      notifications: res, 
      loading: false
    });
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
        <ScrollView>
        {this.state.notifications.map((item, index) => (
          <View 
            key={index}
            name="notification"
            style={{
              marginVertical: 2,
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              justifyContent: "space-between",
          }}>
            <View style={{ paddingVertical: 3 }}>
              <View style={{
                flexDirection: "row",
                marginLeft: 5,
                marginTop: 3,
                justifyContent: "space-between",
              }}>
                <View 
                style={{
                  flexDirection: "row",
                  marginLeft: 5,
                  marginTop: 3,
                }}>
                  <TouchableOpacity onPress={() => Alert.alert("Perfil")}>
                    <Ionicons name="person-circle-outline" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                </View>
                <Text style={{color: "blue", fontWeight: 'bold', marginRight: 10 }}>+ Connect</Text>
              </View>
              <View style={{
                flexDirection: "row",
                marginLeft: 5,
                marginTop: 3,
              }}>
                <View style={{ width: "10%" }}></View>
                <Text style={{
                  width: "90%",
                  paddingHorizontal: 5
                }}>
                  <Text style={{fontWeight: 'bold'}}>{item.job_title}</Text>
                </Text>
              </View>
            </View>
          </View>
        ))}
        </ScrollView>

      </View>
    );
  }
}