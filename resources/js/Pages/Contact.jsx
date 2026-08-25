import React from 'react';
import { useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Clock, 
    Send, 
    ShieldCheck, 
    Sparkles 
} from 'lucide-react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        project_name: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            
            {/* Header */}
            <section className="bg-[#0E0E10] border-b border-white/10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Conciergerie Immobilière</span>
                    </div>
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                        Contactez Notre Direction Commerciale
                    </h1>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Nos conseillers VIP sont à votre entière disposition pour échanger en toute confidentialité sur votre projet d'acquisition ou d'investissement d'exception.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left: Contact Info Cards */}
                    <div className="space-y-6">
                        
                        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg font-bold text-white mb-1">Siège Social</h3>
                                <p className="text-xs text-slate-400">Marina Tower, Étage 18</p>
                                <p className="text-xs text-slate-400">Bd de la Corniche, Casablanca</p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg font-bold text-white mb-1">Ligne Privilège VIP</h3>
                                <p className="text-xs text-[#D4AF37] font-semibold">+212 5 22 00 00 00</p>
                                <p className="text-[11px] text-slate-500">Du Lundi au Samedi: 9h - 20h</p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg font-bold text-white mb-1">Courriel Officiel</h3>
                                <p className="text-xs text-slate-300">vip@luxoria.ma</p>
                                <p className="text-xs text-slate-300">contact@luxoria.ma</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121214] to-[#1A1A1E] border border-[#D4AF37]/20">
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-2">
                                <ShieldCheck className="w-4 h-4" />
                                Confidencialité Absolue
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Toutes les données échangées sont soumises à l'engagement de confidentialité de notre maison d'investissement.
                            </p>
                        </div>

                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-2 glass-card p-8 md:p-10 rounded-2xl border border-white/10">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                            Formulaire de Contact Privé
                        </h2>
                        <p className="text-xs text-slate-400 mb-8">
                            Veuillez remplir les informations ci-dessous. Un conseiller dédié vous contactera sous 2 heures ouvrées.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-2">Nom Complet *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="Ex: M. Jean Dupont"
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                                    />
                                    {errors.name && <div className="text-red-400 text-[10px] mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-2">Adresse Email *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="Ex: jean.dupont@email.com"
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                                    />
                                    {errors.email && <div className="text-red-400 text-[10px] mt-1">{errors.email}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-2">Numéro Téléphone</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+212 6..."
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-2">Sujet de votre demande</label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Ex: Demande d'information villa"
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Votre Message *</label>
                                <textarea
                                    rows="5"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    required
                                    placeholder="Précisez votre recherche, budget approximatif ou disponibilités pour un rendez-vous..."
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                                />
                                {errors.message && <div className="text-red-400 text-[10px] mt-1">{errors.message}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                {processing ? 'Transmission sécurisée...' : 'Transmettre à la Direction Commerciale'}
                            </button>

                        </form>
                    </div>

                </div>

            </section>

        </PublicLayout>
    );
}
