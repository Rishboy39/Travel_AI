export interface UserStats {
  userId: string;
  sustainabilityScore: number;
  totalFlights: number;
  totalCarTrips: number;
  totalBusTrips: number;
  totalSustainableRestaurantVisits: number;
  points: number;
  createdAt: string;
}

export interface Trip {
  id: string;
  userId: string;
  type: 'car' | 'bus' | 'flight';
  distance: number;
  timestamp: string;
  carbonEmission: number;
  lat: number;
  lng: number;
}

export interface RestaurantVisit {
  id: string;
  userId: string;
  restaurantId: string;
  timestamp: string;
  points: number;
}

export interface SustainableRestaurant {
  id: string;
  name: string;
  sustainabilityScore: number;
} 