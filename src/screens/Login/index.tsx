import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';

import {
  emailValidationRules,
  passwordValidationRules,
} from '../../utils/validation-rules';
import CustomTextInput from '../../components/CustomTextInput';
import LoginRegisterContainer from '../../components/LoginRegisterContainer';

function Login(): React.JSX.Element {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const loginUser = async (data: any) => {
    // Perform your registration logic here
    // For example, make an API call to register the user
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    // Return the registered user data
    return response.json();
  };

  const loginMutation = useMutation(loginUser);

  const onSubmit = (data: any) => {
    console.log('### data', data);
    loginMutation.mutate(data);
  };

  return (
    <LoginRegisterContainer title="Habitracker Login">
      <View style={styles.inputView}>
        <Controller
          control={control}
          rules={emailValidationRules}
          render={({field}) => (
            <CustomTextInput
              value={field.value}
              onChangeText={field.onChange}
              label="Enter Email"
              error={!!errors.email?.message}
              errorMsg={errors.email?.message?.toString() ?? ''}
            />
          )}
          name="email"
        />
      </View>
      <View style={styles.inputView}>
        <Controller
          control={control}
          rules={passwordValidationRules}
          render={({field}) => (
            <CustomTextInput
              label="Enter Password"
              value={field.value}
              onChangeText={field.onChange}
              secureTextEntry
              error={!!errors.password?.message}
              errorMsg={errors.password?.message?.toString() ?? ''}
            />
          )}
          name="password"
        />
      </View>

      <Button
        mode="contained"
        style={styles.loginButtonStyle}
        onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
      <Button
        style={styles.loginRegisterSection}
        onPress={() => navigation.navigate('SignUp')}>
        Yet to Register? SignUp
      </Button>
    </LoginRegisterContainer>
  );
}
export default Login;

const styles = StyleSheet.create({
  inputView: {
    marginTop: 10,
  },
  loginButtonStyle: {
    marginTop: 20,
  },
  loginRegisterSection: {
    marginTop: 10,
  },
});
