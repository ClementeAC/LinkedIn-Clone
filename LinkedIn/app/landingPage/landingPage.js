import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';


const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    color: '#ddd',
    fontSize: 50,
  },
  activeDot: {
    color: '#888',
    fontSize: 50,
  },
});
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
          this.props.navigation.replace("LinckedIn");
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
              style={{width, height, resizeMode: 'cover'}}
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
            style={{
              marginHorizontal: 90,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
              backgroundColor: "blue",
              paddingVertical: 13,
              borderRadius: 23,
              height: 40,
            }}
          >
            <Text style={{
              color: "white",
            }}>Unirse ahora</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginVertical: 30 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{
              alignSelf: "center",
              color: "blue",
            }}>Iniciar sesion</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}