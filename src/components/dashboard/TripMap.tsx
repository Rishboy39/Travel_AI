import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Car, Bus, Plane, MapPin, Navigation, Loader2 } from 'lucide-react';

interface Props {
  userId: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '320px',
  borderRadius: '0.75rem',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

// Enhanced dark theme with better contrast
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ color: "#1e293b" }]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#0f172a" }]
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#94a3b8" }]
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1e293b" }]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#334155" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#475569" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e2e8f0" }]
  },
  {
    featureType: "transit",
    elementType: "geometry.fill",
    stylers: [{ color: "#1e293b" }]
  }
];

const transportIcons = {
  car: Car,
  bus: Bus,
  flight: Plane
};

const markers = [
  { 
    position: { lat: -34.397, lng: 150.644 }, 
    type: 'car',
    title: 'Car Trip',
    description: 'Drive to Sydney CBD - 25km',
    date: '2024-01-15',
    carbon: '3.2 kg CO₂'
  },
  { 
    position: { lat: -34.397, lng: 150.744 }, 
    type: 'bus',
    title: 'Bus Journey',
    description: 'Public transport to Bondi Beach - 18km',
    date: '2024-01-14',
    carbon: '0.8 kg CO₂'
  },
  { 
    position: { lat: -34.497, lng: 150.644 }, 
    type: 'flight',
    title: 'Flight Trip',
    description: 'Melbourne to Sydney - 713km',
    date: '2024-01-12',
    carbon: '85.6 kg CO₂'
  }
];

export default function TripMap({ userId }: Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation || !map) return;
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        map.panTo(currentLocation);
        map.setZoom(12);
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
      }
    );
  }, [map]);

  if (loadError) {
    return (
      <div className="relative h-[420px] rounded-lg overflow-hidden z-0">
        <Card className="absolute inset-0 border-red-200 dark:border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <MapPin className="h-5 w-5" />
              Travel Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                Error loading Google Maps. Please check your API key and internet connection.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="relative h-[420px] rounded-lg overflow-hidden z-0">
        <Card className="absolute inset-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Travel Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="w-full h-[320px] rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900"
            >
              <div className="flex flex-col items-center gap-3 text-white">
                <Loader2 className="h-8 w-8 animate-spin" />
                <div className="text-sm font-medium">Loading interactive map...</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-[420px] rounded-lg overflow-hidden z-0">
      <Card className="absolute inset-0 shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <MapPin className="h-5 w-5" />
              Travel Map
            </CardTitle>
            <button
              onClick={getCurrentLocation}
              disabled={isLocating}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
            >
              {isLocating ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Navigation className="h-3 w-3" />
              )}
              {isLocating ? 'Locating...' : 'My Location'}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={8}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                styles: mapStyles,
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                gestureHandling: 'greedy'
              }}
            >
              {markers.map((marker, index) => {
                const IconComponent = transportIcons[marker.type as keyof typeof transportIcons];
                return (
                  <div key={index}>
                    <Marker
                      position={marker.position}
                      title={marker.title}
                      onClick={() => setSelectedMarker(selectedMarker === index ? null : index)}
                      icon={{
                        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="14" fill="${marker.type === 'car' ? '#3b82f6' : marker.type === 'bus' ? '#10b981' : '#f59e0b'}" stroke="#fff" stroke-width="2"/>
                            <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-family="Arial">${marker.type === 'car' ? '🚗' : marker.type === 'bus' ? '🚌' : '✈️'}</text>
                          </svg>
                        `)}`,
                        scaledSize: new google.maps.Size(32, 32),
                        anchor: new google.maps.Point(16, 16)
                      }}
                    />
                    {selectedMarker === index && (
                      <InfoWindow
                        position={marker.position}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div className="p-2 min-w-[200px]">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-4 w-4 text-slate-600" />
                            <h3 className="font-semibold text-slate-900">{marker.title}</h3>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{marker.description}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{marker.date}</span>
                            <Badge variant="secondary" className="text-xs">
                              {marker.carbon}
                            </Badge>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </div>
                );
              })}
            </GoogleMap>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}