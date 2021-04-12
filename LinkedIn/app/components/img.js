import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Image, View, Platform, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {datetime} from "../utils/datetime";

export default function Img(props, { publication }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const sendImage = async ( comment ) => {
    setLoading( true );
    if(comment){
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      name: image.split("/").pop(),
      type: "image" + "/" + image.split("/").pop().split(".").pop(),
    });
    formData.append("upload_preset", "0trebeh");
    formData.append("cloud_name", "otrebeh");
    fetch("https://api.cloudinary.com/v1_1/otrebeh/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
        console.log(props.publication);
        if (props.publication) {
          // Si un props que le pase de toPost es true se sube una publicacion
          sendPublication(data.secure_url);
        }
      })
      .catch((err) => {
        Alert.alert("Image upload error");
        setLoading( false );
      });
    } else {
      console.log('solo comentario');
      sendPublication(null);
    }
  };

  //aun no probado
  const sendPublication = async (url) => {
    console.log("se subio la imagen");
    let id = await AsyncStorage.getItem("user");
    let publication = {
      user_id: JSON.parse(id).user_id, 
      date: datetime(), 
      descripcion: props.publication, 
      img: url, 
      job_offer: false
    };
    console.log(publication);
    const res = await axios.post(
      "https://linckedin.herokuapp.com/api/publication",
      publication
    );
    console.log(res.data);
    setLoading( false);
    Alert.alert("published!");
  };

  const cancel = async () => {
    setImage(null);
  };

  if (loading) {
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
    <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 10 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: image }}
          style={{
            height: 240,
            width: "100%",
            resizeMode: "contain",
            marginBottom: 20,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 40,
          marginHorizontal: 25,
        }}
      >
        <View>
          {image ? (
            <Button title="Cancelar" onPress={() => cancel()} />
          ) : (
            <Button title="Enviar" onPress={() => sendImage(false)} />
          )}
        </View>
        <View>
          {image ? (
            <Button title="Enviar" onPress={() => sendImage(true)} />
          ) : (
            <Button title="Add an image" onPress={pickImage} />
          )}
        </View>
      </View>
    </View>
  );
}
