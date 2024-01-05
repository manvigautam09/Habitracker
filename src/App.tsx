import React from 'react';
import {
  PaperProvider,
  MD3DarkTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import {fonts} from './utils/font-config';
import {SCREEN_CONSTANTS} from './utils/constant';
import {generatedDarkScheme} from './utils/color-scheme';
import {useAccessTokenStore, useGetAccessToken} from './hooks/access-token';

const {DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const queryClient = new QueryClient();

const theme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  fonts: fonts,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    ...generatedDarkScheme.colors,
  },
};

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const {accessToken, isLoading} = useGetAccessToken();

  if (isLoading) {
    useAccessTokenStore.getState().fetch();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {!isLoading && accessToken ? (
            <Stack.Navigator
              initialRouteName={SCREEN_CONSTANTS.HOME}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name={SCREEN_CONSTANTS.HOME} component={Home} />
            </Stack.Navigator>
          ) : null}
          {!isLoading && !accessToken ? (
            <Stack.Navigator
              initialRouteName={SCREEN_CONSTANTS.LOGIN}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name={SCREEN_CONSTANTS.LOGIN} component={Login} />
              <Stack.Screen
                name={SCREEN_CONSTANTS.SIGN_UP}
                component={SignUp}
              />
              <Stack.Screen name={SCREEN_CONSTANTS.HOME} component={Home} />
            </Stack.Navigator>
          ) : null}
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
