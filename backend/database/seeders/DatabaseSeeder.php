<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Buyer;
use App\Models\ContactMessage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles & Utilisateurs
        User::updateOrCreate(
            ['email' => 'admin@luxoria.com'],
            [
                'name' => 'Directeur Général LUXORIA',
                'role' => 'admin',
                'password' => Hash::make('Luxoria2026#SecurePass!'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'agent@luxoria.com'],
            [
                'name' => 'Agent Commercial VIP',
                'role' => 'agent',
                'password' => Hash::make('agent123'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'sophia.bennani@luxury.ma'],
            [
                'name' => 'Mme Sophia Bennani',
                'role' => 'client',
                'password' => Hash::make('client123'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Luxury Projects
        $p1 = Project::updateOrCreate(
            ['slug' => 'villa-royale-marina'],
            [
                'name' => 'Villa Royale Marina',
                'type' => 'Villa',
                'description' => 'Superbe villa contemporaine en bord de mer offrant une vue panoramique à 180° sur l\'océan. Domotique intégrée, piscine à débordement chauffée et accès direct à la marina privée.',
                'price' => 3800000.00,
                'location' => 'Marina Bay, Casablanca',
                'status' => 'Disponible',
                'surface' => 650,
                'bedrooms' => 5,
                'bathrooms' => 6,
                'image' => '/images/projects/villa_marina.png',
                'gallery' => [
                    '/images/projects/villa_marina.png',
                    '/images/projects/penthouse_skyline.png',
                ],
                'features' => [
                    'Piscine Infinity Chauffée',
                    'Vue Panoramique Mer',
                    'Garage Fermé 4 Véhicules',
                    'Spa & Hammam Privatif',
                    'Système Domotique Smart-Home',
                    'Sécurité Visiophone 24/7'
                ],
                'is_featured' => true,
            ]
        );

        $p2 = Project::updateOrCreate(
            ['slug' => 'le-penthouse-horizon'],
            [
                'name' => 'Le Penthouse Horizon',
                'type' => 'Penthouse',
                'description' => 'Penthouse d\'exception occupant les deux derniers étages avec terrasse privée sur le toit, jacuzzi et ascenseur privatif directement connecté à la suite principale.',
                'price' => 2450000.00,
                'location' => 'Triangle d\'Or, Casablanca',
                'status' => 'Disponible',
                'surface' => 420,
                'bedrooms' => 4,
                'bathrooms' => 4,
                'image' => '/images/projects/penthouse_skyline.png',
                'gallery' => [
                    '/images/projects/penthouse_skyline.png',
                    '/images/projects/residence_pearl.png',
                ],
                'features' => [
                    'Rooftop Jacuzzi Privé',
                    'Hauteur sous plafond 4m50',
                    'Cuisine Italienne Sur Mesure',
                    'Ascenseur avec Code VIP',
                    'Conciergerie Luxury 24/7'
                ],
                'is_featured' => true,
            ]
        );

        $p3 = Project::updateOrCreate(
            ['slug' => 'residence-pearl-beach'],
            [
                'name' => 'Résidence Pearl Beach',
                'type' => 'Appartement',
                'description' => 'Appartement de haut standing au cœur d\'une résidence fermée sécurisée avec jardins botaniques, lounge privé et salle de fitness ultramoderne.',
                'price' => 980000.00,
                'location' => 'Corniche d\'Anfa, Casablanca',
                'status' => 'En Construction',
                'surface' => 195,
                'bedrooms' => 3,
                'bathrooms' => 3,
                'image' => '/images/projects/residence_pearl.png',
                'gallery' => [
                    '/images/projects/residence_pearl.png',
                    '/images/projects/villa_marina.png',
                ],
                'features' => [
                    'Jardins Botaniques Privés',
                    'Salle de Fitness & Lounge VIP',
                    'Finition Marbre Carrara',
                    'Parkings en Sous-sol Sécurisés'
                ],
                'is_featured' => true,
            ]
        );

        $p4 = Project::updateOrCreate(
            ['slug' => 'palais-emeraude'],
            [
                'name' => 'Palais Émeraude',
                'type' => 'Villa',
                'description' => 'Domaine d\'exception inspiré de l\'architecture néo-mauresque et contemporaine, niché au milieu d\'une oliveraie centenaire avec piscine olympique et pavillon d\'invités.',
                'price' => 6200000.00,
                'location' => 'La Palmeraie, Marrakech',
                'status' => 'Vendu / Réservé',
                'surface' => 1200,
                'bedrooms' => 7,
                'bathrooms' => 8,
                'image' => '/images/projects/palais_emeraude.png',
                'gallery' => [
                    '/images/projects/palais_emeraude.png',
                    '/images/projects/villa_marina.png',
                ],
                'features' => [
                    'Parc Paysagé 10 000 m²',
                    'Piscine Olympique 25m',
                    'Pavillon Invités Indépendant',
                    'Héliport Privé sur Propriété'
                ],
                'is_featured' => false,
            ]
        );

        // 3. Sample Buyers & Transactions
        Buyer::firstOrCreate(
            ['reference_code' => 'LUX-2026-0101'],
            [
                'project_id' => $p1->id,
                'full_name' => 'Mme Sophia BENNANI',
                'cin' => 'BE894521',
                'phone' => '+212 6 61 23 45 67',
                'email' => 'sophia.bennani@luxury.ma',
                'address' => '14 Avenue Montaigne, Casablanca',
                'property_type' => 'Villa',
                'unit_number' => 'Villa Royale N°02',
                'surface' => 650,
                'agreed_price' => 3800000.00,
                'paid_amount' => 1140000.00, // 30% Acompte
                'payment_method' => 'Virement bancaire',
                'payment_date' => '2026-08-15',
                'payment_status' => 'Acompte (30%)',
                'notes' => 'Acompte versé par virement BMCE Private Banking. Prochain versement prévu le 15 Novembre 2026.',
            ]
        );

        Buyer::firstOrCreate(
            ['reference_code' => 'LUX-2026-0088'],
            [
                'project_id' => $p4->id,
                'full_name' => 'M. Karim ALAMI',
                'cin' => 'AB340192',
                'phone' => '+212 6 62 88 99 00',
                'email' => 'k.alami@holding.ma',
                'address' => 'Palais de la Palmeraie, Marrakech',
                'property_type' => 'Villa',
                'unit_number' => 'Domaine Émeraude N°01',
                'surface' => 1200,
                'agreed_price' => 6200000.00,
                'paid_amount' => 6200000.00, // 100% Réglé
                'payment_method' => 'Chèque certifié',
                'payment_date' => '2026-07-28',
                'payment_status' => 'Réglé à 100%',
                'notes' => 'Paiement intégral finalisé. Acte notarié signé devant Me El Fassi.',
            ]
        );

        Buyer::firstOrCreate(
            ['reference_code' => 'LUX-2026-0120'],
            [
                'project_id' => $p2->id,
                'full_name' => 'Dr. Alexandre DUBOIS',
                'cin' => 'FR9823411',
                'phone' => '+33 6 12 34 56 78',
                'email' => 'alexandre.dubois@clinique-paris.fr',
                'address' => '45 Boulevard Saint-Germain, 75005 Paris',
                'property_type' => 'Penthouse',
                'unit_number' => 'Penthouse Horizon 14B',
                'surface' => 420,
                'agreed_price' => 2450000.00,
                'paid_amount' => 1470000.00, // 60% Partiel
                'payment_method' => 'Virement bancaire',
                'payment_date' => '2026-08-02',
                'payment_status' => 'Partiel (60%)',
                'notes' => 'Deuxième tranche réglée suite à l\'avancement des travaux de finition intérieure.',
            ]
        );

        // 4. Contact Messages
        ContactMessage::firstOrCreate(
            ['email' => 'youssef.tazi@invest.ma', 'subject' => 'Demande de brochure privée'],
            [
                'name' => 'M. Youssef TAZI',
                'phone' => '+212 6 63 44 55 66',
                'project_name' => 'Villa Royale Marina',
                'message' => 'Bonjour, je souhaiterais obtenir les plans d\'architecte détaillés et fixer un rendez-vous privé pour visiter la Villa Royale Marina.',
                'is_read' => false,
            ]
        );

        ContactMessage::firstOrCreate(
            ['email' => 'leila.chraibi@gmail.com', 'subject' => 'Information sur le Penthouse Horizon'],
            [
                'name' => 'Mme Leila CHRAIBI',
                'phone' => '+212 6 61 99 88 77',
                'project_name' => 'Le Penthouse Horizon',
                'message' => 'Est-il possible de personnaliser les revêtements de marbre avant la livraison prévue ? Merci pour votre retour.',
                'is_read' => true,
            ]
        );
    }
}
