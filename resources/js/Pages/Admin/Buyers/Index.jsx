import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Search, Edit, Trash2, FileText, Download, UserCheck } from 'lucide-react';

export default function BuyersIndex({ buyers, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/buyers', { search }, { preserveState: true });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la fiche de l'acquéreur "${name}" ?`)) {
            router.delete(`/admin/buyers/${id}`);
        }
    };

    return (
        <AdminLayout title="Gestion des Acquéreurs & Reçus de Vente PDF">
            
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                
                <form onSubmit={handleSearch} className="w-full sm:w-80 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher par nom, CIN, réf..."
                        className="w-full bg-[#121214] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                </form>

                <Link
                    href="/admin/buyers/create"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] hover:brightness-110 shadow-lg transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Enregistrer un Nouvel Acquéreur
                </Link>

            </div>

            {/* Buyers Table */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0A0A0B] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                            <tr>
                                <th className="p-4">Référence</th>
                                <th className="p-4">Acquéreur (Infos CIN)</th>
                                <th className="p-4">Bien Acquis</th>
                                <th className="p-4">Paiement & Mode</th>
                                <th className="p-4">Statut Règlement</th>
                                <th className="p-4 text-center">Génération PDF</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {buyers && buyers.map((buyer) => (
                                <tr key={buyer.id} className="hover:bg-white/5 transition-colors">
                                    
                                    <td className="p-4 font-mono text-[#D4AF37] font-semibold">
                                        {buyer.reference_code}
                                    </td>

                                    <td className="p-4">
                                        <div className="font-bold text-white text-sm">{buyer.full_name}</div>
                                        <div className="text-[10px] text-slate-400">CIN: {buyer.cin} | {buyer.phone}</div>
                                        <div className="text-[10px] text-slate-500">{buyer.email}</div>
                                    </td>

                                    <td className="p-4">
                                        <div className="font-semibold text-slate-200">{buyer.unit_number}</div>
                                        <div className="text-[10px] text-[#D4AF37]">{buyer.project ? buyer.project.name : 'LUXORIA Residence'}</div>
                                        <div className="text-[10px] text-slate-400">{buyer.surface} m² | {new Intl.NumberFormat('fr-FR').format(buyer.agreed_price)} €</div>
                                    </td>

                                    <td className="p-4">
                                        <div className="font-bold text-emerald-400">
                                            {new Intl.NumberFormat('fr-FR').format(buyer.paid_amount)} €
                                        </div>
                                        <div className="text-[10px] text-slate-400">{buyer.payment_method}</div>
                                        <div className="text-[10px] text-slate-500">
                                            {new Date(buyer.payment_date).toLocaleDateString('fr-FR')}
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                                            {buyer.payment_status}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center">
                                        <a
                                            href={`/admin/buyers/${buyer.id}/pdf`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] hover:brightness-110 shadow-md transition-all"
                                            title="Télécharger automatiquement le reçu de vente PDF"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            Reçu PDF
                                        </a>
                                    </td>

                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/buyers/${buyer.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                                title="Modifier la fiche"
                                            >
                                                <Edit className="w-4 h-4 text-[#D4AF37]" />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(buyer.id, buyer.full_name)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                title="Supprimer la fiche"
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
