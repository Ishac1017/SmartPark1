import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Splash from "./pages/Splash";
import AuthChoice from "./pages/AuthChoice";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VehicleSelection from "./pages/VehicleSelection";
import AddVehicle from "./pages/AddVehicle";
import Search from "./pages/Search";
import Results from "./pages/Results";
import MapView from "./pages/MapView";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <main className="screen">
        <div className="splash-card">
          <p>Loading Smart Parking...</p>
        </div>
      </main>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/auth" element={<AuthChoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Post-auth redirect target */}
        <Route path="/post-auth" element={<Navigate to="/vehicle" replace />} />

        {/* Protected Routes */}
        <Route 
          path="/vehicle" 
          element={
            <ProtectedRoute>
              <VehicleSelection />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-vehicle" 
          element={
            <ProtectedRoute>
              <AddVehicle />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/results" 
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/map" 
          element={
            <ProtectedRoute>
              <MapView />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
