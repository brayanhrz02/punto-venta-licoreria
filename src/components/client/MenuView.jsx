import React, { memo } from 'react';
import { ShoppingCart, Search, Plus, Wine, AlertCircle } from 'lucide-react';

const MenuView = memo(({
                           cart,
                           setCurrentView,
                           searchTerm,
                           setSearchTerm,
                           categories,
                           selectedCategory,
                           setSelectedCategory,
                           filteredProducts,
                           addToCart
                       }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900">
            <div className="bg-gradient-to-r from-amber-900 to-amber-800 shadow-2xl sticky top-0 z-10 border-b-4 border-amber-600">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="bg-red-900/30 border-2 border-red-500 rounded-xl p-3 mb-4 flex items-center gap-3">
                        <AlertCircle className="text-red-400" size={24} />
                        <p className="text-red-200 font-semibold">⚠️ Venta prohibida a menores de 18 años. Beber con responsabilidad.</p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-amber-100 flex items-center gap-3">
                                <Wine size={40} className="text-amber-300" />
                                Licorería Premium
                            </h1>
                            <p className="text-amber-200 mt-1">Las mejores bebidas espirituosas a domicilio</p>
                        </div>
                        <button
                            onClick={() => setCurrentView('cart')}
                            className="relative bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-full font-bold hover:from-amber-700 hover:to-amber-800 transition shadow-lg flex items-center gap-3"
                        >
                            <ShoppingCart size={24} />
                            Carrito
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg animate-pulse">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-4 top-4 text-amber-600" size={24} />
                        <input
                            type="text"
                            placeholder="Buscar whisky, ron, vodka..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-4 py-4 bg-white/95 border-2 border-amber-600 rounded-full focus:border-amber-400 focus:outline-none text-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm border-b border-amber-800 sticky top-48 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
                    <div className="flex gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all shadow-lg ${
                                    selectedCategory === cat.id
                                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white scale-105'
                                        : 'bg-slate-700 text-amber-200 hover:bg-slate-600'
                                }`}
                            >
                                <span className="mr-2">{cat.icon}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl hover:shadow-amber-500/20 transition-all hover:scale-105 overflow-hidden border-2 border-amber-900/30">
                            <div className="text-7xl text-center py-8 bg-gradient-to-br from-amber-900/30 to-slate-800/50">
                                {product.image}
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-xl mb-2 text-amber-100">{product.name}</h3>
                                <p className="text-amber-300 text-sm mb-2">{product.description}</p>
                                <div className="flex gap-2 mb-3">
                                    <span className="bg-red-900/50 text-red-200 px-2 py-1 rounded text-xs font-semibold">
                                        {product.alcohol}
                                    </span>
                                    <span className="bg-amber-900/50 text-amber-200 px-2 py-1 rounded text-xs font-semibold">
                                        {product.origin}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-3xl font-bold text-amber-400">${product.price}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3 rounded-full hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg hover:shadow-amber-500/50"
                                    >
                                        <Plus size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default MenuView;