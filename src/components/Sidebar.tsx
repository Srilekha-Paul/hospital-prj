"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Patients", path: "/patients" },
    { name: "Lab", path: "/lab" },
    { name: "Pharmacy", path: "/pharmacy" },
    { name: "Billing", path: "/billing" },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-5">
      <h1 className="text-xl font-bold mb-8">🏥 Smart Hospital</h1>
      <ul className="space-y-4">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={`block p-2 rounded ${
                pathname === item.path ? "bg-blue-600" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}