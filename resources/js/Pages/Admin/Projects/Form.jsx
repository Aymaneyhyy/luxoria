import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Building2 } from 'lucide-react';

export default function ProjectForm({ project }) {
    const isEditing = !!project;

    const { data, setData, post, put, processing, errors } = useForm({
        name: project?.name || '',
        type: project?.type || 'Villa',
        description: project?.description || '',
        price: project?.price || '',
        location: project?.location || '',
        status: project?.status || 'Disponible',
        surface: project?.surface || '',
        bedrooms: project?.bedrooms || 3,
        bathrooms: project?.bathrooms || 2,
        image: project?.image || '/images/projects/villa_marina.png',
        is_featured: project?.is_featured ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/projects/${project.id}`);
        } else {
            post('/admin/projects');
        }
    };

    return (
        <AdminLayout title={isEditing ? `Édition : ${project.name}` : 'Nouveau Projet Immobilier'}>
            
            <div className="mb-6">
                <Link href="/admin/projects" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour à la liste des projets</span>
                </Link>
            </div>

            <div className="glass-card max-w-4xl rounded-2xl p-8 border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Nom du Projet *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Ex: Villa Royale Marina"
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                            {errors.name && <div className="text-red-400 text-[10px] mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Type de Bien *</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            >
                                <option value="Villa">Villa</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Appartement">Appartement</option>
                                <option value="Résidence">Résidence</option>
                                <option value="Domaine">Domaine</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Prix de Vente (€) *</label>
                            <input
                                type="number"
                                step="1000"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                required
                                placeholder="Ex: 2500000"
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                            {errors.price && <div className="text-red-400 text-[10px] mt-1">{errors.price}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Localisation / Ville *</label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                required
                                placeholder="Ex: Marina Bay, Casablanca"
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                            {errors.location && <div className="text-red-400 text-[10px] mt-1">{errors.location}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Statut de Commercialisation *</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            >
                                <option value="Disponible">Disponible</option>
                                <option value="En Construction">En Construction</option>
                                <option value="Vendu / Réservé">Vendu / Réservé</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Surface (m²) *</label>
                            <input
                                type="number"
                                value={data.surface}
                                onChange={(e) => setData('surface', e.target.value)}
                                required
                                placeholder="Ex: 450"
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Nombre de Chambres</label>
                            <input
                                type="number"
                                value={data.bedrooms}
                                onChange={(e) => setData('bedrooms', e.target.value)}
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Nombre de SDB</label>
                            <input
                                type="number"
                                value={data.bathrooms}
                                onChange={(e) => setData('bathrooms', e.target.value)}
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-2">Chemin Image Principale</label>
                        <select
                            value={data.image}
                            onChange={(e) => setData('image', e.target.value)}
                            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                            <option value="/images/projects/villa_marina.png">Villa Royale Marina (Façade Mer)</option>
                            <option value="/images/projects/penthouse_skyline.png">Penthouse Horizon (Intérieur Skyline)</option>
                            <option value="/images/projects/residence_pearl.png">Résidence Pearl (Immeuble Balcons Or)</option>
                            <option value="/images/projects/palais_emeraude.png">Palais Émeraude (Domaine & Piscine)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-2">Description Détaillée *</label>
                        <textarea
                            rows="5"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                            placeholder="Décrivez les prestations haut de gamme du bien..."
                            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                        {errors.description && <div className="text-red-400 text-[10px] mt-1">{errors.description}</div>}
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-4 border-t border-white/10">
                        <Link
                            href="/admin/projects"
                            className="px-6 py-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            {isEditing ? 'Mettre à jour le projet' : 'Enregistrer le projet'}
                        </button>
                    </div>

                </form>
            </div>

        </AdminLayout>
    );
}
