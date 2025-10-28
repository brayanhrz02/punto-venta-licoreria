import React, { useState, useCallback, memo } from 'react'; // Importar useCallback y memo
import {
    User, Lock, Mail, Phone, Calendar, MapPin, Eye, EyeOff,
    AlertCircle, CheckCircle, ShieldCheck, LogIn, UserPlus,
    Wine, ArrowRight, ArrowLeft, Shield
} from 'lucide-react';

// ====================================================================
// VISTAS INTERNAS MEMOIZADAS: CREAR ESTOS COMPONENTES FUERA DEL PADRE
// ====================================================================

// Para que memo funcione correctamente, definiremos las vistas DENTRO
// del archivo, pero como componentes memoizados.

// 1. LandingView (No tiene inputs, pero la memoizamos por consistencia)
const LandingView = memo(({ setCurrentView, onAdminAccess }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">

            {/*<div className="flex justify-center mb-6">*/}
            {/*    <button*/}
            {/*        onClick={onAdminAccess}*/}
            {/*        className="flex items-center gap-2 bg-red-700 text-white px-6 py-3 rounded-full font-bold hover:bg-red-800 transition shadow-xl"*/}
            {/*    >*/}
            {/*        <Shield size={20} />*/}
            {/*        Acceso Admin (Demo)*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <Wine size={80} className="text-amber-400" />
                </div>
                <h1 className="text-6xl font-bold text-amber-100 mb-4">Licorería Premium</h1>
                <p className="text-2xl text-amber-300 mb-2">Las mejores bebidas espirituosas a domicilio</p>
                <div className="flex items-center justify-center gap-2 text-red-400 font-semibold">
                    <AlertCircle size={20} />
                    <p>Venta exclusiva para mayores de 18 años</p>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div
                    onClick={() => setCurrentView('login')}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-amber-600 hover:border-amber-400 transition-all cursor-pointer transform hover:scale-105 shadow-2xl"
                >
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6">
                            <LogIn size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-amber-100 mb-4">Iniciar Sesión</h2>
                        <p className="text-amber-300 mb-6">¿Ya tienes una cuenta? Ingresa para realizar tus pedidos</p>
                        <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold">
                            <span>Continuar</span>
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => setCurrentView('register')}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-amber-600 hover:border-amber-400 transition-all cursor-pointer transform hover:scale-105 shadow-2xl"
                >
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UserPlus size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-amber-100 mb-4">Registrarse</h2>
                        <p className="text-amber-300 mb-6">¿Nuevo aquí? Crea tu cuenta y empieza a disfrutar</p>
                        <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold">
                            <span>Crear Cuenta</span>
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 text-center">
                <div className="bg-slate-800/50 rounded-2xl p-6 max-w-2xl mx-auto border border-amber-900/30">
                    <h3 className="text-amber-100 font-bold text-lg mb-3">🔐 Cuentas de Prueba</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-700/50 p-3 rounded-lg">
                            <p className="text-amber-400 font-semibold mb-1">👤 Administrador</p>
                            <p className="text-amber-200">admin@licoreria.com</p>
                            <p className="text-amber-300">admin123</p>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-lg">
                            <p className="text-amber-400 font-semibold mb-1">🛒 Cliente</p>
                            <p className="text-amber-200">cliente@example.com</p>
                            <p className="text-amber-300">cliente123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

// 2. LoginView (CRUCIAL: Usaremos memo y pasaremos las dependencias necesarias)
const LoginView = memo(({
                            setCurrentView, loginData, setLoginData, handleLogin,
                            loginError, successMessage, showPassword, setShowPassword
                        }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <button
                    onClick={() => {
                        setCurrentView('landing');
                        // No necesitas setLoginError/setSuccessMessage aquí si lo manejas en el padre.
                    }}
                    className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 font-semibold transition"
                >
                    <ArrowLeft size={20} />
                    Volver
                </button>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-amber-600">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogIn size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-amber-100 mb-2">Iniciar Sesión</h2>
                        <p className="text-amber-400">Accede a tu cuenta</p>
                    </div>
                    {loginError && (
                        <div className="bg-red-900/30 border border-red-500 rounded-xl p-4 mb-6 flex items-center gap-3">
                            <AlertCircle className="text-red-400" size={20} />
                            <p className="text-red-200 text-sm">{loginError}</p>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-900/30 border border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
                            <CheckCircle className="text-green-400" size={20} />
                            <p className="text-green-200 text-sm">{successMessage}</p>
                        </div>
                    )}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-amber-200 font-semibold mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-amber-600" size={20} />
                                <input
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-700 border-2 border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-amber-200 font-semibold mb-2">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-amber-600" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    className="w-full pl-12 pr-12 py-3 bg-slate-700 border-2 border-amber-800 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-amber-600 hover:text-amber-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-amber-300 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded" />
                                <span>Recordarme</span>
                            </label>
                            <button className="text-amber-400 hover:text-amber-300 font-semibold">
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        <button
                            onClick={handleLogin}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition shadow-lg"
                        >
                            Iniciar Sesión
                        </button>
                        <div className="text-center">
                            <p className="text-amber-300">
                                ¿No tienes cuenta?{' '}
                                <button
                                    onClick={() => setCurrentView('register')}
                                    className="text-amber-400 hover:text-amber-300 font-bold"
                                >
                                    Regístrate aquí
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

// 3. RegisterView (CRUCIAL: Usaremos memo y pasaremos las dependencias necesarias)
const RegisterView = memo(({
                               setCurrentView, registerData, setRegisterData, handleRegister,
                               errors, successMessage, showPassword, setShowPassword,
                               showConfirmPassword, setShowConfirmPassword
                           }) => {
    // Para simplificar la validación en el botón de retorno y asegurarnos de que la vista no se reinicialice
    // movemos la lógica de 'setErrors' y 'setSuccessMessage' al padre.

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 flex items-center justify-center p-4 py-12">
            <div className="max-w-2xl w-full">
                <button
                    onClick={() => setCurrentView('landing')} // Solo cambiamos la vista
                    className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 font-semibold transition"
                >
                    <ArrowLeft size={20} />
                    Volver
                </button>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-amber-600">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserPlus size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-amber-100 mb-2">Crear Cuenta</h2>
                        <p className="text-amber-400">Únete a nuestra comunidad</p>
                    </div>
                    <div className="bg-red-900/30 border border-red-500 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <ShieldCheck className="text-red-400" size={24} />
                        <div>
                            <p className="text-red-200 font-semibold">Verificación de Edad Requerida</p>
                            <p className="text-red-300 text-sm">Debes ser mayor de 18 años para registrarte</p>
                        </div>
                    </div>
                    {successMessage && (
                        <div className="bg-green-900/30 border border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
                            <CheckCircle className="text-green-400" size={20} />
                            <p className="text-green-200 text-sm">{successMessage}</p>
                        </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Nombre Completo */}
                        <div>
                            <label className="block text-amber-200 font-semibold mb-2">Nombre Completo *</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-amber-600" size={20} />
                                <input
                                    type="text"
                                    value={registerData.fullName}
                                    onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                                    className={`w-full pl-12 pr-4 py-3 bg-slate-700 border-2 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 ${
                                        errors.fullName ? 'border-red-500' : 'border-amber-800'
                                    }`}
                                    placeholder="Juan Pérez"
                                />
                            </div>
                            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                        </div>
                        {/* Edad */}
                        <div>
                            <label className="block text-amber-200 font-semibold mb-2">Edad *</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 text-amber-600" size={20} />
                                <input
                                    type="number"
                                    value={registerData.age}
                                    onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                                    className={`w-full pl-12 pr-4 py-3 bg-slate-700 border-2 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 ${
                                        errors.age ? 'border-red-500' : 'border-amber-800'
                                    }`}
                                    placeholder="25"
                                    min="18"
                                />
                            </div>
                            {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-amber-200 font-semibold mb-2">Email *</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-amber-600" size={20} />
                                <input
                                    type="email"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    className={`w-full pl-12 pr-4 py-3 bg-slate-700 border-2 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 ${
                                        errors.email ? 'border-red-500' : 'border-amber-800'
                                    }`}
                                    placeholder="tu@email.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>
                        {/* Teléfono */}
                        <div>
                            <label className="block text-amber-200 font-semibold mb-2">Teléfono *</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-3.5 text-amber-600" size={20} />
                                <input
                                    type="tel"
                                    value={registerData.phone}
                                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                                    className={`w-full pl-12 pr-4 py-3 bg-slate-700 border-2 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 ${
                                        errors.phone ? 'border-red-500' : 'border-amber-800'
                                    }`}
                                    placeholder="272-123-4567"
                                />
                            </div>
                            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                        </div>
                    </div>
                    {/* Dirección */}
                    <div className="mt-6">
                        <label className="block text-amber-200 font-semibold mb-2">Dirección *</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-3.5 text-amber-600" size={20} />
                            <input
                                type="text"
                                value={registerData.address}
                                onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                                className={`w-full pl-12 pr-4 py-3 bg-slate-700 border-2 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 ${
                                    errors.address ? 'border-red-500' : 'border-amber-800'
                                }`}
                                placeholder="Calle, número, colonia"
                            />
                        </div>
                        {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                    </div>
                    {/* Contraseñas */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-amber-200 font-semibold mb-2">Contraseña *</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-amber-600" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    className={`w-full pl-12 pr-12 py-3 bg-slate-700 border-2 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 ${
                                        errors.password ? 'border-red-500' : 'border-amber-800'
                                    }`}
                                    placeholder="Mínimo 6 caracteres"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-amber-600 hover:text-amber-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-amber-200 font-semibold mb-2">Confirmar Contraseña *</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-amber-600" size={20} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={registerData.confirmPassword}
                                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                    className={`w-full pl-12 pr-12 py-3 bg-slate-700 border-2 rounded-xl focus:border-amber-500 focus:outline-none text-amber-100 ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-amber-800'
                                    }`}
                                    placeholder="Repite tu contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-3.5 text-amber-600 hover:text-amber-500"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="flex items-start gap-3 text-amber-300 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded mt-1" required />
                            <span className="text-sm">
                                Confirmo que soy mayor de 18 años y acepto los{' '}
                                <button className="text-amber-400 hover:text-amber-300 font-semibold">términos y condiciones</button>
                                {' '}y la{' '}
                                <button className="text-amber-400 hover:text-amber-300 font-semibold">política de privacidad</button>
                            </span>
                        </label>
                    </div>
                    <button
                        onClick={handleRegister}
                        className="w-full mt-8 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg"
                    >
                        Crear Cuenta
                    </button>
                    <div className="text-center mt-6">
                        <p className="text-amber-300">
                            ¿Ya tienes cuenta?{' '}
                            <button
                                onClick={() => setCurrentView('login')} // Solo cambiamos la vista
                                className="text-amber-400 hover:text-amber-300 font-bold"
                            >
                                Inicia sesión aquí
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});


// ====================================================================
// COMPONENTE PRINCIPAL (AuthSystem)
// ====================================================================

const AuthSystem = memo(({ onAuthSuccess, onAdminAccess }) => {
    const [currentView, setCurrentView] = useState('landing');

    // Mantenemos los estados de visibilidad de contraseña aquí
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Mantenemos los datos de formulario y errores aquí
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ fullName: '', email: '', phone: '', age: '', address: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Usuarios de prueba
    const testUsers = [
        { email: 'admin@licoreria.com', password: 'admin123', role: 'admin', name: 'Administrador' },
        { email: 'cliente@example.com', password: 'cliente123', role: 'customer', name: 'Cliente Test' }
    ];

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^\d{3}-\d{3}-\d{4}$/;
        return regex.test(phone);
    };

    // La validación ahora solo prepara los errores, la maneja el padre.
    const validateRegisterForm = () => {
        const newErrors = {};
        if (!registerData.fullName.trim()) { newErrors.fullName = 'El nombre completo es requerido'; }
        if (!registerData.email.trim()) { newErrors.email = 'El email es requerido'; }
        else if (!validateEmail(registerData.email)) { newErrors.email = 'Email inválido'; }
        if (!registerData.phone.trim()) { newErrors.phone = 'El teléfono es requerido'; }
        else if (!validatePhone(registerData.phone)) { newErrors.phone = 'Formato: 272-123-4567'; }
        if (!registerData.age) { newErrors.age = 'La edad es requerida'; }
        else if (parseInt(registerData.age) < 18) { newErrors.age = 'Debes ser mayor de 18 años'; }
        if (!registerData.address.trim()) { newErrors.address = 'La dirección es requerida'; }
        if (!registerData.password) { newErrors.password = 'La contraseña es requerida'; }
        else if (registerData.password.length < 6) { newErrors.password = 'Mínimo 6 caracteres'; }
        if (!registerData.confirmPassword) { newErrors.confirmPassword = 'Confirma tu contraseña'; }
        else if (registerData.password !== registerData.confirmPassword) { newErrors.confirmPassword = 'Las contraseñas no coinciden'; }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');

        if (!loginData.email || !loginData.password) {
            setLoginError('Por favor completa todos los campos');
            return;
        }

        const user = testUsers.find(
            u => u.email === loginData.email && u.password === loginData.password
        );

        if (user) {
            setSuccessMessage(`¡Bienvenido ${user.name}!`);
            setTimeout(() => {
                onAuthSuccess(user.role);
            }, 1000);
        } else {
            setLoginError('Email o contraseña incorrectos');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (validateRegisterForm()) {
            setSuccessMessage('¡Registro exitoso! Redirigiendo...');
            setTimeout(() => {
                setCurrentView('login');
                setRegisterData({
                    fullName: '', email: '', phone: '', age: '',
                    address: '', password: '', confirmPassword: ''
                });
                setSuccessMessage('');
                setErrors({}); // Limpia errores
            }, 2000);
        }
    };


    return (
        <>
            {currentView === 'landing' && (
                <LandingView
                    setCurrentView={setCurrentView}
                    onAdminAccess={onAdminAccess}
                />
            )}
            {currentView === 'login' && (
                <LoginView
                    setCurrentView={setCurrentView}
                    loginData={loginData}
                    setLoginData={setLoginData}
                    handleLogin={handleLogin}
                    loginError={loginError}
                    successMessage={successMessage}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            )}
            {currentView === 'register' && (
                <RegisterView
                    setCurrentView={setCurrentView}
                    registerData={registerData}
                    setRegisterData={setRegisterData}
                    handleRegister={handleRegister}
                    errors={errors}
                    successMessage={successMessage}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                />
            )}
        </>
    );
});

export default AuthSystem;