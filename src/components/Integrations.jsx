import React from 'react';

const Integrations = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0f1623] text-white">
      <div className="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-black tracking-tight">Integrations</h1>
          <p className="text-slate-400 text-base max-w-2xl">Manage your connected apps and discover new tools to streamline your 3D workflow.</p>
        </div>

        <div className="border-b border-slate-700">
          <nav className="flex gap-8">
            <Tab label="Profile" />
            <Tab label="Team" />
            <Tab label="Billing" />
            <Tab label="Integrations" active />
            <Tab label="API" />
          </nav>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="block w-full pl-10 pr-3 py-3 border-none rounded-lg bg-[#212f4a] text-white placeholder-slate-400 focus:ring-2 focus:ring-primary sm:text-sm" placeholder="Search marketplace apps..." />
          </div>
          <select className="bg-[#212f4a] text-white pl-4 pr-10 py-3 rounded-lg border-none focus:ring-2 focus:ring-primary text-sm font-medium cursor-pointer appearance-none">
            <option>All Categories</option>
            <option>3D Engines</option>
            <option>E-commerce</option>
          </select>
        </div>

        <section>
          <div className="flex items-center gap-2 mb-4 text-green-500">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <h3 className="text-white text-lg font-bold">Connected Apps</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConnectedCard
              name="Shopify Plus"
              status="Sync Active"
              logo="https://lh3.googleusercontent.com/aida-public/AB6AXuBVw2vY77j7a8Zz_1o5NvTyFYQ2Ugl6mYAunI1YPDDuuN5DSrGDpRRYHtYR4wG-gUibP65jb1uYnmmll81MPNDIrXXi6Af6kBhgYz5pwoylhYqN8ydMoml0NtsN61cyw9szCUQeg7aPX_2oKAaOmf17v78fOVy0SVLNQW_mA3KIerhagHHkW-Cnd0xoRpSI76GCSdKdm3Noq3GjYPgIMfhmVjFKg4MEgjbLYyc9Ek6a7hh6PpdUS-95WwEBdDIG-Fur3T6pBe-nLeU"
            />
            <ConnectedCard
              name="Unity Build"
              status="Pipeline Active"
              logo="https://lh3.googleusercontent.com/aida-public/AB6AXuD5KHBm3z0QWD9JOHbWrcpqwLdBIYrDi_QPyixzuexS2BpV_tL9rizT-if_5P9x9sh525M1P7096wE3wkK0o0PVlgngOzbNwlK9pEafOMC0IrHS50gkKfCW9Z1FZjBS2eQVu9aALJBffdrYgMO49S0_YdR2Fw93wt0gj_bLTnvUAQZpuhI26MMI3KH5x-M3rP_Op2SzOTNygDcfI5CbLg03iDbTVjCzBtwnT4f3nz_B5k-FjtqTPRE6dM87ObxN32y9O-XBMeoJTUI"
              dark
            />
          </div>
        </section>

        <section className="pb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-bold">Discover</h3>
            <a className="text-primary text-sm font-medium hover:text-blue-400" href="#">Browse all integrations →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <MarketCard
              name="Unreal Engine 5"
              desc="Direct import for architectural visualization and real-time rendering workflows."
              logo="https://lh3.googleusercontent.com/aida-public/AB6AXuBqXrjejHR5QlOlf_GjeZr9n1oHjGA4xcuJWqyOzk8o3pdqU7EuOtRZyFbL5A1y1CzfL5A3Hz3JHkBWLT0iwhKuBrbUCDkGwT3FQs35cq6YUkhny3lYGG7euZfRTFoB6cFBrufioiH-HVTz-W7ky-Vzzug5Yfp_y6qO1Igrl_dbijcCrrJhriwxeQ3kUgiZ1GZ0T6wHzuZPfrF34Bl0uX7hdAwl2B-Ju0R_7eGFhhgJGapq7_702wgfupJz_LyXGtGxcRs1bkSxZ4c"
              bg="bg-[#0e1128]"
              invert
            />
            <MarketCard
              name="Blender Sync"
              desc="Two-way synchronization for mesh editing and texture mapping updates."
              logo="https://lh3.googleusercontent.com/aida-public/AB6AXuD4QXDtE6ALu4VGbEoO5cvHV0L8OHBo9McoFzZyOLVPsemOpF2UiFdT8oLfWVHWDz9SiuIdqPvQ5wcxKUVgYbk0Ng1m2LGpg1WvQ5vsUDkw7mjcB5RUuDIyaa4zhATXi06GQk_rYvoZYU4wxfqJ6fMJXHS-ehfoCMYXakhyP17-0-F5NCEpb51YoQyQxggfpoNI3Mao1f9Z_0WUJSeQ298Y3HFcBlZKpQMqi4i9YMKri1uG166CgRIgdFYuLkvXFz7KX5s1l9bFPB8"
              bg="bg-[#e87d0d]/10"
            />
            <MarketCard
              name="Creative Cloud"
              desc="Access your asset library directly within Photoshop, Illustrator, and After Effects."
              logo="https://lh3.googleusercontent.com/aida-public/AB6AXuDdpfy8kJ4jBlFFJ737yULLyuRI8jt1Ws95QRA0yvURtYX-bBLI6z4mdyBTRIEPwa2W-Mp7MrvQElpGUejH0ViqJD596nz5hSL2fiCWSHOaELjMZrQXY4dgknA9MCmL4ClRyd1ewtijT9XziEtiq1_k3ySzrFKRTSuXTLzqkRlvd3KD9YaMDT1JCw_kvtuSt-8Cmy6K7oTmDYT6-HDalhmXo1U-XnJKc6CHIo0XNwAtlKPT-_vVdcKu2i-MlhQol_3OI0jJWeNOEIM"
              bg="bg-[#ff0000]/10"
            />
            <div className="bg-[#212f4a]/20 border border-dashed border-[#2f436a] rounded-xl p-5 flex flex-col h-full items-center justify-center text-center hover:bg-[#212f4a]/30 transition-all cursor-pointer min-h-[240px]">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-3">add_circle</span>
              <h4 className="text-white font-bold text-lg">Build Custom App</h4>
              <p className="text-slate-400 text-sm mt-2">Use the Nexus API to build your own integration.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Tab = ({ label, active }) => (
  <a className={`pb-3 pt-2 text-sm font-bold transition-all border-b-[3px] ${active ? 'border-primary text-white' : 'border-transparent text-slate-400 hover:text-white hover:border-[#2f436a]'}`} href="#">
    {label}
  </a>
);

