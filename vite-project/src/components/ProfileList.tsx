import React, { useEffect } from "react";
import { fetchProfiles } from "../features/profiles/profileSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import styled from "styled-components";


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

const ListItem = styled.li`
  background-color: #f5f5f5;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

const Bio = styled.p`
  margin: 0.5rem 0 0;
  color: #555;
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
        <ListItem key={profile.id}>
          <UserName>{profile.user_name}</UserName>
          <Bio>{profile.bio}</Bio>
        </ListItem>
      ))}
    </List>
  </Container>
  );
};

export default ProfileList;
