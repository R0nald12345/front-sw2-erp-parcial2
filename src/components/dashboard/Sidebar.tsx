"use client";

import { RiAlignRight } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { FaSheetPlastic, FaChalkboardUser, FaPeopleGroup } from "react-icons/fa6";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCalendarCheck, BiTask, BiGroup } from "react-icons/bi";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [rol, setRol] = useState<string>("");
  const pathname = usePathname();

  // Leer rol desde localStorage solo en el cliente
  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth-storage");
      if (raw) {
        const parsed = JSON.parse(raw);
        const userRol = parsed?.state?.user?.rol || "";
        setRol(userRol);
        console.log("🎯 ROL desde localStorage:", userRol);
      }
    } catch (err) {
      console.error("Error al leer el rol:", err);
    }
  }, []);

  const menuItems = [
    { icon: MdDashboard, text: "Inicio", path: "" },
    { icon: MdDashboard, text: "Empresa", path: "" },
    { 
      icon: FaPeopleGroup, 
      text: "planificación", 
      path: "planificacion",
      submenu: [
        { icon: BiCalendarCheck, text: "Cronograma", path: "planificacion/cronograma" },
        { icon: BiTask, text: "Actividades", path: "planificacion/actividades" },
        { icon: BiGroup, text: "Asignaciones", path: "planificacion/asignaciones" },
        { icon: FaChalkboardUser, text: "Supervisión", path: "planificacion/supervision" }
      ]
    },
  ];



  // Función para manejar la expansión de submenús
  const toggleSubmenu = (itemText: string) => {
    setExpandedItems(prev => 
      prev.includes(itemText) 
        ? prev.filter(item => item !== itemText)
        : [...prev, itemText]
    );
  };

  // Función para verificar si un item está activo (incluyendo submenús)
  const isItemActive = (item: any) => {
    const fullPath = item.path === "" ? "/dashboard" : `/dashboard/${item.path}`;
    if (pathname === fullPath) return true;
    
    // Verificar si algún submenú está activo
    if (item.submenu) {
      return item.submenu.some((subitem: any) => 
        pathname === `/dashboard/${subitem.path}`
      );
    }
    return false;
  };

  return (
    <>
      <div
        className={`fixed lg:static w-[280px] top-0 z-50 h-full transition-all duration-300 ${
          sidebar ? "left-0" : "-left-full lg:left-0"
        } bg-blue-900 text-white flex flex-col border-r border-blue-800`}
      >
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold text-center">LOGO</h1>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isExpanded = expandedItems.includes(item.text);
              const isActive = isItemActive(item);

              return (
                <li key={index}>
                  {/* Item principal */}
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.text)}
                      className={`w-full flex items-center justify-between px-6 py-3 text-lg transition-colors hover:bg-blue-800 ${
                        isActive ? "bg-blue-800 border-r-4 border-blue-400" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="text-xl" />
                        <span className="ml-3">{item.text}</span>
                      </div>
                      {isExpanded ? (
                        <FaChevronDown className="text-sm" />
                      ) : (
                        <FaChevronRight className="text-sm" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.path === "" ? "/dashboard" : `/dashboard/${item.path}`}
                      className={`flex items-center px-6 py-3 text-lg transition-colors hover:bg-blue-800 ${
                        isActive ? "bg-blue-800 border-r-4 border-blue-400" : ""
                      }`}
                      onClick={() => setSidebar(false)}
                    >
                      <Icon className="text-xl" />
                      <span className="ml-3">{item.text}</span>
                    </Link>
                  )}

                  {/* Submenú */}
                  {hasSubmenu && isExpanded && (
                    <ul className="bg-blue-800 border-l-4 border-blue-600 ml-6">
                      {item.submenu.map((subitem: any, subIndex: number) => {
                        const SubIcon = subitem.icon;
                        const subPath = `/dashboard/${subitem.path}`;
                        const isSubActive = pathname === subPath;

                        return (
                          <li key={subIndex}>
                            <Link
                              href={subPath}
                              className={`flex items-center px-6 py-2 text-base transition-colors hover:bg-blue-700 ${
                                isSubActive ? "bg-blue-700 border-r-4 border-blue-300" : ""
                              }`}
                              onClick={() => setSidebar(false)}
                            >
                              <SubIcon className="text-lg" />
                              <span className="ml-3">{subitem.text}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebar(false)}
        />
      )}
    </>
  );
};

export default Sidebar;