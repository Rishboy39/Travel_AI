import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Props {
  score: number;
}

export default function SustainabilityScore({ score }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Sustainability Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-gray-500">out of 100</span>
        </div>
        <Progress value={score} className="h-2" />
        <p className="mt-4 text-sm text-gray-600">
          Your score is calculated based on your travel choices and sustainable restaurant visits.
        </p>
      </CardContent>
    </Card>
  );
} 