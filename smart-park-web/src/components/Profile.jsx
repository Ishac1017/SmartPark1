import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading profile...</div>;

  if (!isAuthenticated) return <div>Please log in to view your profile.</div>;

  return (
    <div style={{ padding: 20 }}>
      <img src={user.picture} alt={user.name} width={80} style={{ borderRadius: "50%" }} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
