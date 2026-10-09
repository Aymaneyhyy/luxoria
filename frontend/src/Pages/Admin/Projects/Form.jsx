import React, { useState, useRef } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Building2, Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ProjectForm({ project }) {
    const isEditing = !!project;
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(project?.image || null);
    const [isDragging, setIsDragging] = useState(false);

    const { data, setData, post, processing, errors, transform } = useForm({
        name:        project?.name        || '',
        type:        project?.type        || 'Villa',
        description: project?.description || '',
        price:       project?.price       || '',
        location:    project?.location    || '',
        status:      project?.status      || 'Disponible',
        surface:     project?.surface     || '',
        bedrooms:    project?.bedrooms    || 3,
        bathrooms:   project?.bathrooms   || 2,
        image_file:  null,
        image:       project?.image       || '',
        is_featured: project?.is_featured ?? true,
        _method:     isEditing ? 'PUT' : 'POST',
    });

    const handleFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image (JPG, PNG, WebP).');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('La taille de l\'image ne doit pas dépasser 5 Mo.');
            return;
        }
        setData('image_file', file);
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e) => handleFile(e.target.files[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const removeImage = () => {
        setData('image_file', null);
        setData('image', '');
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Always POST with _method spoofing for file upload (multipart)
        post(isEditing ? `/admin/projects/${project.id}` : '/admin/projects', {
            forceFormData: true,
        });
    };

    const inputClass = "w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-colors";
    const labelClass = "block text-xs font-medium text-slate-300 mb-2";
    const errorClass = "text-red-400 text-[10px] mt-1";

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
                    
                    {/* Name & Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Nom du Projet *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Ex: Villa Royale Marina"
                                className={inputClass}
                            />
                            {errors.name && <div className={errorClass}>{errors.name}</div>}
                        </div>

                        <div>
                            <label className={labelClass}>Type de Bien *</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className={inputClass}
                            >
                                <option value="Villa">Villa</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Appartement">Appartement</option>
                                <option value="Résidence">Résidence</option>
                                <option value="Domaine">Domaine</option>
                            </select>
                        </div>
                    </div>

                    {/* Price, Location, Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Prix de Vente (MAD) *</label>
                            <input
                                type="number"
                                step="1000"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                required
                                placeholder="Ex: 2500000"
                                className={inputClass}
                            />
                            {errors.price && <div className={errorClass}>{errors.price}</div>}
                        </div>

                        <div>
                            <label className={labelClass}>Localisation / Ville *</label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                required
                                placeholder="Ex: Marina Bay, Casablanca"
                                className={inputClass}
                            />
                            {errors.location && <div className={errorClass}>{errors.location}</div>}
                        </div>

                        <div>
                            <label className={labelClass}>Statut de Commercialisation *</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className={inputClass}
                            >
                                <option value="Disponible">Disponible</option>
                                <option value="En Construction">En Construction</option>
                                <option value="Vendu / Réservé">Vendu / Réservé</option>
                            </select>
                        </div>
                    </div>

                    {/* Surface, Bedrooms, Bathrooms */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Surface (m²) *</label>
                            <input
                                type="number"
                                value={data.surface}
                                onChange={(e) => setData('surface', e.target.value)}
                                required
                                placeholder="Ex: 450"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Nombre de Chambres</label>
                            <input
                                type="number"
                                value={data.bedrooms}
                                onChange={(e) => setData('bedrooms', e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Nombre de SDB</label>
                            <input
                                type="number"
                                value={data.bathrooms}
                                onChange={(e) => setData('bathrooms', e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* ===== IMAGE UPLOAD ===== */}
                    <div>
                        <label className={labelClass}>Image Principale du Projet</label>

                        {preview ? (
                            /* Preview with remove button */
                            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 group">
                                <img
                                    src={preview}
                                    alt="Aperçu"
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-semibold"
                                    >
                                        <Upload className="w-3.5 h-3.5" />
                                        Changer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        Supprimer
                                    </button>
                                </div>
                                {/* File name badge */}
                                {data.image_file && (
                                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 text-[10px] text-[#D4AF37] font-medium truncate max-w-[80%]">
                                        {data.image_file.name}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Drag & Drop zone */
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`
                                    relative flex flex-col items-center justify-center gap-4 
                                    w-full h-48 rounded-2xl border-2 border-dashed cursor-pointer
                                    transition-all duration-300
                                    ${isDragging 
                                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.01]' 
                                        : 'border-white/20 bg-[#0A0A0B] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5'
                                    }
                                `}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                                    <ImageIcon className="w-7 h-7" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-300">
                                        Glissez votre photo ici, ou{' '}
                                        <span className="text-[#D4AF37] underline underline-offset-2">parcourez</span>
                                    </p>
                                    <p className="text-[10px] text-slate-600 mt-1">
                                        JPG, PNG, WebP — max 5 Mo
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        {errors.image_file && <div className={errorClass}>{errors.image_file}</div>}
                    </div>
                    {/* ======================= */}

                    {/* Description */}
                    <div>
                        <label className={labelClass}>Description Détaillée *</label>
                        <textarea
                            rows="5"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                            placeholder="Décrivez les prestations haut de gamme du bien..."
                            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                        {errors.description && <div className={errorClass}>{errors.description}</div>}
                    </div>

                    {/* Featured toggle */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                        <input
                            id="is_featured"
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                            className="w-4 h-4 accent-[#D4AF37]"
                        />
                        <label htmlFor="is_featured" className="text-xs font-medium text-slate-300 cursor-pointer">
                            Mettre en avant sur la page d'accueil (Collection Vedette)
                        </label>
                    </div>

                    {/* Actions */}
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
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors disabled:opacity-60"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Enregistrement...' : isEditing ? 'Mettre à jour le projet' : 'Enregistrer le projet'}
                        </button>
                    </div>

                </form>
            </div>

        </AdminLayout>
    );
}
