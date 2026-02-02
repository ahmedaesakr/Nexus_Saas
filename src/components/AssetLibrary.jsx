import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const assets = [
  { id: 1, name: 'ErgoChair V2 Professional', sku: 'EC-2024-BLK', size: '14.2 MB', format: 'GLB', status: 'APPROVED', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB51HPM1QdXEa1wg4euCAC-Ddq_HYp0YaEpN0VM0LV-b369nkCPwpQv6d5IgE-70FWTGdmAAF8Y48cuOuUZuvWiah8BGW8GimtJqhaMfLC01UlCP1ZW2jrqq2kSX5yMkhsPZ2Btam6vXLR1XgTHylYTbQk9TuhRcv9-GryJJwibic6BnX_xlEA_kh4l_drRumKEk7cesBMDEURMzsluhcsJCy6IT_EjMAyAiJgA1d89yPaMVp2eyFIEMSht2bjHGvfjtMfrNNvXp6c' },
  { id: 2, name: 'Gaming Mouse Pro X', sku: 'GM-PRO-X', size: '8.5 MB', format: 'FBX', status: 'PENDING', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP3HpQckqze5ldEIkM1YNgAArJJptMFfAe8QOc-GwtBQf8-14Hretj5S7GrDpmhqtJSciJuCYVHctDTKuIL3bR4VuduLmKsMEAzWR51AY1fmHQXNohhHT74ZauMhQzu5IH_6uBgG9z_ojVuQ8VZQ4G9Lv4SbTEVwMBYh4q5053pFtGoVOTuNdt4l0lqt6Vm47xZCdlNw1M11UDfv3nKGAFXNckSWxiPcVPzC24-ocxN_EHo3mx4wg7cWbdHN5F8_Ykg2xcdrDoQTo' },
  { id: 3, name: 'Industrial Pump Assembly', sku: 'IND-PMP-001', size: '45.1 MB', format: 'OBJ', status: 'DRAFT', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVbIbdieuewmLnqm1twD6gjj08K75cimz1kg8J0soTXm8FttliipFSe5Ap4Rvnr8V2wBHJGXNPkRf11TFjJLfVHpffw-CMeXCzIJ9WKrPP-YBwU-9dd4xWv9NxQ2rJjjQlDslVDv-OJzdOpLHmaJxoac_6BuSz_tQKHROdNjXV77lK2yJ_fMwNhMVtvPb8uT19qgPNhi4Y1u-P0fjHJS_dzI5J3Dn99VAQTLUjQ6Aw_PSRZ_xU5ma4pwvtfCxywY56fhJDC_KbhZ8' },
  { id: 4, name: 'Nexus Watch S4', sku: 'WA-S4-BLU', size: '22.0 MB', format: 'GLB', status: 'APPROVED', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7MAi4ewTqLlXJTo9IbY-XqW-f7lNqJJq9Mj-YF_kJTE0DqoRr27zCuaq6tC07X7wKWI5KaDMx1jRxNX34BnJsX7I38aQ81JUogR_psXaLH32vVMYjDgc1spzh8f-1YTLF5ln4rbvMM5Ijp9wOhN0eZ3Ncc8oTOXvoSBWX5eFSs4khugQoMPzxb7mJYWvRhL1OBNc7JPfBu4Az3Y3nwTTE4pOcS19ywTvLwdF1nVBFZD7v_c6tQ6-i6TRijt3HqiYAnWFV30QolGc' },
];

const AssetLibrary = ({ onUpload }) => {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex flex-col gap-6 shrink-0 z-10">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Asset Library</h2>
            <p className="text-slate-500 text-sm mt-1">Manage and organize your 3D product catalog.</p>
          </div>
          <button
            onClick={onUpload}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
            <span>Upload New Asset</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
          <div className="relative w-full md:max-w-md group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-400"
              placeholder="Search assets by name, tag, or SKU..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Sort by:</span>
              <span className="text-slate-700 text-sm font-medium">Date Added</span>
              <span className="material-symbols-outlined text-gray-400 text-[20px]">expand_more</span>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-slate-700'}`}
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-slate-700'}`}
              >
                <span className="material-symbols-outlined text-[20px]">view_list</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto shrink-0 hidden lg:block p-6">
          <div className="flex flex-col gap-8">
            <FilterGroup title="Asset Type" options={[{ label: '3D Models', count: 124 }, { label: 'Textures', count: 45 }, { label: 'Renders', count: 12 }]} />
            <FilterGroup title="Status" options={[{ label: 'Approved', color: 'bg-emerald-500' }, { label: 'Pending Review', color: 'bg-amber-500' }, { label: 'Draft', color: 'bg-gray-300' }, { label: 'Archived', color: 'bg-red-400' }]} />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center cursor-pointer group">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Format</h3>
                <span className="material-symbols-outlined text-gray-400 text-[18px] group-hover:text-primary transition-colors">remove</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['.GLB', '.FBX', '.OBJ', '.USDZ'].map(format => (
                  <button key={format} className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${format === '.GLB' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-gray-100 text-slate-600 border-gray-200 hover:bg-gray-200'}`}>
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#f8f9fc]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {assets.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const FilterGroup = ({ title, options }) => (
  <div className="flex flex-col gap-3">
    <div className="flex justify-between items-center cursor-pointer group">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{title}</h3>
      <span className="material-symbols-outlined text-gray-400 text-[18px] group-hover:text-primary transition-colors">remove</span>
    </div>
    <div className="flex flex-col gap-2">
      {options.map((opt, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
          <input className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer" type="checkbox" defaultChecked={idx === 0} />
          <span className="text-sm text-slate-600 group-hover:text-slate-900">{opt.label}</span>
          {opt.count && <span className="ml-auto text-xs text-gray-400">{opt.count}</span>}
          {opt.color && <span className={`ml-auto w-2 h-2 rounded-full ${opt.color}`}></span>}
        </label>
      ))}
    </div>
  </div>
);

const AssetCard = ({ asset }) => {
  const statusColors = {
    APPROVED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    DRAFT: 'bg-gray-100 text-gray-600 border-gray-200',
    ARCHIVED: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <Link to={asset.status === 'ARCHIVED' || asset.id === 3 ? "/detail-rejected" : "/detail"} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col">
      <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
        <img className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500" src={asset.image} alt={asset.name} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[1px]">
          <button className="p-2 bg-white rounded-lg text-slate-900 hover:bg-primary hover:text-white transition-colors" title="Download">
            <span className="material-symbols-outlined text-[20px]">download</span>
          </button>
          <button className="p-2 bg-white rounded-lg text-slate-900 hover:bg-primary hover:text-white transition-colors" title="Edit">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusColors[asset.status]}`}>
            {asset.status}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-slate-900 text-sm truncate" title={asset.name}>{asset.name}</h3>
          <button className="text-gray-400 hover:text-slate-900">
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
        <p className="font-mono text-[11px] text-gray-500">SKU: {asset.sku}</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
          <span className="material-symbols-outlined text-[14px]">grid_3x3</span>
          <span>{asset.size}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{asset.format}</span>
        </div>
      </div>
    </Link>
  );
};

export default AssetLibrary;
