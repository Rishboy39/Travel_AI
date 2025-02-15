import React, { useState } from 'react';
import GroupCard from './GroupCard';
import CreateGroupModal from './CreateGroupModal';
import '../../styles/components/GroupPlanner.css';

const GroupPlanner = () => {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="group-planner">
      <button onClick={() => setShowModal(true)}>Create New Group</button>
      <div className="groups-grid">
        {groups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
      {showModal && (
        <CreateGroupModal 
          onClose={() => setShowModal(false)}
          onCreate={(group) => setGroups([...groups, group])}
        />
      )}
    </div>
  );
};

export default GroupPlanner;