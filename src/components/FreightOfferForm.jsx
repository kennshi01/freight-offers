import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";
import { EQUIPMENT_TYPES } from "../constants/equipmentTypes";
import { PRIORITIES } from "../constants/priorities";

const emptyOffer = {
  brokerName: "",
  pickupCity: "",
  deliveryCity: "",
  pickupDate: "",
  deliveryDate: "",
  rate: "",
  miles: "",
  weight: "",
  equipmentType: EQUIPMENT_TYPES[0],
  priority: PRIORITIES[0],
};

function FreightOfferForm({ brokers, editingOffer, onAddOffer, onUpdateOffer, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyOffer);

  useEffect(() => {
    setFormData(editingOffer ? { ...emptyOffer, ...editingOffer } : emptyOffer);
  }, [editingOffer]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const offerData = {
      ...formData,
      rate: Number(formData.rate),
      miles: Number(formData.miles),
      weight: Number(formData.weight),
    };

    if (editingOffer) {
      onUpdateOffer(offerData);
    } else {
      onAddOffer(offerData);
    }
    setFormData(emptyOffer);
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{editingOffer ? "Update opportunity" : "New opportunity"}</p>
          <h2>{editingOffer ? "Edit freight offer" : "Add freight offer"}</h2>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Broker
          <input
            list="broker-options"
            name="brokerName"
            value={formData.brokerName}
            onChange={handleChange}
            placeholder="Broker company"
            required
          />
          <datalist id="broker-options">
            {brokers.map((broker) => (
              <option key={broker.id} value={broker.companyName} />
            ))}
          </datalist>
        </label>
        <label>
          Pickup city
          <input name="pickupCity" value={formData.pickupCity} onChange={handleChange} required />
        </label>
        <label>
          Delivery city
          <input name="deliveryCity" value={formData.deliveryCity} onChange={handleChange} required />
        </label>
        <label>
          Pickup date
          <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} required />
        </label>
        <label>
          Delivery date
          <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} required />
        </label>
        <label>
          Rate ($)
          <input type="number" min="0" name="rate" value={formData.rate} onChange={handleChange} required />
        </label>
        <label>
          Miles
          <input type="number" min="0" name="miles" value={formData.miles} onChange={handleChange} required />
        </label>
        <label>
          Weight (lb)
          <input type="number" min="0" name="weight" value={formData.weight} onChange={handleChange} required />
        </label>
        <label>
          Equipment type
          <select name="equipmentType" value={formData.equipmentType} onChange={handleChange}>
            {EQUIPMENT_TYPES.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <label>
          Priority
          <select name="priority" value={formData.priority} onChange={handleChange}>
            {PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}
          </select>
        </label>
      </div>
      <div className="form-actions">
        <button className="button primary" type="submit">
          {editingOffer ? <Save size={16} /> : <Plus size={16} />}
          {editingOffer ? "Update offer" : "Save offer"}
        </button>
        {editingOffer && (
          <button className="button outline" type="button" onClick={onCancelEdit}>
            <X size={16} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default FreightOfferForm;
