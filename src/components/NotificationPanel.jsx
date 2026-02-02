import React from 'react';

const NotificationPanel = ({ onClose }) => {
  return (
    <aside className="absolute top-2 right-2 bottom-2 w-full max-w-[420px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-100 overflow-hidden transform animate-in slide-in-from-right duration-300">
      <div className="flex-none flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notifications</h2>
          <div className="flex items-center justify-center bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full border border-primary/20">3 New</div>
        </div>
        <div className="flex items-center gap-1">
          <button className="text-xs font-semibold text-slate-500 hover:text-primary px-3 py-2 rounded-lg hover:bg-slate-50 transition-all mr-1">Mark all as read</button>
          <button onClick={onClose} className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="px-4 pt-4 pb-2 flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Today</span>
          <div className="h-px bg-slate-100 flex-1"></div>
        </div>

        <NotificationItem
          title="Asset Approved"
          desc={<><span className="font-medium text-slate-900 underline underline-offset-2">Sneaker_V2.gltf</span> was approved for production by Sarah Jenkins.</>}
          time="2m ago"
          icon="check_circle"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          unread
        />

        <NotificationItem
          title="New Comment"
          desc={<><span className="font-medium text-slate-900">Mike Ross</span> commented on <span className="font-medium text-slate-900 underline underline-offset-2">Engine_Block_3D</span></>}
          time="1h ago"
          icon="person"
          iconColor="text-primary"
          iconBg="bg-blue-50"
          unread
          comment="Can we check the reflection map on the top surface?"
        />

        <NotificationItem
          title="Asset Rejected"
          desc={<><span className="font-medium text-slate-900 underline underline-offset-2">Texture_Pack_04</span> was rejected by QA Team.</>}
          time="3h ago"
          icon="cancel"
          iconColor="text-red-600"
          iconBg="bg-red-50"
          unread
          badge="Polygon count too high"
        />
      </div>

      <div className="flex-none p-4 border-t border-slate-100 bg-slate-50">
        <button className="group w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:text-primary hover:border-primary/30 transition-all">
          <span>View all notifications</span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
};

const NotificationItem = ({ title, desc, time, icon, iconColor, iconBg, unread, comment, badge }) => (
  <div className="group relative flex gap-4 p-4 mx-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-200 bg-white mb-3">
    {unread && <div className="absolute right-3 top-3 size-2.5 bg-primary rounded-full shadow-sm ring-2 ring-white"></div>}
    <div className="relative flex-none">
      <div className={`size-11 rounded-full ${iconBg} flex items-center justify-center ${iconColor} ring-1 ring-inset ring-black/5`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
    <div className="flex flex-col gap-1 pr-4 min-w-0">
      <p className="text-[15px] font-semibold text-slate-900 leading-tight">{title}</p>
      <p className="text-sm text-slate-600 leading-snug">{desc}</p>
      {comment && (
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-1.5">
          <p className="text-xs text-slate-500 italic line-clamp-2">"{comment}"</p>
        </div>
      )}
      {badge && (
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-50 border border-red-100">
          <span className="material-symbols-outlined text-[14px] text-red-500">warning</span>
          <span className="text-xs font-medium text-red-700">{badge}</span>
        </div>
      )}
      <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">schedule</span> {time}
      </p>
    </div>
  </div>
);

export default NotificationPanel;
