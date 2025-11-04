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
    <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-end bg-white shadow-sm">
      <nav className="flex items-center gap-2">
        {/* Notificaciones */}
        <Menu
          menuButton={
            <MenuButton className="relative hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <IoNotifications className="text-xl" />
              <span className="absolute -top-0.5 right-0 bg-red-500 text-white py-0.5 px-1.5 rounded-full text-xs font-bold">
                2
              </span>
            </MenuButton>
          }
          arrow
          align="end"
          transition
          menuClassName="bg-white shadow-lg rounded-lg border p-4 min-w-[300px]"
        >
          <h1 className="text-gray-900 text-center font-medium mb-4">
            Notificaciones (3)
          </h1>
          <hr className="mb-4 border-gray-200" />
          {[1, 2, 3].map((item) => (
            <MenuItem key={item} className="p-0 hover:bg-transparent">
              <Link
                href="/"
                className="text-gray-700 flex items-center gap-4 py-2 px-4 hover:bg-gray-50 transition-colors rounded-lg w-full"
              >
                <RiChat1Fill className="p-2 bg-yellow-100 text-yellow-600 box-content rounded-full" />
                <div className="text-sm flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span>Nuevo comentario</span>
                    <span className="text-xs text-gray-500">Hoy</span>
                  </div>
                  <p className="text-gray-500 text-xs">
                    {user?.nombre || "Alguien"} ha comentado tu publicación.
                  </p>
                </div>
              </Link>
            </MenuItem>
          ))}
          <hr className="my-4 border-gray-200" />
          <MenuItem className="p-0 hover:bg-transparent flex justify-center">
            <Link
              href="/"
              className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors"
            >
              Todas las notificaciones
            </Link>
          </MenuItem>
        </Menu>

        {/* Menú de usuario */}
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <span className="font-bold text-gray-700">
                {user?.nombre?.split(" ")[0]?.toUpperCase() || "USUARIO"}
              </span>
              <FaAngleDown className="text-gray-600" />
            </MenuButton>
          }
          arrow
          align="end"
          transition
          menuClassName="bg-white shadow-lg rounded-lg border p-4 min-w-[200px]"
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              className="rounded-lg transition-colors hover:bg-gray-50 flex items-center gap-4 py-2 px-4 w-full"
              href="/perfil"
            >
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-gray-700">
                  {user?.nombre || "Nombre"}
                </span>
                <span className="text-xs text-gray-500">
                  {user?.correo || "correo@ejemplo.com"}
                </span>
              </div>
            </Link>
          </MenuItem>

          <hr className="my-4 border-gray-200" />

          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              className="rounded-lg transition-colors hover:bg-gray-50 flex items-center gap-4 py-2 px-4 w-full text-gray-700"
              href="/configuracion"
            >
              <IoMdSettings />
              <span>Configuración</span>
            </Link>
          </MenuItem>

          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              className="rounded-lg transition-colors hover:bg-red-50 flex items-center gap-4 py-2 px-4 w-full"
              href="/logout"
            >
              <RiLogoutCircleRLine className="text-red-600" />
              <span className="text-red-600 font-semibold">Cerrar Sesión</span>
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
