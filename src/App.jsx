import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AcceptedLoads from "./pages/AcceptedLoads";
import Brokers from "./pages/Brokers";
import Dashboard from "./pages/Dashboard";
import FreightOffers from "./pages/FreightOffers";
import Login from "./pages/Login";
import { initialBrokers, initialFreightOffers } from "./data/mockData";

function App() {
  const [offers, setOffers] = useState(initialFreightOffers);
  const [brokers, setBrokers] = useState(initialBrokers);

  function addOffer(offer) {
    setOffers((currentOffers) => [
      { ...offer, id: Date.now(), status: "New" },
      ...currentOffers,
    ]);
  }

  function updateOfferStatus(id, status) {
    setOffers((currentOffers) =>
      currentOffers.map((offer) => (offer.id === id ? { ...offer, status } : offer)),
    );
  }

  function deleteOffer(id) {
    setOffers((currentOffers) => currentOffers.filter((offer) => offer.id !== id));
  }

  function addBroker(broker) {
    setBrokers((currentBrokers) => [
      ...currentBrokers,
      { ...broker, id: Date.now() },
    ]);
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard offers={offers} />} />
        <Route
          path="/freight-offers"
          element={
            <FreightOffers
              offers={offers}
              brokers={brokers}
              onAddOffer={addOffer}
              onUpdateStatus={updateOfferStatus}
              onDeleteOffer={deleteOffer}
            />
          }
        />
        <Route
          path="/brokers"
          element={<Brokers brokers={brokers} onAddBroker={addBroker} />}
        />
        <Route path="/accepted-loads" element={<AcceptedLoads offers={offers} />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
