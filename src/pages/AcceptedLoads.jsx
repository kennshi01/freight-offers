function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function AcceptedLoads({ offers }) {
  const acceptedOffers = offers.filter((offer) => offer.status === "Accepted");
  const totalRevenue = acceptedOffers.reduce((total, offer) => total + offer.rate, 0);

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="eyebrow">Booked freight</p>
          <h1>Accepted Loads</h1>
          <p>Review the loads confirmed and ready for dispatch.</p>
        </div>
        <span className="date-chip">{formatMoney(totalRevenue)} booked</span>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Confirmed</p>
            <h2>Accepted load list</h2>
          </div>
          <span className="record-count">{acceptedOffers.length} loads</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Broker</th><th>Route</th><th>Dates</th><th>Rate</th><th>Equipment</th></tr>
            </thead>
            <tbody>
              {acceptedOffers.map((offer) => (
                <tr key={offer.id}>
                  <td><strong>{offer.brokerName}</strong></td>
                  <td>{offer.pickupCity} <span className="route-arrow">to</span> {offer.deliveryCity}</td>
                  <td>{offer.pickupDate} <span className="route-arrow">to</span> {offer.deliveryDate}</td>
                  <td><strong>{formatMoney(offer.rate)}</strong></td>
                  <td>{offer.equipmentType}</td>
                </tr>
              ))}
              {acceptedOffers.length === 0 && (
                <tr><td colSpan="5" className="empty-state">No accepted loads yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AcceptedLoads;
