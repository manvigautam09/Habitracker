import Toast from 'react-native-toast-message';

export const useToast = () => {
  const showToast = (
    type: 'success' | 'error',
    title: string,
    message: string,
  ) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };
  return {showToast};
};
