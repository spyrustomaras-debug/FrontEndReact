import React from "react";
import styled from "styled-components";

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

interface Props {
  user_name: string;
  bio: string;
  id: number;
}

const ProfileItem: React.FC<Props> = ({ user_name, bio }) => {
  return (
    <ListItem>
      <UserName>{user_name}</UserName>
      <Bio>{bio}</Bio>
    </ListItem>
  );
};

export default React.memo(ProfileItem);
