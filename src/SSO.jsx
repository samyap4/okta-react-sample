import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
//Powered by Vercel

const SSO = () => {
  const { authState, oktaAuth } = useOktaAuth();

  useEffect((() => {
    login();
  }));

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  return (
    <div>Loading...</div>
  );
};
export default SSO;