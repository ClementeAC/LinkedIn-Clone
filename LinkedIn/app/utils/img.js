import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Image,
  View,
  Platform,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Img({publication}) {
  const [image, setImage] = useState(null);

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
    }
  };

  const sendImage = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: image.split('/').pop(),
      type: "image" + "/" + image.split('/').pop().split(".").pop()
    });
    formData.append('upload_preset','0trebeh');
    formData.append('cloud_name','otrebeh');
    console.log(formData);
    fetch("https://api.cloudinary.com/v1_1/otrebeh/image/upload", {
      method:"post",
      body:formData
    }).then(res=>res.json())
    .then(data=>{
      console.log(data.secure_url)
      if(props.publicationTrue){ // Si un props que le pase de toPost es true se sube una publicacion
        sendPublication(data.secure_url);
      }
    }).catch(err=>{
      Alert.alert("Error al subir la imagen")
    })
  };

  //aun no probado
  const sendPublication = async (url) => {
    this.setState({ loading: true });
    let name = await AsyncStorage.getItem("user");
    let publication = {
      url,
      publicationText: this.props.publication,
      user: JSON.parse(name).username
    }
    const res = await axios.post(
      "https://linckedin.herokuapp.com/api/",
      publication
    );
    this.setState({ loading: false });
  }

  const cancel = async () => {
    setImage(null);
  }

  return (  
    <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 10 }}>
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
        <Button title="Cancelar" onPress={() => cancel()}/>
        <View>
          { image
            ? <Button title="Enviar" onPress={() => sendImage()} />
            : <Button title="Add an image" onPress={pickImage} />
          }
        </View>
      </View>
    </View>
  );
}