import React from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
  Share, 
  View, 
  Button, 
  Text,
  Alert, 
  Modal, 
  TextInput, 
  TouchableOpacity,
  Image
} from 'react-native';
import {
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";

export default class InviteFriend extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      friendEmail: ''
    };
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hello!. You have been invited to join the LinkedIn clone! ✔,'+
          '\nDownload the application at this link: https://github.com/ClementeAC/LinkedInClone-CC-HU/releases'+
          '\n\nDevelopers: Clemente and Heberto'
      });
    } catch (error) {
      alert(error.message);
    }
  };

  sendEmail = async () => {
    let res = "";
    try {
      res = await AsyncStorage.getItem("user");
    } catch (error) {
      // Error retrieving data
    }

    const response = await axios.post(
      "https://listical.herokuapp.com/api/users/inviteFriend",
      {
        friendEmail: this.state.friendEmail,
        username: JSON.parse(res).username,
        email: JSON.parse(res).email,
      }
    );
    if(response.data[0].message == "successful"){
      Alert.alert('Successful');
      this.setState({ modalVisible: false });
    } else {
      Alert.alert('Error sending mail');
    }
  };

  render() {
    return (
      <View>
        <Text style={{
          marginTop: 40,
          fontSize: 25,
          textAlign: "center",
          color: "#000"
        }}>
          Get more connections! 
        </Text>
        <Text style={{
          marginHorizontal: 55,
          textAlign: "center",
          marginVertical: 5,
          opacity: 0.4,
          color: "#333"
        }}>
          Invite your friends to increase your connections, and likewise. Your opportunities to continue growing. 
        </Text>
        <View style={{ marginTop: 40, width: "80%", alignSelf: "center" }}>
          <Button onPress={() => onShare()} title="Share linkedIn invitation" />
        </View>
        <View style={{ marginTop: 20, width: "80%", alignSelf: "center" }}>
          <Button onPress={() => this.setState({ modalVisible: true })} title="Share official linkedin invitation by mail" />
        </View>
        <Modal
              animationType="slide"
              visible={this.state.modalVisible}
            >
              <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            <Image
              source={require('../../assets/invite.png')}
              style={{
                width: 200, 
                height: 200, 
                resizeMode: 'contain'
              }}
            />
          <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginHorizontal: 20,
                          borderWidth: 2,
                          marginTop: 22,
                          borderColor: "blue",
                          borderRadius: 23,
                          paddingVertical: 2,
                          width: 250,
                          marginBottom: 10,
                        }}
                      >
                        <FontAwesome style={{ left: 5 }} name="send" size={24} color="blue" />
                        <TextInput
                          placeholder="Friend Email"
                          placeholderTextColor="#444"
                          style={{ paddingHorizontal: 25 }}
                          onChangeText={(friendEmail) =>
                            this.setState({ friendEmail })
                          }
                        />
                      </View>
                    <TouchableOpacity
                    onPress={() => {
                      this.sendEmail();
                    }}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "blue",
                      borderRadius: 23,
                      height: 40,
                      width: 150,
                      marginTop: 25,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center"
                      }}
                    >
                      Send invitation
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => {
                      this.setState({ modalVisible: false });
                    }}
                  >
                    <Text style={{ color: "red" }}>Cancel</Text>
                  </TouchableOpacity>
                  </View>
        </Modal>
      </View>
    );
  };
};
