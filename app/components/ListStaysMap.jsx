"use client";

import StayMarker from "./Marker";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// gsap.registerPlugin(ScrollTrigger);

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

  const mapRef = useRef(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.to(".gsap-map", {
  //       scrollTrigger: {
  //         trigger: ".gsap-map",
  //         pin: true,
  //         scrub: 1,
  //         markers: true,
  //         start: "top top",
  //         end: "bottom bottom",
  //       },
  //     });
  //   }, mapRef);

  //   return () => ctx.revert();
  // }, []);

  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".gsap-footer");
      if (footer.getBoundingClientRect().top <= window.innerHeight) {
        setIsInViewport(true);
      } else {
        setIsInViewport(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-[41%] z-10 ${
        isInViewport ? "absolute bottom-0" : "fixed"
      } right-0 ml-auto`}
      ref={mapRef}
      style={{ height: "calc(100vh - 170px)" }}
    >
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
  );
};

export default ListStaysMap;
