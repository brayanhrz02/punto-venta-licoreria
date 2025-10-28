import React, { useState, useEffect, useCallback } from 'react';
import MenuView from './components/client/MenuView.jsx';
import CartView from './components/client/CartView';
import CustomerInfoView from './components/client/CustomerInfoView';
import PaymentView from './components/client/PaymentView';
import ProcessingView from './components/client/ProcessingView';
import AdminPanel from './AdminPanel';
import AuthSystem from './AuthSystem';
import { LogIn, LogOut, Gift, ShoppingBag, Plus, Minus, X } from 'lucide-react'; // Importamos iconos necesarios para renderizado

const POSSystem = () => {
    // --- ESTADOS DE AUTENTICACIÓN ---
    const [authStatus, setAuthStatus] = useState('unauthenticated');
    const [isAdminView, setIsAdminView] = useState(false);

    // --- ESTADO PRINCIPAL (Cliente/App) ---
    const [currentView, setCurrentView] = useState('menu');
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', age: '' });
    const [deliveryTime, setDeliveryTime] = useState('45');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderStatus, setOrderStatus] = useState('pending');
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [orders, setOrders] = useState([]); // ESTADO DEL ADMINISTRADOR
    const [currentSeason] = useState('navidad'); // Publicidad Estacional

    // --- DATOS INICIALES ---
    const seasonalBanners = {
        halloween: {
            title: '🎃 ESPECIAL HALLOWEEN 🎃',
            subtitle: '15% OFF en licores oscuros',
            bg: 'from-orange-600 to-purple-900'
        },
        navidad: {
            title: '🎄 OFERTAS NAVIDEÑAS 🎅',
            subtitle: '20% OFF en paquetes premium',
            bg: 'from-red-600 to-green-700'
        }
    };

    const categories = [
        { id: 'all', name: 'Todo', icon: '🥃' },
        { id: 'whisky', name: 'Whisky', icon: '🥃' },
        { id: 'ron', name: 'Ron', icon: '🍹' },
        { id: 'vodka', name: 'Vodka', icon: '🍸' },
        { id: 'tequila', name: 'Tequila', icon: '🌵' },
        { id: 'brandy', name: 'Brandy & Cognac', icon: '🍷' },
        { id: 'licor', name: 'Licores', icon: '🍾' },
        { id: 'complementos', name: 'Complementos', icon: '🥤' }
    ];

    const [inventory, setInventory] = useState([
        { id: 1, name: 'Johnnie Walker Black Label', price: 689, stock: 15, category: 'whisky', image: '🥃', description: '750ml', reorderPoint: 5 },
        { id: 2, name: 'Jack Daniels', price: 549, stock: 22, category: 'whisky', image: '🥃', description: '750ml', reorderPoint: 8 },
        { id: 3, name: 'Bacardí Carta Blanca', price: 289, stock: 18, category: 'ron', image: '🍹', description: '750ml', reorderPoint: 10 },
        { id: 4, name: 'Havana Club 7 Años', price: 459, stock: 12, category: 'ron', image: '🍹', description: '700ml', reorderPoint: 6 },
        { id: 5, name: 'Absolut Original', price: 449, stock: 20, category: 'vodka', image: '🍸', description: '750ml', reorderPoint: 8 },
        { id: 6, name: 'José Cuervo Especial', price: 329, stock: 16, category: 'tequila', image: '🌵', description: '750ml', reorderPoint: 8 },
        { id: 7, name: 'Coca Cola 2L', price: 35, stock: 50, category: 'complementos', image: '🥤', description: 'Refresco 2L', isComplement: true, reorderPoint: 20 },
        { id: 8, name: 'Hielos Bolsa 2kg', price: 25, stock: 40, category: 'complementos', image: '🧊', description: 'Hielo', isComplement: true, reorderPoint: 15 },
        { id: 9, name: 'Limones (kg)', price: 30, stock: 25, category: 'complementos', image: '🍋', description: 'Frescos', isComplement: true, reorderPoint: 10 }
    ]);

    const packages = [
        { id: 'pkg1', name: 'Fiesta Whisky', description: 'Jack Daniels + 2 Coca Colas + Hielo', items: [2, 7, 7, 8], originalPrice: 644, discountPrice: 599, discount: 7, image: '🎉' },
        { id: 'pkg2', name: 'Ron Perfecto', description: 'Bacardí + Coca Cola + Limones', items: [3, 7, 9], originalPrice: 354, discountPrice: 319, discount: 10, image: '🍹' }
    ];

    // --- LÓGICA DE FILTRADO Y MANEJO DE CARRITO (Adaptado al nuevo inventario) ---

    const filteredProducts = inventory.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch && product.stock > 0;
    });

    const addToCart = useCallback((product) => {
        if (product.stock <= 0) {
            alert('Producto sin stock disponible');
            return;
        }

        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            if (existing.quantity >= product.stock) {
                alert('Stock insuficiente');
                return;
            }
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        if (!product.isComplement && cart.filter(i => i.category === 'complementos').length === 0) {
            setTimeout(() => {
                if (window.confirm('¿Quieres agregar complementos?')) {
                    setSelectedCategory('complementos');
                }
            }, 500);
        }
    }, [cart, inventory]);

    const addPackageToCart = useCallback((pkg) => {
        let packageItemsToAdd = [];
        let canAdd = true;

        pkg.items.forEach(itemId => {
            const product = inventory.find(p => p.id === itemId);
            const neededQuantity = pkg.items.filter(id => id === itemId).length;
            const existingInCart = cart.find(i => i.id === itemId)?.quantity || 0;

            if (!product || (existingInCart + neededQuantity) > product.stock) {
                canAdd = false;
            }
            if (product) {
                packageItemsToAdd.push(product);
            }
        });

        if (canAdd) {
            let updatedCart = [...cart];

            packageItemsToAdd.forEach(product => {
                const existingIndex = updatedCart.findIndex(item => item.id === product.id);
                if (existingIndex > -1) {
                    updatedCart[existingIndex] = {
                        ...updatedCart[existingIndex],
                        quantity: updatedCart[existingIndex].quantity + 1
                    };
                } else {
                    updatedCart.push({ ...product, quantity: 1 });
                }
            });

            setCart(updatedCart);
            alert('¡Paquete agregado! Ahorro: $' + (pkg.originalPrice - pkg.discountPrice));
        } else {
            alert('Stock insuficiente para el paquete o uno de sus componentes.');
        }
    }, [cart, inventory]);


    const updateQuantity = useCallback((id, change) => {
        const product = inventory.find(p => p.id === id);
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                if (newQuantity > product.stock) {
                    alert('Stock insuficiente');
                    return item;
                }
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }).filter(item => item.quantity > 0));
    }, [cart, inventory]);

    const removeFromCart = useCallback((id) => {
        setCart(cart.filter(item => item.id !== id));
    }, [cart]);

    const getTotal = useCallback(() => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cart]);

    const handleCheckout = useCallback(() => {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        setCurrentView('customer-info');
    }, [cart]);

    // CORREGIDO: Eliminamos el parámetro 'e'
    const handleCustomerSubmit = useCallback(() => {
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.age) {
            alert('Por favor completa todos los campos');
            return;
        }
        if (parseInt(customerInfo.age) < 18) {
            alert('Debes ser mayor de 18 años para comprar bebidas alcohólicas');
            return;
        }
        setCurrentView('payment');
    }, [customerInfo]); // customerInfo es la única dependencia real

    const getStatusInfo = useCallback((status) => {
        const statuses = {
            pending: { text: 'Pendiente', color: 'bg-gray-500', icon: 'Clock' },
            validating: { text: 'Validando Edad', color: 'bg-yellow-500', icon: 'AlertCircle' },
            preparing: { text: 'Preparando', color: 'bg-blue-500', icon: 'Package' },
            ready: { text: 'Listo para Envío', color: 'bg-indigo-500', icon: 'Check' },
            delivering: { text: 'En Camino', color: 'bg-purple-500', icon: 'Package' },
            delivered: { text: 'Entregado', color: 'bg-green-500', icon: 'Check' }
        };
        return statuses[status] || statuses.pending;
    }, []);

    const resetOrder = useCallback(() => {
        setCurrentView('menu');
        setCart([]);
        setCustomerInfo({ name: '', phone: '', address: '', age: '' });
        setPaymentMethod('');
        setOrderStatus('pending');
        setChatMessages([]);
        setOrderNumber('');
    }, []);

    const handlePayment = useCallback(() => {
        if (!paymentMethod) {
            alert('Selecciona un método de pago');
            return;
        }
        const orderNum = 'LIC-' + Math.floor(Math.random() * 10000);

        // 1. Actualizar Stock
        const newInventory = inventory.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem) {
                return { ...product, stock: product.stock - cartItem.quantity };
            }
            return product;
        });
        setInventory(newInventory);

        // 2. Crear Orden para el Admin Panel
        const newOrder = {
            id: orderNum,
            customer: customerInfo.name,
            items: cart,
            total: getTotal(),
            method: paymentMethod,
            status: 'validating',
            date: new Date().toLocaleTimeString('es-MX'),
            phone: customerInfo.phone,
            address: customerInfo.address,
            age: customerInfo.age
        };
        setOrders(prevOrders => [newOrder, ...prevOrders]);

        // 3. Flujo del Cliente
        setOrderNumber(orderNum);
        setCurrentView('processing');
        setOrderStatus('validating');

        setTimeout(() => setOrderStatus('preparing'), 2000);
        setTimeout(() => setOrderStatus('ready'), 5000);
        setTimeout(() => setOrderStatus('delivering'), 8000);
        setTimeout(() => setOrderStatus('delivered'), 12000);
    }, [cart, getTotal, customerInfo, paymentMethod, inventory]);

    const sendMessage = useCallback((text, sender) => {
        if (text.trim()) {
            setChatMessages(prev => [...prev, {
                text: text,
                sender: sender,
                time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
            }]);

            if (sender === 'customer') {
                setNewMessage('');

                let vendorResponse;

                if (orderStatus === 'validating' || orderStatus === 'preparing') {
                    vendorResponse = '¡Recibido! Estamos verificando y preparando tu pedido ahora mismo. Gracias por la espera.';
                } else if (orderStatus === 'ready' || orderStatus === 'delivering') {
                    vendorResponse = '¡El envío ha sido realizado! 🚚 Tu pedido ya salió de nuestro almacén y está en camino a tu dirección.';
                } else if (orderStatus === 'delivered') {
                    vendorResponse = '¡Gracias por confirmar! Espero que disfrutes tu compra. Si necesitas algo más, avísanos.';
                } else {
                    vendorResponse = 'Gracias por tu mensaje. Un vendedor se pondrá en contacto contigo pronto.';
                }

                setTimeout(() => {
                    setChatMessages(prev => [...prev, {
                        text: vendorResponse,
                        sender: 'vendor',
                        time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
                    }]);
                }, 1200);
            }
        }
    }, [orderStatus]);


    // --- FUNCIONES DE AUTENTICACIÓN ESTABLES ---
    const handleAuthSuccess = useCallback((role) => {
        setAuthStatus(role);
        if (role === 'admin') {
            setIsAdminView(true);
        } else {
            setIsAdminView(false);
        }
        setCurrentView('menu');
    }, []);

    const handleAdminAccess = useCallback(() => {
        setAuthStatus('admin');
        setIsAdminView(true);
        setCurrentView('menu');
    }, []);

    const handleLogout = useCallback(() => {
        setAuthStatus('unauthenticated');
        setIsAdminView(false);
        setCurrentView('menu');
        resetOrder();
    }, [resetOrder]);

    const updateOrderStatusAdmin = useCallback((orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    }, []);


    // --- RENDERIZADO PRINCIPAL ---

    if (authStatus === 'unauthenticated') {
        return (
            <AuthSystem
                onAuthSuccess={handleAuthSuccess}
                onAdminAccess={handleAdminAccess}
            />
        );
    }

    // VISTAS DEL CLIENTE
    const ClientViews = (
        <>
            {currentView === 'menu' && (
                <MenuView
                    cart={cart}
                    setCurrentView={setCurrentView}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    filteredProducts={filteredProducts}
                    addToCart={addToCart}
                    packages={packages} // NUEVO: Paquetes
                    addPackageToCart={addPackageToCart} // NUEVO: Función para paquetes
                    seasonalBanners={seasonalBanners} // NUEVO: Banners
                    currentSeason={currentSeason} // NUEVO: Temporada actual
                    inventory={inventory} // Pasa el inventario si lo necesitas en la vista
                />
            )}
            {currentView === 'cart' && (
                <CartView
                    cart={cart}
                    setCurrentView={setCurrentView}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    getTotal={getTotal}
                    handleCheckout={handleCheckout}
                />
            )}
            {currentView === 'customer-info' && (
                <CustomerInfoView
                    setCurrentView={setCurrentView}
                    customerInfo={customerInfo}
                    setCustomerInfo={setCustomerInfo}
                    deliveryTime={deliveryTime}
                    setDeliveryTime={setDeliveryTime}
                    handleCustomerSubmit={handleCustomerSubmit}
                />
            )}
            {currentView === 'payment' && (
                <PaymentView
                    setCurrentView={setCurrentView}
                    cart={cart}
                    getTotal={getTotal}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    handlePayment={handlePayment}
                />
            )}
            {currentView === 'processing' && (
                <ProcessingView
                    getStatusInfo={getStatusInfo}
                    orderNumber={orderNumber}
                    orderStatus={orderStatus}
                    customerInfo={customerInfo}
                    deliveryTime={deliveryTime}
                    cart={cart}
                    getTotal={getTotal}
                    paymentMethod={paymentMethod}
                    chatMessages={chatMessages}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    sendMessage={sendMessage}
                    resetOrder={resetOrder}
                />
            )}
        </>
    );

    return (
        <>
            {/* BOTONES FLOTANTES */}
            <button
                onClick={handleLogout}
                className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full font-bold shadow-2xl transition-all flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                title="Cerrar Sesión"
            >
                <LogOut size={20} />
                Cerrar Sesión
            </button>

            {authStatus === 'admin' && (
                <button
                    onClick={() => setIsAdminView(!isAdminView)}
                    className={`fixed bottom-6 left-6 z-50 px-4 py-3 rounded-full font-bold shadow-2xl transition-all flex items-center gap-2 ${
                        isAdminView
                            ? 'bg-amber-600 hover:bg-amber-700'
                            : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                    title={isAdminView ? 'Ver Tienda' : 'Panel Admin'}
                >
                    {isAdminView ? <LogIn size={20} /> : <LogOut size={20} />}
                    {isAdminView ? 'Tienda' : 'Panel Admin'}
                </button>
            )}


            {isAdminView && authStatus === 'admin' ? (
                // VISTA DEL ADMINISTRADOR
                <AdminPanel
                    orders={orders}
                    updateOrderStatusAdmin={updateOrderStatusAdmin}
                    getStatusInfo={getStatusInfo}
                    // CRUCIAL: Pasamos el inventario actual y su setter
                    inventory={inventory}
                    setInventory={setInventory}
                />
            ) : (
                ClientViews
            )}
        </>
    );
};

export default POSSystem;