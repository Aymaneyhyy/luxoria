import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Compass, 
    ArrowRight, 
    Building2, 
    Award, 
    ShieldCheck, 
    Sparkles, 
    MapPin, 
    Bed, 
    Maximize2, 
    PhoneCall,
    CheckCircle2
} from 'lucide-react';

export default function Home({ featuredProjects, stats }) {
    const { settings } = usePage().props;
    return (
        <PublicLayout>
            
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                
                {/* Background Image with Dark Vignette Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/projects/villa_marina.png" 
                        alt="LUXORIA Ultra Modern Villa" 
                        className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0B]/80 to-[#0A0A0B]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-20">
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-8 shadow-xl">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>{settings?.tagline || 'Promoteur de Référence Prestige'}</span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                        <span className="gold-gradient-text">{settings?.hero_title || "L'Art de Vivre d'Exception & Rareté"}</span>
                    </h1>

                    <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        {settings?.hero_subtitle || "Conception et réalisation de résidences de très haut standing, penthouses surplombant la ville et domaines contemporains d'une élégance intemporelle."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/projets"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300"
                        >
                            Découvrir Nos Projets
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-white glass-panel hover:bg-white/10 border border-white/20 transition-all duration-300"
                        >
                            Demande de Visite Privée
                        </Link>
                    </div>

                </div>
            </section>

            {/* Key Statistics Banner */}
            <section className="py-12 bg-[#0E0E10] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        
                        <div className="text-center p-4">
                            <div className="font-serif text-3xl md:text-4xl font-bold gold-gradient-text mb-1">
                                {stats?.total_projects || 4}
                            </div>
                            <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                                Projets Emblématiques
                            </div>
                        </div>

                        <div className="text-center p-4">
                            <div className="font-serif text-3xl md:text-4xl font-bold gold-gradient-text mb-1">
                                100%
                            </div>
                            <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                                Satisfaction Client VIP
                            </div>
                        </div>

                        <div className="text-center p-4">
                            <div className="font-serif text-3xl md:text-4xl font-bold gold-gradient-text mb-1">
                                {stats?.total_surface ? `${(stats.total_surface / 1000).toFixed(1)}k` : '3.5k'} m²
                            </div>
                            <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                                Surface de Prestige Livrée
                            </div>
                        </div>

                        <div className="text-center p-4">
                            <div className="font-serif text-3xl md:text-4xl font-bold gold-gradient-text mb-1">
                                {settings?.vip_clients || '120'}+
                            </div>
                            <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                                Clients VIP
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Featured Projects Showcase */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em] mb-3">
                            Collection Inédite
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
                            Nos Réalisations d'Exception
                        </h2>
                    </div>

                    <Link 
                        href="/projets"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
                    >
                        <span>Voir tout le catalogue</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProjects && featuredProjects.map((project) => (
                        <div key={project.id} className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between">
                            <div>
                                {/* Project Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30">
                                            {project.type}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            project.status === 'Disponible' 
                                            ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-amber-950/90 text-amber-400 border border-amber-500/30'
                                        }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] mb-2">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{project.location}</span>
                                    </div>

                                    <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                                        {project.name}
                                    </h3>

                                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs text-slate-300 mb-6">
                                        <div className="flex items-center gap-2">
                                            <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                                            <span>{project.surface} m²</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Bed className="w-4 h-4 text-[#D4AF37]" />
                                            <span>{project.bedrooms} Suites</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div className="p-6 pt-0 flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] uppercase text-slate-400 tracking-wider">À partir de</div>
                                    <div className="font-serif text-xl font-bold text-white">
                                        {new Intl.NumberFormat('fr-FR').format(project.price)} MAD
                                    </div>
                                </div>

                                <Link
                                    href={`/projets/${project.slug}`}
                                    className="px-4 py-2 rounded-lg text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors"
                                >
                                    Consulter
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </section>

            {/* Why Luxoria Section */}
            <section className="py-20 bg-[#0E0E10] border-y border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em] mb-3">
                            L'Excellence Sans Concession
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                            Pourquoi Choisir LUXORIA ?
                        </h2>
                        <p className="text-sm text-slate-400">
                            {settings?.about_text || "Notre promesse repose sur l'intégrité architecturale, le raffinement des matériaux et un accompagnement sur mesure d'exception."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        <div className="glass-panel p-8 rounded-2xl border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-white mb-3">Architecture Signée</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Chaque villa et penthouse est dessiné par des architectes de renommée internationale, alliant lignes modernes et matériaux nobles.
                            </p>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-white mb-3">Garantie & Sécurité</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Actes notariés sécurisés, garanties bancaires d'achèvement et transparence financière intégrale sur chaque contrat de vente.
                            </p>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-white mb-3">Services Privilège</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Service de conciergerie privée 24/7, gestion locative de prestige et aménagement d'intérieur sur mesure disponible.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

        </PublicLayout>
    );
}
