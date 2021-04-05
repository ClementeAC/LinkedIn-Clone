import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, Foundation } from "@expo/vector-icons";
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
      loadingImage: [],
      publications: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const res = [
      {
        name: "Heberto Urribarri",
        description: "Descontrol",
        image: {uri: "https://res.cloudinary.com/otrebeh/image/private/s--aAyHPm2D--/v1617561878/b2017b8f-73ca-4677-b122-c064d27d5767_nikapt.jpg"},
        Reactions: 72,
        comment: ["hola", "felicidades", "Eres mi crush", "Todo un pro"]
      },
      {
        name: "Clemente Castejon",
        description: "Estudiante de Ingeniería de Computación, ubicado en Maracaibo, Venezuela. 21 años de Edad.",
        image: {uri: null},
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
            width: "100%",
            marginVertical: 2,
            marginBottom: 4
          }}>
            { item.image.uri ?
              <Image 
              style={{
                alignSelf: "center",
                height: 240,
                width: "100%",
                resizeMode: 'contain',
              }}
              // posible uso si la imagen no carga. eliminar si no es requerido
              onLoadStart={() => console.log("cargando imagen en: "+index)}
              onLoadEnd={() => console.log("imagen cargada en: "+index)}
              ////////////////////////////////////////////////////////////////
              source={item.image} 
              /> :
              <Image style={{ height: 0 }}/>
            }
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
                <Text>{ item.Reactions }</Text>
                <View style={{marginLeft: 10}}></View>
                <AntDesign style={ true != null ? {display: 'flex'} : {display: 'none'}} name="like1" size={13} color="blue" />
                <AntDesign style={ true != null ? {display: 'flex', marginHorizontal: 2} : {display: 'none', marginHorizontal: 2}} name="heart" size={13} color="red" />
                <AntDesign style={ true != null ? {display: 'flex'} : {display: 'none'}} name="smile-circle" size={13} color="green" />
                <MaterialIcons style={ true != null ? {display: 'flex'} : {display: 'none'}} name="lightbulb" size={13} color="#FFD700" />
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
                backgroundColor: "#B0C4DE", 
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
              <TouchableOpacity onPress={() => Alert.alert("Enviar")}>
                <Ionicons name="md-send" size={24} color="gray" />
              </TouchableOpacity>
              { false  // Abilitar cuando sea una oferta de trabajo
                ? <TouchableOpacity onPress={() => Alert.alert("Aplicar a trabajo")}>
                  <Foundation name="torso-business" size={24} color="gray" />
                </TouchableOpacity> 
                : null
              }
              <TouchableOpacity onPress={() => Alert.alert("Guardar")}>
                <FontAwesome name="bookmark" size={24} color="gray" />
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
