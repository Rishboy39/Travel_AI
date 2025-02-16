import { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props {
  userId: string;
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

export default function TripMap({ userId }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Initialize map when script loads
    window.initMap = () => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }]
          }
        ]
      });

      // Add markers
      const markers = [
        { position: { lat: -34.397, lng: 150.644 }, type: 'car' },
        { position: { lat: -34.397, lng: 150.744 }, type: 'bus' },
        { position: { lat: -34.497, lng: 150.644 }, type: 'flight' }
      ];

      markers.forEach(marker => {
        new google.maps.Marker({
          position: marker.position,
          map,
          icon: `/icons/${marker.type}-icon.png`
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      window.initMap = () => {};
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden z-0">
      <Card className="absolute inset-0">
        <CardHeader>
          <CardTitle>Travel Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapRef} 
            className="w-full h-[300px] rounded-lg"
            style={{ background: '#242f3e' }}
          />
        </CardContent>
      </Card>
    </div>
  );
} 