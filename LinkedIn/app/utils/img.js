import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  FlatList
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Img() {
  const [images, setImages] = useState([null]);
  const [typeFile, setTypeFile] = useState([null]);

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
      quality: 1,
    });

    if (!result.cancelled) {
      //const uploadImage = Platform.OS === 'ios' ? result.uri.replace('file://', ''): result.uri;
      setImages([...images, result.uri]);
      setTypeFile([...typeFile, result.type + "/" + result.uri.slice((result.uri.lastIndexOf(".") - 1 >>> 0) + 2)]);
    }
    console.log(images.length);
  };

  const putoff = (item) => {
    let imgs = images.filter((img) => img !== item);
    setImages(imgs);
    console.log(images.length);
  };

  const sendImages = async () => {

    const formData = new FormData();
    for (let i = 1; i < images.length; i++) {
      formData.append('file', {
        uri: images[i],
        name: images[i].split('/').pop(),
        type: typeFile[i]
      });
    }
    console.log(formData);
    //delete axios.defaults.headers.common["Accept"];
    axios.post('https://linckedin.herokuapp.com/api/upload/images/imagenes', {
      formData,
    })
    .then(data => {
        console.log(data.data);
    })
    .catch(err => console.error(err));

  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 75 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <View
                style={
                  item != null ? { marginBottom: 5 } : { width: 0, height: 0 }
                }
              >
                <Image
                  source={{ uri: item }}
                  style={{ width: 200, height: 250 }}
                />
                <Button
                  title="Quitar imagen"
                  color="#cd5c5c"
                  onPress={() => putoff(item)}
                />
              </View>
            )}
            keyExtractor={(item) => item}
          ></FlatList>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 40,
          marginHorizontal: 25,
        }}
      >
        <Button title="Enviar" onPress={() => sendImages()} />
        <View
          style={
            images.length == 5
              ? { margin: 0, padding: 0 }
              : { width: 0, height: 0 }
          }
        >
          <Button color="red" title="Limite alcanzado" />
        </View>
        <View
          style={
            images.length != 5
              ? { margin: 0, padding: 0 }
              : { width: 0, height: 0 }
          }
        >
          <Button title="Añadir imagen" onPress={pickImage} />
        </View>
      </View>
    </View>
  );
}