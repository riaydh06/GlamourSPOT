import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import Register from "./components/Register";
import Splash from "./components/Splash";
import ProductData from "./components/ProductsData";
import FavouriteProducts from "./components/favourites/favourites";
import SearchResults from "./components/Results/searchedProducts";
import SearchForProducts from "./components/searchProducts/searchProduct";
import AdminLogin from "./components/admin/AdminLoginScreen";
import AdminHome from "./components/admin/AdminHomeScreen";
import UserD from "./components/admin/UserD";
import ProductsCUD from "./components/admin/ProductsCUD";
import CreateProduct from "./components/admin/CreateProduct";
import UpdateProduct from "./components/admin/UpdateProduct";

const AppStackNavigation = createStackNavigator(
  {
    HomeScreen: { screen: Home },
    RegisterScreen: { screen: Register },
    LoginScreen: { screen: Login },
    MyProfileScreen: { screen: MyProfile },
    ProductScreen: { screen: ProductData },
    FavouriteProductScreen: { screen: FavouriteProducts },
    SearchForProductsScreen: { screen: SearchForProducts },
    SearchingResultsScreen: { screen: SearchResults },
    AdminLoginScreen: { screen: AdminLogin },
    AdminHomeScreen: { screen: AdminHome },
    UserDScreen: { screen: UserD },
    ProductsCUDScreen: { screen: ProductsCUD },
    CreateProductScreen: { screen: CreateProduct },
    UpdateProductScreen: { screen: UpdateProduct },
  },

  {
    initialRouteName: "HomeScreen"
  }
);

const mySwitchNavigator = createSwitchNavigator(
  {
    SplashScreen: { screen: Splash },
    HomeScreen: { screen: AppStackNavigation }
  },
  {
    initialRouteName: "SplashScreen"
  }
);
const AppContainer = createAppContainer(mySwitchNavigator);
export default AppContainer;
