import React from 'react';
import { Share, View, Button, Text, Alert } from 'react-native';

const InviteFriend = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hello!. You have been invited to join the LinkedIn clone! ✔,'+
          '\nDownload the application at this link: https://github.com/ClementeAC/LinkedInClone-CC-HU/releases'+
          '\n\nDevelopers: Clemente and Heberto'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const sendCorreo = async () => {

  };

  return (
    <View>
      <Text style={{
        marginTop: 40,
        fontSize: 25,
        textAlign: "center",
        color: "#000"
      }}>
        Obten mas conecciones!
      </Text>
      <Text style={{
        marginHorizontal: 55,
        textAlign: "center",
        marginVertical: 5,
        opacity: 0.4,
        color: "#333"
      }}>
        Invita a tus amigos para aumentar tus conecciones, y asi mismo. Tus oportunidades de seguir creciendo
      </Text>
      <View style={{ marginTop: 40, width: "80%", alignSelf: "center" }}>
        <Button onPress={onShare} title="Share" />
      </View>
      <View style={{ marginTop: 20, width: "80%", alignSelf: "center" }}>
        <Button onPress={() => Alert.alert("Enviar por correo")} title="Enviar Invitacion oficial por Correo" />
      </View>
    </View>
  );
};

export default InviteFriend;