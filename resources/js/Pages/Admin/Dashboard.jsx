import React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    Building2, 
    Users, 
    DollarSign, 
    MessageSquare, 
    FileText, 
    ArrowUpRight, 
    Plus, 
    Eye 
} from 'lucide-react';

export default function Dashboard({ stats, recentBuyers, recentMessages }) {
    return (
        <AdminLayout title="Tableau de Bord Executive">
            
            {/* Analytical Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Projets Immobiliers</div>
                        <div className="font-serif text-3xl font-bold text-white mt-1">{stats?.total_projects || 0}</div>
                        <div className="text-[10px] text-[#D4AF37] mt-1">Catalogue actif</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                        <Building2 className="w-6 h-6" />
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Acheteurs Actifs</div>
                        <div className="font-serif text-3xl font-bold text-white mt-1">{stats?.total_buyers || 0}</div>
                        <div className="text-[10px] text-emerald-400 mt-1">Acquéreurs enregistrés</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Encaissements</div>
                        <div className="font-serif text-2xl font-bold gold-gradient-text mt-1">
                            {new Intl.NumberFormat('fr-FR').format(stats?.total_revenue || 0)} €
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">Montants perçus</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                        <DollarSign className="w-6 h-6" />
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Messages VIP</div>
                        <div className="font-serif text-3xl font-bold text-white mt-1">{stats?.unread_messages || 0}</div>
                        <div className="text-[10px] text-amber-400 mt-1">Demandes non lues</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                </div>

            </div>

            {/* Quick Action Shortcuts */}
            <div className="flex flex-wrap gap-4 mb-8">
                <Link
                    href="/admin/projects/create"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nouveau Projet Immobilier
                </Link>

                <Link
                    href="/admin/buyers/create"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
                >
                    <Plus className="w-4 h-4 text-[#D4AF37]" />
                    Enregistrer Vente / Acquéreur
                </Link>

                <Link
                    href="/admin/messages"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-[#121214] hover:bg-white/5 border border-white/10 transition-colors"
                >
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                    Consulter Formulaire Contact
                </Link>
            </div>

            {/* Content Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Recent Buyers & PDF Receipts */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-serif text-xl font-bold text-white">Dernières Transactions Acquéreurs</h2>
                            <p className="text-xs text-slate-400">Générez et téléchargez le reçu de vente PDF instantané</p>
                        </div>
                        <Link href="/admin/buyers" className="text-xs text-[#D4AF37] hover:underline">
                            Voir tout
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#0A0A0B] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                                <tr>
                                    <th className="p-3">Référence / Acquéreur</th>
                                    <th className="p-3">Bien / Projet</th>
                                    <th className="p-3">Montant Réglé</th>
                                    <th className="p-3">Statut</th>
                                    <th className="p-3 text-right">PDF Reçu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentBuyers && recentBuyers.map((buyer) => (
                                    <tr key={buyer.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-3">
                                            <div className="font-semibold text-white">{buyer.full_name}</div>
                                            <div className="text-[10px] text-slate-400 font-mono">{buyer.reference_code}</div>
                                        </td>
                                        <td className="p-3">
                                            <div className="text-slate-200">{buyer.unit_number}</div>
                                            <div className="text-[10px] text-[#D4AF37]">{buyer.project?.name}</div>
                                        </td>
                                        <td className="p-3 font-semibold text-emerald-400">
                                            {new Intl.NumberFormat('fr-FR').format(buyer.paid_amount)} €
                                        </td>
                                        <td className="p-3">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                                                {buyer.payment_status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <a
                                                href={`/admin/buyers/${buyer.id}/pdf`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors"
                                                title="Télécharger le reçu PDF de cette vente"
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                                PDF
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Recent Inquiries */}
                <div className="glass-card rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-serif text-xl font-bold text-white">Demandes VIP Récentes</h2>
                            <p className="text-xs text-slate-400">Messages reçus depuis le site public</p>
                        </div>
                        <Link href="/admin/messages" className="text-xs text-[#D4AF37] hover:underline">
                            Inbox
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentMessages && recentMessages.map((msg) => (
                            <div key={msg.id} className="p-4 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/20 transition-all">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-semibold text-white">{msg.name}</span>
                                    <span className="text-[10px] text-slate-500">{new Date(msg.created_at).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="text-[11px] text-[#D4AF37] font-medium mb-1">{msg.subject || 'Information Projet'}</div>
                                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </AdminLayout>
    );
}
