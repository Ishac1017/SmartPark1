import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/search");
  }

  return (
    <main className="screen">
      <section className="splash-card">
        <div className="page-header">
          <h1>Sign Up</h1>
          <p>Create your Smart Parking account</p>
        </div>
        <div className="button-row" style={{ justifyContent: "center" }}>
          <button className="primary-btn" onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}>
            Sign Up with Auth0
          </button>
        </div>
      </section>
    </main>
  );
}
