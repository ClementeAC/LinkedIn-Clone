import "react-native-gesture-handler";
import * as React from "react"; 
import {
  TouchableOpacity,
  Image
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem  
} from '@react-navigation/drawer';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo } from "@expo/vector-icons";

import landingPage from "./app/landingPage/landingPage";
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
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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

function LandingPage() {
  return (
      <Image
        source={require("./assets/statusbar.png")}
        style={{
            alignSelf: "center",
        }}
      />
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate("Profile")}
      />
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Image"
        onPress={() => props.navigation.navigate("Img")}
      />
      <DrawerItem
        label="Notifications"
        onPress={() => props.navigation.navigate("Notifications")}
      />
    </DrawerContentScrollView>
  );
}

function MenuRouteSession({ navigation }) {
  const optionsNavigator = ({ navigation }, Title) => ({
    headerTitle: Title,
    headerLeft: () => LogoMenu({ navigation }),
    headerRight: () => LogoPerfil({ navigation }),
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerShown: true,
    headerTintColor: '#fff',
  });

  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={main} 
          options={({ navigation }) => optionsNavigator({ navigation }, "Home")}
        />
        <Stack.Screen name="Notifications" component={notifications}
          options={({ navigation }) => optionsNavigator({ navigation }, "Notifications")} 
        />
        <Stack.Screen name="Profile" component={profile} 
          options={({ navigation }) => optionsNavigator({ navigation }, "Profile")}
        />
        <Stack.Screen name="Img" component={Img} 
          options={({ navigation }) => optionsNavigator({ navigation }, "Image")}
        />
      </Stack.Navigator>
  );
}

function MenuRoute({ navigation }) {
  const optionsNavigatorOut = ({ navigation }, Title) => ({
    headerTitle: Title,
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
  });
  const optionsLandingPage = () => ({
    headerTitle: () => LandingPage(),
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: '#fff',
  });
  return (
    <Stack.Navigator>
      <Stack.Screen name="LandingPage" component={landingPage} 
        options={({ navigation }) => optionsLandingPage()}
      />
      <Stack.Screen name="Login" component={login} 
        options={({ navigation }) => optionsNavigatorOut({ navigation }, "Login")}
      />
      <Stack.Screen name="Register" component={register} 
      options={({ navigation }) => optionsNavigatorOut({ navigation }, "Register")}
      />
    </Stack.Navigator>
  );
}

function LinkedIn({ navigation }) {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="LinckedIn" component={MenuRouteSession} />
    </Drawer.Navigator>
  );
}

export default function App({ navigation }) { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Root" component={MenuRoute} />
      <Stack.Screen options={{headerShown: false}} name="LinkedIn" component={LinkedIn} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}