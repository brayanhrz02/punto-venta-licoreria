import React, { memo } from 'react';
import { Users } from 'lucide-react';

const CustomersView = memo(({ customers }) => (
    <div className="space-y-6">
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
));

export default CustomersView;