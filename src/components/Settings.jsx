import React from 'react';

const Settings = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f8f9fc]">
      <div className="w-full max-w-[1024px] mx-auto px-8 py-10 flex flex-col gap-8">
        <nav className="flex items-center space-x-2 text-sm">
          <a className="text-slate-500 hover:text-primary transition-colors font-medium" href="#">Home</a>
          <span className="text-slate-400">/</span>
          <a className="text-slate-500 hover:text-primary transition-colors font-medium" href="#">Settings</a>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Brand Kit</span>
        </nav>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="text-slate-500">Manage your organization's branding, workspace preferences, and global configuration.</p>
        </div>

        <div className="border-b border-slate-200">
          <nav className="-mb-px flex gap-8">
            <Tab label="General" />
            <Tab label="Brand Kit" active />
            <Tab label="Security" />
            <Tab label="Integrations" />
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <Section title="Brand Assets" desc="Upload your logo and favicon to personalize your workspace.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-slate-900">Company Logo</label>
                <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-10 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-[48px] text-slate-300 group-hover:text-primary transition-colors">cloud_upload</span>
                    <div className="mt-4 flex text-sm text-slate-600 justify-center">
                      <span className="font-semibold text-primary hover:text-primary/80">Upload a file</span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">SVG, PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-slate-900">Favicon</label>
                <div className="flex items-start gap-4 mt-1">
                  <div className="size-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined">image</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">Change</button>
                    <p className="text-xs text-slate-500">Recommended size 32x32px.</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Look & Feel" desc="Customize the color palette and typography for your tenant.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ColorPicker label="Primary Brand Color" color="#0D59F2" />
              <ColorPicker label="Secondary Brand Color" color="#10B981" />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-900">Interface Font</label>
                <select className="block w-full rounded-md border border-slate-300 py-2 pl-3 pr-10 text-slate-900 focus:ring-2 focus:ring-primary sm:text-sm bg-transparent">
                  <option>Inter (Default)</option>
                  <option>Roboto</option>
                </select>
              </div>
            </div>
          </Section>

          <Section title="Custom Subdomain" desc="Configure the URL your team uses to access Nexus.">
            <div className="max-w-xl">
              <label className="block text-sm font-medium text-slate-900">Workspace URL</label>
              <div className="mt-2 flex rounded-md shadow-sm">
                <input className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border border-slate-300 py-2 pl-3 text-slate-900 focus:ring-2 focus:ring-primary sm:text-sm bg-transparent" defaultValue="acme-corp" />
                <span className="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 text-slate-500 sm:text-sm">.nexus-dam.com</span>
              </div>
            </div>
          </Section>

          <div className="flex items-center justify-end gap-3 pt-4 pb-12">
            <button className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors">Cancel</button>
            <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tab = ({ label, active }) => (
  <a className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${active ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`} href="#">
    {label}
  </a>
);

const Section = ({ title, desc, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const ColorPicker = ({ label, color }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-slate-900">{label}</label>
    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-primary overflow-hidden">
      <div className="flex items-center px-3 bg-slate-50 border-r border-slate-300">
        <div className="h-4 w-4 rounded-full shadow-sm ring-1 ring-black/10" style={{ backgroundColor: color }}></div>
      </div>
      <input className="block w-full border-0 bg-transparent py-2 pl-3 text-slate-900 focus:ring-0 sm:text-sm" defaultValue={color} />
    </div>
  </div>
);

export default Settings;
