import { AlertCircle, CheckCircle, Eye, Pencil, Trash2, XCircle } from "lucide-react";
import { OFFER_STATUS } from "../constants/offerStatus";
import { PRIORITIES } from "../constants/priorities";

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function FreightOfferTable({ offers, onEditOffer, onUpdateStatus, onDeleteOffer, compact = false }) {
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
              <td>
                <strong>{offer.brokerName}</strong>
                {offer.priority === PRIORITIES[2] && <span className="priority"><AlertCircle size={12} /> High</span>}
              </td>
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
                    <button className="icon-button edit" title="Edit offer" onClick={() => onEditOffer(offer)}><Pencil size={15} /></button>
                    <button className="icon-button neutral" title="Mark reviewed" onClick={() => onUpdateStatus(offer.id, OFFER_STATUS.REVIEWED)}><Eye size={15} /></button>
                    <button className="icon-button success" title="Accept offer" onClick={() => onUpdateStatus(offer.id, OFFER_STATUS.ACCEPTED)}><CheckCircle size={15} /></button>
                    <button className="icon-button danger" title="Reject offer" onClick={() => onUpdateStatus(offer.id, OFFER_STATUS.REJECTED)}><XCircle size={15} /></button>
                    <button className="icon-button outline" title="Delete offer" onClick={() => onDeleteOffer(offer.id)}><Trash2 size={15} /></button>
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
