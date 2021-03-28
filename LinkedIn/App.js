import "react-native-gesture-handler";
import * as React from "react"; 
import {
  TouchableOpacity,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Entypo } from "@expo/vector-icons";

import main from "./app/main";
import profile from "./app/profile/profile";
import login from "./app/login/login";
import register from "./app/register/register";
import Img from "./app/utils/img";
import notifications from "./app/utils/notifications";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LogoPerfil({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
      <AntDesign 
      style={{ padding: 6, marginRight: 10 }} name="user" color="#fff" size={24}/>
    </TouchableOpacity>
  );
}

function LogoMenu({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Entypo 
      style={{ padding: 6, marginLeft: 10 }} name="menu" size={24} color="#fff"/>
    </TouchableOpacity>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Notifications"
        onPress={() => props.navigation.navigate("Notifications")}
      />
      <DrawerItem
        label="Login"
        onPress={() => props.navigation.navigate("Login")}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate("Profile")}
      />
      <DrawerItem
        label="Register"
        onPress={() => props.navigation.navigate("Register")}
      />
      <DrawerItem
        label="Image"
        onPress={() => props.navigation.navigate("Img")}
      />
      <DrawerItem
        label="Cerrar menu"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

function MenuRoute({ navigation }) {
  const optionsNavigator = ({ navigation }, Title) => ({
    headerTitle: Title,
    headerLeft: props => LogoMenu({ navigation }),
    headerRight: () => LogoPerfil({ navigation }),
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
  });

  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="Home" component={main} 
        options={({ navigation }) => optionsNavigator({ navigation }, "Home")}
        />
        <Stack.Screen name="Notifications" component={notifications}
        options={({ navigation }) => optionsNavigator({ navigation }, "Notifications")} 
        />
        <Stack.Screen name="Login" component={login} 
        options={({ navigation }) => optionsNavigator({ navigation }, "Login")}
        />
        <Stack.Screen name="Profile" component={profile} 
        options={({ navigation }) => optionsNavigator({ navigation }, "Profile")}
        />
        <Stack.Screen name="Register" component={register} 
        options={({ navigation }) => optionsNavigator({ navigation }, "Register")}
        />
        <Stack.Screen name="Img" component={Img} 
        options={({ navigation }) => optionsNavigator({ navigation }, "Image")}
        />
      </Stack.Navigator>
  );
}

export default function App({ navigation }) {
return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MenuRoute} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

/*import "react-native-gesture-handler";
import * as React from "react"; 

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import main from "./app/main";
import profile from "./app/profile/profile";
import login from "./app/login/login";
import register from "./app/register/register";
import Img from "./app/utils/img";
import notifications from "./app/utils/notifications";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Home" component={main} />
        <Stack.Screen name="Profile" component={profile} />
        <Stack.Screen name="Register" component={register} />
        <Stack.Screen name="Img" component={Img} />
        <Stack.Screen name="Notifications" component={notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/