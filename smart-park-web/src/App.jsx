import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWrapper from "./auth/auth0-provider";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import ParkingDetails from "./pages/parkingDetails";
import Dashboard from "./pages/dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserSync } from "./hooks/useUserSync";

function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <div>Please log in to view this page.</div>;
}

function AppContent() {
  useUserSync();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parking/:id" element={<ParkingDetails />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWrapper>
        <AppContent />
      </Auth0ProviderWrapper>
    </BrowserRouter>
  );
}
