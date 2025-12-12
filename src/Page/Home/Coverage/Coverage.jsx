import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import deliveryImg from "../../../assets/delivery.jpg";

const Coverage = () => {
  const [stores, setStores] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    fetch("/warehouse.json")
      .then((res) => res.json())
      .then((data) => setStores(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = stores.find((store) =>
      store.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coordinates = [district.latitude, district.longitude];
      mapRef.current.flyTo(coordinates, 14);
    }
  };

  const position = [23.685, 90.3563];

  return (
    <section className="px-4 md:px-16 py-20">
      <div className="text-center mb-6">
        <p className="text-secondary font-bold text-lg">Our Coverage</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">
          Delivering Across Bangladesh
        </h2>
        <p className="text-accent mt-2 max-w-2xl mx-auto">
          Check our service areas and find out if we deliver to your district.
        </p>
      </div>

      <form onSubmit={handleSearch} className="join flex justify-center my-8">
        <input
          type="search"
          name="location"
          placeholder="Search District"
          className="input join-item px-4 py-2"
        />
        <button
          type="submit"
          className="btn join-item rounded-r-full btn-primary"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-md">
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="w-full h-full"
            ref={mapRef}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {stores.map((store, idx) => (
              <Marker key={idx} position={[store.latitude, store.longitude]}>
                <Popup>
                  {store.district}
                  <br />
                  {store.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="flex justify-center">
          <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] lg:w-[600px] lg:h-[600px]">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>

            <div className="relative w-full h-full bg-base-100 shadow-md rounded-3xl p-4">
              <img
                src={deliveryImg}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
