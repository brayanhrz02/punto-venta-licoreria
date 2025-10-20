import React, { memo } from 'react';
// Importamos TODOS los íconos necesarios
import { Clock, Check, User, MessageCircle, Package, AlertCircle } from 'lucide-react';

// DICCIONARIO para mapear el nombre del ícono (string) a su componente real
const LucideIcons = { Clock, Check, AlertCircle, Package };

const ProcessingView = memo(({
                                 getStatusInfo,
                                 orderNumber,
                                 orderStatus,
                                 customerInfo,
                                 deliveryTime,
                                 cart,
                                 getTotal,
                                 paymentMethod,
                                 chatMessages,
                                 newMessage,
                                 setNewMessage,
                                 sendMessage,
                                 resetOrder
                             }) => {
    // Usamos orderStatus para obtener la información correcta
    const statusInfo = getStatusInfo(orderStatus);

    // Mapeamos el nombre del ícono a su componente. Usamos AlertCircle como fallback de seguridad.
    const StatusIcon = LucideIcons[statusInfo.icon] || AlertCircle;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 p-4">
            <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border-2 border-amber-900/50">
                    <div className="text-center mb-8">
                        <div className={`${statusInfo.color} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                            {/* Renderizamos el componente del ícono */}
                            {StatusIcon && <StatusIcon size={64} className="text-white" />}
                        </div>
                        <h2 className="text-4xl font-bold mb-2 text-amber-100">Pedido #{orderNumber}</h2>
                        <p className="text-2xl text-amber-300">{statusInfo.text}</p>
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            {['validating', 'preparing', 'ready', 'delivering', 'delivered'].map((status, idx) => (
                                <div key={status} className="flex-1 flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                                        ['validating', 'preparing', 'ready', 'delivering', 'delivered'].indexOf(orderStatus) >= idx
                                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50 scale-110'
                                            : 'bg-slate-600 text-slate-400'
                                    }`}>
                                        {idx + 1}
                                    </div>
                                    {idx < 4 && (
                                        <div className={`flex-1 h-2 mx-2 rounded-full transition-all ${
                                            ['validating', 'preparing', 'ready', 'delivering', 'delivered'].indexOf(orderStatus) > idx
                                                ? 'bg-amber-500 shadow-lg shadow-amber-500/30'
                                                : 'bg-slate-600'
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-amber-400 font-semibold px-2">
                            <span>Validando</span>
                            <span>Preparando</span>
                            <span>Listo</span>
                            <span>En Camino</span>
                            <span>Entregado</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-slate-700/50 p-6 rounded-2xl border border-amber-900/30">
                            <h3 className="font-bold text-xl mb-4 text-amber-100 flex items-center gap-2">
                                <User size={24} className="text-amber-400" />
                                Información de Entrega
                            </h3>
                            <div className="space-y-3 text-amber-200">
                                <p><span className="font-semibold text-amber-400">Nombre:</span> {customerInfo.name}</p>
                                <p><span className="font-semibold text-amber-400">Edad:</span> {customerInfo.age} años ✓</p>
                                <p><span className="font-semibold text-amber-400">Teléfono:</span> {customerInfo.phone}</p>
                                <p><span className="font-semibold text-amber-400">Dirección:</span> {customerInfo.address}</p>
                                <p className="flex items-center gap-2">
                                    <Clock size={18} className="text-amber-400" />
                                    <span className="font-semibold text-amber-400">Tiempo estimado:</span> {deliveryTime} min
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-700/50 p-6 rounded-2xl border border-amber-900/30">
                            <h3 className="font-bold text-xl mb-4 text-amber-100 flex items-center gap-2">
                                <Package size={24} className="text-amber-400" />
                                Tu Pedido
                            </h3>
                            <div className="space-y-3 text-amber-200">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between">
                                        <span className="text-sm">{item.image} {item.name} x{item.quantity}</span>
                                        <span className="font-bold">${item.price * item.quantity}</span>
                                    </div>
                                ))}
                                <div className="border-t-2 border-amber-900/50 pt-3 flex justify-between font-bold text-lg">
                                    <span className="text-amber-100">Total:</span>
                                    <span className="text-amber-400">${getTotal()}</span>
                                </div>
                                <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-700">
                                    <p className="text-amber-300 text-sm font-semibold">💳 Método de pago: {
                                        paymentMethod === 'cash' ? 'Efectivo' :
                                            paymentMethod === 'card' ? 'Tarjeta' : 'Transferencia'
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-700/50 p-6 rounded-2xl border border-amber-900/30">
                        <h3 className="font-bold text-xl mb-4 text-amber-100 flex items-center gap-2">
                            <MessageCircle size={24} className="text-amber-400" />
                            Chat con el Vendedor
                        </h3>
                        <div className="bg-slate-800 rounded-xl p-4 mb-4 h-56 overflow-y-auto">
                            {chatMessages.length === 0 ? (
                                <p className="text-amber-500 text-center py-12">No hay mensajes aún. ¿Necesitas algo?</p>
                            ) : (
                                <div className="space-y-3">
                                    {chatMessages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-xs px-5 py-3 rounded-2xl shadow-lg ${
                                                msg.sender === 'customer'
                                                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                                                    : 'bg-slate-700 text-amber-100 border border-amber-900/30'
                                            }`}>
                                                <p className="text-sm">{msg.text}</p>
                                                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage, 'customer')} // Corregido: Pasar mensaje y emisor
                                placeholder="Escribe un mensaje..."
                                className="flex-1 px-5 py-3 bg-slate-800 border-2 border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100"
                            />
                            <button
                                onClick={() => sendMessage(newMessage, 'customer')} // Corregido: Pasar mensaje y emisor
                                className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 transition shadow-lg"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>

                    {orderStatus === 'delivered' && (
                        <div className="mt-8">
                            <div className="bg-green-900/30 border-2 border-green-500 rounded-2xl p-6 mb-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Check size={48} className="text-green-400" />
                                    <div>
                                        <h3 className="text-2xl font-bold text-green-300">¡Pedido Entregado!</h3>
                                        <p className="text-green-400">Gracias por tu compra. Disfruta responsablemente.</p>
                                    </div>
                                </div>
                                <p className="text-amber-300 text-sm">⚠️ Recuerda: Consumo responsable. No conducir bajo los efectos del alcohol.</p>
                            </div>
                            <button
                                onClick={resetOrder}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 rounded-2xl font-bold text-xl hover:from-green-700 hover:to-green-800 transition shadow-2xl"
                            >
                                ✨ Realizar Nuevo Pedido
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ProcessingView;