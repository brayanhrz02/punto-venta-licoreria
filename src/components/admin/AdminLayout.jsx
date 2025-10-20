import React from 'react';
import { Home, Package, BarChart3, Users, Settings, Bell, RefreshCw, LogOut, Download } from 'lucide-react';

const AdminLayout = ({ currentView, setCurrentView, children }) => {
    const navItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'orders', icon: Package, label: 'Pedidos' },
        { id: 'inventory', icon: BarChart3, label: 'Inventario' },
        { id: 'customers', icon: Users, label: 'Clientes' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* BARRA LATERAL */}
            <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-amber-900/30 p-6 z-20">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                        🥃 Admin Panel
                    </h1>
                    <p className="text-amber-600 text-sm">Licorería Premium</p>
                </div>
                <nav className="space-y-2">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrentView(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                                    currentView === item.id
                                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                                        : 'text-amber-400 hover:bg-slate-700'
                                }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
                <div className="absolute bottom-6 left-6 right-6">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/30 rounded-xl font-semibold transition">
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="ml-64 p-8">
                {/* CABECERA DINÁMICA */}
                <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-6 mb-8 shadow-2xl border border-amber-600">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-amber-100">
                                {currentView === 'dashboard' ? 'Bienvenido de nuevo, Admin' : navItems.find(i => i.id === currentView)?.label}
                            </h2>
                            <p className="text-amber-300">
                                {currentView === 'dashboard' ? 'Aquí está el resumen de tu negocio hoy' : 'Gestiona tus datos'}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition">
                                <Bell className="text-amber-400" size={24} />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                            </button>
                            <button className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition">
                                <Settings className="text-amber-400" size={24} />
                            </button>
                            <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition">
                                <RefreshCw size={18} />
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>

                {children} {/* Aquí se renderizarán las vistas específicas */}
            </div>
        </div>
    );
};

export default AdminLayout;