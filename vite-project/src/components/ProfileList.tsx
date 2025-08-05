import React, { useEffect } from "react";
import { fetchProfiles } from "../features/profiles/profileSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const ProfileList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Profiles</h2>
      <ul>
        {data.map((profile) => (
          <li key={profile.id}>
            <strong>{profile.user_name}</strong>: {profile.bio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
