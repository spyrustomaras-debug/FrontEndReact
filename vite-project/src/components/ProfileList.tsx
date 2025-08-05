import React, { useEffect } from "react";
import { fetchProfiles } from "../features/profiles/profileSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import styled from "styled-components";
import ProfileItem from "./ProfileItem";

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const LoadingMessage = styled.p`
  text-align: center;
`;

const ProfileList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <Container>
      <Heading>User Profiles</Heading>
      <List>
        {data.map((profile) => (
          <ProfileItem key={profile.id} {...profile} />
        ))}
      </List>
    </Container>
  );
};

export default ProfileList;
