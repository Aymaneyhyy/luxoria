import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login', {
            onSuccess: () => {
                window.location.href = '/admin/dashboard';
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-slate-100 flex flex-col justify-between p-4 selection:bg-[#D4AF37] selection:text-black">
            
            {/* Top Bar - Back to site */}
            <div className="w-full max-w-5xl mx-auto pt-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-[#D4AF37] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour au site LUXORIA</span>
                </Link>

                <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 uppercase tracking-widest font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Connexion Chiffrée TLS / SSL</span>
                </div>
            </div>

            {/* Login Center Card */}
            <div className="w-full max-w-md mx-auto my-8">
                
                {/* Brand Emblem Header */}
                <div className="text-center mb-8">
                    <img
                        src="/images/logo.png"
                        alt="LUXORIA"
                        className="h-20 w-auto object-contain mx-auto mb-3 drop-shadow-2xl"
                    />
                    <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mt-1 font-semibold">
                        Espace Sécurisé &bull; Portail Privé
                    </p>
                </div>

                {/* Login Glass Card */}
                <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
                    
                    <h2 className="font-serif text-xl font-bold text-white mb-2">Authentification</h2>
                    <p className="text-xs text-slate-400 mb-6">
                        Veuillez renseigner vos identifiants autorisés pour accéder à votre espace de gestion.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Adresse Email</label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nom@exemple.com"
                                    required
                                    autoFocus
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                                />
                            </div>
                            {errors.email && <div className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 font-medium">{errors.email}</div>}
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Mot de passe</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••••••"
                                    required
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 transition-colors"
                                    title={showPassword ? 'Masquer' : 'Afficher'}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <div className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 font-medium">{errors.password}</div>}
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-white/10 bg-[#0A0A0B] text-[#D4AF37] focus:ring-0"
                                />
                                <span className="text-slate-300 hover:text-white">Mémoriser cette session</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <span>{processing ? 'Vérification en cours...' : 'Se Connecter'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>

                    </form>

                    {/* Security notice */}
                    <div className="mt-6 pt-4 border-t border-white/5 text-center text-[10px] text-slate-500">
                        Protection contre les accès non autorisés &bull; Session chiffrée
                    </div>

                </div>

            </div>

            {/* Footer Notice */}
            <div className="w-full max-w-5xl mx-auto pb-4 text-center text-[11px] text-slate-600">
                &copy; {new Date().getFullYear()} LUXORIA Real Estate Prestige &bull; Tous droits réservés.
            </div>

        </div>
    );
}
