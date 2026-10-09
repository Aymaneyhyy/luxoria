import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Building2, 
    Users, 
    MessageSquare, 
    LogOut, 
    ExternalLink, 
    ShieldCheck, 
    Sparkles,
    Settings
} from 'lucide-react';

export default function AdminLayout({ children, title }) {
    const { auth, flash, url } = usePage().props;

    const isActive = (path) => {
        return window.location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen flex bg-[#0A0A0B] text-slate-100 selection:bg-[#D4AF37] selection:text-black">
            
            {/* Sidebar */}
            <aside className="w-64 bg-[#121214] border-r border-white/10 flex flex-col justify-between hidden md:flex">
                <div>
                    {/* Header Logo */}
                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                        <img
                            src="/images/logo.png"
                            alt="LUXORIA"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-1.5">
                        <Link
                            href="/admin/dashboard"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive('/admin/dashboard') 
                                ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-4 border-[#D4AF37]' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Tableau de Bord
                        </Link>

                        <Link
                            href="/admin/projects"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive('/admin/projects') 
                                ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-4 border-[#D4AF37]' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                        >
                            <Building2 className="w-5 h-5" />
                            Gestion Projets
                        </Link>

                        <Link
                            href="/admin/buyers"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive('/admin/buyers') 
                                ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-4 border-[#D4AF37]' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                        >
                            <Users className="w-5 h-5" />
                            Acheteurs & PDF
                        </Link>

                        <Link
                            href="/admin/messages"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive('/admin/messages') 
                                ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-4 border-[#D4AF37]' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                        >
                            <MessageSquare className="w-5 h-5" />
                            Messages Formulaire
                        </Link>

                        {/* Divider */}
                        <div className="my-2 border-t border-white/5" />

                        <Link
                            href="/admin/settings"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive('/admin/settings') 
                                ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-4 border-[#D4AF37]' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                        >
                            <Settings className="w-5 h-5" />
                            Paramètres du Site
                        </Link>
                    </nav>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <span>Voir site public</span>
                        <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                    </Link>

                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Header */}
                <header className="h-20 bg-[#121214] border-b border-white/10 px-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-white font-serif">{title || 'Administration'}</h1>
                        <p className="text-xs text-slate-400">LUXORIA Real Estate Executive Portal</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Session Sécurisée (Bcrypt)</span>
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center font-bold text-xs text-[#D4AF37]">
                                {auth?.user?.name ? auth.user.name.substring(0, 2).toUpperCase() : 'AD'}
                            </div>
                            <div className="hidden md:block">
                                <div className="text-xs font-semibold text-white flex items-center gap-2">
                                    <span>{auth?.user?.name || 'Administrateur'}</span>
                                    <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                                        {auth?.user?.role === 'admin' ? 'Directeur' : auth?.user?.role === 'agent' ? 'Agent VIP' : 'Client'}
                                    </span>
                                </div>
                                <div className="text-[10px] text-slate-400">{auth?.user?.email || 'admin@luxoria.com'}</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    
                    {/* Flash Success Notification */}
                    {flash?.success && (
                        <div className="mb-6 bg-[#121214] border border-[#D4AF37] text-slate-100 p-4 rounded-xl shadow-lg flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                            <div className="text-sm">{flash.success}</div>
                        </div>
                    )}

                    {children}
                </main>

            </div>

        </div>
    );
}
