import { NavLink } from "react-router-dom";
import { Building2, Inbox, LayoutDashboard, LogOut, Truck } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/freight-offers", label: "Freight Offers", icon: Inbox },
  { to: "/brokers", label: "Brokers", icon: Building2 },
  { to: "/accepted-loads", label: "Accepted Loads", icon: Truck },
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
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <span className="user-avatar">DP</span>
        <div>
          <strong>Dispatcher</strong>
          <span>Operations team</span>
        </div>
        <NavLink to="/login" className="logout-link" title="Log out">
          <LogOut size={17} />
        </NavLink>
      </div>
    </aside>
  );
}

export default Navbar;
