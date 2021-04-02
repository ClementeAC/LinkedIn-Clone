import { StyleSheet } from "react-native";

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
  loginBtn: {
    marginHorizontal: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "blue",
    paddingVertical: 13,
    borderRadius: 23,
    height: 40,
  }
});

export default styles;