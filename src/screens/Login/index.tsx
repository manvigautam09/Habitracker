import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import {
  passwordValidationRules,
  usernameValidationRules,
} from '../../utils/validation-rules';
import {handleLogin} from '../../services/auth';
import {useToast} from '../../hooks/show-toast';
import {SCREEN_CONSTANTS} from '../../utils/constant';
import {useGetAccessToken} from '../../hooks/access-token';
import CustomTextInput from '../../components/CustomTextInput';
import {convertExpiresInToExpiresAt} from '../../utils/helpers';
import LoginRegisterContainer from '../../components/LoginRegisterContainer';

function Login(): React.JSX.Element {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {showToast} = useToast();
  const {setAccessToken} = useGetAccessToken();

  const {mutate: loginMutation, isPending} = useMutation({
    mutationFn: handleLogin,
    async onSuccess(data, variables) {
      setAccessToken({
        accessToken: data.data.access_token,
        expiresAt: convertExpiresInToExpiresAt(data.data.expires_in),
      });
      showToast(
        'success',
        'Registered',
        variables.username + 'is success registered',
      );
    },
    onError(error) {
      showToast('error', 'Could not Login', error.message);
    },
  });

  const onSubmit = (data: any) => loginMutation(data);

  return (
    <LoginRegisterContainer title="Habitracker Login">
      <View style={styles.inputView}>
        <Controller
          control={control}
          rules={usernameValidationRules}
          render={({field}) => (
            <CustomTextInput
              value={field.value}
              onChangeText={field.onChange}
              label="Enter Username"
              error={!!errors.email?.message}
              errorMsg={errors.email?.message?.toString() ?? ''}
            />
          )}
          name="username"
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
        disabled={isPending}
        loading={isPending}
        style={styles.loginButtonStyle}
        onPress={handleSubmit(onSubmit)}>
        {isPending ? 'Signing In...' : 'Login'}
      </Button>
      <Button
        style={styles.loginRegisterSection}
        onPress={() => navigation.navigate(SCREEN_CONSTANTS.SIGN_UP as never)}>
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
