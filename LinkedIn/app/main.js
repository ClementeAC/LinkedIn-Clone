import React, { useState, useEffect } from "react";
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
} from "react-native";
import styles from "./main.css";

export default class main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      publications: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const res = [
      {
        name: "Heberto Urribarri",
        description: "Descontrol",
        image: require("../assets/imagendeprueba2.jpg"),
        Reactions: 72,
        comment: ["hola", "felicidades", "Eres mi crush", "Todo un pro"]
      },
      {
        name: "Clemente Castejon",
        description: "Estudiante de Ingeniería de Computación, ubicado en Maracaibo, Venezuela. 21 años de Edad.",
        image: require("../assets/imagendeprueba.png"),
        Reactions: 27,
        comment: ["hola"]
      }
    ];
    this.setState({
      publications: res, 
      loading: false
    });
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
        <ScrollView>

        {this.state.publications.map((item, index) => (
        <View 
        key={index}
        name="Publicacion"
        style={{
          marginVertical: 10,
          height: 320,
          width: "100%",
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}>
          <View>
            <View style={{
              flexDirection: "row",
              marginLeft: 5,
              marginTop: 3
            }}>
              <TouchableOpacity onPress={() => Alert.alert("Perfil")}>
                <Ionicons name="person-circle-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{ marginLeft: 10 }}>{item.name}</Text>
            </View>
            <Text style={{  //maximo 50 caracteres
              width: "100%",
              paddingHorizontal: 5
            }}>
              {item.description}
            </Text>
          </View>
          <View style={{
            height: 175,
            width: "100%"
          }}>
            <Image 
              style={{
                alignSelf: "center",
                height: "100%",
                width: "100%",
                resizeMode: 'contain',
              }}
              source={item.image} 
            />
          </View>
          <View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 25
            }}> 
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                <AntDesign name="like1" size={24} color="gray" />
                <Text style={{marginLeft: 10}}>{ item.Reactions }</Text>
              </View>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                <Text style={{marginLeft: 10}}>{ item.comment.length }</Text>
                <Text> Comments</Text>
              </View>
            </View>
            <View name="Divider" 
              style={{ 
                backgroundColor: "#ccc", 
                height: 2, 
                width: "94%", 
                marginVertical: 5, 
                alignSelf: "center" 
            }}></View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 25,
              marginBottom: 3
            }}> 
              <TouchableOpacity onPress={() => Alert.alert("Recomendar")}>
                <AntDesign name="like1" size={24} color="gray"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert("Comentar")}>
                <FontAwesome name="commenting" size={24} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert("compartir")}>
                <FontAwesome name="share" size={24} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert("Enviar")}>
                <Ionicons name="md-send" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        ))}
        </ScrollView>
      </View>
    );
  }
}
