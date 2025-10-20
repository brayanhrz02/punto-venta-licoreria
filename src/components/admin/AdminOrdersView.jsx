import React, { memo } from 'react';
import { Search, Eye, MessageCircle, XCircle, Package, Users, Plus, Minus } from 'lucide-react';

const OrdersView = memo(({
                             filteredOrders,
                             searchTerm,
                             setSearchTerm,
                             filterStatus,
                             setFilterStatus,
                             dateRange,
                             setDateRange,
                             getStatusColor,
                             updateOrderStatus,
                             selectedOrder,
                             setSelectedOrder
                         }) => (
    <div className="space-y-6">

        {/* --- ENCABEZADO DE GESTIÓN DE PEDIDOS REINTEGRADO --- */}
        {/*
        Nota: Este bloque fue eliminado en la refactorización anterior porque AdminLayout ya maneja el título.
        Lo reinsertamos aquí para que el texto aparezca.
        Si usaste el código de AdminPanel original, este bloque estaba presente.
        */}
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-bold text-amber-100">Gestión de Pedidos</h2>
                <p className="text-amber-400">Administra todos los pedidos</p>
            </div>
        </div>
        {/* ---------------------------------------------------- */}

        <div className="bg-slate-800 rounded-2xl p-6 border border-amber-900/30 shadow-xl">
            {/* --- FILTROS Y BÚSQUEDA --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-4 top-3 text-amber-600" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por ID o cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-slate-700 border border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100"
                >
                    <option value="all">Todos los Estados</option>
                    <option value="preparing">Preparando</option>
                    <option value="ready">Listo</option>
                    <option value="delivering">En Camino</option>
                    <option value="delivered">Entregados</option>
                    <option value="cancelled">Cancelados</option>
                </select>
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-3 bg-slate-700 border border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100"
                >
                    <option value="today">Hoy</option>
                    <option value="week">Esta Semana</option>
                    <option value="month">Este Mes</option>
                    <option value="all">Todos</option>
                </select>
            </div>
        </div>

        {/* --- TABLA DE PEDIDOS --- */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden border border-amber-900/30 shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-900 border-b border-amber-900/30">
                    <tr>
                        <th className="px-6 py-4 text-left text-amber-100 font-bold">ID Pedido</th>
                        <th className="px-6 py-4 text-left text-amber-100 font-bold">Cliente</th>
                        <th className="px-6 py-4 text-left text-amber-100 font-bold">Fecha</th>
                        <th className="px-6 py-4 text-left text-amber-100 font-bold">Total</th>
                        <th className="px-6 py-4 text-left text-amber-100 font-bold">Estado</th>
                        <th className="px-6 py-4 text-left text-amber-100 font-bold">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                            <td className="px-6 py-4 text-amber-100 font-semibold">{order.id}</td>
                            <td className="px-6 py-4 text-amber-200">{order.customer}</td>
                            <td className="px-6 py-4 text-amber-400 text-sm">{order.date}</td>
                            <td className="px-6 py-4 text-amber-100 font-bold">${order.total}</td>
                            <td className="px-6 py-4">
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-semibold cursor-pointer appearance-none`}
                                >
                                    <option value="preparing">Preparando</option>
                                    <option value="ready">Listo</option>
                                    <option value="delivering">En Camino</option>
                                    <option value="delivered">Entregado</option>
                                    <option value="cancelled">Cancelado</option>
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        title="Ver detalles"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                        title="Chat"
                                    >
                                        <MessageCircle size={16} />
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        title="Cancelar"
                                    >
                                        <XCircle size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* --- MODAL DE DETALLES DEL PEDIDO (se mantiene) --- */}
        {selectedOrder && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border-2 border-amber-600 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-amber-100">Detalles del Pedido #{selectedOrder.id}</h3>
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="text-amber-400 hover:text-amber-300 transition"
                        >
                            <XCircle size={28} />
                        </button>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-700/50 p-4 rounded-xl border border-amber-900/30">
                            <h4 className="font-bold text-amber-100 mb-3 flex items-center gap-2">
                                <Users className="text-amber-400" size={20} />
                                Información del Cliente
                            </h4>
                            <div className="space-y-2 text-amber-200">
                                <p><span className="font-semibold text-amber-400">Nombre:</span> {selectedOrder.customer}</p>
                                <p><span className="font-semibold text-amber-400">Edad:</span> {selectedOrder.age} años ✓</p>
                                <p><span className="font-semibold text-amber-400">Teléfono:</span> {selectedOrder.phone}</p>
                                <p><span className="font-semibold text-amber-400">Dirección:</span> {selectedOrder.address}</p>
                            </div>
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-xl border border-amber-900/30">
                            <h4 className="font-bold text-amber-100 mb-3 flex items-center gap-2">
                                <Package className="text-amber-400" size={20} />
                                Productos
                            </h4>
                            <div className="space-y-2">
                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-amber-200">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span className="font-bold">${item.price * item.quantity}</span>
                                    </div>
                                ))}
                                <div className="border-t border-amber-900/50 pt-2 flex justify-between text-amber-100 font-bold text-lg">
                                    <span>Total:</span>
                                    <span className="text-amber-400">${selectedOrder.total}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-xl border border-amber-900/30">
                            <h4 className="font-bold text-amber-100 mb-3">Actualizar Estado</h4>
                            <select
                                value={selectedOrder.status}
                                onChange={(e) => {
                                    updateOrderStatus(selectedOrder.id, e.target.value);
                                    setSelectedOrder({ ...selectedOrder, status: e.target.value });
                                }}
                                className="w-full px-4 py-3 bg-slate-600 border border-amber-800 rounded-xl text-amber-100 font-semibold focus:border-amber-500 focus:outline-none"
                            >
                                <option value="preparing">Preparando</option>
                                <option value="ready">Listo para Envío</option>
                                <option value="delivering">En Camino</option>
                                <option value="delivered">Entregado</option>
                                <option value="cancelled">Cancelado</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 transition shadow-lg"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
));

export default OrdersView;