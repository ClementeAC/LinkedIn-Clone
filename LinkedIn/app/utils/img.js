import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Img({ navigation: { goBack } }) {
  const [image, setImage] = useState(null);
  const [typeFile, setTypeFile] = useState(null);

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
      aspect:[4,3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setTypeFile(typeFile, result.type + "/" + result.uri.slice((result.uri.lastIndexOf(".") - 1 >>> 0) + 2));
    }
  };

  const sendImage = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: image.split('/').pop(),
      type: typeFile
    });
    formData.append('upload_preset','0trebeh');
    formData.append('cloud_name','otrebeh');
    console.log(formData);
    fetch("https://api.cloudinary.com/v1_1/otrebeh/image/upload", {
      method:"post",
      body:formData
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
    }).catch(err=>{
      Alert.alert("Error")
    })
  };

  const cancel = async () => {
    setImage(null);
  }
  
  return (
    <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 75 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: image }}
          style={{ 
            height: 240,
            width: "100%",
            resizeMode: 'contain',
            marginBottom: 20
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
        <Button title="Volver" onPress={() => goBack()}/>
        { image
          ? <Button title="Cancelar" onPress={() => cancel()}/>
          : null
        }
        <View>
          { image
            ? <Button title="Enviar" onPress={() => sendImage()} />
            : <Button title="Buscar" onPress={pickImage} />
          }
        </View>
      </View>
    </View>
  );
}