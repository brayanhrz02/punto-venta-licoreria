import React, { memo } from 'react';
import { DollarSign, TrendingUp, Package, Clock, AlertCircle, CheckCircle, BarChart3, Download } from 'lucide-react';

const AdminDashboardView = memo(({ stats, products, orders }) => (
    <div className="space-y-6">
        <div className="flex justify-end items-center">
            <button className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition shadow-lg">
                <Download size={20} />
                Exportar Reporte
            </button>
        </div>

        {/* --- TARJETAS DE RESUMEN --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition">
                <div className="flex items-center justify-between mb-4">
                    <DollarSign size={40} />
                    <TrendingUp size={24} className="text-green-200" />
                </div>
                <h3 className="text-3xl font-bold mb-1">${stats.totalSales.toLocaleString()}</h3>
                <p className="text-green-200">Ventas Totales</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition">
                <div className="flex items-center justify-between mb-4">
                    <Package size={40} />
                    <TrendingUp size={24} className="text-blue-200" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stats.totalOrders}</h3>
                <p className="text-blue-200">Pedidos Totales</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition">
                <div className="flex items-center justify-between mb-4">
                    <Clock size={40} />
                    <AlertCircle size={24} className="text-purple-200" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stats.pendingOrders}</h3>
                <p className="text-purple-200">Pedidos Pendientes</p>
            </div>
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition">
                <div className="flex items-center justify-between mb-4">
                    <CheckCircle size={40} />
                    <TrendingUp size={24} className="text-amber-200" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stats.completedOrders}</h3>
                <p className="text-amber-200">Completados Hoy</p>
            </div>
        </div>

        {/* --- GRÁFICOS Y ACTIVIDAD --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Productos Más Vendidos */}
            <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6 border border-amber-900/30 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-amber-100 flex items-center gap-2">
                        <BarChart3 className="text-amber-400" />
                        Productos Más Vendidos
                    </h3>
                    <select className="bg-slate-700 text-amber-100 px-4 py-2 rounded-lg border border-amber-800 focus:border-amber-500 focus:outline-none">
                        <option>Esta Semana</option>
                        <option>Este Mes</option>
                        <option>Este Año</option>
                    </select>
                </div>
                <div className="space-y-4">
                    {products.sort((a, b) => b.sales - a.sales).slice(0, 5).map((product, idx) => (
                        <div key={product.id} className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                                idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-slate-400' : idx === 2 ? 'bg-amber-700' : 'bg-slate-600'
                            }`}>
                                {idx + 1}
                            </div>
                            <div className="text-3xl">{product.image}</div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-amber-100">{product.name}</h4>
                                <p className="text-sm text-amber-400">{product.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-amber-100">{product.sales} ventas</p>
                                <p className="text-sm text-amber-400">${(product.price * product.sales).toLocaleString()}</p>
                            </div>
                            <div className="w-32 bg-slate-700 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all"
                                    style={{ width: `${(product.sales / 70) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Actividad Reciente */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-amber-900/30 shadow-xl">
                <h3 className="text-xl font-bold text-amber-100 mb-6 flex items-center gap-2">
                    <Clock className="text-amber-400" />
                    Actividad Reciente
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orders.slice(0, 8).map(order => (
                        <div key={order.id} className="flex items-start gap-3 pb-3 border-b border-slate-700 last:border-0">
                            {/* eslint-disable-next-line no-undef */}
                            <div className={`${getStatusColor(order.status)} w-3 h-3 rounded-full mt-1.5 flex-shrink-0`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-amber-100 font-semibold text-sm truncate">{order.customer}</p>
                                <p className="text-amber-400 text-xs">Pedido #{order.id}</p>
                                <p className="text-amber-500 text-xs mt-1">{order.date}</p>
                            </div>
                            <p className="text-amber-100 font-bold text-sm">${order.total}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
));

export default AdminDashboardView;