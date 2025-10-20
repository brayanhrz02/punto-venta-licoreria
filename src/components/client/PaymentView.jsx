import React, { memo } from 'react';
import { CreditCard, Check } from 'lucide-react';

const PaymentView = memo(({
                              setCurrentView,
                              cart,
                              getTotal,
                              paymentMethod,
                              setPaymentMethod,
                              handlePayment
                          }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 p-4">
        <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border-2 border-amber-900/50">
                <h2 className="text-4xl font-bold mb-6 text-amber-100 flex items-center gap-3">
                    <CreditCard className="text-amber-400" size={36} />
                    Método de Pago
                </h2>
                <div className="space-y-4 mb-8">
                    {[
                        { id: 'cash', name: 'Efectivo', icon: '💵', desc: 'Pago contra entrega' },
                        { id: 'card', name: 'Tarjeta', icon: '💳', desc: 'Crédito o débito' },
                        { id: 'transfer', name: 'Transferencia', icon: '🏦', desc: 'SPEI o transferencia bancaria' }
                    ].map(method => (
                        <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                                paymentMethod === method.id
                                    ? 'border-amber-500 bg-amber-900/30 shadow-lg shadow-amber-500/20'
                                    : 'border-amber-900/30 bg-slate-700/30 hover:border-amber-700'
                            }`}
                        >
                            <span className="text-5xl">{method.icon}</span>
                            <div className="flex-1 text-left">
                                <span className="text-2xl font-bold text-amber-100 block">{method.name}</span>
                                <span className="text-amber-400 text-sm">{method.desc}</span>
                            </div>
                            {paymentMethod === method.id && (
                                <Check className="text-amber-400" size={32} />
                            )}
                        </button>
                    ))}
                </div>
                <div className="bg-slate-700/50 p-6 rounded-2xl mb-6 border border-amber-900/30">
                    <h3 className="font-bold text-xl mb-4 text-amber-100">Resumen del Pedido</h3>
                    <div className="space-y-3 mb-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-amber-200">
                                <span>{item.name} x{item.quantity}</span>
                                <span className="font-bold">${item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t-2 border-amber-900/50 pt-4 flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-100">Total:</span>
                        <span className="text-3xl font-bold text-amber-400">${getTotal()}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setCurrentView('customer-info')}
                        className="flex-1 bg-slate-700 text-amber-200 py-4 rounded-xl font-bold text-lg hover:bg-slate-600 transition"
                    >
                        Volver
                    </button>
                    <button
                        onClick={handlePayment}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition shadow-xl"
                    >
                        Confirmar Pedido
                    </button>
                </div>
            </div>
        </div>
    </div>
));

export default PaymentView;