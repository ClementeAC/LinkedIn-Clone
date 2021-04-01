import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingBottom: 200
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
    color: "#000"
  },
  text2: {
    marginHorizontal: 55,
    textAlign: "center",
    marginVertical: 5,
    opacity: 0.4,
    color: "#333"
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "blue",
    borderRadius: 23,
    paddingVertical: 2,
  },
  textInput: {
    paddingHorizontal: 30,
  },
  buttonLogin: {
    marginHorizontal: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "blue",
    paddingVertical: 13,
    borderRadius: 23,
    height: 40,
  },
  buttonLoginDisabled: {
    marginHorizontal: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "dodgerblue",
    paddingVertical: 13,
    borderRadius: 23,
    height: 40,
  },
  textButton: {
    color: "white",
  },
  buttonNavigation: {
    alignSelf: "center",
    color: "blue",
  },
});

export default styles;
