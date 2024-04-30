"use client";

import { useDestinationStore } from "@/store/store";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { useSearchParams } from "next/navigation";

const ListStaysMap = () => {
  const { center, setCenter } = useDestinationStore((state) => state);

  const searchParams = useSearchParams();

  const lat = searchParams.get("lat");

  const lng = searchParams.get("lng");

  return (
    <div className="w-[41%] z-10 min-h-screen fixed right-0 ml-auto">
      <div style={{ height: "calc(100vh - 170px)", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBUw4nA6ceaeZHdYlhxlIxyBcg95gxksGs" }}
          defaultCenter={{
            lat: center.lat || parseFloat(lat),
            lng: center.lng || parseFloat(lng),
          }}
          defaultZoom={11}
        >
          <Marker lat={51.50735} lng={-0.12776} price={122} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default ListStaysMap;
