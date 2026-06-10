import { useState } from "react";

const emptyBroker = {
  companyName: "",
  contactPerson: "",
  phone: "",
  email: "",
};

function Brokers({ brokers, onAddBroker }) {
  const [formData, setFormData] = useState(emptyBroker);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddBroker(formData);
    setFormData(emptyBroker);
  }

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="eyebrow">Partner network</p>
          <h1>Brokers</h1>
          <p>Keep your freight broker contacts organized in one place.</p>
        </div>
        <span className="date-chip">{brokers.length} active brokers</span>
      </header>

      <form className="panel form-panel" onSubmit={handleSubmit}>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">New partner</p>
            <h2>Add broker</h2>
          </div>
        </div>
        <div className="form-grid broker-form">
          <label>Company name<input name="companyName" value={formData.companyName} onChange={handleChange} required /></label>
          <label>Contact person<input name="contactPerson" value={formData.contactPerson} onChange={handleChange} required /></label>
          <label>Phone<input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></label>
          <label>Email<input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
        </div>
        <button className="button primary" type="submit">Save broker</button>
      </form>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Contacts</p>
            <h2>Broker directory</h2>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Company</th><th>Contact person</th><th>Phone</th><th>Email</th></tr></thead>
            <tbody>
              {brokers.map((broker) => (
                <tr key={broker.id}>
                  <td><strong>{broker.companyName}</strong></td>
                  <td>{broker.contactPerson}</td>
                  <td>{broker.phone}</td>
                  <td><a href={`mailto:${broker.email}`}>{broker.email}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Brokers;
