"use client";

import { RiAlignRight } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { BiPieChart, BiSearch } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  path: string;
}

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: MdDashboard, text: "Inicio", path: "inicio" },
    { icon: MdDashboard, text: "Empresa", path: "empresa" },
    { icon: MdDashboard, text: "Oferta Trabajo", path: "oferta-trabajo" },
    { icon: MdDashboard, text: "Postulaciones", path: "postulaciones" },
    { icon: MdDashboard, text: "Entrevista", path: "entrevista" },
    { icon: MdDashboard, text: "Evaluaciones", path: "evaluaciones" },
    { icon: FaProjectDiagram, text: "Clustering", path: "clustering" },
    { icon: BiPieChart, text: "KPI Entrevistas", path: "entrevistas-kpi" },
    { icon: BiSearch, text: "Búsqueda de KPI", path: "kpi-busqueda" },
    { icon: MdDashboard, text: "Reportes", path: "reporte" },
  ];

  const isItemActive = (item: MenuItem) => {
    const current = (pathname || "").replace(/\/$/, "");
    const fullPath = `/dashboard/${item.path}`.replace(/\/$/, "");
    return current === fullPath;
  };

  return (
    <>
      <div
        className={`fixed lg:static w-[280px] top-0 z-50 h-full transition-all duration-300 ${
          sidebar ? "left-0" : "-left-full lg:left-0"
        } bg-blue-900 text-white flex flex-col border-r border-blue-800`}
      >
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold text-center">RRHH</h1>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = isItemActive(item);

              return (
                <li key={index}>
                  <Link
                    href={`/dashboard/${item.path}`}
                    className={`flex items-center px-6 py-3 text-lg transition-colors hover:bg-blue-800 ${
                      isActive ? "bg-blue-800 border-r-4 border-blue-400" : ""
                    }`}
                    onClick={() => setSidebar(false)}
                  >
                    <Icon className="text-xl" />
                    <span className="ml-3">{item.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <button
        onClick={() => setSidebar(!sidebar)}
        className="lg:hidden fixed top-4 left-4 bg-blue-900 p-2 text-white rounded-lg text-xl z-50 shadow-lg"
      >
        {sidebar ? <IoMdClose /> : <RiAlignRight />}
      </button>

      {sidebar && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebar(false)} />
      )}
    </>
  );
};

export default Sidebar;
