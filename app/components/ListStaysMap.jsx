"use client";

import StayMarker from "./Marker";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const ListStaysMap = ({ stays }) => {
  const searchParams = useSearchParams();

  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  const [coordinates, setCoordinates] = useState({ lat, lng });
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    if (stays) {
      setMarkers(stays);
    }
  }, [stays]);

  return (
    <div className="w-[41%] z-10 min-h-screen fixed right-0 ml-auto">
      <div style={{ height: "calc(100vh - 170px)", width: "100%" }}>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          initialViewState={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            zoom: 11,
          }}
        >
          <NavigationControl />
          <GeolocateControl />
          {markers !== null &&
            markers.length > 0 &&
            markers.map((marker) => (
              <Marker
                key={marker._id}
                longitude={marker.longitude}
                latitude={marker.latitude}
              >
                <StayMarker
                  id={marker._id}
                  price={marker.price}
                  images={marker.images}
                  title={marker.title}
                  subtitle={marker.subtitle}
                  location={marker.location}
                  ratings={marker.ratings}
                />
              </Marker>
            ))}
        </Map>
      </div>
    </div>
  );
};

export default ListStaysMap;
