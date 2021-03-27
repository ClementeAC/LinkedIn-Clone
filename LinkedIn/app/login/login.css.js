import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
  },
  image: {
    marginTop: 10,
    height: "20%",
    width: "78%",
    alignSelf: "center"
  },
  text1: {
    marginTop: 40,
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
  textInput: {
    paddingHorizontal: 70,
  },
  buttonLogin: {
    marginHorizontal: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#75FF95",
    paddingVertical: 13,
    borderRadius: 23,
    height: 40,
  },
  buttonLoginDisabled: {
    marginHorizontal: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#397D44",
    paddingVertical: 13,
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
