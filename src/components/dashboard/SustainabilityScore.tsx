import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props {
  score: number;
}

export default function SustainabilityScore({ score }: Props) {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    setCurrentScore(score);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#22c55e'; // green
    if (score >= 30) return '#fbbf24'; // yellow
    return '#dc2626'; // red
  };

  // Calculate the angles
  const startAngle = -220;
  const totalAngle = 260;
  const radius = 40;
  const center = 50;
  
  // Generate the arc path
  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = {
      x: center + radius * Math.cos((startAngle * Math.PI) / 180),
      y: center + radius * Math.sin((startAngle * Math.PI) / 180)
    };
    const end = {
      x: center + radius * Math.cos((endAngle * Math.PI) / 180),
      y: center + radius * Math.sin((endAngle * Math.PI) / 180)
    };
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Sustainability Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-48 h-48 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background segments */}
            {Array.from({ length: 26 }, (_, i) => {
              const segmentAngle = totalAngle / 26;
              const segmentStart = startAngle + i * segmentAngle;
              const segmentEnd = segmentStart + segmentAngle - 1;
              
              let segmentColor;
              if (i < 9) segmentColor = '#dc2626'; // red segments
              else if (i < 18) segmentColor = '#fbbf24'; // yellow segments
              else segmentColor = '#22c55e'; // green segments

              return (
                <g key={i} className="transition-opacity duration-300">
                  {/* Background segment (always visible) */}
                  <path
                    d={createArcPath(segmentStart, segmentEnd)}
                    stroke={segmentColor}
                    strokeWidth="8"
                    fill="none"
                    opacity={0.2}
                  />
                  {/* Active segment (fills progressively) */}
                  <path
                    d={createArcPath(segmentStart, segmentEnd)}
                    stroke={segmentColor}
                    strokeWidth="8"
                    fill="none"
                    opacity={currentScore >= ((i + 1) * (100 / 26)) ? 1 : 0}
                    className="transition-opacity duration-300"
                  />
                </g>
              );
            })}

            {/* Centered Score text */}
            <text
              x={center}
              y={center}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold"
              fill={getScoreColor(currentScore)}
            >
              {Math.round(currentScore)}%
            </text>
          </svg>
        </div>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Your score is calculated based on your travel choices and sustainable restaurant visits.
        </p>
      </CardContent>
    </Card>
  );
}