import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import I18n from 'i18n-js';
import { useIntl } from 'react-intl'

const Tab = createBottomTabNavigator();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const CategoryStack = createNativeStackNavigator();

import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import CmsPage from '../../screens/CmsPage';
import MyAccount from '../../screens/MyAccount';
import CategoryTree from '../../screens/CategoryTree';
import Cart from '../../screens/Cart';
import Checkout from '../../screens/Checkout';
import CheckoutSuccess from '../../screens/Checkout/CheckoutSuccess/checkoutSuccess';
import CheckoutFail from '../../screens/Checkout/CheckoutFail/checkoutFail';


import AddressBook from '../../screens/AddressBook';
import EditAddress from '../../screens/AddressBook/EditAddress/editAddress';



import Category from '../../screens/Category';
import ProductDetail from '../../screens/ProductDetail';
import StoreSwitcher from '../../screens/StoreSwitcher/storeSwitcher';
import Login from '../../screens/Login/login';
import BiometricsVerify from '../../screens/BiometricsVerify';
// const IconTabHome = () => {
//   return <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/tabs/home.svg')} />
// }

// const IconMyAccount = () => {
//   return <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/tabs/account.svg')} />
// }

// const IconCart = () => {
//   return <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/tabs/cart.svg')} />
// }

// const IconCategory = () => {
//   return <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/tabs/category.svg')} />
// }

function MyTabBar({ state, descriptors, navigation }) {

  console.log('state', state);
  console.log('descriptors', descriptors);
  console.log('navigation', navigation);


  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        console.log('isFocused', isFocused);


        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function HomeStackTabs() {

  const { formatMessage } = useIntl();


  return (
    <CategoryStack.Navigator>

      <CategoryStack.Screen
        name='Home'
        options={{
          title: formatMessage({ id: 'tab.home', defaultMessage: 'Home' }),
          headerShown: false

        }}
        component={CmsPage} />
      <CategoryStack.Screen name="Category"
        options={{
          title: formatMessage({ id: 'tab.category', defaultMessage: 'category' })

        }}
        component={Category} />

      <CategoryStack.Screen name="ProductDetail"
        options={{
          title: formatMessage({ id: 'tab.productDetail', defaultMessage: 'productDetail' })

        }}
        component={ProductDetail} />
    </CategoryStack.Navigator>
  );
}


function CategoryStackTabs() {

  const { formatMessage } = useIntl();


  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name='CategoryTree'
        options={{
          title: formatMessage({ id: 'tab.categoryTree', defaultMessage: 'categoryTree' })
        }}
        component={CategoryTree} />
      <CategoryStack.Screen name="Category"
        options={{
          title: formatMessage({ id: 'tab.category', defaultMessage: 'category' })

        }}
        component={Category} />

      <CategoryStack.Screen name="ProductDetail"
        options={{
          title: formatMessage({ id: 'tab.productDetail', defaultMessage: 'productDetail' })

        }}
        component={ProductDetail} />
    </CategoryStack.Navigator>
  );
}



function CartStackTabs() {

  const { formatMessage } = useIntl();


  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name='Cart'
        options={{
          title: formatMessage({ id: 'tab.cart', defaultMessage: 'cart' })
        }}
        component={Cart} />
      <CategoryStack.Screen
        name='Checkout'
        options={{
          title: formatMessage({ id: 'tab.checkout', defaultMessage: 'Checkout' })
        }}
        component={Checkout} />
      <CategoryStack.Screen
        name='CheckoutSuccess'
        options={{
          title: formatMessage({ id: 'tab.checkoutSuccess', defaultMessage: 'Checkout Success' })
        }}
        component={CheckoutSuccess} />

      <CategoryStack.Screen
        name='CheckoutFail'
        options={{
          title: formatMessage({ id: 'tab.checkoutFail', defaultMessage: 'Checkout Fail' })
        }}
        component={CheckoutFail} />

      <CategoryStack.Screen
        name='AddressBook'
        options={{
          title: formatMessage({ id: 'tab.addressBook', defaultMessage: 'Address Book' })
        }}
        component={AddressBook} />
      <CategoryStack.Screen
        name='EditAddress'
        options={{
          title: formatMessage({ id: 'tab.editAddress', defaultMessage: 'Edit Address' })
        }}
        component={EditAddress} />

      <CategoryStack.Screen name="Category"
        options={{
          title: formatMessage({ id: 'tab.category', defaultMessage: 'category' })

        }}
        component={Category} />

      <CategoryStack.Screen name="ProductDetail"
        options={{
          title: formatMessage({ id: 'tab.productDetail', defaultMessage: 'productDetail' })

        }}
        component={ProductDetail} />
    </CategoryStack.Navigator>
  );
}

