import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '@/integrations/firebase/config';
import { collection, doc, getDoc, getDocs, query, where, setDoc, addDoc } from 'firebase/firestore';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, UserPlus, Settings } from 'lucide-react';
import type { Group, GroupMember, GroupPreference } from '@/types/groups';

const PREFERENCE_TYPES = [
  'accommodation',
  'transportation',
  'activities',
  'budget',
  'destination'
] as const;

export default function GroupDetails() {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [preferences, setPreferences] = useState<GroupPreference[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId, user, navigate]);

  const fetchGroupDetails = async () => {
    try {
      // Fetch group details
      const groupDoc = await getDoc(doc(db, 'groups', groupId!));
      if (!groupDoc.exists()) throw new Error('Group not found');
      setGroup({ id: groupDoc.id, ...groupDoc.data() } as Group);

      // Fetch group members
      const membersQuery = query(
        collection(db, 'group_members'),
        where('group_id', '==', groupId)
      );
      const membersSnapshot = await getDocs(membersQuery);
      const membersData = membersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GroupMember[];
      setMembers(membersData);

      // Check if current user is owner
      const isOwner = membersData.some(
        member => member.user_id === user?.uid && member.role === 'owner'
      );
      setIsOwner(isOwner);

      // Fetch group preferences
      const prefsQuery = query(
        collection(db, 'group_preferences'),
        where('group_id', '==', groupId)
      );
      const prefsSnapshot = await getDocs(prefsQuery);
      const prefsData = prefsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GroupPreference[];
      setPreferences(prefsData);
    } catch (error: any) {
      toast({
        title: "Error fetching group details",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (type: string, value: string) => {
    if (!user || !groupId) return;

    try {
      const prefQuery = query(
        collection(db, 'group_preferences'),
        where('group_id', '==', groupId),
        where('preference_type', '==', type)
      );
      const prefSnapshot = await getDocs(prefQuery);
      
      if (prefSnapshot.empty) {
        await addDoc(collection(db, 'group_preferences'), {
          group_id: groupId,
          preference_type: type,
          preference_value: value,
        });
      } else {
        await setDoc(doc(db, 'group_preferences', prefSnapshot.docs[0].id), {
          group_id: groupId,
          preference_type: type,
          preference_value: value,
        });
      }

      toast({
        title: "Success",
        description: "Preference updated successfully!",
      });

      fetchGroupDetails();
    } catch (error: any) {
      toast({
        title: "Error updating preference",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !groupId || adding) return;

    setAdding(true);
    try {
      // First, get the user ID from the email
      const usersQuery = query(
        collection(db, 'users'),
        where('email', '==', newMemberEmail)
      );
      const userSnapshot = await getDocs(usersQuery);
      
      if (userSnapshot.empty) throw new Error('User not found');
      const userData = userSnapshot.docs[0];

      // Add the user to the group
      await addDoc(collection(db, 'group_members'), {
        group_id: groupId,
        user_id: userData.id,
        role: 'member',
        created_at: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Member added successfully!",
      });

      setNewMemberEmail('');
      fetchGroupDetails();
    } catch (error: any) {
      toast({
        title: "Error adding member",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!group) {
    return <div className="p-4">Group not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to="/groups" 
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Groups
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{group.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Group Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {PREFERENCE_TYPES.map((type) => {
              const preference = preferences.find(p => p.preference_type === type);
              return (
                <div key={type} className="space-y-2">
                  <Label htmlFor={type} className="capitalize">{type}</Label>
                  <Input
                    id={type}
                    value={preference?.preference_value || ''}
                    onChange={(e) => updatePreference(type, e.target.value)}
                    placeholder={`Enter group ${type} preference`}
                    disabled={!isOwner}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Group Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isOwner && (
              <form onSubmit={addMember} className="mb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Add Member by Email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="Enter email address"
                      disabled={adding}
                      required
                    />
                    <Button type="submit" disabled={adding}>
                      Add
                    </Button>
                  </div>
                </div>
              </form>
            )}
            
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="capitalize">{member.role}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
