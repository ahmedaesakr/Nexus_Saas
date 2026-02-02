import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-20 lg:w-64 bg-sidebar-dark flex flex-col justify-between shrink-0 transition-all duration-300 z-20 h-screen">
      <div className="flex flex-col">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
          <div className="size-8 rounded bg-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-xl">deployed_code</span>
          </div>
          <h1 className="ml-3 text-white font-bold text-lg hidden lg:block tracking-tight">Nexus DAM</h1>
        </div>
        {/* Nav Items */}
        <nav className="flex flex-col gap-1 p-3 mt-2">
          <NavItem to="/dashboard" icon="dashboard" label="Dashboard" />
          <NavItem to="/library" icon="folder_open" label="Asset Library" />
          <NavItem to="/analytics" icon="bar_chart" label="Analytics" />
          <NavItem to="/users" icon="group" label="Users" />
        </nav>
      </div>
      {/* Bottom Actions */}
      <div className="p-3 mb-2">
        <NavItem to="/settings" icon="settings" label="Settings" />
        <div className="mt-4 flex items-center gap-3 px-3 py-3 border-t border-slate-700/50 pt-4">
          <div className="size-8 rounded-full bg-slate-600 bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ1FwTx_WqnZ8ARtA58WReLUhqZECqGpbzduZwi2merDRLL_iSeTLXPZ3N1KJ2hP_Vl_iL9bpscI5Jky6Uu_d9IG38JHVuoNp62kOVhwwAG1gKf-gPz7IdyHkb2eOAaJLIDT8lQ9SvQBkdrYc_s3y6rGBFzTV7_O0--MWRHEXjuwRVqQuAD8yTDOB7K-K-dislkziHHDGoJcgixnNfAFq5Es0FMw1VAwac-CwHermiYvP5foAIXhtklL0nBLpIcxfhmd3B0M1uVOU")' }}></div>
          <div className="hidden lg:flex flex-col overflow-hidden">
            <p className="text-white text-sm font-medium truncate">Alex Morgan</p>
            <p className="text-slate-500 text-xs truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
        isActive
          ? 'bg-primary text-white shadow-lg shadow-primary/20'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`
    }
  >
    <span className={`material-symbols-outlined ${icon === 'folder_open' ? 'fill-1' : ''}`}>{icon}</span>
    <span className="text-sm font-medium hidden lg:block">{label}</span>
  </NavLink>
);

export default Sidebar;
