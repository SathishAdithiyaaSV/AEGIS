import React from 'react';
import { AppUser } from '../types';

interface AdminUsersModalProps {
  users: AppUser[];
  onClose: () => void;
}

const AdminUsersModal: React.FC<AdminUsersModalProps> = ({ users, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Registered Users</h2>
            <p className="text-sm text-slate-400">Admin-only view of all Aegis registrations.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="overflow-auto p-6">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                {['Name', 'Email', 'Phone', 'Profession', 'Organization', 'Role', 'Registered'].map((heading) => (
                  <th key={heading} className="px-3 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-3 py-3">{user.name}</td>
                  <td className="px-3 py-3">{user.email}</td>
                  <td className="px-3 py-3">{user.phoneCountryCode} {user.phoneNumber}</td>
                  <td className="px-3 py-3">{user.profession}</td>
                  <td className="px-3 py-3">{user.organization}</td>
                  <td className="px-3 py-3">{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td className="px-3 py-3">{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersModal;
