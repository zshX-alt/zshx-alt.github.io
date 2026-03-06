import React, { useState, useEffect } from 'react';

export default function NekoDashboard() {
  const [mastery, setMastery] = useState(0);

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-black text-indigo-500">NEKO-SENSEI DASHBOARD</h1>
      <div className="mt-6 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <p className="text-sm text-slate-500 mb-2">PROGRESS Master: {mastery}/1500</p>
        <div className="h-4 w-full bg-black rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all" style={{width: `${(mastery/1500)*100}%`}}></div>
        </div>
      </div>
    </div>
  );
}
