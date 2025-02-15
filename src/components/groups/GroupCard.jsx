import React from 'react';

const GroupCard = ({ group }) => {
  return (
    <div className="group-card">
      <h3>{group.name}</h3>
      <p>{group.members} members</p>
      <button>Join Group</button>
    </div>
  );
};

export default GroupCard;
