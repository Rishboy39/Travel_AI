import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '@/integrations/firebase/config';
import { collection, getDocs, addDoc, orderBy, query } from 'firebase/firestore';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Users, Home, ArrowLeft } from 'lucide-react';
import type { Group } from '@/types/groups';

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchGroups();
  }, [user, navigate]);

  const fetchGroups = async () => {
    try {
      const groupsQuery = query(
        collection(db, 'groups'),
        orderBy('created_at', 'desc')
      );
      const snapshot = await getDocs(groupsQuery);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Group[];
      setGroups(data);
    } catch (error: any) {
      toast({
        title: "Error fetching groups",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || creating) return;

    setCreating(true);
    try {
      const groupData = {
        name: newGroupName,
        description: newGroupDescription,
        created_by: user.uid,
        created_at: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'groups'), groupData);

      // Add creator as owner
      await addDoc(collection(db, 'group_members'), {
        group_id: docRef.id,
        user_id: user.uid,
        role: 'owner',
      });

      toast({
        title: "Success",
        description: "Group created successfully!",
      });

      setNewGroupName('');
      setNewGroupDescription('');
      setShowCreateForm(false);
      fetchGroups();
    } catch (error: any) {
      toast({
        title: "Error creating group",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Groups</h1>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Create New Group
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateForm(false)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to groups
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createGroup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name"
                  disabled={creating}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                  placeholder="Describe your group"
                  disabled={creating}
                  className="h-32"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={creating}>
                  {creating ? 'Creating...' : 'Create Group'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  disabled={creating}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <Card key={group.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/groups/${group.id}`)}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{group.name}</span>
                <Users className="h-5 w-5 text-gray-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{group.description || 'No description'}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {groups.length === 0 && !showCreateForm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No groups yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}
