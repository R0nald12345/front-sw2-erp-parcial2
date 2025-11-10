"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoNotifications } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleRLine, RiChat1Fill } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

interface User {
  registro: number;
  nombre: string;
  correo: string;
  telefono: number;
  ci: number;
  rol: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storage = localStorage.getItem("auth-storage");
    if (storage) {
      try {
        const parsed = JSON.parse(storage);
        const userData = parsed.state?.user;
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error("Error al leer auth-storage:", err);
      }
    }
  }, []);

  
  return (
    <header className="bg-gradient-primary text-white h-16 px-6 flex items-center justify-between shadow-medium sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="text-2xl">📊</div>
        <div>
          <h1 className="font-bold text-lg">ERP System</h1>
          <p className="text-xs text-blue-100">Gestión Empresarial</p>
        </div>
      </div>

      <nav className="flex items-center gap-4">
        {/* Notificaciones */}
        <Menu
          menuButton={
            <MenuButton className="relative hover:bg-blue-700 p-2 rounded-lg transition-colors">
              <IoNotifications className="text-xl" />
              <span className="absolute -top-0.5 right-0 bg-red-500 text-white py-0.5 px-1.5 rounded-full text-xs font-bold animate-pulse">
                2
              </span>
            </MenuButton>
          }
          arrow
          align="end"
          transition
          menuClassName="bg-white shadow-lg rounded-lg border border-gray-200 p-0"
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-gray-900 font-semibold mb-0">
              Notificaciones (2)
            </h1>
          </div>
          {[1, 2].map((item) => (
            <MenuItem key={item} className="p-0 hover:bg-transparent">
              <Link
                href="/"
                className="text-gray-700 flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <RiChat1Fill className="text-lg bg-yellow-100 text-yellow-600 p-2 rounded-full" />
                <div className="text-sm flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Nuevo comentario</span>
                    <span className="text-xs text-gray-400">Hoy</span>
                  </div>
                  <p className="text-gray-500 text-xs">
                    {user?.nombre || "Alguien"} ha comentado tu publicación.
                  </p>
                </div>
              </Link>
            </MenuItem>
          ))}
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              href="/"
              className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors p-4 block text-center border-t border-gray-200"
            >
              Ver todas
            </Link>
          </MenuItem>
        </Menu>

        {/* Menú de usuario */}
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors">
              <span className="font-semibold text-sm">
                {user?.nombre?.split(" ")[0]?.toUpperCase() || "USUARIO"}
              </span>
              <FaAngleDown className="text-sm" />
            </MenuButton>
          }
          arrow
          align="end"
          transition
          menuClassName="bg-white shadow-lg rounded-lg border border-gray-200 p-0"
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              className="flex items-center gap-3 py-3 px-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              href="/perfil"
            >
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                {user?.nombre?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">
                  {user?.nombre || "Nombre"}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.correo || "correo@ejemplo.com"}
                </div>
              </div>
            </Link>
          </MenuItem>

          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              className="flex items-center gap-3 py-2 px-4 hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-200"
              href="/configuracion"
            >
              <IoMdSettings className="text-lg" />
              <span className="text-sm font-medium">Configuración</span>
            </Link>
          </MenuItem>

          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              className="flex items-center gap-3 py-2 px-4 hover:bg-red-50 transition-colors text-red-600 font-medium"
              href="/logout"
            >
              <RiLogoutCircleRLine className="text-lg" />
              <span className="text-sm">Cerrar Sesión</span>
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
