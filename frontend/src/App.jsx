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
import { PRIORITIES } from "./constants/priorities";
import { loadFromStorage, saveToStorage } from "./services/storageService";
import {
  createFreightOffer,
  deleteFreightOffer,
  getFreightOffers,
  updateFreightOffer,
} from "./api/freightOffersApi";
import {
  createBroker,
  deleteBroker as deleteBrokerFromApi,
  getBrokers,
  updateBroker as updateBrokerInApi,
} from "./api/brokersApi";

const OFFERS_STORAGE_KEY = "freightOffers";
const BROKERS_STORAGE_KEY = "brokers";

function normalizeOffer(offer) {
  return {
    ...offer,
    priority: offer.priority === "Normal" || !offer.priority ? PRIORITIES[1] : offer.priority,
    dispatcherNotes: offer.dispatcherNotes || "",
  };
}

function App() {
  const [offers, setOffers] = useState(() =>
    loadFromStorage(OFFERS_STORAGE_KEY, initialFreightOffers).map(normalizeOffer),
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

  useEffect(() => {
    let ignoreResults = false;

    async function loadApiData() {
      try {
        const apiOffers = await getFreightOffers();
        if (!ignoreResults) {
          setOffers(apiOffers.map(normalizeOffer));
        }
      } catch (error) {
        console.warn("Freight offers API unavailable. Using local data.", error);
      }

      try {
        const apiBrokers = await getBrokers();
        if (!ignoreResults) {
          setBrokers(apiBrokers);
        }
      } catch (error) {
        console.warn("Brokers API unavailable. Using local data.", error);
      }
    }

    loadApiData();

    return () => {
      ignoreResults = true;
    };
  }, []);

  async function addOffer(offer) {
    const newOffer = normalizeOffer({ ...offer, status: OFFER_STATUS.NEW });

    try {
      const createdOffer = await createFreightOffer(newOffer);
      setOffers((currentOffers) => [normalizeOffer(createdOffer), ...currentOffers]);
    } catch (error) {
      console.warn("Could not create offer through API. Saved locally instead.", error);
      setOffers((currentOffers) => [
        { ...newOffer, id: Date.now() },
        ...currentOffers,
      ]);
    }
  }

  async function updateOffer(updatedOffer) {
    try {
      const savedOffer = await updateFreightOffer(updatedOffer.id, normalizeOffer(updatedOffer));
      setOffers((currentOffers) =>
        currentOffers.map((offer) => (offer.id === savedOffer.id ? normalizeOffer(savedOffer) : offer)),
      );
    } catch (error) {
      console.warn("Could not update offer through API. Updated locally instead.", error);
      setOffers((currentOffers) =>
        currentOffers.map((offer) => (offer.id === updatedOffer.id ? normalizeOffer(updatedOffer) : offer)),
      );
    }
  }

  async function updateOfferStatus(id, status) {
    const currentOffer = offers.find((offer) => offer.id === id);
    if (!currentOffer) {
      return;
    }

    await updateOffer({ ...currentOffer, status });
  }

  async function deleteOffer(id) {
    try {
      await deleteFreightOffer(id);
    } catch (error) {
      console.warn("Could not delete offer through API. Deleted locally instead.", error);
    }

    setOffers((currentOffers) => currentOffers.filter((offer) => offer.id !== id));
  }

  async function addBroker(broker) {
    try {
      const createdBroker = await createBroker(broker);
      setBrokers((currentBrokers) => [...currentBrokers, createdBroker]);
    } catch (error) {
      console.warn("Could not create broker through API. Saved locally instead.", error);
      setBrokers((currentBrokers) => [
        ...currentBrokers,
        { ...broker, id: Date.now() },
      ]);
    }
  }

  async function updateBroker(updatedBroker) {
    try {
      const savedBroker = await updateBrokerInApi(updatedBroker.id, updatedBroker);
      setBrokers((currentBrokers) =>
        currentBrokers.map((broker) => (broker.id === savedBroker.id ? savedBroker : broker)),
      );
    } catch (error) {
      console.warn("Could not update broker through API. Updated locally instead.", error);
      setBrokers((currentBrokers) =>
        currentBrokers.map((broker) => (broker.id === updatedBroker.id ? updatedBroker : broker)),
      );
    }
  }

  async function deleteBroker(id) {
    try {
      await deleteBrokerFromApi(id);
    } catch (error) {
      console.warn("Could not delete broker through API. Deleted locally instead.", error);
    }

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
