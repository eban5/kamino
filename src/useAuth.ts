import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code: string) {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<string>();

  // let axiosConfig = {
  //   headers:

  // }
  useEffect(() => {
    axios
      .post('http://localhost:3001/login', {
        code,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        
        window.location.href = '/';
      });
  }, [code]);
}
