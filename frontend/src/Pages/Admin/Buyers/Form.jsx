import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, UserCheck, DollarSign } from 'lucide-react';

export default function BuyerForm({ buyer, projects }) {
    const isEditing = !!buyer;

    const { data, setData, post, put, processing, errors } = useForm({
        project_id: buyer?.project_id || (projects[0]?.id || ''),
        full_name: buyer?.full_name || '',
        cin: buyer?.cin || '',
        phone: buyer?.phone || '',
        email: buyer?.email || '',
        address: buyer?.address || '',
        property_type: buyer?.property_type || 'Villa',
        unit_number: buyer?.unit_number || '',
        surface: buyer?.surface || '',
        agreed_price: buyer?.agreed_price || '',
        paid_amount: buyer?.paid_amount || '',
        payment_method: buyer?.payment_method || 'Virement bancaire',
        payment_date: buyer?.payment_date ? buyer.payment_date.split('T')[0] : new Date().toISOString().split('T')[0],
        payment_status: buyer?.payment_status || 'Acompte (30%)',
        notes: buyer?.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/buyers/${buyer.id}`);
        } else {
            post('/admin/buyers');
        }
    };

    return (
        <AdminLayout title={isEditing ? `Édition : ${buyer.full_name}` : 'Enregistrer un Nouvel Acquéreur'}>
            
            <div className="mb-6">
                <Link href="/admin/buyers" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour à la liste des acquéreurs</span>
                </Link>
            </div>

            <div className="glass-card max-w-4xl rounded-2xl p-8 border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Section 1: Customer Personal Info */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-[#D4AF37]" />
                            <span>1. Informations Personnelles de l'Acquéreur</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Nom Complet *</label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    required
                                    placeholder="Ex: Mme Sophia BENNANI"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                                {errors.full_name && <div className="text-red-400 text-[10px] mt-1">{errors.full_name}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">N° CIN / Passeport *</label>
                                <input
                                    type="text"
                                    value={data.cin}
                                    onChange={(e) => setData('cin', e.target.value)}
                                    required
                                    placeholder="Ex: BE894521"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                                {errors.cin && <div className="text-red-400 text-[10px] mt-1">{errors.cin}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Téléphone *</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                    placeholder="Ex: +212 6 61 23 45 67"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Adresse Email *</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    placeholder="Ex: sophia@luxury.ma"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-xs font-medium text-slate-300 mb-2">Adresse Résidentielle Complexe *</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                required
                                placeholder="Ex: 14 Avenue Montaigne, Casablanca"
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                        </div>
                    </div>

                    {/* Section 2: Property Info */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                            <span>2. Informations du Bien Immobilier Acquis</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Projet Immobilier</label>
                                <select
                                    value={data.project_id}
                                    onChange={(e) => setData('project_id', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                >
                                    <option value="">Sélectionner un projet...</option>
                                    {projects && projects.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name} - {p.location}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Type du Bien *</label>
                                <input
                                    type="text"
                                    value={data.property_type}
                                    onChange={(e) => setData('property_type', e.target.value)}
                                    required
                                    placeholder="Ex: Villa / Penthouse"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Numéro de Lot / Apt *</label>
                                <input
                                    type="text"
                                    value={data.unit_number}
                                    onChange={(e) => setData('unit_number', e.target.value)}
                                    required
                                    placeholder="Ex: Villa Royale N°02"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Surface (m²) *</label>
                                <input
                                    type="number"
                                    value={data.surface}
                                    onChange={(e) => setData('surface', e.target.value)}
                                    required
                                    placeholder="Ex: 650"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Prix Total Convenu (MAD) *</label>
                                <input
                                    type="number"
                                    step="100"
                                    value={data.agreed_price}
                                    onChange={(e) => setData('agreed_price', e.target.value)}
                                    required
                                    placeholder="Ex: 3800000"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Payment Details */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 mb-4">
                            3. Modalités & Encaissement du Paiement
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Montant Réglé à ce Jour (MAD) *</label>
                                <input
                                    type="number"
                                    step="100"
                                    value={data.paid_amount}
                                    onChange={(e) => setData('paid_amount', e.target.value)}
                                    required
                                    placeholder="Ex: 1140000"
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Mode de Règlement *</label>
                                <select
                                    value={data.payment_method}
                                    onChange={(e) => setData('payment_method', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                >
                                    <option value="Virement bancaire">Virement bancaire</option>
                                    <option value="Chèque certifié">Chèque certifié</option>
                                    <option value="Espèces">Espèces</option>
                                    <option value="Financement bancaire">Financement bancaire</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Date du Règlement *</label>
                                <input
                                    type="date"
                                    value={data.payment_date}
                                    onChange={(e) => setData('payment_date', e.target.value)}
                                    required
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Statut du Règlement *</label>
                                <select
                                    value={data.payment_status}
                                    onChange={(e) => setData('payment_status', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                >
                                    <option value="Acompte (30%)">Acompte (30%)</option>
                                    <option value="Partiel (60%)">Partiel (60%)</option>
                                    <option value="Réglé à 100%">Réglé à 100%</option>
                                    <option value="En attente">En attente de confirmation</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Notes & Remarques Notariées</label>
                                <input
                                    type="text"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Remarques notaires, échéancier..."
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-4 border-t border-white/10">
                        <Link
                            href="/admin/buyers"
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
                            {isEditing ? 'Mettre à jour la fiche' : 'Enregistrer & Générer Référence'}
                        </button>
                    </div>

                </form>
            </div>

        </AdminLayout>
    );
}
