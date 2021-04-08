import "react-native-gesture-handler";
import * as React from "react"; 
import { TouchableOpacity, Image, Alert } from "react-native";
import {Ionicons, AntDesign, Entypo, FontAwesome5} from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem  
} from '@react-navigation/drawer';

import landingPage from "./app/landingPage/landingPage";
import main from "./app/main";
import profile from "./app/profile/profile";
import edit from "./app/profile/edit";
import login from "./app/login/login";
import register from "./app/register/register";
import toPost from "./app/toPost/toPost";
import notifications from "./app/notifications/notifications";

import Img from "./app/components/img";
import not from "./app/utils/notifications";
import InviteFriend from "./app/utils/inviteFriend";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function LogoPerfil({ navigation }, Title) {
  if(Title == "Profile"){
    return (
      <TouchableOpacity onPress={() => navigation.navigate('editProfile')}>
        <FontAwesome5 
        style={{ padding: 6, marginRight: 10 }} name="user-edit" size={24} color="#fff" />
      </TouchableOpacity>
    );
  }
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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} >
      <Image
        source={require("./assets/background.png")}
        style={{
            alignSelf: "center",
            top:-30,
            height: 170,
            resizeMode: 'contain'
        }}
      />
      <DrawerItem
        label="Profile"
        icon={({ color, size }) =>  { 
          return <Ionicons color={color} size={size} name={'person-sharp'} />
        }}
        style={{
          backgroundColor: '#CCE1FF',
          height: 55,
          justifyContent: 'center',
        }}
        onPress={() => props.navigation.navigate("Profile")}
      />
      <DrawerItem
        label="Home"
        icon={({ color, size }) =>  { 
          return <Ionicons color={color} size={size} name={'home-sharp'} />
        }}
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Create company"
        icon={({ color, size }) =>  { 
          return <Ionicons color={color} size={size} name={'business'} />
        }}
        onPress={() => Alert.alert("create una empresa")}
      />
      <DrawerItem
        label="Invite a friend"
        icon={({ color, size }) =>  { 
          return <Ionicons color={color} size={size} name={'person-add-outline'} />
        }}
        onPress={() => props.navigation.navigate("InviteFriend")}
      />
      <DrawerItem
        label="De aqui pa abajo pruebas:"
      />
      <DrawerItem
        label="Notificaciones"
        onPress={() => props.navigation.navigate("Not")}
      />
      <DrawerItem
        label="Imagenes"
        onPress={() => props.navigation.navigate("Img")}
      />
    </DrawerContentScrollView>
  );
}

const optionsNavigator = ({ navigation }, Title) => ({
  headerTitle: Title,
  headerLeft: () => LogoMenu({ navigation }),
  headerRight: () => LogoPerfil({ navigation }, Title),
  headerStyle: {
    backgroundColor: 'blue',
  },
  headerShown: true,
  headerTintColor: '#fff',
});
function MenuRouteSession({ navigation }) {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={main} 
          options={({ navigation }) => optionsNavigator({ navigation }, "Home")}
        />
        <Stack.Screen name="Profile" component={profile} 
          options={({ navigation }) => optionsNavigator({ navigation }, "Profile")}
        />
        <Stack.Screen name="editProfile" component={edit} 
          options={({ navigation }) => optionsNavigator({ navigation }, "Edit")}
        />
        <Stack.Screen name="Img" component={Img} // Pruebas
          options={({ navigation }) => optionsNavigator({ navigation }, "Image")}
        />
        <Stack.Screen name="Not" component={not} // Pruebas
          options={({ navigation }) => optionsNavigator({ navigation }, "Notification")}
        />
        <Stack.Screen name="InviteFriend" component={InviteFriend}
          options={({ navigation }) => optionsNavigator({ navigation }, "Invite a friend")}
        />
      </Stack.Navigator>
  );
}
function ToPostScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="toPost" component={toPost} 
        options={({ navigation }) => optionsNavigator({ navigation }, "To Post")}
      />
    </Stack.Navigator>
  );
}
function NotificationsScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="notifications" component={notifications} 
        options={({ navigation }) => optionsNavigator({ navigation }, "Notifications")}
      />
    </Stack.Navigator>
  );
}

function TabContent({ navigation }) {
  const optionsTab = ({ navigation }, Title, iconName) => ({
    tabBarLabel: Title,
    tabBarVisible: true,
    tabBarIcon: ({ color, size}) => {
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="HomeTab" component={MenuRouteSession} 
        options={({ navigation }) => optionsTab({ navigation }, "Home", "home-sharp")}
      />
      <Tab.Screen name="Post" component={ToPostScreen} 
        options={({ navigation }) => optionsTab({ navigation }, "To Post", "add-circle")}
      />
      <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} 
        options={({ navigation }) => optionsTab({ navigation }, "Notifications", "notifications")}
      />
    </Tab.Navigator>
  );
}

function LinkedIn({ navigation }) {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="LinckedIn" component={TabContent} />
    </Drawer.Navigator>
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