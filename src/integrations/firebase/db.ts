import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';
import type { Group, GroupMember, TravelPreference } from '@/types/groups';

export const createGroup = async (data: Omit<Group, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'groups'), {
    ...data,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getGroups = async (userId: string) => {
  const q = query(
    collection(db, 'group_members'),
    where('userId', '==', userId)
  );
  const memberDocs = await getDocs(q);
  const groupIds = memberDocs.docs.map(doc => doc.data().groupId);
  
  const groups: Group[] = [];
  for (const groupId of groupIds) {
    const groupDoc = await getDocs(query(
      collection(db, 'groups'),
      where('id', '==', groupId)
    ));
    if (!groupDoc.empty) {
      groups.push({ id: groupDoc.docs[0].id, ...groupDoc.docs[0].data() } as Group);
    }
  }
  return groups;
};

// Add more database operations as needed 