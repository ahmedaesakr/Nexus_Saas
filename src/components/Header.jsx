import React from 'react';

const Header = ({ title, breadcrumbs }) => {
  return (
    <header className="h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
      <div className="flex flex-col">
        {breadcrumbs && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span>{crumb}</span>
                {idx < breadcrumbs.length - 1 && (
                  <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 mt-1">
          <h2 className="text-lg font-bold text-slate-900 leading-none">{title}</h2>
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
  );
};

export default Header;
