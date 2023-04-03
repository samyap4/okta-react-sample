import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';
import Profile from './Profile';

//Powered by Vercel

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const redirectToZendesk = () => {
    window.open('https://login.sam-yap.com/home/zendesk/0oa61tn3bkNzcLVlt5d7/238', '_blank');
  }

  const redirectToDemo0 = () => {
    window.open('https://login.sam-yap.com/home/dev-04086425_auth0samyapkowitzsaml_1/0oa5hk0pjzRi9Zy675d7/aln5hk9w1aIGNggwH5d7', '_blank');
  }

  const resourceServerExamples = [
    {
      label: 'Node/Express Resource Server Example',
      url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
    },
    {
      label: 'Java/Spring MVC Resource Server Example',
      url: 'https://github.com/okta/samples-java-spring/tree/master/resource-server',
    },
    {
      label: 'ASP.NET Core Resource Server Example',
      url: 'https://github.com/okta/samples-aspnetcore/tree/master/samples-aspnetcore-3x/resource-server',
    },
  ];

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  const brand = window.location.hostname.includes('redwave') ? 'Red Wave' : 'Blue Ocean';

  return (
    <div>
      <div>
        <Header as="h1">Okta Demo App: {brand}</Header>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p>
            Welcome back,&nbsp;
            {userInfo.name}
            !
          </p>
          <Button id="sso-custom" primary onClick={redirectToDemo0}>Partner App</Button>
          <Button id="sso" primary onClick={redirectToZendesk}>Need help?</Button>
          <br></br>
          <br></br>
          <Profile></Profile>
          
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <Button id="login-button" primary onClick={login}>Login</Button>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;
