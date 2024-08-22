import axios from 'axios';

interface LoginResponse {
  token: string;
}

const handleLogin = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>('https://192.168.12.93:8080/login', {
      email,
      password,
    });

    const { token } = response.data;
    localStorage.setItem('token', token);

    window.location.href = '/';
  } catch (error) {
    console.error('Đăng nhập thất bại:', error);
    alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
  }
};
  