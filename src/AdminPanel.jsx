import React, { useState, useEffect, useCallback } from 'react';
import {
    Package, DollarSign, Users, TrendingUp, Clock, CheckCircle,
    XCircle, Search, BarChart3, AlertCircle, MessageCircle, Eye,
    Edit, Trash2, Download, RefreshCw, Settings, Bell, LogOut,
    Home, Plus, Minus, Menu, X, LogIn
} from 'lucide-react';

const AdminPanel = ({ orders: propOrders, updateOrderStatusAdmin }) => {
    // --- ESTADOS DE LAYOUT y VISTAS ---
    const [currentView, setCurrentView] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Inicialización responsiva de la barra lateral
    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // --- ESTADO DE DATOS (CRUCIAL: Pedidos estáticos) ---
    const [orders, setOrders] = useState([
        { id: 'LIC-001', customer: 'Juan Pérez', total: 1299, status: 'delivered', date: '2025-10-15 14:30', items: [{ name: 'Zacapa 23', quantity: 1, price: 1299 }], phone: '272-123-4567', address: 'Av. Principal 123, Col. Centro', age: 28 },
        { id: 'LIC-002', customer: 'María González', total: 689, status: 'delivering', date: '2025-10-15 15:45', items: [{ name: 'Johnnie Walker Black', quantity: 1, price: 689 }], phone: '272-987-6543', address: 'Calle Reforma 456, Col. Norte', age: 32 },
        { id: 'LIC-003', customer: 'Carlos Ramírez', total: 1448, status: 'preparing', date: '2025-10-15 16:20', items: [{ name: 'Grey Goose', quantity: 1, price: 1199 }, { name: 'Absolut', quantity: 1, price: 249 }], phone: '272-555-1234', address: 'Blvd. Cristóbal Colón 789', age: 25 },
        { id: 'LIC-004', customer: 'Ana Martínez', total: 899, status: 'ready', date: '2025-10-15 17:00', items: [{ name: 'Don Julio Reposado', quantity: 1, price: 899 }], phone: '272-444-5678', address: 'Av. Juárez 234', age: 30 },
        { id: 'LIC-005', customer: 'Roberto Silva', total: 1098, status: 'preparing', date: '2025-10-15 17:15', items: [{ name: 'Patrón Silver', quantity: 1, price: 1099 }], phone: '272-333-9012', address: 'Calle Madero 567', age: 35 }
    ]);

    // Sincronización de pedidos si vienen de props
    useEffect(() => {
        if (propOrders) {
            setOrders(prevOrders => [...propOrders, ...prevOrders.filter(o => !propOrders.some(p => p.id === o.id))]);
        }
    }, [propOrders]);

    const [products, setProducts] = useState([
        { id: 1, name: 'Johnnie Walker Black Label', price: 689, stock: 15, category: 'Whisky', sales: 45, image: '🥃' },
        { id: 2, name: 'Jack Daniels', price: 549, stock: 22, category: 'Whisky', sales: 67, image: '🥃' },
        { id: 3, name: 'Zacapa Centenario 23', price: 1299, stock: 8, category: 'Ron', sales: 23, image: '🍹' },
        { id: 4, name: 'Grey Goose', price: 1199, stock: 12, category: 'Vodka', sales: 34, image: '🍸' },
        { id: 5, name: 'Don Julio Reposado', price: 899, stock: 18, category: 'Tequila', sales: 56, image: '🌵' },
        { id: 6, name: 'Havana Club 7 Años', price: 459, stock: 25, category: 'Ron', sales: 42, image: '🍹' },
        { id: 7, name: 'Absolut Original', price: 449, stock: 30, category: 'Vodka', sales: 51, image: '🍸' },
        { id: 8, name: 'Hennessy VS', price: 999, stock: 10, category: 'Brandy', sales: 28, image: '🍷' }
    ]);
    const [customers] = useState([
        { id: 1, name: 'Juan Pérez', orders: 12, total: 15600, lastOrder: '2025-10-15', email: 'juan@email.com' },
        { id: 2, name: 'María González', orders: 8, total: 9800, lastOrder: '2025-10-15', email: 'maria@email.com' },
        { id: 3, name: 'Carlos Ramírez', orders: 15, total: 18900, lastOrder: '2025-10-15', email: 'carlos@email.com' },
        { id: 4, name: 'Ana Martínez', orders: 6, total: 7200, lastOrder: '2025-10-14', email: 'ana@email.com' },
        { id: 5, name: 'Roberto Silva', orders: 10, total: 12500, lastOrder: '2025-10-13', email: 'roberto@email.com' },
        { id: 6, name: 'Laura Fernández', orders: 5, total: 6800, lastOrder: '2025-10-12', email: 'laura@email.com' }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateRange, setDateRange] = useState('today');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // --- CÁLCULOS y FUNCIONES ---
    const stats = {
        totalSales: orders.reduce((sum, order) => sum + order.total, 0),
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'preparing' || o.status === 'delivering' || o.status === 'ready').length,
        completedOrders: orders.filter(o => o.status === 'delivered').length
    };

    const getStatusColor = useCallback((status) => {
        const colors = {
            pending: 'bg-gray-500', validating: 'bg-yellow-500', preparing: 'bg-blue-500',
            ready: 'bg-indigo-500', delivering: 'bg-purple-500', delivered: 'bg-green-500', cancelled: 'bg-red-500'
        };
        return colors[status] || 'bg-gray-500';
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        if (updateOrderStatusAdmin) {
            updateOrderStatusAdmin(orderId, newStatus);
        }
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({...selectedOrder, status: newStatus});
        }
    };

    const updateProductStock = (productId, change) => {
        setProducts(products.map(product =>
            product.id === productId ? { ...product, stock: Math.max(0, product.stock + change) } : product
        ));
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // --- VISTAS INTERNAS (DEBES DEJAR ESTAS FUNCIONES COMPLETAS EN TU ARCHIVO) ---
    const DashboardView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-amber-100">Dashboard</h2>
                    <p className="text-amber-400">Vista general de tu negocio</p>
                </div>
                <button className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition shadow-lg">
                    <Download size={20} />
                    Exportar Reporte
                </button>
            </div>
            {/* Tarjetas de Resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-4 text-white shadow-xl transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign size={32} />
                        <TrendingUp size={20} className="text-green-200" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">${stats.totalSales.toLocaleString()}</h3>
                    <p className="text-green-200 text-sm">Ventas Totales</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 text-white shadow-xl transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <Package size={32} />
                        <TrendingUp size={20} className="text-blue-200" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stats.totalOrders}</h3>
                    <p className="text-blue-200 text-sm">Pedidos Totales</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-4 text-white shadow-xl transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <Clock size={32} />
                        <AlertCircle size={20} className="text-purple-200" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stats.pendingOrders}</h3>
                    <p className="text-purple-200 text-sm">Pedidos Pendientes</p>
                </div>
                <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-4 text-white shadow-xl transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-4">
                        <CheckCircle size={32} />
                        <TrendingUp size={20} className="text-amber-200" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stats.completedOrders}</h3>
                    <p className="text-amber-200 text-sm">Completados Hoy</p>
                </div>
            </div>
            {/* Gráficos y Actividad Reciente */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6 border border-amber-900/30 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-amber-100 flex items-center gap-2">
                            <BarChart3 className="text-amber-400" />
                            Productos Más Vendidos
                        </h3>
                        <select className="bg-slate-700 text-amber-100 px-3 py-1 rounded-lg border border-amber-800 focus:border-amber-500 focus:outline-none text-sm">
                            <option>Esta Semana</option>
                            <option>Este Mes</option>
                            <option>Este Año</option>
                        </select>
                    </div>
                    <div className="space-y-4">
                        {products.sort((a, b) => b.sales - a.sales).slice(0, 5).map((product, idx) => (
                            <div key={product.id} className="flex items-center gap-4 flex-wrap sm:flex-nowrap justify-between">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${
                                        idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-slate-400' : idx === 2 ? 'bg-amber-700' : 'bg-slate-600'
                                    }`}>
                                        {idx + 1}
                                    </div>
                                    <div className="text-3xl flex-shrink-0">{product.image}</div>
                                    <div className="flex-1 min-w-0 truncate">
                                        <h4 className="font-semibold text-amber-100 truncate">{product.name}</h4>
                                        <p className="text-sm text-amber-400">{product.category}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 sm:flex hidden sm:items-center sm:gap-4">
                                    <div className="hidden lg:block w-32 bg-slate-700 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all"
                                            style={{ width: `${(product.sales / 70) * 100}%` }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-amber-100">{product.sales} ventas</p>
                                        <p className="text-sm text-amber-400">${(product.price * product.sales).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 sm:hidden">
                                    <p className="font-bold text-amber-100">{product.sales} ventas</p>
                                    <p className="text-sm text-amber-400">${(product.price * product.sales).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6 border border-amber-900/30 shadow-xl">
                    <h3 className="text-xl font-bold text-amber-100 mb-6 flex items-center gap-2">
                        <Clock className="text-amber-400" />
                        Actividad Reciente
                    </h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {orders.slice(0, 8).map(order => (
                            <div key={order.id} className="flex items-start gap-3 pb-3 border-b border-slate-700 last:border-0">
                                <div className={`${getStatusColor(order.status)} w-3 h-3 rounded-full mt-1.5 flex-shrink-0`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-amber-100 font-semibold text-sm truncate">{order.customer}</p>
                                    <p className="text-amber-400 text-xs">Pedido #{order.id}</p>
                                    <p className="text-amber-500 text-xs mt-1">{order.date}</p>
                                </div>
                                <p className="text-amber-100 font-bold text-sm flex-shrink-0">${order.total}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const OrdersView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-amber-100">Gestión de Pedidos</h2>
                    <p className="text-amber-400">Administra todos los pedidos</p>
                </div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-amber-900/30 shadow-xl">
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

                    {/* DIAGNÓSTICO: Mensaje si el array está vacío */}
                    {filteredOrders.length === 0 && (
                        <div className="p-8 text-center text-amber-400">
                            <AlertCircle size={30} className="mx-auto mb-3" />
                            <p className="font-semibold text-lg">
                                No se encontraron pedidos con los filtros actuales.
                            </p>
                            <p className="text-sm mt-1">
                                Intenta limpiar la búsqueda o cambiar el estado del filtro.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL DE DETALLES DEL PEDIDO (se mantiene) */}
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
    );

    const InventoryView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-amber-100">Inventario</h2>
                    <p className="text-amber-400">Gestiona tus productos y stock</p>
                </div>
                <button className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition shadow-lg">
                    <Plus size={20} />
                    Agregar Producto
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-amber-900/30 hover:border-amber-700 transition shadow-xl">
                        <div className="text-6xl text-center mb-4">{product.image}</div>
                        <h3 className="font-bold text-lg text-amber-100 mb-2">{product.name}</h3>
                        <p className="text-amber-400 text-sm mb-3">{product.category}</p>
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-amber-300 text-sm">Precio:</span>
                                <span className="text-amber-100 font-bold text-lg">${product.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-amber-300 text-sm">Stock:</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateProductStock(product.id, -1)}
                                        className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        product.stock < 10 ? 'bg-red-600 text-white' :
                                            product.stock < 20 ? 'bg-yellow-600 text-white' :
                                                'bg-green-600 text-white'
                                    }`}>
                                        {product.stock}
                                    </span>
                                    <button
                                        onClick={() => updateProductStock(product.id, 1)}
                                        className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-amber-300 text-sm">Ventas:</span>
                                <span className="text-amber-100 font-semibold">{product.sales}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="flex-1 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1"
                            >
                                <Edit size={16} />
                                <span className="text-sm">Editar</span>
                            </button>
                            <button className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-1">
                                <Trash2 size={16} />
                                <span className="text-sm">Eliminar</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const CustomersView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-amber-100">Clientes</h2>
                    <p className="text-amber-400">Base de datos de clientes</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map(customer => (
                    <div key={customer.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-amber-900/30 hover:border-amber-700 transition shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                {customer.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-100 text-lg">{customer.name}</h3>
                                <p className="text-amber-400 text-sm">Cliente VIP</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-amber-200">
                            <p className="flex justify-between">
                                <span>Pedidos:</span>
                                <span className="font-bold text-amber-100">{customer.orders}</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Total Comprado:</span>
                                <span className="font-bold text-amber-400">${customer.total.toLocaleString()}</span>
                            </p>
                            <p className="flex justify-between text-sm">
                                <span>Último Pedido:</span>
                                <span>{customer.lastOrder}</span>
                            </p>
                        </div>
                        <button className="w-full mt-4 bg-amber-600 text-white py-2 rounded-xl font-semibold hover:bg-amber-700 transition">
                            Ver Historial
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );


    // --- RENDERIZADO PRINCIPAL ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Overlay para móvil (cierra el menú al hacer clic fuera) */}
            {isSidebarOpen && window.innerWidth < 1024 && (
                <div
                    className="fixed inset-0 bg-black/50 z-20"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* ------------------------------------------- */}
            {/* 1. BARRA LATERAL (fixed) */}
            {/* ------------------------------------------- */}
            <div
                className={`
                    fixed left-0 top-0 h-full w-64 p-4 z-30 transition-all duration-300 ease-in-out
                    bg-gradient-to-b from-slate-900 to-slate-800 border-r border-amber-900/30
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 
                    lg:block
                `}
            >
                {/* Botón para cerrar (X) - Visible en móvil */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-amber-400 p-2 rounded-full hover:bg-slate-700 z-40 lg:hidden"
                >
                    <X size={24} />
                </button>

                <div className="mb-8 pt-2">
                    <h1 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                        🥃 Admin Panel
                    </h1>
                    <p className="text-amber-600 text-sm">Licorería Premium</p>
                </div>
                <nav className="space-y-2">
                    {[
                        { id: 'dashboard', icon: Home, label: 'Dashboard' },
                        { id: 'orders', icon: Package, label: 'Pedidos' },
                        { id: 'inventory', icon: BarChart3, label: 'Inventario' },
                        { id: 'customers', icon: Users, label: 'Clientes' }
                    ].map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setCurrentView(item.id);
                                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                }}
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
                <div className="absolute bottom-6 left-4 right-4">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/30 rounded-xl font-semibold transition">
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* BOTÓN DE MENÚ (HAMBURGUESA) FLOTANTE */}
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-30 p-3 bg-amber-600 rounded-full text-white shadow-lg hover:bg-amber-700 lg:hidden"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* ------------------------------------------- */}
            {/* 2. CONTENIDO PRINCIPAL (ml-64 solo en Desktop) */}
            {/* ------------------------------------------- */}
            <div className={`p-4 lg:p-8 min-h-screen transition-all duration-300 ease-in-out ml-0 lg:ml-64`}>

                {/* CABECERA Y BOTONES DE CONTROL (AHORA FIJOS EN SU POSICIÓN) */}
                <div className="relative"> {/* Quitamos sticky top-0 z-10 */}
                    <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-6 mb-8 shadow-2xl border border-amber-600 mt-14 lg:mt-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-amber-100">Bienvenido de nuevo, Admin</h2>
                                <p className="text-amber-300">Aquí está el resumen de tu negocio hoy</p>
                            </div>
                            {/* Botones de Cabecera (Asegurando que no se desborden) */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                <button className="relative p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition hidden sm:block">
                                    <Bell className="text-amber-400" size={20} />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                                </button>
                                <button className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition hidden sm:block">
                                    <Settings className="text-amber-400" size={20} />
                                </button>
                                <button className="flex items-center gap-1 sm:gap-2 bg-amber-600 text-white px-3 py-2 rounded-full hover:bg-amber-700 transition text-sm flex-shrink-0">
                                    <RefreshCw size={16} />
                                    <span className="hidden sm:inline">Actualizar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Contenido (Vistas) */}
                {currentView === 'dashboard' && <DashboardView />}
                {currentView === 'orders' && <OrdersView />}
                {currentView === 'inventory' && <InventoryView />}
                {currentView === 'customers' && <CustomersView />}
            </div>
        </div>
    );
};

export default AdminPanel;