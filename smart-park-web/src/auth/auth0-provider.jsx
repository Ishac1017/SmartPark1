import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Auth0ProviderWrapper({ children }) {
  const navigate = useNavigate();

  const domain = "dev-15wlbz2zgyxtixng.us.auth0.com";
  const clientId = "bVx9ChslujHMBdHczaP0v6OLAay8nMmn";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
