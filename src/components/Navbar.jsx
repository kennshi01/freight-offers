import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "DB" },
  { to: "/freight-offers", label: "Freight Offers", icon: "FO" },
  { to: "/brokers", label: "Brokers", icon: "BR" },
  { to: "/accepted-loads", label: "Accepted Loads", icon: "AL" },
];

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">F</div>
        <div>
          <strong>Freight Offers</strong>
          <span>Inbox</span>
        </div>
      </div>

      <nav className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="user-avatar">DP</span>
        <div>
          <strong>Dispatcher</strong>
          <span>Operations team</span>
        </div>
      </div>
    </aside>
  );
}

export default Navbar;
