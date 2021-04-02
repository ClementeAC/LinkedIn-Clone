import React, {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import styles from "./landingPage.css";

export default function landingPage({ navigation }) {

  const [session, setSession] = useState(false);
  useEffect(() => {
    async function verifySession() {
      var value = null;
        try {
          value = await AsyncStorage.getItem("user");
          console.log(value);
        } catch (error) {
          // Error retrieving data
        }
        if (value !== null) {
          navigation.replace("LinkedIn");
        }
    }
    verifySession();
  }, [session]);

  const width = useWindowDimensions().width;
  const height = width * 0.6;

  const [active, setActive] = useState(0);
  
  const images = [
    require('../../assets/1.png'),
    require('../../assets/2.png'),
    require('../../assets/3.png'),
  ];

  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View style={{backgroundColor: '#fff', height: "100%"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 30}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal={true}
          onScroll={change}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={{
                width, 
                height, 
                flex: 1,
                resizeMode: 'contain'
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.pagination}>
        {images.map((i, k) => (
          <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
            •
          </Text>
        ))}
      </View>
      <TouchableOpacity
            id="loginBtn"
            onPress={() => navigation.navigate("Register")}
            style={styles.loginBtn}
          >
            <Text style={{
              color: "white",
            }}>Join now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginVertical: 30 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{
              alignSelf: "center",
              color: "blue",
            }}>log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}