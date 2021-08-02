import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code: string) {
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
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, '/');
      })
      .catch(() => {
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
          // setAccessToken(res.data.accessToken);
          // setRefreshToken(res.data.refreshToken);
          // setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location.href = '/';
        });
    }, (expiresIn - 60) * 1000);
  }, [refreshToken, expiresIn]);
  return accessToken;
}
