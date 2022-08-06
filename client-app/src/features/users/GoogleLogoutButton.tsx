import { observer } from "mobx-react-lite";
import React from "react";
import { GoogleLogout } from "react-google-login";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

const googleClientId = "708648745066-4frqfcn8os6f4ulj3dgi1oopu8h0g3d4.apps.googleusercontent.com";


export default observer(function GoogleLogoutButton() {
  const {
    userStore: { logout },
  } = useStore();

  return (
    <GoogleLogout
      clientId={googleClientId}
      render={(renderProps) => (
        <span onClick={renderProps.onClick}>
          <Icon name="power" />
          Logout
        </span>
      )}
      onLogoutSuccess={logout}
    />
  );
});
