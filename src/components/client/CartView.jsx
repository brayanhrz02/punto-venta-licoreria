import React, { memo } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

const CartView = memo(({ cart, setCurrentView, updateQuantity, removeFromCart, getTotal, handleCheckout }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 p-4">
        <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border-2 border-amber-900/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold text-amber-100 flex items-center gap-3">
                        <ShoppingCart className="text-amber-400" size={36} />
                        Tu Carrito
                    </h2>
                    <button onClick={() => setCurrentView('menu')} className="text-amber-400 font-bold hover:text-amber-300 transition">
                        ← Volver al Catálogo
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="text-center py-16">
                        <ShoppingCart size={80} className="mx-auto text-amber-800 mb-6" />
                        <p className="text-amber-300 text-xl">Tu carrito está vacío</p>
                        <p className="text-amber-500 mt-2">Explora nuestro catálogo premium</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 mb-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-4 bg-slate-700/50 p-5 rounded-2xl border border-amber-900/30 hover:border-amber-700 transition">
                                    <div className="text-5xl">{item.image}</div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-amber-100">{item.name}</h3>
                                        <p className="text-amber-300 text-sm">{item.description}</p>
                                        <p className="text-amber-500 font-bold text-xl mt-1">${item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="bg-slate-600 p-2 rounded-full hover:bg-slate-500 transition"
                                        >
                                            <Minus size={20} className="text-amber-200" />
                                        </button>
                                        <span className="font-bold text-2xl w-10 text-center text-amber-100">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="bg-amber-600 p-2 rounded-full hover:bg-amber-700 transition shadow-lg"
                                        >
                                            <Plus size={20} className="text-white" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-300 transition"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-amber-900/50 pt-6">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-3xl font-bold text-amber-100">Total:</span>
                                <span className="text-4xl font-bold text-amber-400">${getTotal()}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-5 rounded-2xl font-bold text-xl hover:from-amber-700 hover:to-amber-800 transition shadow-2xl"
                            >
                                Proceder al Pago
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
));

export default CartView;