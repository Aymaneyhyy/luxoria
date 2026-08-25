import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    MapPin, 
    Maximize2, 
    Bed, 
    Bath, 
    ShieldCheck, 
    PhoneCall, 
    Send, 
    ArrowLeft, 
    Check,
    Sparkles
} from 'lucide-react';

export default function ProjectShow({ project, similarProjects }) {
    const { data, setData, post, processing, errors, reset, json } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: `Demande VIP - ${project.name}`,
        project_name: project.name,
        message: `Bonjour, je souhaiterais obtenir la brochure détaillée et organiser une présentation privée pour le projet ${project.name}.`,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset('name', 'email', 'phone', 'message'),
        });
    };

    return (
        <PublicLayout>
            
            {/* Top Navigation */}
            <div className="bg-[#0E0E10] border-b border-white/10 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/projets" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Retour au catalogue des projets</span>
                    </Link>
                </div>
            </div>

            {/* Main Detail Header */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left & Gallery Column */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Primary Image Showcase */}
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[450px]">
                            <img 
                                src={project.image} 
                                alt={project.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-6 left-6 flex gap-3">
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30">
                                    {project.type}
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-400 border border-emerald-500/30">
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        {/* Title & Specs */}
                        <div>
                            <div className="flex items-center gap-2 text-sm text-[#D4AF37] mb-2 font-medium">
                                <MapPin className="w-4 h-4" />
                                <span>{project.location}</span>
                            </div>

                            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
                                {project.name}
                            </h1>

                            <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                                        <Maximize2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-400 uppercase">Surface Habitable</div>
                                        <div className="font-serif text-lg font-bold text-white">{project.surface} m²</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                                        <Bed className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-400 uppercase">Suites Privées</div>
                                        <div className="font-serif text-lg font-bold text-white">{project.bedrooms} Chambres</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                                        <Bath className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-400 uppercase">Salles de Bains</div>
                                        <div className="font-serif text-lg font-bold text-white">{project.bathrooms} SDB</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-serif text-2xl font-bold text-white mb-4">Présentation du Projet</h3>
                            <p className="text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>

                        {/* Features Checklist */}
                        {project.features && project.features.length > 0 && (
                            <div>
                                <h3 className="font-serif text-2xl font-bold text-white mb-4">Équipements & Prestations Luxe</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#121214] border border-white/5 text-xs text-slate-200">
                                            <Check className="w-4 h-4 text-[#D4AF37]" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column: Pricing & Inquiry Card */}
                    <div>
                        <div className="sticky top-28 glass-card p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
                            
                            <div>
                                <div className="text-xs uppercase text-slate-400 tracking-wider">Prix de vente sur demande</div>
                                <div className="font-serif text-3xl font-bold gold-gradient-text mt-1">
                                    {new Intl.NumberFormat('fr-FR').format(project.price)} €
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-[#0A0A0B] border border-white/10 text-xs text-slate-400 flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                                <span>Garantie bancaire d'achèvement et accompagnement notarié inclus.</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                                <h4 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3">
                                    Réserver une Visite Privée
                                </h4>

                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Nom complet *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="M. / Mme..."
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                                    />
                                    {errors.name && <div className="text-red-400 text-[10px] mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="votre@email.com"
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Téléphone VIP</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+212 6..."
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Message</label>
                                    <textarea
                                        rows="3"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    {processing ? 'Envoi en cours...' : 'Envoyer ma demande VIP'}
                                </button>
                            </form>

                        </div>
                    </div>

                </div>

            </section>

        </PublicLayout>
    );
}
