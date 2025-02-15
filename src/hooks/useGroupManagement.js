import { useState } from 'react';

export const useGroupManagement = () => {
  const [groups, setGroups] = useState([]);

  const createGroup = (group) => {
    setGroups([...groups, { ...group, id: Date.now() }]);
  };

  return { groups, createGroup };
};