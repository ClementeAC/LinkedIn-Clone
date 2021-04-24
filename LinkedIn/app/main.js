import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  RefreshControl,
  ShadowPropTypesIOS,
} from "react-native";
import styles from "./main.css";

export default class main extends React.Component {
  constructor(props) {
    super(props);

    this.props.navigation.addListener("didFocus", (payload) => {
      this.setState({ is_updated: true });
    });

    this.state = {
      loading: false,
      loadingImage: [],
      publications: [],
      publication: 0,
      comments: [],
      reactions: [],
      reaction: 0,
      user_id: 0,
      reactionsModalVisible: false,
      commentsModalVisible: false,
      sendModalVisible: false,
      comment: "",
      friendSearch: "",
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let res = await axios.get(
      "https://linckedin.herokuapp.com/api/publication/"
    );
    let respo = await AsyncStorage.getItem("user");
    this.setState({
      publications: res.data.reverse(),
      loading: false,
      user_id: JSON.parse(respo).user_id,
    });
  }

  comment = async () => {
    console.log(this.state.comment);
    this.setState({ commentsModalVisible: true });
  }

  reactions = async (value) => {
    console.log(value, this.state.publication, this.state.user_id);

    this.setState({ reactionsModalVisible: false, reaction: 1 });

    let date = new Date();
    let publication = this.state.publication;
    let charmed = false;
    let interesting = false;
    let recommend = false;
    let celebrate = false;

    await axios.delete("https://linckedin.herokuapp.com/api/publication/reaction/"+ this.state.user_id,
      {
        publication
      }
    );

    if (value === "1") {
      charmed = true;
    } else
    if (value === "2") {
      interesting = true;
    } else
    if (value === "3") {
      recommend = true;
    } else {
      celebrate = true;
    }

    console.log({
      user_id: this.state.user_id,
      date,
      publication,
      charmed,
      interesting,
      recommend,
      celebrate,
    });

    await axios.post(
      "https://linckedin.herokuapp.com/api/publication/reaction",
      {
        user_id: this.state.user_id,
        date,
        publication,
        charmed,
        interesting,
        recommend,
        celebrate,
      }
    );

    this.onRefresh();
  };

  async onRefresh() {
    this.setState({ refreshing: true });
    let res = await axios.get(
      "https://linckedin.herokuapp.com/api/publication/"
    );
    console.log(res.data);
    this.setState({
      publications: res.data,
    });
    console.log("listo");
    this.setState({ refreshing: false });
  }

  async poster(id) {
    console.log("presionaste el perfil del usuario:");
    console.log(id);
    try {
      await AsyncStorage.setItem("poster", JSON.stringify(id));
      console.log("Poster guardado");
      this.props.navigation.replace("Profile");
    } catch (e) {
      //error
    }
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
      <View
        style={{
          height: "100%",
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        >
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
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                    marginTop: 3,
                  }}
                >
                  <TouchableOpacity onPress={() => this.poster(item.user_id)}>
                    <Ionicons
                      name="person-circle-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.poster(item.user_id)}>
                    <Text
                      style={{
                        marginLeft: 5,
                        marginTop: 2,
                        fontWeight: "bold",
                      }}
                    >
                      {item.username}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    width: "100%",
                    paddingHorizontal: 5,
                    marginVertical: 5,
                  }}
                >
                  {item.descripcion}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  marginVertical: 2,
                  marginBottom: 4,
                }}
              >
                {item.img ? (
                  <Image
                    style={{
                      alignSelf: "center",
                      height: 240,
                      width: "100%",
                      resizeMode: "contain",
                      marginBottom: 5,
                    }}
                    // posible uso si la imagen no carga. eliminar si no es requerido
                    onLoadStart={() =>
                      console.log("cargando imagen en: " + index)
                    }
                    onLoadEnd={() => console.log("imagen cargada en: " + index)}
                    ////////////////////////////////////////////////////////////////
                    source={{ uri: item.img }}
                  />
                ) : (
                  <Image style={{ height: 0 }} />
                )}
              </View>
              <View>
                {false ? ( // Abilitar cuando sea una oferta de trabajo
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "#F8F8F8",
                      paddingBottom: 2,
                      marginBottom: 2,
                      paddingHorizontal: 15,
                    }}
                  >
                    <View>
                      <Text>Apply for a job offer.</Text>
                      <Text>Send my profile</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignSelf: "center" }}
                      onPress={() => Alert.alert("Aplicar a trabajo")}
                    >
                      <MaterialCommunityIcons
                        name="account-arrow-right"
                        size={24}
                        color="#444"
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 25,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>
                      {item.reactions === null
                        ? 0
                        : item.reactions}
                    </Text>
                    <View style={{ marginLeft: 10 }}></View>
                    <AntDesign
                      style={
                        true != null ? { display: "flex" } : { display: "none" }
                      }
                      name="like1"
                      size={13}
                      color="blue"
                    />
                    <AntDesign
                      style={
                        true != null
                          ? { display: "flex", marginHorizontal: 2 }
                          : { display: "none", marginHorizontal: 2 }
                      }
                      name="heart"
                      size={13}
                      color="red"
                    />
                    <AntDesign
                      style={
                        true != null ? { display: "flex" } : { display: "none" }
                      }
                      name="smile-circle"
                      size={13}
                      color="green"
                    />
                    <MaterialIcons
                      style={
                        true != null ? { display: "flex" } : { display: "none" }
                      }
                      name="lightbulb"
                      size={13}
                      color="#FFD700"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ commentsModalVisible: true });

                    }
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ marginLeft: 10 }}>
                        {item.comments === null ? 0 : item.comments}
                      </Text>
                      <Text> Comments </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  name="Divider"
                  style={{
                    backgroundColor: "#B0C4DE",
                    height: 2,
                    width: "94%",
                    marginVertical: 5,
                    alignSelf: "center",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 30,
                    marginBottom: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        reactionsModalVisible: true,
                        publication: item.publication_id,
                      });
                    }}
                  >
                    <AntDesign name="like1" size={24} color="gray" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        commentsModalVisible: true,
                        publication: item.publication_id,
                      })
                    }
                  >
                    <FontAwesome name="commenting" size={24} color="gray" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({ sendModalVisible: true })}
                  >
                    <FontAwesome name="send" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.reactionsModalVisible}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => {
              this.setState({ reactionsModalVisible: false });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.reactions("1");
                  }}
                  style={{
                    borderRadius: 23,
                    marginHorizontal: 10,
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    name="like1"
                    size={35}
                    color="blue"
                    style={{
                      padding: 10,
                    }}
                  />
                  <Text style={{ color: "#888" }}>Like It!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.reactions("2");
                  }}
                  style={{
                    borderRadius: 23,
                    marginHorizontal: 10,
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    name="heart"
                    size={35}
                    color="red"
                    style={{ padding: 10 }}
                  />
                  <Text style={{ color: "#888" }}>Love It!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.reactions("3");
                  }}
                  style={{
                    borderRadius: 23,
                    marginHorizontal: 10,
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    name="smile-circle"
                    size={35}
                    color="green"
                    style={{ padding: 10 }}
                  />
                  <Text style={{ color: "#888" }}>Enjoyed It!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.reactions("4");
                  }}
                  style={{
                    borderRadius: 23,
                    marginHorizontal: 10,
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="lightbulb"
                    size={35}
                    color="#FFD700"
                    style={{ padding: 10 }}
                  />
                  <Text style={{ color: "#888" }}>It's brilliant!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.commentsModalVisible}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => {
              this.setState({ commentsModalVisible: false, publication: item.publication_id});
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: 5,
                  }}
                >{this.state.comments.map((item, index) => (
                  <Text>{item.comment ? item.comment : "Se el primero en comentar"}</Text>
                ))}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 2,
                    marginTop: 15,
                    borderColor: "blue",
                    borderRadius: 23,
                    paddingVertical: 2,
                    width: 300,
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Leave a comment:"
                    placeholderTextColor="#444"
                    style={{ paddingHorizontal: 25 }}
                    onChangeText={(comment) =>
                      this.setState({ comment: comment })
                    }
                  />
                  <TouchableOpacity style={{ right: 10 }} onPress={() => this.comment()}>
                    <Ionicons name="send" size={24} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.sendModalVisible}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => {
              this.setState({ sendModalVisible: false });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 2,
                    marginTop: 15,
                    borderColor: "blue",
                    borderRadius: 23,
                    paddingVertical: 2,
                    width: 300,
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Search for a connection:"
                    placeholderTextColor="#444"
                    style={{ paddingHorizontal: 25 }}
                    onChangeText={(friendSearch) =>
                      this.setState({ friendSearch: friendSearch })
                    }
                  />
                  <AntDesign
                    name="search1"
                    size={24}
                    color="blue"
                    style={{ right: 10 }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ marginBottom: 5 }}>Aqui van tus amigos </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
