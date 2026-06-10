function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function FreightOfferTable({ offers, onUpdateStatus, onDeleteOffer, compact = false }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Broker</th>
            <th>Route</th>
            <th>Pickup</th>
            <th>Rate</th>
            <th>Details</th>
            <th>Status</th>
            {!compact && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td><strong>{offer.brokerName}</strong></td>
              <td>
                <span className="route">{offer.pickupCity}</span>
                <span className="route-arrow">to</span>
                <span className="route">{offer.deliveryCity}</span>
              </td>
              <td>{offer.pickupDate}</td>
              <td><strong>{formatMoney(offer.rate)}</strong></td>
              <td>
                <span>{offer.equipmentType}</span>
                <small>{offer.miles.toLocaleString()} mi / {offer.weight.toLocaleString()} lb</small>
              </td>
              <td><span className={`status ${offer.status.toLowerCase()}`}>{offer.status}</span></td>
              {!compact && (
                <td>
                  <div className="action-buttons">
                    <button className="button small neutral" onClick={() => onUpdateStatus(offer.id, "Reviewed")}>Reviewed</button>
                    <button className="button small success" onClick={() => onUpdateStatus(offer.id, "Accepted")}>Accept</button>
                    <button className="button small danger" onClick={() => onUpdateStatus(offer.id, "Rejected")}>Reject</button>
                    <button className="button small outline" onClick={() => onDeleteOffer(offer.id)}>Delete</button>
                  </div>
                </td>
              )}
            </tr>
          ))}
          {offers.length === 0 && (
            <tr>
              <td colSpan={compact ? 6 : 7} className="empty-state">No freight offers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FreightOfferTable;
