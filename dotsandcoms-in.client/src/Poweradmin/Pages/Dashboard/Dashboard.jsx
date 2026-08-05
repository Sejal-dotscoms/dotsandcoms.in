import { useEffect, useState } from "react";
import { getBlogs } from "../../../services/blogService";

export default function Dashboard() {
  const [totalBlogs, setTotalBlogs] = useState(null);

  useEffect(() => {
    getBlogs({ page: 1, pageSize: 1 })
      .then((res) => setTotalBlogs(res?.totalCount ?? 0))
      .catch(() => setTotalBlogs("—"));
  }, []);

  const cards = [
    {
      label: "Total Blogs",
      value: totalBlogs,
      color: "#dc2626",
      icon: (
        <svg viewBox="0 0 22 22" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="3" width="18" height="16" rx="2" />
          <path d="M6 8h10M6 12h7" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome to Poweradmin. Use the sidebar to manage content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: card.color + "18", color: card.color }}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-0.5">
                {card.value === null ? (
                  <span className="inline-block w-8 h-4 bg-gray-100 rounded animate-pulse" />
                ) : (
                  card.value
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
