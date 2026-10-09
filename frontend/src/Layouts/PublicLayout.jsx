import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Building2, Compass, Phone, ShieldCheck, Menu, X, ArrowUpRight, Lock, LogOut, LayoutDashboard } from 'lucide-react';

export default function PublicLayout({ children }) {
    const { flash, auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-slate-100 selection:bg-[#D4AF37] selection:text-black">
            
            {/* Success Flash Toast */}
            {flash?.success && (
                <div className="fixed top-24 right-6 z-50 bg-[#121214] border border-[#D4AF37] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
                    <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                    <div>
                        <div className="font-semibold text-sm text-[#D4AF37]">Confirmation VIP</div>
                        <div className="text-xs text-slate-300">{flash.success}</div>
                    </div>
                </div>
            )}

            {/* Navigation Header */}
            <header className="sticky top-0 z-40 glass-panel border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <img
                                src="/images/logo.png"
                                alt="LUXORIA"
                                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link 
                                href="/" 
                                className="text-sm font-medium text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                            >
                                Accueil
                            </Link>
                            <Link 
                                href="/projets" 
                                className="text-sm font-medium text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                            >
                                <Compass className="w-4 h-4 text-[#D4AF37]" />
                                Nos Projets
                            </Link>
                            <Link 
                                href="/contact" 
                                className="text-sm font-medium text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                            >
                                <Phone className="w-4 h-4 text-[#D4AF37]" />
                                Contact VIP
                            </Link>
                        </nav>

                        {/* Action CTA & Private Space */}
                        <div className="hidden md:flex items-center gap-4">
                            {auth?.user ? (
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 pl-3 pr-2 py-1.5 rounded-full">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center">
                                            {auth.user.name?.charAt(0) || 'U'}
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-xs font-semibold text-white leading-tight">{auth.user.name?.split(' ')[0]}</span>
                                            <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold">
                                                {auth.user.role === 'admin' ? 'Admin' : auth.user.role === 'agent' ? 'Agent VIP' : 'Client'}
                                            </span>
                                        </div>
                                    </div>

                                    {(auth.user.role === 'admin' || auth.user.role === 'agent') && (
                                        <Link 
                                            href="/admin/dashboard" 
                                            className="p-1.5 text-slate-300 hover:text-[#D4AF37] rounded-full hover:bg-white/10 transition-colors"
                                            title="Accéder au Tableau de Bord"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                        </Link>
                                    )}

                                    <Link
                                        href="/admin/logout"
                                        method="post"
                                        as="button"
                                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-full hover:bg-white/10 transition-colors"
                                        title="Déconnexion"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </Link>
                                </div>
                            ) : (
                                <Link 
                                    href="/login" 
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all"
                                    title="Espace Privé"
                                >
                                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    <span>Espace Privé</span>
                                </Link>
                            )}

                            <Link 
                                href="/contact" 
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300"
                            >
                                Prise de RDV
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[#121214] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
                        <Link 
                            href="/" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-[#D4AF37]"
                        >
                            Accueil
                        </Link>
                        <Link 
                            href="/projets" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-[#D4AF37]"
                        >
                            Nos Projets
                        </Link>
                        <Link 
                            href="/contact" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-[#D4AF37]"
                        >
                            Contact VIP
                        </Link>
                        {auth?.user ? (
                            <div className="pt-2 border-t border-white/10 space-y-1">
                                <div className="px-3 py-1 text-xs text-[#D4AF37] font-semibold">
                                    {auth.user.name} ({auth.user.role === 'admin' ? 'Admin' : auth.user.role === 'agent' ? 'Agent VIP' : 'Client'})
                                </div>
                                {(auth.user.role === 'admin' || auth.user.role === 'agent') && (
                                    <Link 
                                        href="/admin/dashboard" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-[#D4AF37]"
                                    >
                                        Tableau de Bord
                                    </Link>
                                )}
                                <Link 
                                    href="/admin/logout" 
                                    method="post"
                                    as="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full text-left block px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:text-red-300"
                                >
                                    Se déconnecter
                                </Link>
                            </div>
                        ) : (
                            <Link 
                                href="/login" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-[#D4AF37]"
                            >
                                Espace Privé / Connexion
                            </Link>
                        )}
                    </div>
                )}
            </header>

            {/* Main Page Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#050506] border-t border-white/10 pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center">
                                <img
                                    src="/images/logo.png"
                                    alt="LUXORIA"
                                    className="h-16 w-auto object-contain"
                                />
                            </div>
                            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                                Promoteur d'exception spécialisé dans la conception de résidences d'ultra-luxe, penthouses exclusifs et domaines privés aux signatures architecturales uniques.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Navigation</h4>
                            <ul className="space-y-2.5 text-sm text-slate-400">
                                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                <li><Link href="/projets" className="hover:text-white transition-colors">Résidences et Appartements</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Demande Privée</Link></li>
                                <li><Link href="/admin/login" className="hover:text-white transition-colors">Espace réservé Admin</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Contact VIP</h4>
                            <ul className="space-y-2.5 text-sm text-slate-400">
                                {usePage().props.settings?.address_line1 && (
                                    <li>{usePage().props.settings.address_line1}</li>
                                )}
                                {usePage().props.settings?.address_line2 && (
                                    <li>{usePage().props.settings.address_line2}</li>
                                )}
                                {usePage().props.settings?.phone_primary && (
                                    <li className="text-white font-medium">{usePage().props.settings.phone_primary}</li>
                                )}
                                {usePage().props.settings?.email_vip && (
                                    <li>{usePage().props.settings.email_vip}</li>
                                )}
                            </ul>
                        </div>

                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                        <div>© {new Date().getFullYear()} LUXORIA Promotion Immobilière. Tous droits réservés.</div>
                        <div className="flex gap-6">
                            <span>Mentions Légales</span>
                            <span>Politique de Confidentialité</span>
                            <span>Sécurité & Conformité</span>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}
