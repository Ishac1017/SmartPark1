import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <main className="screen loading-screen">Loading profile...</main>;

  if (!isAuthenticated) {
    return <main className="screen loading-screen">Please log in to view your profile.</main>;
  }

  return (
    <main className="screen">
      <section className="panel">
        <img src={user.picture} alt={user.name} width={80} style={{ borderRadius: "50%" }} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </section>
    </main>
  );
}
