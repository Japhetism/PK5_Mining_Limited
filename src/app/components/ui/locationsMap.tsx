import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";

type GeoLocation = {
  address: string;
  lat: number;
  lng: number;
};

// Convert address → coordinates (FREE)
async function geocode(address: string): Promise<GeoLocation | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      address
    )}`
  );

  if (!res.ok) return null;

  const data: any[] = await res.json();
  if (!data?.length) return null;

  return {
    address,
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}

// Auto-fit map to all markers
function FitToLocations({ points }: { points: GeoLocation[] }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
  }, [points, map]);

  return null;
}

/**
 * LocationsMap
 * - Fills its parent container (100% width/height)
 * - Parent MUST control height (e.g. className="h-[420px]" or style={{height: 420}})
 * - Has a safe min-height fallback via wrapper styling
 */
export default function LocationsMap({
  locations,
  className,
  minHeight = 300,
}: {
  locations: string[];
  className?: string;
  minHeight?: number;
}) {
  const [points, setPoints] = useState<GeoLocation[]>([]);
  const [failed, setFailed] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadLocations() {
      const results: GeoLocation[] = [];
      const failedOnes: string[] = [];

      // Geocode sequentially (polite to Nominatim)
      for (const address of locations) {
        const geo = await geocode(address);
        if (geo) results.push(geo);
        else failedOnes.push(address);
      }

      if (!cancelled) {
        setPoints(results);
        setFailed(failedOnes);
      }
    }

    loadLocations();

    return () => {
      cancelled = true;
    };
  }, [locations]);

  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", minHeight }}
    >
      <MapContainer
        center={[9.082, 8.6753]} // fallback center (Nigeria)
        zoom={6}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitToLocations points={points} />

        {points.map((p) => (
          <Marker key={p.address} position={[p.lat, p.lng]}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              {p.address}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {failed.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 12 }}>
          Could not locate: {failed.join(" | ")}
        </div>
      )}
    </div>
  );
}