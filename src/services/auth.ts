import axiosClient from './axios-client';
import {LoginTypeInputs, SignUpInputs} from '../types/register';

export const handleRegister = (userData: SignUpInputs) =>
  axiosClient.post('/auth/register', userData);

export const handleLogin = (userData: LoginTypeInputs) =>
  axiosClient.post('/auth/login', userData);
