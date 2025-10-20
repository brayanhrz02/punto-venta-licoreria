import React, { memo } from 'react';
import { Plus, Minus, Edit, Trash2 } from 'lucide-react';

const InventoryView = memo(({ products, updateProductStock }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
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
));

export default InventoryView;