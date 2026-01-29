// src/pages/Profile.tsx
import ProfileView from "../components/profile/ProfileView";
import { useProfile } from "../hooks/useProfile";

function Profile() {
  const {
    // data
    displayName,
    email,
    role,

    // setters
    setDisplayName,
    setEmail,
    setRole,

    // ui state
    loading,
    submitting,
    error,

    // action
    submit,
  } = useProfile();

  return (
    <ProfileView
      displayName={displayName}
      email={email}
      role={role}
      onChangeDisplayName={setDisplayName}
      onChangeEmail={setEmail}
      onChangeRole={setRole}
      loading={loading}
      submitting={submitting}
      error={error}
      onSubmit={submit}
    />
  );
}

export default Profile;
