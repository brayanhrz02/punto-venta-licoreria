import React, { memo } from 'react';
import { ShoppingCart, Search, Plus, AlertCircle, Gift, Wine } from 'lucide-react';

const MenuView = memo(({
                           cart,
                           setCurrentView,
                           searchTerm,
                           setSearchTerm,
                           categories,
                           selectedCategory,
                           setSelectedCategory,
                           filteredProducts,
                           addToCart,

                           // --- NUEVAS PROPS ---
                           packages,
                           addPackageToCart,
                           seasonalBanners,
                           currentSeason,
                           inventory // Necesario para verificar stock en productos
                       }) => {
    // Obtener el banner estacional actual
    const season = seasonalBanners[currentSeason] || seasonalBanners.halloween;

    // Función para obtener el punto de reorden para la alerta de stock
    const getReorderPoint = (productId) => {
        const product = inventory.find(p => p.id === productId);
        return product ? product.reorderPoint : 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900">

            {/* CABECERA Y BARRA DE BÚSQUEDA */}
            <div className="bg-gradient-to-r from-amber-900 to-amber-800 shadow-2xl sticky top-0 z-10 border-b-4 border-amber-600">
                <div className="max-w-7xl mx-auto px-4 py-6">


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

                    {/* Publicidad Estacional (Banner) */}
                    <div className={'bg-gradient-to-r ' + season.bg + ' rounded-2xl p-6 mb-4 text-white text-center shadow-xl'}>
                        <h2 className="text-3xl font-bold mb-2">{season.title}</h2>
                        <p className="text-xl">{season.subtitle}</p>
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

            {/* CATEGORÍAS */}
            <div className="bg-slate-800/80 backdrop-blur-sm border-b border-amber-800 sticky top-56 z-10">
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

                {/* --- PAQUETES PROMOCIONALES (NUEVA SECCIÓN) --- */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-amber-100 mb-6 flex items-center gap-3">
                        <Gift size={32} className="text-yellow-400" />
                        Paquetes Especiales y Promociones
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {packages.map(pkg => (
                            <div key={pkg.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 border-4 border-yellow-500/50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-extrabold text-2xl mb-1 text-amber-100">{pkg.name}</h3>
                                        <p className="text-amber-300 mb-4">{pkg.description}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                                                -{pkg.discount}% OFF
                                            </div>
                                            <p className="text-lg text-slate-400 line-through">${pkg.originalPrice}</p>
                                        </div>
                                    </div>
                                    <div className="text-6xl flex-shrink-0">{pkg.image}</div>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-4xl font-bold text-green-400">${pkg.discountPrice}</span>
                                    <button
                                        onClick={() => addPackageToCart(pkg)}
                                        className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:from-yellow-600 hover:to-amber-600 transition shadow-lg flex items-center gap-2"
                                    >
                                        <ShoppingCart size={20} />
                                        Agregar Paquete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- LISTADO DE PRODUCTOS (INVENTARIO) --- */}
                <h2 className="text-3xl font-bold text-amber-100 mb-6">
                    {selectedCategory === 'all' ? 'Todos los Productos' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => {
                        const lowStock = product.stock <= getReorderPoint(product.id);

                        return (
                            <div key={product.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl hover:shadow-amber-500/20 transition-all hover:scale-105 overflow-hidden border-2 border-amber-900/30 relative">

                                {/* Etiqueta de Stock Bajo */}
                                {lowStock && (
                                    <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm z-10 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        Stock bajo ({product.stock})
                                    </div>
                                )}

                                <div className="text-7xl text-center py-8 bg-gradient-to-br from-amber-900/30 to-slate-800/50">
                                    {product.image}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl mb-2 text-amber-100">{product.name}</h3>
                                    <p className="text-amber-300 text-sm mb-2">{product.description}</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-3xl font-bold text-amber-400">${product.price}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            disabled={product.stock === 0}
                                            className={'text-white p-3 rounded-full transition-all shadow-lg hover:shadow-amber-500/50 ' + (product.stock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800')}
                                        >
                                            <Plus size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default MenuView;