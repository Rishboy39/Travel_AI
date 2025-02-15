
export type Group = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  created_by: string | null;
};

export type GroupMember = {
  id: string;
  group_id: string;
  user_id: string;
  role: 'owner' | 'member';
  joined_at: string;
};

export type GroupPreference = {
  id: string;
  group_id: string;
  preference_type: string;
  preference_value: string;
  created_at: string;
};

export type TravelPreference = {
  id: string;
  user_id: string;
  preference_type: string;
  preference_value: string;
  created_at: string;
};
