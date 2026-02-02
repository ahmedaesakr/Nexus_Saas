import React from 'react';

const users = [
  { id: 1, name: 'Sarah Jenkins', email: 'sarah@nexus.com', role: 'Admin', status: 'Active', lastActive: '2 mins ago', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIIPTxMOGSRnjCSM0H8q8CjTmo9rifaqSBdz6oB4Er3QgnASZaXuTNJjtTaz3HJaQfoTHSVTBnnDauqPewTsqSm4QNnHZY7S_g6WJ2KtHXKoF_zL-_4DBgy44F8U86qf-peNZiAQpu2vDMJdH_OXmTHbI_PAtgXZgdvte_xoKaJNZgRLlIXZtobDNwqfO6crK-2_3VDOe-fP5SR3CkkLsg-4VyFjVbAYVdljMXiHJA3QsEVnIcGyAHBxEaTAozox4pw0dzENKsEa0' },
  { id: 2, name: 'David Chen', email: 'david.c@nexus.com', role: 'Editor', status: 'Pending', lastActive: 'Invited 2d ago', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOl4a9PqVHGBHrpEfwYnLUcoMEhmO8NE_7SE3dHNIJ8Gjp6hzBUKg8TTEeXy4iUWoym_hUNc8j2sShfMyc06QwALch4E9rnrMpH7pjTIGsz8D47GBOZ-_xAB_H2YEIrBwOgJhtR5UEYTVxNNGNhFW1Z32oTqmQFETqtG9RduH0vIBahVkC6nFfvZVap6-6H4Pd5rh3GYnkW7KRqrSho7xh1rxzyZVUGWTen3O3yvqwxKYsYM8QiE6aVCQFVm1qATVdUNhIAMFmxeI' },
  { id: 3, name: 'Mina K.', email: 'mina@nexus.com', role: 'Viewer', status: 'Active', lastActive: '5 hours ago', initial: 'MK' },
  { id: 4, name: 'Lindsay Walton', email: 'lindsay@nexus.com', role: 'Editor', status: 'Inactive', lastActive: '1 month ago', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ1RBZiz6avPY3Zu0dQAK5bf3HuRRJ9-vECcIaACvfVWUTfQqMBZEn6GF7cmoclZUYhhoNLHXc5L4g_aRT5gwO2zBzeCY45aNcVTttoby1ueweuUjXtL0CZ8NDCmtZJRdHn96-60-r-WgFnM8FhIxRhlRoOZi9qslpXppMR7tvdDEpW7T68R6irtKeBeRgvZmMP0ooNTeTwUH8rKcgyn3453oaedZ-nRPNfHHg2jGejlsSKXHpH-K8rsS6GGKOl5RH3sAs5BgskHU' },
];

const UserManagement = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background-light">
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex-shrink-0">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <a className="hover:text-primary transition-colors" href="#">Settings</a>
          <span className="material-symbols-outlined !text-base text-gray-400">chevron_right</span>
          <span className="text-gray-900 font-medium">User Management</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Team Members</h2>
            <p className="text-sm text-gray-500 mt-1">Manage access to your 3D assets organization-wide.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95">
            <span className="material-symbols-outlined">add</span>
            Invite New User
          </button>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-gray-900" placeholder="Search by name, email or role..." type="text" />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined !text-lg text-gray-500">filter_list</span>
              Role
              <span className="material-symbols-outlined !text-lg text-gray-400">arrow_drop_down</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-8 pr-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user, idx) => (
                  <tr key={user.id} className={`group hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${idx === 0 ? 'bg-blue-50/50 border-primary' : 'border-transparent'}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <div className="h-10 w-10 rounded-full bg-cover bg-center border border-gray-200" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold border border-blue-200">{user.initial}</div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : user.role === 'Editor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Pending' ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm text-gray-700">{user.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">{user.lastActive}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">4</span> of <span className="font-medium text-gray-900">12</span> users</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded-md bg-white text-sm text-gray-500 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-gray-200 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>

        {/* Permissions Detail Panel */}
        <aside className="w-[400px] border-l border-gray-200 bg-white flex flex-col h-full shadow-xl z-10">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-start mb-4">
              <div className="h-16 w-16 rounded-full bg-cover bg-center ring-4 ring-white shadow-sm" style={{ backgroundImage: `url(${users[0].avatar})` }}></div>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{users[0].name}</h3>
              <p className="text-sm text-gray-500 mb-4">{users[0].email}</p>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Global Role</label>
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white text-gray-900 border">
                <option>Administrator</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              <PermissionGroup title="Asset Management" icon="folder_managed" permissions={[{ label: 'Upload Assets', desc: 'Can upload new 3D models and textures.', checked: true }, { label: 'Edit Metadata', desc: 'Can change tags, descriptions, and categories.', checked: true }, { label: 'Delete Assets', desc: 'Can permanently remove assets from the library.', checked: false }]} />
              <PermissionGroup title="Workflow & Review" icon="approval" permissions={[{ label: 'Submit for Review', checked: true }, { label: 'Approve Designs', desc: 'Can mark assets as approved for production.', checked: true }]} />
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <button className="flex-1 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">Save Changes</button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const PermissionGroup = ({ title, icon, permissions }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
    </div>
    <div className="space-y-3 pl-7">
      {permissions.map((p, idx) => (
        <label key={idx} className="flex items-start gap-3 cursor-pointer group">
          <input className="mt-0.5 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" type="checkbox" defaultChecked={p.checked} />
          <div className="text-sm">
            <p className="font-medium text-gray-700">{p.label}</p>
            {p.desc && <p className="text-xs text-gray-500">{p.desc}</p>}
          </div>
        </label>
      ))}
    </div>
  </div>
);

export default UserManagement;
