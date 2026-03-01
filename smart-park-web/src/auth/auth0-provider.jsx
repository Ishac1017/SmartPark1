import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Auth0ProviderWrapper({ children }) {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  // Debugging: This will show in your browser console (F12)
  console.log("Auth0 Domain:", domain);
  console.log("Auth0 Client ID:", clientId);

  if (!domain || !clientId) {
    return (
      <div style={{ padding: '20px', color: 'red', border: '1px solid red' }}>
        <strong>Auth0 Error:</strong> Missing VITE_AUTH0_DOMAIN or VITE_AUTH0_CLIENT_ID in .env file.
      </div>
    );
  }

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: "openid profile email"
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
