import { useState } from "react";
import { Building2, Mail, Pencil, Plus, Save, Trash2, X } from "lucide-react";

const emptyBroker = {
  companyName: "",
  contactPerson: "",
  phone: "",
  email: "",
};

function Brokers({ brokers, onAddBroker, onUpdateBroker, onDeleteBroker }) {
  const [formData, setFormData] = useState(emptyBroker);
  const [editingId, setEditingId] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (editingId) {
      onUpdateBroker({ ...formData, id: editingId });
    } else {
      onAddBroker(formData);
    }
    setEditingId(null);
    setFormData(emptyBroker);
  }

  function startEdit(broker) {
    setEditingId(broker.id);
    setFormData(broker);
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData(emptyBroker);
  }

  function handleDeleteBroker(id) {
    onDeleteBroker(id);
    if (editingId === id) {
      cancelEdit();
    }
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
            <p className="eyebrow">{editingId ? "Update partner" : "New partner"}</p>
            <h2>{editingId ? "Edit broker" : "Add broker"}</h2>
          </div>
        </div>
        <div className="form-grid broker-form">
          <label>Company name<input name="companyName" value={formData.companyName} onChange={handleChange} required /></label>
          <label>Contact person<input name="contactPerson" value={formData.contactPerson} onChange={handleChange} required /></label>
          <label>Phone<input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></label>
          <label>Email<input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
        </div>
        <div className="form-actions">
          <button className="button primary" type="submit">
            {editingId ? <Save size={16} /> : <Plus size={16} />}
            {editingId ? "Update broker" : "Save broker"}
          </button>
          {editingId && <button className="button outline" type="button" onClick={cancelEdit}><X size={16} /> Cancel</button>}
        </div>
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
            <thead><tr><th>Company</th><th>Contact person</th><th>Phone</th><th>Email</th><th>Actions</th></tr></thead>
            <tbody>
              {brokers.map((broker) => (
                <tr key={broker.id}>
                  <td><span className="company-cell"><Building2 size={16} /><strong>{broker.companyName}</strong></span></td>
                  <td>{broker.contactPerson}</td>
                  <td>{broker.phone}</td>
                  <td><a className="email-link" href={`mailto:${broker.email}`}><Mail size={14} />{broker.email}</a></td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-button edit" title="Edit broker" onClick={() => startEdit(broker)}><Pencil size={15} /></button>
                      <button className="icon-button outline" title="Delete broker" onClick={() => handleDeleteBroker(broker.id)}><Trash2 size={15} /></button>
                    </div>
                  </td>
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
