import { UserStats, Trip, RestaurantVisit } from '@/types/sustainability';

export function calculateSustainabilityScore(
  trips: Trip[],
  restaurantVisits: RestaurantVisit[],
  currentStats: UserStats
): number {
  // Base score starts at 50
  let score = 50;

  // Calculate transportation score (40% of total)
  const transportationScore = calculateTransportationScore(trips);
  
  // Calculate restaurant score (30% of total)
  const restaurantScore = calculateRestaurantScore(restaurantVisits);
  
  // Calculate progress score (30% of total)
  const progressScore = calculateProgressScore(currentStats);

  // Combine scores with weights
  score = (transportationScore * 0.4) + (restaurantScore * 0.3) + (progressScore * 0.3);

  // Ensure score is between 0 and 100
  return Math.min(Math.max(score, 0), 100);
}

function calculateTransportationScore(trips: Trip[]): number {
  if (trips.length === 0) return 50;

  const totalTrips = trips.length;
  const busTrips = trips.filter(t => t.type === 'bus').length;
  const carTrips = trips.filter(t => t.type === 'car').length;
  const flightTrips = trips.filter(t => t.type === 'flight').length;

  // Calculate percentage of sustainable trips (bus)
  const sustainablePercentage = (busTrips / totalTrips) * 100;
  
  // Penalize for flights
  const flightPenalty = (flightTrips / totalTrips) * 20;

  return Math.min(sustainablePercentage - flightPenalty + 50, 100);
}

function calculateRestaurantScore(visits: RestaurantVisit[]): number {
  if (visits.length === 0) return 50;

  // Calculate average points per visit
  const averagePoints = visits.reduce((acc, visit) => acc + visit.points, 0) / visits.length;
  
  // Convert to score (assuming max points per visit is 100)
  return (averagePoints / 100) * 100;
}

function calculateProgressScore(stats: UserStats): number {
  // Compare current stats with previous period
  const improvement = (stats.sustainabilityScore - stats.previousScore) / stats.previousScore * 100;
  
  // Convert improvement to score
  return Math.min(50 + improvement, 100);
} 