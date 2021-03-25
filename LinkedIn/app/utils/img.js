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
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([null]);

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
      setImage(result.uri);
      setImages([...images, result.uri]);
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
      formData.append(images[i]);
    }
    console.log(formData);
    axios.post('http://192.168.0.103:4000/api/upload/images', {
      formData
    });
    console.log("llegoo");
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