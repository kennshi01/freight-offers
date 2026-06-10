import { useState } from "react";
import FreightOfferForm from "../components/FreightOfferForm";
import FreightOfferTable from "../components/FreightOfferTable";

function FreightOffers({ offers, brokers, onAddOffer, onUpdateStatus, onDeleteOffer }) {
  const [filters, setFilters] = useState({
    pickupCity: "",
    deliveryCity: "",
    status: "",
    equipmentType: "",
  });

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  const filteredOffers = offers.filter((offer) => {
    return (
      offer.pickupCity.toLowerCase().includes(filters.pickupCity.toLowerCase()) &&
      offer.deliveryCity.toLowerCase().includes(filters.deliveryCity.toLowerCase()) &&
      (!filters.status || offer.status === filters.status) &&
      (!filters.equipmentType || offer.equipmentType === filters.equipmentType)
    );
  });

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="eyebrow">Offer management</p>
          <h1>Freight Offers</h1>
          <p>Save, filter, review, and manage offers from your broker network.</p>
        </div>
        <span className="date-chip">{offers.length} total offers</span>
      </header>

      <FreightOfferForm brokers={brokers} onAddOffer={onAddOffer} />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Inbox</p>
            <h2>All freight offers</h2>
          </div>
          <span className="record-count">{filteredOffers.length} results</span>
        </div>
        <div className="filters">
          <input name="pickupCity" value={filters.pickupCity} onChange={handleFilterChange} placeholder="Search pickup city" />
          <input name="deliveryCity" value={filters.deliveryCity} onChange={handleFilterChange} placeholder="Search delivery city" />
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All statuses</option>
            <option>New</option>
            <option>Reviewed</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <select name="equipmentType" value={filters.equipmentType} onChange={handleFilterChange}>
            <option value="">All equipment</option>
            <option>Dry Van</option>
            <option>Reefer</option>
            <option>Flatbed</option>
            <option>Step Deck</option>
          </select>
        </div>
        <FreightOfferTable offers={filteredOffers} onUpdateStatus={onUpdateStatus} onDeleteOffer={onDeleteOffer} />
      </section>
    </div>
  );
}

export default FreightOffers;