function AccountStackTabs() {

  const { formatMessage } = useIntl();


  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name='Account'
        options={{
          title: formatMessage({ id: 'tab.account', defaultMessage: 'Account' })
        }}
        component={MyAccount} />
      <CategoryStack.Screen name="Category"
        options={{
          title: formatMessage({ id: 'tab.category', defaultMessage: 'category' })

        }}
        component={Category} />

      <CategoryStack.Screen name="ProductDetail"
        options={{
          title: formatMessage({ id: 'tab.productDetail', defaultMessage: 'productDetail' })

        }}
        component={ProductDetail} />
      <CategoryStack.Screen name="StoreSwitcher"
        options={{
          title: formatMessage({ id: 'tab.storeSwitcher', defaultMessage: 'Language Switcher' })

        }}
        component={StoreSwitcher} />
      <CategoryStack.Screen name="Login"
        options={{
          title: formatMessage({ id: 'tab.login', defaultMessage: 'Login' })

        }}
        component={Login} />

      <CategoryStack.Screen name="BiometricsVerify"
        options={{
          title: formatMessage({ id: 'tab.biometricsVerify', defaultMessage: 'Biometrics Verify' })

        }}
        component={BiometricsVerify} />
    </CategoryStack.Navigator>
  );
}

export default function BottomTabs(props) {

  const { formatMessage } = useIntl();

  const { total_quantity } = useSelector((state) => state.cart)

  return (<NavigationContainer>
    <Tab.Navigator
    // tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="HomeStackTabs"
        // component={HomeScreen}
        options={{
          tabBarLabel: formatMessage({ id: 'tab.home', defaultMessage: 'Home' }),
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="home" color={color} size={size} />
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarActiveTintColor: '#accc3b',
          tabBarInactiveTintColor: '#245798'
        }}

      >
        {(props) => <HomeStackTabs {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="CategoryStackTabs"
        // component={CategoryTree}
        options={{
          tabBarLabel: formatMessage({ id: 'tab.categoryTree', defaultMessage: 'Category Tree' }),
          tabBarIcon: ({ color, size }) => {
            return <Feather name="list" color={color} size={size} />
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarActiveTintColor: '#accc3b',
          tabBarInactiveTintColor: '#245798'
        }}

      >
        {(props) => <CategoryStackTabs {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="CartStackTabs"
        // component={Cart}
        options={{
          tabBarLabel: formatMessage({ id: 'tab.cart', defaultMessage: 'Cart' }),
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="shoppingcart" color={color} size={size} />
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarActiveTintColor: '#accc3b',
          tabBarInactiveTintColor: '#245798',
          tabBarBadge: total_quantity
        }}

      >
        {(props) => <CartStackTabs {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="AccountStackTabs"
        // component={MyAccount}
        options={{
          tabBarLabel: formatMessage({ id: 'tab.account', defaultMessage: 'Acount' }),
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="user" color={color} size={size} />
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarActiveTintColor: '#accc3b',
          tabBarInactiveTintColor: '#245798'
        }}

      >
        {(props) => <AccountStackTabs {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>)
}

