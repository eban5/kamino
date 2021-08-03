import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code: string) {
  console.log('useAuth code', code);
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<number>(0);

  // Login
  useEffect(() => {
    axios
      .post('http://localhost:3001/login', {
        code,
      })
      .then((res) => {
        console.log('RESULT login', res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, '/');
      })
      .catch((err) => {
        console.log(err);
        window.location.href = '/';
      });
  }, [code]);

  // Refresh Token
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post('http://localhost:3001/refresh', {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location.href = '/';
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  console.log('access token', accessToken);
  return accessToken;
}
