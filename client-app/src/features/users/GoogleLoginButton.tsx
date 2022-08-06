import { observer } from "mobx-react-lite";
import React from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function GoogleLoginButton() {

    const {userStore : {googleLogin, googleLoading}} = useStore();

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID as string}
      render={(renderProps) => (
        <Button loading={googleLoading} size="huge" color="google plus"  onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <Icon name="google" />
          Sign in with Google
        </Button>
      )}
      onSuccess={(response) => googleLogin(response as GoogleLoginResponse)}
      onFailure={(response: any) => console.log("Failed google :", response)}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
})
