import axiosInstance from './axios.util';

export default async function getUserDetails() {
  const { data: response } = await axiosInstance.get('/auth/status');
  if (!response.success) return null;

  return response.data;
}

// TODO: Use react auth context
