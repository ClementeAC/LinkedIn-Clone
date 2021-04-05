import "react-native-gesture-handler";
import * as React from "react"; 
import { TouchableOpacity, Image } from "react-native";
import {Ionicons, AntDesign, Entypo} from "@expo/vector-icons";

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
import login from "./app/login/login";
import register from "./app/register/register";
import myNetwork from "./app/myNetwork/myNetwork";
import toPost from "./app/toPost/toPost";
import notifications from "./app/notifications/notifications";
import jobOffers from "./app/jobOffers/jobOffers";

import Img from "./app/utils/img";
import not from "./app/utils/notifications";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
        label="Create a company"
        icon={({ color, size }) =>  { 
          return <Ionicons color={color} size={size} name={'business'} />
        }}
        onPress={() => console.log("create una empresa")}
      />
      <DrawerItem
        label="Invite a friend"
        icon={({ color, size }) =>  { 
          return <Ionicons color={color} size={size} name={'person-add-outline'} />
        }}
        onPress={() => console.log("invite un amigo por gmail")}
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
  headerRight: () => LogoPerfil({ navigation }),
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
        <Stack.Screen name="Img" component={Img} // Pruebas
          options={({ navigation }) => optionsNavigator({ navigation }, "Image")}
        />
        <Stack.Screen name="Not" component={not} // Pruebas
          options={({ navigation }) => optionsNavigator({ navigation }, "Notification")}
        />
      </Stack.Navigator>
  );
}
function MyNetworkScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="myNetwork" component={myNetwork} 
        options={({ navigation }) => optionsNavigator({ navigation }, "My Network")}
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
function JobOffersScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="jobOffers" component={jobOffers} 
        options={({ navigation }) => optionsNavigator({ navigation }, "Job Offers")}
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
      <Tab.Screen name="Network" component={MyNetworkScreen} 
        options={({ navigation }) => optionsTab({ navigation }, "My Network", "md-people-sharp")}
      />
      <Tab.Screen name="Post" component={ToPostScreen} 
        options={({ navigation }) => optionsTab({ navigation }, "To Post", "add-circle")}
      />
      <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} 
        options={({ navigation }) => optionsTab({ navigation }, "Notifications", "notifications")}
      />
      <Tab.Screen name="Jobs" component={JobOffersScreen} 
        options={({ navigation }) => optionsTab({ navigation }, "Job Offers", "briefcase-sharp")}
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