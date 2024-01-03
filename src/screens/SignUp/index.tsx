import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import {
  emailValidationRules,
  nameValidationRules,
  passwordValidationRules,
  usernameValidationRules,
} from '../../utils/validation-rules';
import {handleRegister} from '../../services/auth';
import CustomTextInput from '../../components/CustomTextInput';
import LoginRegisterContainer from '../../components/LoginRegisterContainer';

function SignUp(): React.JSX.Element {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {mutate: register, isPending} = useMutation({
    mutationFn: handleRegister,
    onSuccess(data, variables) {
      console.log('### data', data.data);
      console.log('### variables', variables);
      // navigation.navigate('Login');
    },
    onError(error) {
      console.log('### error', error);
    },
  });

  const onSubmit = (data: any) => {
    register(data);
  };

  return (
    <LoginRegisterContainer title="Habitracker SignUp">
      <View style={styles.inputView}>
        <Controller
          control={control}
          rules={nameValidationRules}
          render={({field: {onChange, value}}) => (
            <CustomTextInput
              value={value}
              label="Enter Name"
              onChangeText={onChange}
              error={!!errors.name?.message}
              errorMsg={errors.name?.message?.toString() ?? ''}
            />
          )}
          name="name"
        />
      </View>
      <View style={styles.inputView}>
        <Controller
          control={control}
          rules={emailValidationRules}
          render={({field: {onChange, value}}) => (
            <CustomTextInput
              value={value}
              label="Enter Email"
              onChangeText={onChange}
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
          rules={usernameValidationRules}
          render={({field: {onChange, value}}) => (
            <CustomTextInput
              value={value}
              label="Enter Username"
              onChangeText={onChange}
              error={!!errors.username?.message}
              errorMsg={errors.username?.message?.toString() ?? ''}
            />
          )}
          name="username"
        />
      </View>
      <View style={styles.inputView}>
        <Controller
          control={control}
          rules={passwordValidationRules}
          render={({field: {onChange, value}}) => (
            <CustomTextInput
              value={value}
              label="Enter Password"
              onChangeText={onChange}
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
        disabled={isPending}
        loading={isPending}
        onPress={handleSubmit(onSubmit)}>
        {isPending ? 'Signing up...' : 'Register'}
      </Button>
      <Button
        style={styles.loginRegisterSection}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Button>
    </LoginRegisterContainer>
  );
}

export default SignUp;

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
