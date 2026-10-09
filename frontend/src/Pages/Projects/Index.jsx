import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Search, 
    Filter, 
    MapPin, 
    Maximize2, 
    Bed, 
    Bath, 
    ArrowUpRight, 
    SlidersHorizontal,
    X
} from 'lucide-react';

export default function ProjectsIndex({ projects, filters, maxPriceAvailable }) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || 'All');
    const [status, setStatus] = useState(filters.status || 'All');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || maxPriceAvailable);

    const handleFilterChange = (newFilters) => {
        router.get('/projets', newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setSearch('');
        setType('All');
        setStatus('All');
        setMaxPrice(maxPriceAvailable);
        router.get('/projets', {}, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout>
            
            {/* Header Section */}
            <section className="bg-[#0E0E10] border-b border-white/10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em] mb-3">
                            Portfolio LUXORIA
                        </div>
                        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                            Résidences & Appartements d'Exception
                        </h1>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Explorez notre collection exclusive de biens immobiliers de prestige. Utilisez nos filtres avancés pour sélectionner le bien correspondant à vos critères d'investissement.
                        </p>
                    </div>
                </div>
            </section>

            {/* Interactive Filters Bar */}
            <section className="sticky top-20 z-30 bg-[#121214]/90 backdrop-blur-md border-b border-white/10 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        
                        {/* Text Search */}
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    handleFilterChange({ search: e.target.value, type, status, max_price: maxPrice });
                                }}
                                placeholder="Rechercher nom, ville..."
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                            />
                        </div>

                        {/* Type Dropdown */}
                        <div>
                            <select
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value);
                                    handleFilterChange({ search, type: e.target.value, status, max_price: maxPrice });
                                }}
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            >
                                <option value="All">Tous les types de biens</option>
                                <option value="Villa">Villa Prestige</option>
                                <option value="Penthouse">Penthouse Sky Villa</option>
                                <option value="Appartement">Appartement de Luxe</option>
                                <option value="Résidence">Résidence Privée</option>
                            </select>
                        </div>

                        {/* Status Dropdown */}
                        <div>
                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    handleFilterChange({ search, type, status: e.target.value, max_price: maxPrice });
                                }}
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            >
                                <option value="All">Tous les statuts</option>
                                <option value="Disponible">Disponible Immédiatement</option>
                                <option value="En Construction">En Construction</option>
                                <option value="Vendu / Réservé">Vendu / Réservé</option>
                            </select>
                        </div>

                        {/* Price Slider & Reset */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                                    <span>Prix max:</span>
                                    <span className="font-semibold text-[#D4AF37]">
                                        {new Intl.NumberFormat('fr-FR').format(maxPrice)} MAD
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="500000"
                                    max={maxPriceAvailable}
                                    step="100000"
                                    value={maxPrice}
                                    onChange={(e) => {
                                        setMaxPrice(e.target.value);
                                        handleFilterChange({ search, type, status, max_price: e.target.value });
                                    }}
                                    className="w-full accent-[#D4AF37]"
                                />
                            </div>

                            <button
                                onClick={resetFilters}
                                className="p-2.5 rounded-xl border border-white/10 bg-[#0A0A0B] text-slate-400 hover:text-white hover:border-[#D4AF37] transition-colors"
                                title="Réinitialiser les filtres"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                    </div>

                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {projects.length === 0 ? (
                    <div className="text-center py-20 glass-panel rounded-2xl border border-white/10">
                        <SlidersHorizontal className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 opacity-60" />
                        <h3 className="font-serif text-2xl font-bold text-white mb-2">Aucun projet correspondant</h3>
                        <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                            Aucune résidence de notre catalogue ne correspond exactement aux filtres sélectionnés. Réinitialisez vos filtres pour découvrir toutes nos opportunités.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="px-6 py-2.5 rounded-full text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors"
                        >
                            Réinitialiser la recherche
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between">
                                <div>
                                    <div className="relative h-64 overflow-hidden">
                                        <img 
                                            src={project.image} 
                                            alt={project.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                                        <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10 text-xs text-slate-300 mb-6 text-center">
                                            <div>
                                                <div className="text-[10px] text-slate-500 uppercase">Surface</div>
                                                <div className="font-semibold text-white">{project.surface} m²</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-500 uppercase">Chambres</div>
                                                <div className="font-semibold text-white">{project.bedrooms}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-500 uppercase">SDB</div>
                                                <div className="font-semibold text-white">{project.bathrooms}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] uppercase text-slate-400 tracking-wider">Prix de vente</div>
                                        <div className="font-serif text-xl font-bold text-white">
                                            {new Intl.NumberFormat('fr-FR').format(project.price)} MAD
                                        </div>
                                    </div>

                                    <Link
                                        href={`/projets/${project.slug}`}
                                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold text-black bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] hover:brightness-110 transition-all"
                                    >
                                        Fiche Fiche
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </section>

        </PublicLayout>
    );
}
