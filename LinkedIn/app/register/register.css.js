import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingBottom: 100
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
  buttonRegister: {
    marginHorizontal: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "blue",
    marginVertical: 10,
    borderRadius: 23,
    height: 40,
  },
  buttonRegisterDisabled: {
    marginHorizontal: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "dodgerblue",
    marginVertical: 10,
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
