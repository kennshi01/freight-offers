import { useState } from "react";
import { Filter, Search } from "lucide-react";
import FreightOfferForm from "../components/FreightOfferForm";
import FreightOfferTable from "../components/FreightOfferTable";
import { EQUIPMENT_TYPES } from "../constants/equipmentTypes";
import { OFFER_STATUSES } from "../constants/offerStatus";

function FreightOffers({ offers, brokers, onAddOffer, onUpdateOffer, onUpdateStatus, onDeleteOffer }) {
  const [editingOffer, setEditingOffer] = useState(null);
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

  function handleUpdateOffer(offer) {
    onUpdateOffer(offer);
    setEditingOffer(null);
  }

  function handleDeleteOffer(id) {
    onDeleteOffer(id);
    if (editingOffer?.id === id) {
      setEditingOffer(null);
    }
  }

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

      <FreightOfferForm
        brokers={brokers}
        editingOffer={editingOffer}
        onAddOffer={onAddOffer}
        onUpdateOffer={handleUpdateOffer}
        onCancelEdit={() => setEditingOffer(null)}
      />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Inbox</p>
            <h2>All freight offers</h2>
          </div>
          <span className="record-count">{filteredOffers.length} results</span>
        </div>
        <div className="filters-heading"><Filter size={15} /> Filter offers</div>
        <div className="filters">
          <div className="input-with-icon"><Search size={15} /><input name="pickupCity" value={filters.pickupCity} onChange={handleFilterChange} placeholder="Search pickup city" /></div>
          <div className="input-with-icon"><Search size={15} /><input name="deliveryCity" value={filters.deliveryCity} onChange={handleFilterChange} placeholder="Search delivery city" /></div>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All statuses</option>
            {OFFER_STATUSES.map((status) => <option key={status}>{status}</option>)}
          </select>
          <select name="equipmentType" value={filters.equipmentType} onChange={handleFilterChange}>
            <option value="">All equipment</option>
            {EQUIPMENT_TYPES.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>
        <FreightOfferTable
          offers={filteredOffers}
          onEditOffer={setEditingOffer}
          onUpdateStatus={onUpdateStatus}
          onDeleteOffer={handleDeleteOffer}
        />
      </section>
    </div>
  );
}

export default FreightOffers;
