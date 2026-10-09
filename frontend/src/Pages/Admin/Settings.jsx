import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Settings,
    MapPin,
    Phone,
    Mail,
    Globe,
    MessageSquare,
    Save,
    CheckCircle,
    Building2,
    Users,
    Share2,
} from 'lucide-react';

const SectionCard = ({ icon: Icon, title, children }) => (
    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Icon className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-white tracking-wide">{title}</h2>
        </div>
        <div className="p-6 space-y-5">{children}</div>
    </div>
);

const Field = ({ label, required, children, hint }) => (
    <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {label} {required && <span className="text-[#D4AF37]">*</span>}
        </label>
        {children}
        {hint && <p className="text-[10px] text-slate-600 mt-1">{hint}</p>}
    </div>
);

const inputClass = "w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors";
const textareaClass = inputClass + " resize-none";

export default function SettingsPage({ settings }) {
    const { flash } = usePage().props;
    const [saved, setSaved] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        company_name:  settings.company_name  ?? '',
        tagline:       settings.tagline       ?? '',
        address_line1: settings.address_line1 ?? '',
        address_line2: settings.address_line2 ?? '',
        phone_primary: settings.phone_primary ?? '',
        phone_hours:   settings.phone_hours   ?? '',
        email_vip:     settings.email_vip     ?? '',
        email_contact: settings.email_contact ?? '',
        hero_title:    settings.hero_title    ?? '',
        hero_subtitle: settings.hero_subtitle ?? '',
        about_text:    settings.about_text    ?? '',
        vip_clients:   settings.vip_clients   ?? '',
        facebook_url:  settings.facebook_url  ?? '',
        instagram_url: settings.instagram_url ?? '',
        linkedin_url:  settings.linkedin_url  ?? '',
        whatsapp:      settings.whatsapp      ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/admin/settings', {
            onSuccess: () => {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            },
        });
    };

    return (
        <AdminLayout title="Paramètres du Site">
            <div className="max-w-5xl mx-auto">

                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                                <Settings className="w-5 h-5" />
                            </div>
                            <h1 className="text-2xl font-bold text-white font-serif">Paramètres du Site</h1>
                        </div>
                        <p className="text-xs text-slate-500 ml-12">
                            Modifiez les informations publiques affichées sur votre site.
                        </p>
                    </div>

                    {/* Save indicator */}
                    {saved && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-medium animate-fade-in">
                            <CheckCircle className="w-4 h-4" />
                            Sauvegardé avec succès !
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Company Identity */}
                    <SectionCard icon={Building2} title="Identité de l'Entreprise">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Nom de la Société" required>
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={data.company_name}
                                    onChange={e => setData('company_name', e.target.value)}
                                    placeholder="Ex: LUXORIA"
                                />
                                {errors.company_name && <p className="text-red-400 text-[10px] mt-1">{errors.company_name}</p>}
                            </Field>
                            <Field label="Accroche / Tagline">
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={data.tagline}
                                    onChange={e => setData('tagline', e.target.value)}
                                    placeholder="Ex: Promoteur de Référence Prestige"
                                />
                            </Field>
                        </div>
                    </SectionCard>

                    {/* Page d'accueil */}
                    <SectionCard icon={Globe} title="Page d'Accueil">
                        <Field label="Titre Principal (Hero)">
                            <input
                                type="text"
                                className={inputClass}
                                value={data.hero_title}
                                onChange={e => setData('hero_title', e.target.value)}
                                placeholder="Ex: L'Art de Vivre d'Exception"
                            />
                        </Field>
                        <Field label="Sous-titre Hero">
                            <textarea
                                rows={3}
                                className={textareaClass}
                                value={data.hero_subtitle}
                                onChange={e => setData('hero_subtitle', e.target.value)}
                                placeholder="Description courte de votre activité..."
                            />
                        </Field>
                        <Field label="Texte de présentation (section « Pourquoi nous ? »)">
                            <textarea
                                rows={3}
                                className={textareaClass}
                                value={data.about_text}
                                onChange={e => setData('about_text', e.target.value)}
                                placeholder="Notre promesse repose sur..."
                            />
                        </Field>
                    </SectionCard>

                    {/* Contact Info */}
                    <SectionCard icon={MapPin} title="Informations de Contact">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Adresse — Ligne 1">
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={data.address_line1}
                                    onChange={e => setData('address_line1', e.target.value)}
                                    placeholder="Ex: Marina Tower, Étage 18"
                                />
                            </Field>
                            <Field label="Adresse — Ligne 2">
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={data.address_line2}
                                    onChange={e => setData('address_line2', e.target.value)}
                                    placeholder="Ex: Bd de la Corniche, Casablanca"
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Téléphone Principal">
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        className={inputClass + " pl-9"}
                                        value={data.phone_primary}
                                        onChange={e => setData('phone_primary', e.target.value)}
                                        placeholder="+212 5 22 00 00 00"
                                    />
                                </div>
                            </Field>
                            <Field label="Horaires d'ouverture">
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={data.phone_hours}
                                    onChange={e => setData('phone_hours', e.target.value)}
                                    placeholder="Du Lundi au Samedi: 9h - 20h"
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Email VIP">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="email"
                                        className={inputClass + " pl-9"}
                                        value={data.email_vip}
                                        onChange={e => setData('email_vip', e.target.value)}
                                        placeholder="vip@luxoria.ma"
                                    />
                                    {errors.email_vip && <p className="text-red-400 text-[10px] mt-1">{errors.email_vip}</p>}
                                </div>
                            </Field>
                            <Field label="Email de Contact">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="email"
                                        className={inputClass + " pl-9"}
                                        value={data.email_contact}
                                        onChange={e => setData('email_contact', e.target.value)}
                                        placeholder="contact@luxoria.ma"
                                    />
                                    {errors.email_contact && <p className="text-red-400 text-[10px] mt-1">{errors.email_contact}</p>}
                                </div>
                            </Field>
                        </div>
                    </SectionCard>

                    {/* Stats */}
                    <SectionCard icon={Users} title="Statistiques Affichées">
                        <Field label="Nombre de Clients VIP" hint="Cette valeur est affichée dans les statistiques de la page d'accueil.">
                            <input
                                type="text"
                                className={inputClass}
                                value={data.vip_clients}
                                onChange={e => setData('vip_clients', e.target.value)}
                                placeholder="Ex: 120"
                            />
                        </Field>
                    </SectionCard>

                    {/* Social Media */}
                    <SectionCard icon={Share2} title="Réseaux Sociaux & WhatsApp">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Facebook URL">
                                <input
                                    type="url"
                                    className={inputClass}
                                    value={data.facebook_url}
                                    onChange={e => setData('facebook_url', e.target.value)}
                                    placeholder="https://facebook.com/..."
                                />
                            </Field>
                            <Field label="Instagram URL">
                                <input
                                    type="url"
                                    className={inputClass}
                                    value={data.instagram_url}
                                    onChange={e => setData('instagram_url', e.target.value)}
                                    placeholder="https://instagram.com/..."
                                />
                            </Field>
                            <Field label="LinkedIn URL">
                                <input
                                    type="url"
                                    className={inputClass}
                                    value={data.linkedin_url}
                                    onChange={e => setData('linkedin_url', e.target.value)}
                                    placeholder="https://linkedin.com/..."
                                />
                            </Field>
                            <Field label="WhatsApp (numéro international)" hint="Ex: +212522000000 (sans espaces ni tirets)">
                                <input
                                    type="text"
                                    className={inputClass}
                                    value={data.whatsapp}
                                    onChange={e => setData('whatsapp', e.target.value)}
                                    placeholder="+212522000000"
                                />
                            </Field>
                        </div>
                    </SectionCard>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2 pb-8">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-xl transition-all disabled:opacity-60"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Enregistrement...' : 'Enregistrer les Paramètres'}
                        </button>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}
