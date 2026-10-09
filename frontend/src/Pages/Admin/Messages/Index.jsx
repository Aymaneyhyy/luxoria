import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { MessageSquare, Mail, Phone, Trash2, CheckCircle, Clock } from 'lucide-react';

export default function MessagesIndex({ messages, filters }) {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleToggleRead = (id) => {
        router.patch(`/admin/messages/${id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le message de "${name}" ?`)) {
            router.delete(`/admin/messages/${id}`);
            if (selectedMessage?.id === id) setSelectedMessage(null);
        }
    };

    return (
        <AdminLayout title="Inbox Messages du Formulaire Contact">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Message List */}
                <div className="lg:col-span-1 glass-card rounded-2xl p-4 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 px-2">
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Demandes Reçues</span>
                        <span className="text-[10px] text-[#D4AF37] font-bold">{messages?.length || 0} Total</span>
                    </div>

                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                        {messages && messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                                    selectedMessage?.id === msg.id 
                                    ? 'bg-[#1A1A1E] border-[#D4AF37]' 
                                    : msg.is_read 
                                    ? 'bg-[#0A0A0B] border-white/5 opacity-70' 
                                    : 'bg-[#121214] border-white/20 font-semibold'
                                }`}
                            >
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-white font-bold">{msg.name}</span>
                                    <span className="text-[10px] text-slate-500">
                                        {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>

                                <div className="text-[11px] text-[#D4AF37] mb-1 truncate">
                                    {msg.subject || msg.project_name || 'Demande VIP'}
                                </div>

                                <p className="text-[11px] text-slate-400 line-clamp-2">
                                    {msg.message}
                                </p>

                                <div className="mt-2 flex items-center justify-between">
                                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                        msg.is_read ? 'bg-white/5 text-slate-400' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                    }`}>
                                        {msg.is_read ? 'Lu' : 'Non Lu'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Detail View */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-8 border border-white/10">
                    {selectedMessage ? (
                        <div className="space-y-6">
                            
                            <div className="flex items-start justify-between pb-6 border-b border-white/10">
                                <div>
                                    <div className="text-xs uppercase text-[#D4AF37] font-semibold tracking-wider mb-1">
                                        {selectedMessage.project_name ? `Intéressé par : ${selectedMessage.project_name}` : 'Demande Générale'}
                                    </div>
                                    <h2 className="font-serif text-2xl font-bold text-white mb-2">
                                        {selectedMessage.subject || 'Formulaire de Contact Public'}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1.5 text-white">
                                            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                                            {selectedMessage.email}
                                        </span>
                                        {selectedMessage.phone && (
                                            <span className="flex items-center gap-1.5 text-white">
                                                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                                                {selectedMessage.phone}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleRead(selectedMessage.id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                                    >
                                        {selectedMessage.is_read ? 'Marquer Non Lu' : 'Marquer comme Lu'}
                                    </button>

                                    <button
                                        onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                                        title="Supprimer le message"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-slate-400 mb-2">Contenu du Message :</div>
                                <div className="p-6 rounded-xl bg-[#0A0A0B] border border-white/10 text-sm text-slate-200 leading-relaxed font-light whitespace-pre-line">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-white/10">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: LUXORIA - ${selectedMessage.subject || 'Votre demande'}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    Répondre directement par Email
                                </a>

                                <span className="text-[11px] text-slate-500">
                                    Reçu le {new Date(selectedMessage.created_at).toLocaleString('fr-FR')}
                                </span>
                            </div>

                        </div>
                    ) : (
                        <div className="text-center py-24 text-slate-500">
                            <MessageSquare className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-40" />
                            <div className="font-serif text-lg text-white font-bold mb-1">Sélectionnez un message</div>
                            <div className="text-xs">Cliquez sur une demande dans le panneau de gauche pour consulter son contenu.</div>
                        </div>
                    )}
                </div>

            </div>

        </AdminLayout>
    );
}
