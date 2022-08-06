import { gapi } from "gapi-script";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button, Divider } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import GoogleLoginButton from "../users/GoogleLoginButton";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const googleClientId = "708648745066-4frqfcn8os6f4ulj3dgi1oopu8h0g3d4.apps.googleusercontent.com";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();

  useEffect(() => {
    function startGoogle() {
      gapi.auth2.init({
        clientId : googleClientId,
        scope : "",
        wM : true
      })
    };

    gapi.load("client:auth2", startGoogle);
  })

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Activities!
            </Button>
          </>
        ) : (
            <>            
          <Button disabled={userStore.googleLoading} onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
            Login!
          </Button>
          <Button disabled={userStore.googleLoading} onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
            Register!
          </Button>
          <Divider horizontal inverted>Or</Divider>
            <GoogleLoginButton />
            </>
        )}
      </Container>
    </Segment>
  );
});
