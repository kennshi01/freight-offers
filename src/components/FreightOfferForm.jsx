import { useState } from "react";

const emptyOffer = {
  brokerName: "",
  pickupCity: "",
  deliveryCity: "",
  pickupDate: "",
  deliveryDate: "",
  rate: "",
  miles: "",
  weight: "",
  equipmentType: "Dry Van",
};

function FreightOfferForm({ brokers, onAddOffer }) {
  const [formData, setFormData] = useState(emptyOffer);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddOffer({
      ...formData,
      rate: Number(formData.rate),
      miles: Number(formData.miles),
      weight: Number(formData.weight),
    });
    setFormData(emptyOffer);
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">New opportunity</p>
          <h2>Add freight offer</h2>
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
            <option>Dry Van</option>
            <option>Reefer</option>
            <option>Flatbed</option>
            <option>Step Deck</option>
          </select>
        </label>
      </div>
      <button className="button primary" type="submit">Save offer</button>
    </form>
  );
}

export default FreightOfferForm;
