import london from "../public/london.jpeg";
import newYork from "../public/new-york.jpeg";
import paris from "../public/paris.jpeg";
import amsterdam from "../public/amsterdam.jpeg";
import saoPaulo from "../public/sao-paulo.jpeg";
import tokyo from "../public/tokyo.jpeg";

const destinations = [
  {
    city: "London",
    image: london,
    center: {
      lat: 51.50735,
      lng: -0.12776,
    },
  },
  {
    city: "New York",
    image: newYork,
    center: {
      lat: 40.73061,
      lng: -73.935242,
    },
  },
  {
    city: "Paris",
    image: paris,
    center: {
      lat: 48.864716,
      lng: 2.349014,
    },
  },
  {
    city: "Amsterdam",
    image: amsterdam,
    center: {
      lat: 52.377956,
      lng: 4.89707,
    },
  },
  {
    city: "Sao Paulo",
    image: saoPaulo,
    center: {
      lat: -23.533773,
      lng: -46.62529,
    },
  },
  {
    city: "Tokyo",
    image: tokyo,
    center: {
      lat: 35.652832,
      lng: 139.839478,
    },
  },
];

export default destinations;
