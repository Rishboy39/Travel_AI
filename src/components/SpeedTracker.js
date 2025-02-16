import React, { useState, useEffect } from "react";

const SpeedTracker = () => {
    const [speed, setSpeed] = useState(0);
    const [overSpeed, setOverSpeed] = useState(false);
    const [error, setError] = useState(null);
    let previousPosition = null;
    let previousTime = null;

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const currentTime = position.timestamp;

                if (previousPosition && previousTime) {
                    const distance = getDistance(previousPosition, { latitude, longitude });
                    const timeElapsed = (currentTime - previousTime) / 1000; // ms to sec
                    const calculatedSpeed = distance / timeElapsed; // m/s
                    const speedMph = calculatedSpeed * 2.237; // Convert to mph

                    setSpeed(speedMph.toFixed(2));

                    if (speedMph > 25) {
                        setOverSpeed(true);
                        sendSpeedToBackend(speedMph);
                    } else {
                        setOverSpeed(false);
                    }
                }

                previousPosition = { latitude, longitude };
                previousTime = currentTime;
            },
            (err) => setError(`ERROR(${err.code}): ${err.message}`),
            { enableHighAccuracy: true, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const getDistance = (pos1, pos2) => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = (pos1.latitude * Math.PI) / 180;
        const φ2 = (pos2.latitude * Math.PI) / 180;
        const Δφ = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
        const Δλ = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    const sendSpeedToBackend = (speed) => {
        fetch("/api/speed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ speed }),
        })
            .then((response) => response.json())
            .then((data) => console.log("Server Response:", data))
            .catch((error) => console.error("Error sending speed data:", error));
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Speed Tracker</h1>
            {error ? <p style={{ color: "red" }}>{error}</p> : (
                <>
                    <h2>Current Speed: {speed} mph</h2>
                    {overSpeed && <h3 style={{ color: "red" }}>⚠️ Over Speed Limit! Slow Down! ⚠️</h3>}
                </>
            )}
        </div>
    );
};

export default SpeedTracker;
