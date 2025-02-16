import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

export async function analyzeSustainabilityTrends(userStats: any) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze the following user sustainability stats and provide personalized recommendations:
    - Carbon Footprint: ${userStats.carbonFootprint}
    - Total Flights: ${userStats.totalFlights}
    - Total Car Trips: ${userStats.totalCarTrips}
    - Total Bus Trips: ${userStats.totalBusTrips}
    - Sustainable Restaurant Visits: ${userStats.totalSustainableRestaurantVisits}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing sustainability trends:', error);
    return null;
  }
} 