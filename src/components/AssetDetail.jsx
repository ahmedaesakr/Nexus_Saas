import React from 'react';

const AssetDetail = ({ rejected }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Library</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span>Furniture</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span>Chairs</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-lg font-bold text-slate-900 leading-none">Ergonomic Chair V2</h2>
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-slate-600 text-xs font-medium hover:bg-gray-200 transition-colors">
                v2.4
                <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download
          </button>
          <div className="h-8 w-px bg-gray-200 mx-1"></div>
          <button className="size-9 flex items-center justify-center text-slate-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      {rejected && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3 flex items-center gap-3 shrink-0">
          <span className="material-symbols-outlined text-red-600 text-[20px] shrink-0">error</span>
          <p className="text-sm font-medium text-red-800">This asset was rejected. Please review the feedback and upload a new version.</p>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* 3D Canvas Area */}
        <div className="flex-1 relative p-6 flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl border border-gray-300/50 shadow-inner flex items-center justify-center relative group/canvas overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <img alt="3D Render of Ergonomic Chair" className="max-h-[70%] max-w-[80%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBphTCy6r6oGi7itIZGDHzxspdMED32EBVupuAopf7UBFhuGR-eFYwZBKmHPADO0Q3NT0vYVG51xqNY3pJLnFKEZCDRemYVHWTkpZIGQ1kLRJofa_syHd8ryio85aTUehdl8OsqvQ1U1pB8z-A2QOr7ZDhks8d1D4ZvLydZWawhvShp30K7UnFXrn6BaRV33b_-Pm2-W4RXfY7FRR-4Rz6tV0vRhQ9ryUou4OwnwCnyaaE_x4cDVw9Nbv03_GzSB_q8ikKN2llQfjo" />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-300">
              <button className="p-2 rounded-full hover:bg-gray-100 text-slate-600" title="Rotate">
                <span className="material-symbols-outlined text-[20px]">3d_rotation</span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-slate-600" title="Pan">
                <span className="material-symbols-outlined text-[20px]">drag_pan</span>
              </button>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <button className="p-2 rounded-full hover:bg-gray-100 text-slate-600" title="Zoom Out">
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
              <span className="text-xs font-mono text-slate-500 w-8 text-center">100%</span>
              <button className="p-2 rounded-full hover:bg-gray-100 text-slate-600" title="Zoom In">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <button className="p-2 rounded-full hover:bg-gray-100 text-slate-600" title="Fullscreen">
                <span className="material-symbols-outlined text-[20px]">fullscreen</span>
              </button>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <button className="px-3 py-1.5 bg-white/80 backdrop-blur rounded shadow-sm text-xs font-medium text-slate-600 border border-gray-200 hover:bg-white">Wireframe</button>
              <button className="px-3 py-1.5 bg-white/80 backdrop-blur rounded shadow-sm text-xs font-medium text-slate-600 border border-gray-200 hover:bg-white">Lighting</button>
            </div>
          </div>
        </div>

        {/* Detail Sidebar */}
        <aside className="w-80 lg:w-[340px] bg-white border-l border-gray-200 flex flex-col shrink-0 z-10 shadow-xl shadow-gray-200/50">
          <div className="flex border-b border-gray-200">
            <button className="flex-1 py-3 text-sm font-medium text-primary border-b-2 border-primary">
              {rejected ? 'Feedback & Revision' : 'Activity'}
            </button>
            <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Metadata</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            {rejected ? (
              <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
                <div className="mt-0.5 text-red-600">
                  <span className="material-symbols-outlined text-[20px]">cancel</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-900">Asset Rejected</h4>
                  <p className="text-xs text-red-700 mt-1">Please address the feedback issues below and upload a revised version.</p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-100 flex items-start gap-3">
                <div className="mt-0.5 text-orange-600">
                  <span className="material-symbols-outlined text-[20px]">pending</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-orange-900">Pending Review</h4>
                  <p className="text-xs text-orange-700 mt-1">This asset requires approval from the design lead before publishing.</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {rejected ? 'Reviewer Feedback' : 'Discussion'}
                </h3>
                <span className="text-xs text-slate-400">{rejected ? '2 issues' : '3 comments'}</span>
              </div>

              {rejected ? (
                <>
                  <FeedbackItem author="Sarah Jenkins" time="20m ago" text="Texture resolution too low on the armrests. Please bump to 4K." avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAjTjnV3_2KwBoE3FNrVmOuYS7gz8DL9JbNy-tYvxjHEZUAL4nSi0VPKwTUhLI4b_hUYrqUCCWpbyIwCvnzLxmc-srj_PFyNBbgqqhnHSk4CkL1kOP3pu33wbymeWZDbcImNlsRFjVis20lpVO0_RwpkNHIlzgFvcyNUv1Faj51KRKwwWu-jaeeR4Cet8RhIVnW05NMYK-rnpUAv6Y0E-5GW_uteUQBOJDHr9o0RwD9TFTSrLSkELUVEkpIs5cStTASSPIYDAAW62Y" issue="Texture Resolution" />
                  <FeedbackItem author="Sarah Jenkins" time="18m ago" text="Missing normal maps for the base stitching." avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAjTjnV3_2KwBoE3FNrVmOuYS7gz8DL9JbNy-tYvxjHEZUAL4nSi0VPKwTUhLI4b_hUYrqUCCWpbyIwCvnzLxmc-srj_PFyNBbgqqhnHSk4CkL1kOP3pu33wbymeWZDbcImNlsRFjVis20lpVO0_RwpkNHIlzgFvcyNUv1Faj51KRKwwWu-jaeeR4Cet8RhIVnW05NMYK-rnpUAv6Y0E-5GW_uteUQBOJDHr9o0RwD9TFTSrLSkELUVEkpIs5cStTASSPIYDAAW62Y" issue="Normal Maps" />
                </>
              ) : (
                <Comment author="Sarah Jenkins" time="2h ago" text="Can we smooth out the mesh on the armrest? It looks a bit jagged in the wireframe view." avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAjTjnV3_2KwBoE3FNrVmOuYS7gz8DL9JbNy-tYvxjHEZUAL4nSi0VPKwTUhLI4b_hUYrqUCCWpbyIwCvnzLxmc-srj_PFyNBbgqqhnHSk4CkL1kOP3pu33wbymeWZDbcImNlsRFjVis20lpVO0_RwpkNHIlzgFvcyNUv1Faj51KRKwwWu-jaeeR4Cet8RhIVnW05NMYK-rnpUAv6Y0E-5GW_uteUQBOJDHr9o0RwD9TFTSrLSkELUVEkpIs5cStTASSPIYDAAW62Y" />
              )}

              <div className="flex items-center gap-4">
                <div className="h-px bg-gray-100 flex-1"></div>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Version 2.4 Uploaded</span>
                <div className="h-px bg-gray-100 flex-1"></div>
              </div>

              <Comment author="Mike Thompson" time="1h ago" text="Fixed the armrest geometry and updated the normal maps. Let me know if this works!" avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBFvGZLgGFxJ0AjpsOykKdUYscPTqySaedQTyY2E66eI78lTI5j_hWofHYheYgNdDVMgcRvjVOfNmdf_1YWWNhPrk-l3Go43L-0RskEdCye0D61V5tZm73nxfGOanbWjiaKxjTjA_lobCo6gANJIdWCIS9l20DafieGdvCgqp2n_UMLJ4NltXdvyGGvg7p821TWnp0HBwGLiN-S3AwNJQ_tmrBl_GD8phfji_C42HUCmB5xFjgO4z2WdF6FPUlv15paSdU9Uj8plvM" highlight />
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <label className="block relative mb-4">
              <input className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-all" placeholder={rejected ? "Reply to feedback..." : "Add a comment..."} type="text" />
              <button className="absolute right-2 top-2 p-1 text-primary hover:bg-primary/10 rounded">
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-300 text-slate-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                {rejected ? 'Message Reviewer' : 'Request Changes'}
              </button>
              <button className={`flex items-center justify-center px-4 py-2.5 rounded-lg text-white text-sm font-bold shadow-md transition-colors ${rejected ? 'bg-primary hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                {rejected ? 'Upload Revision' : 'Approve Asset'}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const Comment = ({ author, time, text, avatar, highlight }) => (
  <div className="flex gap-3">
    <div className="size-8 rounded-full bg-gray-200 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${avatar})` }}></div>
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-slate-900">{author}</span>
        <span className="text-[10px] text-slate-400">{time}</span>
      </div>
      <div className={`p-3 rounded-lg rounded-tl-none border ${highlight ? 'bg-primary/5 border-primary/10 text-slate-700' : 'bg-gray-50 border-gray-100 text-slate-600'}`}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  </div>
);

const FeedbackItem = ({ author, time, text, avatar, issue }) => (
  <div className="flex gap-3">
    <div className="size-8 rounded-full bg-gray-200 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${avatar})` }}></div>
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-slate-900">{author}</span>
        <span className="text-[10px] text-slate-400">{time}</span>
      </div>
      <div className="bg-red-50 p-3 rounded-lg rounded-tl-none border border-red-100">
        <p className="text-sm text-slate-800"><span className="font-semibold text-red-700">Issue:</span> {text}</p>
      </div>
    </div>
  </div>
);

export default AssetDetail;
