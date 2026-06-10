import FreightOfferTable from "../components/FreightOfferTable";
import StatCard from "../components/StatCard";
import { CheckCircle, DollarSign, Inbox, Package, XCircle } from "lucide-react";
import { OFFER_STATUS } from "../constants/offerStatus";

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function Dashboard({ offers }) {
  const newOffers = offers.filter((offer) => offer.status === OFFER_STATUS.NEW).length;
  const acceptedOffers = offers.filter((offer) => offer.status === OFFER_STATUS.ACCEPTED);
  const rejectedOffers = offers.filter((offer) => offer.status === OFFER_STATUS.REJECTED).length;
  const acceptedRevenue = acceptedOffers.reduce((total, offer) => total + offer.rate, 0);

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Dashboard</h1>
          <p>Track incoming opportunities and accepted freight at a glance.</p>
        </div>
        <span className="date-chip">Freight desk</span>
      </header>

      <section className="stat-grid">
        <StatCard label="Total offers" value={offers.length} icon={Package} />
        <StatCard label="New offers" value={newOffers} icon={Inbox} tone="cyan" />
        <StatCard label="Accepted offers" value={acceptedOffers.length} icon={CheckCircle} tone="green" />
        <StatCard label="Rejected offers" value={rejectedOffers} icon={XCircle} tone="red" />
        <StatCard label="Accepted revenue" value={formatMoney(acceptedRevenue)} icon={DollarSign} tone="purple" />
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Recently received</p>
            <h2>Latest freight offers</h2>
          </div>
          <span className="record-count">Showing {Math.min(offers.length, 5)} offers</span>
        </div>
        <FreightOfferTable offers={offers.slice(0, 5)} compact />
      </section>
    </div>
  );
}

export default Dashboard;
