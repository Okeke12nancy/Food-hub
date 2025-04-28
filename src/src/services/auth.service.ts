import { LoginProps, RegisterProps } from '@/types/auth';
import api from './base.service';

export const login = async (data: LoginProps) => {
  return await api.post('/auth/login', data);
};

export const register = async (data: RegisterProps) => {
  return await api.post('/auth/register', data);
};
