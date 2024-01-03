import axiosClient from './axios-client';
import {SignUpInputs} from '../types/register';

export const handleRegister = (userData: SignUpInputs) =>
  axiosClient.post('/auth/register', userData);
