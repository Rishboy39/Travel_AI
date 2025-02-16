export interface UserStats {
  userId: string;
  totalWalks: number;
  totalBicycleRides: number;
  totalScooterRides: number;
  totalCarpools: number;
  totalTrainRides: number;
  totalSubwayRides: number;
  totalBusTrips: number;
  totalCarTrips: number;
  totalFlights: number;
  sustainabilityScore: number;
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