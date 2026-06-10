import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AcceptedLoads from "./pages/AcceptedLoads";
import Brokers from "./pages/Brokers";
import Dashboard from "./pages/Dashboard";
import FreightOffers from "./pages/FreightOffers";
import Login from "./pages/Login";
import { initialBrokers, initialFreightOffers } from "./data/mockData";
import { OFFER_STATUS } from "./constants/offerStatus";
import { loadFromStorage, saveToStorage } from "./services/storageService";

const OFFERS_STORAGE_KEY = "freightOffers";
const BROKERS_STORAGE_KEY = "brokers";

function App() {
  const [offers, setOffers] = useState(() =>
    loadFromStorage(OFFERS_STORAGE_KEY, initialFreightOffers),
  );
  const [brokers, setBrokers] = useState(() =>
    loadFromStorage(BROKERS_STORAGE_KEY, initialBrokers),
  );

  useEffect(() => {
    saveToStorage(OFFERS_STORAGE_KEY, offers);
  }, [offers]);

  useEffect(() => {
    saveToStorage(BROKERS_STORAGE_KEY, brokers);
  }, [brokers]);

  function addOffer(offer) {
    setOffers((currentOffers) => [
      { ...offer, id: Date.now(), status: OFFER_STATUS.NEW },
      ...currentOffers,
    ]);
  }

  function updateOffer(updatedOffer) {
    setOffers((currentOffers) =>
      currentOffers.map((offer) => (offer.id === updatedOffer.id ? updatedOffer : offer)),
    );
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

  function updateBroker(updatedBroker) {
    setBrokers((currentBrokers) =>
      currentBrokers.map((broker) => (broker.id === updatedBroker.id ? updatedBroker : broker)),
    );
  }

  function deleteBroker(id) {
    setBrokers((currentBrokers) => currentBrokers.filter((broker) => broker.id !== id));
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
              onUpdateOffer={updateOffer}
              onUpdateStatus={updateOfferStatus}
              onDeleteOffer={deleteOffer}
            />
          }
        />
        <Route
          path="/brokers"
          element={
            <Brokers
              brokers={brokers}
              onAddBroker={addBroker}
              onUpdateBroker={updateBroker}
              onDeleteBroker={deleteBroker}
            />
          }
        />
        <Route path="/accepted-loads" element={<AcceptedLoads offers={offers} />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