const ConnectedCard = ({ name, status, logo, dark }) => (
  <div className="bg-[#1a2333] border border-[#212f4a] rounded-xl p-5 flex items-center justify-between group hover:border-[#2f436a] transition-all">
    <div className="flex items-center gap-4">
      <div className={`size-12 rounded-lg p-2 flex items-center justify-center shrink-0 ${dark ? 'bg-black' : 'bg-white'}`}>
        <img src={logo} alt={name} className="w-full h-full object-contain" />
      </div>
      <div>
        <h4 className="text-white font-bold text-base">{name}</h4>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="size-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-slate-400">{status}</span>
        </div>
      </div>
    </div>
    <button className="px-4 py-2 text-sm font-medium text-white bg-[#212f4a] rounded-lg hover:bg-[#2f436a] transition-colors border border-[#2f436a]">Manage</button>
  </div>
);

const MarketCard = ({ name, desc, logo, bg, invert }) => (
  <div className="bg-[#212f4a]/40 border border-[#212f4a] rounded-xl p-5 flex flex-col h-full hover:bg-[#212f4a] transition-all duration-200">
    <div className="flex justify-between items-start mb-4">
      <div className={`size-14 rounded-xl border border-[#2f436a] p-2.5 flex items-center justify-center ${bg}`}>
        <img src={logo} alt={name} className={`w-full h-full object-contain ${invert ? 'filter invert opacity-90' : ''}`} />
      </div>
    </div>
    <h4 className="text-white font-bold text-lg mb-2">{name}</h4>
    <p className="text-slate-400 text-sm mb-6 flex-1">{desc}</p>
    <button className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">Install</button>
  </div>
);

export default Integrations;
