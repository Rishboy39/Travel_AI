import { db } from '@/integrations/firebase/config';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Trip, RestaurantVisit, UserStats } from '@/types/sustainability';

export async function uploadBusProof(userId: string, file: File) {
  const storage = getStorage();
  const fileRef = ref(storage, `bus-proofs/${userId}/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}

export async function recordTrip(trip: Omit<Trip, 'id'>) {
  const docRef = await addDoc(collection(db, 'trips'), trip);
  
  // Update user stats
  const userStatsRef = doc(db, 'user_stats', trip.userId);
  const userStats = await getDoc(userStatsRef);
  
  if (userStats.exists()) {
    const data = userStats.data();
    const updates: Partial<UserStats> = {
      previousScore: data.sustainabilityScore,
      [`total${trip.type.charAt(0).toUpperCase() + trip.type.slice(1)}s`]: data[`total${trip.type.charAt(0).toUpperCase() + trip.type.slice(1)}s`] + 1,
      carbonFootprint: data.carbonFootprint + trip.carbonEmission
    };
    
    await updateDoc(userStatsRef, updates);
  }
  
  return docRef.id;
}

export async function recordRestaurantVisit(visit: Omit<RestaurantVisit, 'id'>) {
  const docRef = await addDoc(collection(db, 'restaurant_visits'), visit);
  
  // Update user stats
  const userStatsRef = doc(db, 'user_stats', visit.userId);
  const userStats = await getDoc(userStatsRef);
  
  if (userStats.exists()) {
    await updateDoc(userStatsRef, {
      totalSustainableRestaurantVisits: userStats.data().totalSustainableRestaurantVisits + 1,
      points: userStats.data().points + visit.points
    });
  }
  
  return docRef.id;
} 