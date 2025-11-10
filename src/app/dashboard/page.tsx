'use client';

import Link from 'next/link';
import { FaBuilding, FaBriefcase, FaUserTie, FaVideo, FaTrophy, FaChartBar } from 'react-icons/fa';

interface MenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Empresas',
    description: 'Gestiona todas tus empresas registradas',
    icon: <FaBuilding size={32} />,
    href: '/dashboard/empresa',
    color: 'bg-gradient-primary',
  },
  {
    title: 'Ofertas de Trabajo',
    description: 'Crea y gestiona tus ofertas laborales',
    icon: <FaBriefcase size={32} />,
    href: '/dashboard/oferta-trabajo',
    color: 'bg-gradient-success',
  },
  {
    title: 'Postulaciones',
    description: 'Revisa todas las postulaciones recibidas',
    icon: <FaUserTie size={32} />,
    href: '/dashboard/postulaciones',
    color: 'bg-gradient-warning',
  },
  {
    title: 'Entrevistas',
    description: 'Programa y gestiona tus entrevistas',
    icon: <FaVideo size={32} />,
    href: '/dashboard/entrevista',
    color: 'bg-gradient-danger',
  },
  {
    title: 'Evaluaciones',
    description: 'Evalúa el desempeño de los candidatos',
    icon: <FaTrophy size={32} />,
    href: '/dashboard/evaluaciones',
    color: 'text-purple-600',
  },
  {
    title: 'Reportes',
    description: 'Visualiza análisis y reportes',
    icon: <FaChartBar size={32} />,
    href: '/dashboard/reporte',
    color: 'text-blue-600',
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-4 md:mx-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
            🎯 Panel de Control
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Bienvenido al Sistema de Gestión Empresarial. Selecciona una opción para comenzar a trabajar.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="card-modern group cursor-pointer h-full transition-all duration-300 hover:shadow-large hover:scale-105">
                <div className={`${item.color} text-white p-6 rounded-t-lg mb-4 flex items-center justify-center`}>
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Acceder
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Empresas', value: '0', icon: '🏢' },
            { label: 'Ofertas Activas', value: '0', icon: '📋' },
            { label: 'Postulaciones', value: '0', icon: '📤' },
            { label: 'Entrevistas', value: '0', icon: '🎥' },
          ].map((stat, index) => (
            <div key={index} className="card-modern p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

