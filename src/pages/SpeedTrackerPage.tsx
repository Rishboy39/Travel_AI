import React, { useEffect, useState } from "react";

declare global {
    interface Window {
        google: any;
    }
}

const SpeedTrackerPage: React.FC = () => {
    const [speed, setSpeed] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGoogleMaps = () => {
            if (document.getElementById("map")) {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.defer = true;
                script.onload = () => initMap();
                script.onerror = () => setError("Failed to load Google Maps API.");
                document.head.appendChild(script);
            }
        };

        const initMap = () => {
            const mapElement = document.getElementById("map");
            if (mapElement && window.google && window.google.maps) {
                new window.google.maps.Map(mapElement as HTMLElement, {
                    center: { lat: 47.6740, lng: -122.1215 },
                    zoom: 8,
                });
            } else {
                setError("Map container not found or Google Maps API unavailable.");
            }
        };

        loadGoogleMaps();

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const speedMph = position.coords.speed ? position.coords.speed * 2.237 : 0;
                setSpeed(parseFloat(speedMph.toFixed(2)));
            },
            (err) => setError(`ERROR(${err.code}): ${err.message}`),
            { enableHighAccuracy: true, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>*</h1>
            <h1>Speed Tracker Page</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <h2>Current Speed: {speed} mph</h2>
            )}
            <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px", border: "2px solid black" }}></div>
        </div>
    );
};

export default SpeedTrackerPage;

