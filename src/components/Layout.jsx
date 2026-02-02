import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="bg-background-light text-slate-900 font-display overflow-hidden h-screen flex w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-background-light relative overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
