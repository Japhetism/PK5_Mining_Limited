import { useQuery } from "@tanstack/react-query";

export interface UserLocation {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  latitude: number;
  longitude: number;
}

const LOCATION_KEY = "user-location";

const fetchLocation = async (): Promise<UserLocation> => {
  const response = await fetch("https://ipapi.co/json/");

  if (!response.ok) {
    throw new Error("Failed to fetch location");
  }

  const data = await response.json();

  console.log("location data ", data);

  localStorage.setItem(
    LOCATION_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );

  return data;
};

export const useLocation = () => {
  return useQuery({
    queryKey: ["location"],
    queryFn: fetchLocation,

    // Check cache first
    initialData: () => {
      const cached = localStorage.getItem(LOCATION_KEY);

      if (!cached) return undefined;

      const parsed = JSON.parse(cached);

      const age = Date.now() - parsed.timestamp;

      const ONE_DAY = 24 * 60 * 60 * 1000;

      // if (age > ONE_DAY) {
      //   return undefined;
      // }

      return parsed.data;
    },

    // staleTime: 1000 * 60, // 1 minute
    staleTime: 1000,
    gcTime: 1000 * 60,
    retry: 1,
  });
};
