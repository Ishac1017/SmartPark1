import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <main className="screen">
      <section className="splash-card">
        <div className="page-header">
          <h1>Login</h1>
          <p>Access your Smart Parking account</p>
        </div>
        <div className="button-row" style={{ justifyContent: "center" }}>
          <button className="primary-btn" onClick={() => loginWithRedirect()}>
            Login with Auth0
          </button>
        </div>
      </section>
    </main>
  );
}
