import React from 'react';

const UploadModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all">
      <div className="absolute inset-0 bg-[#0d121c]/60 backdrop-blur-sm"></div>
      <div className="relative flex flex-col w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white">
          <div>
            <h2 className="text-[#0d121c] text-xl font-bold leading-tight tracking-tight">Upload New Asset</h2>
            <p className="text-sm text-gray-500 mt-1">Add 3D models to your organization's library</p>
          </div>
          <button onClick={onClose} className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Stepper */}
        <div className="bg-gray-50/50 px-8 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-2 text-primary font-medium">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <span>Upload File</span>
            </div>
            <span className="text-gray-300 mx-2">/</span>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs shadow-sm shadow-primary/30">2</div>
              <span>Metadata</span>
            </div>
            <span className="text-gray-300 mx-2">/</span>
            <div className="flex items-center gap-2 text-gray-400 font-medium">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 text-xs">3</div>
              <span>Review</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
          <div className="w-full lg:w-[320px] bg-gray-50/80 border-b lg:border-b-0 lg:border-r border-gray-100 p-6 flex flex-col gap-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider text-[10px] mb-1">Source File</h3>
            <div className="relative group w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center">
              <div className="text-center z-10">
                <span className="material-symbols-outlined text-4xl text-primary mb-2">view_in_ar</span>
                <p className="text-xs font-medium text-gray-500">mech_frame_v2.glb</p>
                <p className="text-[10px] text-gray-400">24.5 MB</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>Status</span>
              <span className="flex items-center gap-1 text-emerald-500 font-medium">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Uploaded
              </span>
            </div>
            <div className="h-px w-full bg-gray-200 my-2"></div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-gray-900 text-[10px] uppercase tracking-wider">Thumbnail (Optional)</h3>
              <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-[#ced7e8] px-4 py-8 bg-white hover:bg-gray-50 transition-colors cursor-pointer group/upload">
                <span className="material-symbols-outlined text-3xl text-gray-300 group-hover/upload:text-primary transition-colors">add_photo_alternate</span>
                <div className="text-center">
                  <p className="text-[#0d121c] text-xs font-bold leading-tight">Drag thumbnail here</p>
                  <p className="text-gray-500 text-[10px] mt-1">PNG, JPG, WEBP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white p-6 lg:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#0d121c]">Asset Details</h3>
                <p className="text-sm text-gray-500">Provide metadata to make this asset searchable.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col w-full">
                  <p className="text-[#0d121c] text-sm font-medium leading-normal pb-2">Asset Name <span className="text-red-500">*</span></p>
                  <input className="flex w-full rounded-lg border border-[#ced7e8] bg-[#f8f9fc] h-12 px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" defaultValue="Mech Frame Standard" />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-[#0d121c] text-sm font-medium leading-normal pb-2">SKU / ID</p>
                  <div className="relative">
                    <input className="flex w-full rounded-lg border border-[#ced7e8] bg-[#f8f9fc] h-12 px-4 text-sm" readOnly defaultValue="ASSET-2024-8842" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">lock</span>
                  </div>
                </div>
                <div className="flex flex-col w-full md:col-span-2">
                  <p className="text-[#0d121c] text-sm font-medium leading-normal pb-2">Category <span className="text-red-500">*</span></p>
                  <select className="flex w-full rounded-lg border border-[#ced7e8] bg-[#f8f9fc] h-12 px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none">
                    <option value="vehicles">Vehicles & Machinery</option>
                    <option value="environment">Environment & Architecture</option>
                  </select>
                </div>
                <div className="flex flex-col w-full md:col-span-2">
                  <p className="text-[#0d121c] text-sm font-medium leading-normal pb-2">Description</p>
                  <textarea className="flex w-full rounded-lg border border-[#ced7e8] bg-[#f8f9fc] min-h-[120px] p-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y" placeholder="Describe the visual style..." />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-white px-8 py-5">
          <button className="text-gray-500 hover:text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back
          </button>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors">Cancel</button>
            <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
              Next Step
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
