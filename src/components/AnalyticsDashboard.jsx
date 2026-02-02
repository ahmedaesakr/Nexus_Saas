import React from 'react';

const AnalyticsDashboard = () => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-background-light">
      <header className="px-8 py-6 sticky top-0 bg-background-light/90 backdrop-blur-sm z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics Overview</h2>
            <p className="text-slate-500 text-sm mt-1">Track asset performance and user engagement</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-600 shadow-sm">
              <span className="material-symbols-outlined text-gray-400 text-[20px]">calendar_today</span>
              <span>Last 30 Days</span>
              <span className="material-symbols-outlined text-gray-400 text-[20px]">arrow_drop_down</span>
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all shadow-primary/30">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 pb-20">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Assets" value="12,450" trend="+5.2%" icon="inventory_2" iconColor="text-primary" iconBg="bg-blue-50" />
          <KPICard title="Total Downloads" value="84.2k" trend="+12%" icon="cloud_download" iconColor="text-indigo-600" iconBg="bg-indigo-50" />
          <KPICard title="Storage Used" value="1.2 TB" subValue="60%" limit="2TB Limit" icon="database" iconColor="text-orange-600" iconBg="bg-orange-50" progress={60} />
          <KPICard title="Active Users" value="342" trend="+8%" icon="group" iconColor="text-pink-600" iconBg="bg-pink-50" />
        </div>

        {/* Main Chart Area */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Asset Engagement Over Time</h3>
              <p className="text-slate-500 text-sm mt-1">Views, downloads, and shares across all workspaces</p>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
              <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-semibold text-slate-800">Views</button>
              <button className="px-3 py-1 hover:bg-gray-200 rounded-md text-xs font-medium text-slate-600 transition-colors">Downloads</button>
              <button className="px-3 py-1 hover:bg-gray-200 rounded-md text-xs font-medium text-slate-600 transition-colors">Shares</button>
            </div>
          </div>
          <div className="w-full h-72 relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0d59f2" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0d59f2" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="1000" y1="250" y2="250" />
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="1000" y1="190" y2="190" />
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="1000" y1="130" y2="130" />
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="1000" y1="70" y2="70" />
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="1000" y1="10" y2="10" />
              <path d="M0,220 C100,210 150,150 250,160 C350,170 400,100 500,80 C600,60 650,120 750,110 C850,100 900,40 1000,50 L1000,300 L0,300 Z" fill="url(#chartGradient)" />
              <path d="M0,220 C100,210 150,150 250,160 C350,170 400,100 500,80 C600,60 650,120 750,110 C850,100 900,40 1000,50" fill="none" stroke="#0d59f2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              <circle cx="500" cy="80" fill="#0d59f2" r="6" stroke="white" strokeWidth="3" />
            </svg>
            <div className="absolute left-1/2 -translate-x-1/2 top-[10%] bg-slate-800 text-white text-xs rounded-lg p-2 shadow-xl border border-slate-700 pointer-events-none">
              <p className="font-semibold mb-1">Feb 14, 2024</p>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Interactions:</span>
                <span className="font-bold">2,450</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 font-medium mt-4 px-2">
            <span>Jan 01</span><span>Jan 15</span><span>Feb 01</span><span>Feb 15</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Distribution by Asset Type</h3>
            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center flex-1">
              <div className="relative w-48 h-48 rounded-full shrink-0" style={{ background: 'conic-gradient(#0d59f2 0% 45%, #6366f1 45% 75%, #a5b4fc 75% 100%)' }}>
                <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900">12k</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Assets</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <LegendItem color="bg-primary" label="3D Models" value="45%" />
                <LegendItem color="bg-indigo-500" label="2D Renders" value="30%" />
                <LegendItem color="bg-indigo-300" label="Video" value="25%" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Top Performing SKUs</h3>
            <div className="flex flex-col gap-5">
              <TopSKU name="ErgoChair V2" value="12.5k downloads" progress={85} />
              <TopSKU name="DeskLamp Pro" value="8.2k downloads" progress={65} />
              <TopSKU name="MonitorStand X1" value="5.4k downloads" progress={45} />
              <TopSKU name="OfficeTable L" value="3.1k downloads" progress={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, trend, subValue, limit, icon, iconColor, iconBg, progress }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${iconBg}`}>
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
      </div>
      {trend ? (
        <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span>
          {trend}
        </span>
      ) : limit ? (
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{limit}</span>
      ) : null}
    </div>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <div className="flex items-end gap-2 mt-1">
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      {subValue && <span className="text-sm text-slate-500 mb-1">{subValue}</span>}
    </div>
    {progress !== undefined && (
      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    )}
  </div>
);

const LegendItem = ({ color, label, value }) => (
  <div className="flex items-center justify-between sm:justify-start gap-3">
    <div className={`w-3 h-3 rounded-full ${color} shrink-0`}></div>
    <span className="text-sm font-medium text-slate-600">{label}</span>
    <span className="text-sm font-bold text-slate-900 ml-auto sm:ml-2">{value}</span>
  </div>
);

const TopSKU = ({ name, value, progress }) => (
  <div className="group">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-semibold text-slate-700">{name}</span>
      <span className="text-xs font-medium text-slate-500">{value}</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

export default AnalyticsDashboard;
