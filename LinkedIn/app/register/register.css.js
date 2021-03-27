import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
  },
  image: {
    width: "78%",
    height: "20%",
    alignSelf: "center",
    marginTop: 10
  },
  text1: {
    marginTop: 20,
    fontSize: 30,
    alignSelf: "center",
    color: "#fff"
  },
  text2: {
    marginHorizontal: 55,
    textAlign: "center",
    marginVertical: 5,
    opacity: 0.4,
    color: "#DCDCD3"
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#75FF95",
    borderRadius: 23,
    paddingVertical: 2,
  },
  buttonRegister: {
    marginHorizontal: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#75FF95",
    marginVertical: 10,
    borderRadius: 23,
    height: 40,
  },
  buttonRegisterDisabled: {
    marginHorizontal: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#397D44",
    marginVertical: 10,
    borderRadius: 23,
    height: 40,
  },
  textButton: {
    color: "white",
  },
  buttonNavigation: {
    alignSelf: "center",
    color: "#75FF95",
  },
});

export default styles;
