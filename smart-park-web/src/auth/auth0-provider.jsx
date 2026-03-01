import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export default function Auth0ProviderWrapper({ children }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={(appState) => {
        const returnPath = appState?.returnTo || "/post-auth";
        window.history.replaceState({}, document.title, returnPath);
      }}
    >
      {children}
    </Auth0Provider>
  );
}
