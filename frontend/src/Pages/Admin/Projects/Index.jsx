import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Search, Edit, Trash2, MapPin, Building2 } from 'lucide-react';

export default function ProjectsIndex({ projects, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/projects', { search }, { preserveState: true });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le projet "${name}" ?`)) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    return (
        <AdminLayout title="Gestion des Projets Immobiliers">
            
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                
                <form onSubmit={handleSearch} className="w-full sm:w-80 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher par nom, ville..."
                        className="w-full bg-[#121214] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                </form>

                <Link
                    href="/admin/projects/create"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] hover:brightness-110 shadow-lg transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Ajouter un Projet
                </Link>

            </div>

            {/* Table */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0A0A0B] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                            <tr>
                                <th className="p-4">Projet & Visuel</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Localisation</th>
                                <th className="p-4">Prix de Vente</th>
                                <th className="p-4">Caractéristiques</th>
                                <th className="p-4">Statut</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {projects && projects.map((project) => (
                                <tr key={project.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-12 h-12 rounded-lg object-cover border border-white/10"
                                            />
                                            <div>
                                                <div className="font-bold text-white text-sm">{project.name}</div>
                                                <div className="text-[10px] text-slate-400 font-mono">/{project.slug}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4 font-medium text-slate-200">
                                        {project.type}
                                    </td>

                                    <td className="p-4 text-slate-300">
                                        <div className="flex items-center gap-1 text-[#D4AF37]">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{project.location}</span>
                                        </div>
                                    </td>

                                    <td className="p-4 font-bold text-white font-serif text-sm">
                                        {new Intl.NumberFormat('fr-FR').format(project.price)} MAD
                                    </td>

                                    <td className="p-4 text-slate-300">
                                        <div>{project.surface} m²</div>
                                        <div className="text-[10px] text-slate-400">{project.bedrooms} Ch. | {project.bathrooms} SDB</div>
                                    </td>

                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                            project.status === 'Disponible'
                                            ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-amber-950/90 text-amber-400 border border-amber-500/30'
                                        }`}>
                                            {project.status}
                                        </span>
                                    </td>

                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                                title="Modifier"
                                            >
                                                <Edit className="w-4 h-4 text-[#D4AF37]" />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(project.id, project.name)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </AdminLayout>
    );
}
