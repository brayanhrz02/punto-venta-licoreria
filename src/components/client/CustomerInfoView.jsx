import React, { memo } from 'react';
import { AlertCircle } from 'lucide-react';

const CustomerInfoView = memo(({
                                   setCurrentView,
                                   customerInfo,
                                   setCustomerInfo,
                                   deliveryTime,
                                   setDeliveryTime,
                                   handleCustomerSubmit
                               }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 p-4">
        <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border-2 border-amber-900/50">
                <h2 className="text-4xl font-bold mb-2 text-amber-100">Información de Entrega</h2>
                <div className="bg-red-900/30 border border-red-500 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <AlertCircle className="text-red-400" size={24} />
                    <p className="text-red-200 font-semibold">Verificación de edad requerida. Debes ser mayor de 18 años.</p>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-amber-200 font-bold mb-2 text-lg">Nombre Completo</label>
                        <input
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-700 border-2 border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 text-lg"
                            placeholder="Juan Pérez García"
                        />
                    </div>
                    <div>
                        <label className="block text-amber-200 font-bold mb-2 text-lg">Edad</label>
                        <input
                            type="number"
                            value={customerInfo.age}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, age: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-700 border-2 border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 text-lg"
                            placeholder="Ej: 25"
                            min="18"
                        />
                        <p className="text-amber-400 text-sm mt-2">⚠️ Debes ser mayor de 18 años</p>
                    </div>
                    <div>
                        <label className="block text-amber-200 font-bold mb-2 text-lg">Teléfono</label>
                        <input
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-700 border-2 border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 text-lg"
                            placeholder="272-123-4567"
                        />
                    </div>
                    <div>
                        <label className="block text-amber-200 font-bold mb-2 text-lg">Dirección de Entrega</label>
                        <textarea
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-700 border-2 border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 text-lg"
                            rows="3"
                            placeholder="Calle, número, colonia, referencias..."
                        />
                    </div>
                    <div>
                        <label className="block text-amber-200 font-bold mb-2 text-lg">Tiempo de Entrega Estimado</label>
                        <select
                            value={deliveryTime}
                            onChange={(e) => setDeliveryTime(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-700 border-2 border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 text-lg"
                        >
                            <option value="45">45 minutos</option>
                            <option value="60">1 hora</option>
                            <option value="90">1.5 horas</option>
                            <option value="120">2 horas</option>
                        </select>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setCurrentView('cart')}
                            className="flex-1 bg-slate-700 text-amber-200 py-4 rounded-xl font-bold text-lg hover:bg-slate-600 transition"
                        >
                            Volver
                        </button>
                        <button
                            onClick={handleCustomerSubmit}
                            className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition shadow-xl"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

export default CustomerInfoView;