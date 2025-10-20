import React, { useState, useEffect } from 'react';
import MenuView from './components/client/MenuView.jsx';
import CartView from './components/client/CartView';
import CustomerInfoView from './components/client/CustomerInfoView';
import PaymentView from './components/client/PaymentView';
import ProcessingView from './components/client/ProcessingView';
import AdminPanel from './AdminPanel';
import AuthSystem from './AuthSystem'; // NUEVA IMPORTACIÓN
import { LogIn, LogOut } from 'lucide-react';
import { Clock, AlertCircle, Package, Check, CreditCard, User, MessageCircle } from 'lucide-react';

const POSSystem = () => {
    // --- ESTADOS DE AUTENTICACIÓN ---
    // authStatus: 'unauthenticated', 'customer', 'admin'
    const [authStatus, setAuthStatus] = useState('unauthenticated');

    // El estado isAdminView ahora solo se usa para alternar DENTRO del modo AUTHENTICATED
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

    // --- ESTADO DEL ADMINISTRADOR ---
    const [orders, setOrders] = useState([]);

    // ... (Tu lista de categorías y productos se mantiene igual) ...
    const categories = [
        { id: 'all', name: 'Todo', icon: '🥃' },
        { id: 'whisky', name: 'Whisky', icon: '🥃' },
        { id: 'ron', name: 'Ron', icon: '🍹' },
        { id: 'vodka', name: 'Vodka', icon: '🍸' },
        { id: 'tequila', name: 'Tequila', icon: '🌵' },
        { id: 'brandy', name: 'Brandy & Cognac', icon: '🍷' },
        { id: 'licor', name: 'Licores', icon: '🍾' }
    ];

    const products = [
        { id: 1, name: 'Johnnie Walker Black Label', price: 689, category: 'whisky', image: '🥃', description: '750ml - Whisky Escocés Premium', alcohol: '40%', origin: 'Escocia' },
        { id: 2, name: 'Jack Daniels', price: 549, category: 'whisky', image: '🥃', description: '750ml - Tennessee Whiskey', alcohol: '40%', origin: 'USA' },
        { id: 3, name: 'Chivas Regal 12 Años', price: 759, category: 'whisky', image: '🥃', description: '750ml - Whisky Escocés de Mezcla', alcohol: '40%', origin: 'Escocia' },
        { id: 4, name: 'Buchanan\'s 12 Años', price: 699, category: 'whisky', image: '🥃', description: '750ml - Whisky Escocés Suave', alcohol: '40%', origin: 'Escocia' },
        { id: 5, name: 'Bacardí Carta Blanca', price: 289, category: 'ron', image: '🍹', description: '750ml - Ron Blanco Superior', alcohol: '38%', origin: 'Puerto Rico' },
        { id: 6, name: 'Havana Club 7 Años', price: 459, category: 'ron', image: '🍹', description: '700ml - Ron Añejo Cubano', alcohol: '40%', origin: 'Cuba' },
        { id: 7, name: 'Zacapa Centenario 23', price: 1299, category: 'ron', image: '🍹', description: '750ml - Ron Premium Guatemala', alcohol: '40%', origin: 'Guatemala' },
        { id: 8, name: 'Captain Morgan Spiced', price: 349, category: 'ron', image: '🍹', description: '750ml - Ron Especiado', alcohol: '35%', origin: 'Jamaica' },
        { id: 9, name: 'Absolut Original', price: 449, category: 'vodka', image: '🍸', description: '750ml - Vodka Premium Sueco', alcohol: '40%', origin: 'Suecia' },
        { id: 10, name: 'Smirnoff Red', price: 299, category: 'vodka', image: '🍸', description: '750ml - Vodka Triple Destilado', alcohol: '37.5%', origin: 'Rusia' },
        { id: 11, name: 'Grey Goose', price: 1199, category: 'vodka', image: '🍸', description: '750ml - Vodka Ultra Premium', alcohol: '40%', origin: 'Francia' },
        { id: 12, name: 'José Cuervo Especial', price: 329, category: 'tequila', image: '🌵', description: '750ml - Tequila Gold', alcohol: '38%', origin: 'México' },
        { id: 13, name: 'Don Julio Reposado', price: 899, category: 'tequila', image: '🌵', description: '750ml - Tequila Premium', alcohol: '38%', origin: 'México' },
        { id: 14, name: 'Patrón Silver', price: 1099, category: 'tequila', image: '🌵', description: '750ml - Tequila Ultra Premium', alcohol: '40%', origin: 'México' },
        { id: 15, name: 'Hennessy VS', price: 999, category: 'brandy', image: '🍷', description: '700ml - Cognac Francés', alcohol: '40%', origin: 'Francia' },
        { id: 16, name: 'Presidente Solera', price: 289, category: 'brandy', image: '🍷', description: '750ml - Brandy Mexicano', alcohol: '36%', origin: 'México' },
        { id: 17, name: 'Baileys Original', price: 459, category: 'licor', image: '🍾', description: '750ml - Crema de Whisky', alcohol: '17%', origin: 'Irlanda' },
        { id: 18, name: 'Jägermeister', price: 549, category: 'licor', image: '🍾', description: '700ml - Licor de Hierbas', alcohol: '35%', origin: 'Alemania' }
    ];
    // ... (El resto de las funciones de lógica: filteredProducts, addToCart, etc. se mantienen igual)
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, change) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const getTotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        setCurrentView('customer-info');
    };

    const handleCustomerSubmit = (e) => {
        e.preventDefault();
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.age) {
            alert('Por favor completa todos los campos');
            return;
        }
        if (parseInt(customerInfo.age) < 18) {
            alert('Debes ser mayor de 18 años para comprar bebidas alcohólicas');
            return;
        }
        setCurrentView('payment');
    };

    const handlePayment = () => {
        if (!paymentMethod) {
            alert('Selecciona un método de pago');
            return;
        }
        const orderNum = 'LIC-' + Math.floor(Math.random() * 10000);

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

        setOrderNumber(orderNum);
        setCurrentView('processing');
        setOrderStatus('validating');

        setTimeout(() => setOrderStatus('preparing'), 2000);
        setTimeout(() => setOrderStatus('ready'), 5000);
        setTimeout(() => setOrderStatus('delivering'), 8000);
        setTimeout(() => setOrderStatus('delivered'), 12000);
    };

    const sendMessage = (text, sender) => {
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
    };

    const getStatusInfo = (status) => {
        const statuses = {
            pending: { text: 'Pendiente', color: 'bg-gray-500', icon: 'Clock' },
            validating: { text: 'Validando Edad', color: 'bg-yellow-500', icon: 'AlertCircle' },
            preparing: { text: 'Preparando', color: 'bg-blue-500', icon: 'Package' },
            ready: { text: 'Listo para Envío', color: 'bg-indigo-500', icon: 'Check' },
            delivering: { text: 'En Camino', color: 'bg-purple-500', icon: 'Package' },
            delivered: { text: 'Entregado', color: 'bg-green-500', icon: 'Check' }
        };
        return statuses[status] || statuses.pending;
    };

    const resetOrder = () => {
        setCurrentView('menu');
        setCart([]);
        setCustomerInfo({ name: '', phone: '', address: '', age: '' });
        setPaymentMethod('');
        setOrderStatus('pending');
        setChatMessages([]);
        setOrderNumber('');
    };

    const updateOrderStatusAdmin = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    // --- FUNCIONES DE AUTENTICACIÓN ---
    const handleAuthSuccess = (role) => {
        setAuthStatus(role);
        if (role === 'admin') {
            setIsAdminView(true);
        } else {
            setIsAdminView(false); // Asegura que el cliente vea la vista normal
        }
        setCurrentView('menu'); // Redirige al menú principal
    };

    const handleAdminAccess = () => {
        setAuthStatus('admin');
        setIsAdminView(true);
        setCurrentView('menu');
    };

    const handleLogout = () => {
        setAuthStatus('unauthenticated');
        setIsAdminView(false);
        setCurrentView('menu');
        // Resetear todos los estados de cliente aquí también si se desea
        resetOrder();
    };

    // --- RENDERIZADO PRINCIPAL ---

    if (authStatus === 'unauthenticated') {
        // Muestra el sistema de autenticación si no hay sesión iniciada
        return (
            <AuthSystem
                onAuthSuccess={handleAuthSuccess}
                onAdminAccess={handleAdminAccess}
            />
        );
    }

    // Si está autenticado, muestra la aplicación o el panel de administración
    return (
        <>
            {/* BOTÓN FLOTANTE PARA CERRAR SESIÓN (VISIBLE SOLO DESPUÉS DE INICIAR SESIÓN) */}
            <button
                onClick={handleLogout}
                className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full font-bold shadow-2xl transition-all flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                title="Cerrar Sesión"
            >
                <LogOut size={20} />
                Cerrar Sesión
            </button>

            {/* BOTÓN PARA ALTERNAR ENTRE CLIENTE Y ADMIN (VISIBLE SOLO SI ES ADMIN) */}
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
                />
            ) : (
                // VISTAS DEL CLIENTE (MENU, CARRITO, PROCESO)
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
            )}
        </>
    );
};

export default POSSystem;