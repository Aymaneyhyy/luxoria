<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Reçu de Vente - LUXORIA #{{ $buyer->reference_code }}</title>
    <style>
        @page {
            margin: 25px 30px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 1.5;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        .brand-title {
            font-size: 26px;
            font-weight: bold;
            letter-spacing: 3px;
            color: #0A0A0B;
            margin: 0;
            text-transform: uppercase;
        }
        .brand-subtitle {
            font-size: 11px;
            letter-spacing: 2px;
            color: #D4AF37;
            margin-top: 3px;
            text-transform: uppercase;
            font-weight: 600;
        }
        .doc-title-box {
            text-align: right;
        }
        .doc-title {
            font-size: 18px;
            font-weight: bold;
            color: #D4AF37;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .doc-meta {
            font-size: 11px;
            color: #666666;
            margin-top: 4px;
        }
        .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #0A0A0B;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-left: 3px solid #D4AF37;
            padding-left: 8px;
            margin-bottom: 10px;
        }
        .info-grid {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .info-box {
            width: 48%;
            vertical-align: top;
            background-color: #FAFAFA;
            border: 1px solid #EAEAEA;
            border-radius: 4px;
            padding: 12px 15px;
        }
        .info-label {
            font-size: 10px;
            text-transform: uppercase;
            color: #888888;
            font-weight: bold;
            margin-bottom: 2px;
        }
        .info-value {
            font-size: 13px;
            color: #111111;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .table-financial {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            margin-bottom: 25px;
        }
        .table-financial th {
            background-color: #0A0A0B;
            color: #D4AF37;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 10px 12px;
            text-align: left;
            border: 1px solid #0A0A0B;
        }
        .table-financial td {
            padding: 11px 12px;
            border: 1px solid #EAEAEA;
            font-size: 12px;
        }
        .table-financial tr:nth-child(even) {
            background-color: #FAFAFA;
        }
        .badge-status {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            background-color: #FFF8E7;
            color: #B8860B;
            border: 1px solid #F3E5AB;
        }
        .signature-table {
            width: 100%;
            margin-top: 40px;
            border-collapse: collapse;
        }
        .signature-box {
            width: 45%;
            vertical-align: top;
            text-align: center;
            border-top: 1px solid #CCCCCC;
            padding-top: 10px;
            font-size: 11px;
            color: #555555;
        }
        .footer-note {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 9px;
            color: #999999;
            border-top: 1px solid #EEEEEE;
            padding-top: 8px;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <table class="header-table">
        <tr>
            <td style="width: 50%;">
                <div class="brand-title">LUXORIA</div>
                <div class="brand-subtitle">PROMOTION IMMOBILIÈRE DE LUXE</div>
            </td>
            <td class="doc-title-box" style="width: 50%;">
                <div class="doc-title">REÇU DE VENTE</div>
                <div class="doc-meta">Réf: <strong>{{ $buyer->reference_code }}</strong></div>
                <div class="doc-meta">Date d'émission: <strong>{{ \Carbon\Carbon::parse($buyer->payment_date)->format('d/m/Y') }}</strong></div>
            </td>
        </tr>
    </table>

    <!-- Buyer & Property Grid -->
    <table style="width: 100%; margin-bottom: 20px;">
        <tr>
            <td class="info-box" style="width: 48%;">
                <div class="section-title">INFORMATIONS ACQUÉREUR</div>
                
                <div class="info-label">Nom & Prénom</div>
                <div class="info-value">{{ $buyer->full_name }}</div>

                <div class="info-label">CIN / Passeport</div>
                <div class="info-value">{{ $buyer->cin }}</div>

                <div class="info-label">Téléphone & Email</div>
                <div class="info-value">{{ $buyer->phone }} | {{ $buyer->email }}</div>

                <div class="info-label">Adresse Résidentielle</div>
                <div class="info-value" style="margin-bottom: 0;">{{ $buyer->address }}</div>
            </td>

            <td style="width: 4%;"></td>

            <td class="info-box" style="width: 48%;">
                <div class="section-title">DÉTAILS DU BIEN IMMOBILIER</div>

                <div class="info-label">Projet Immobiler</div>
                <div class="info-value">{{ $buyer->project ? $buyer->project->name : 'LUXORIA Residence' }}</div>

                <div class="info-label">Emplacement</div>
                <div class="info-value">{{ $buyer->project ? $buyer->project->location : '-' }}</div>

                <div class="info-label">Type & Numéro de Lot</div>
                <div class="info-value">{{ $buyer->property_type }} - {{ $buyer->unit_number }}</div>

                <div class="info-label">Surface Habitable</div>
                <div class="info-value" style="margin-bottom: 0;">{{ number_format($buyer->surface, 0, ',', ' ') }} m²</div>
            </td>
        </tr>
    </table>

    <!-- Financial Table -->
    <div class="section-title">DÉCOMPTE FINANCIER DE LA TRANSACTION</div>
    <table class="table-financial">
        <thead>
            <tr>
                <th>Désignation</th>
                <th>Prix Total Convenu</th>
                <th>Montant Réglé</th>
                <th>Solde Restant</th>
                <th>Mode de Paiement</th>
                <th>Statut</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>Acompte / Tranche de paiement</strong><br>
                    <span style="font-size: 10px; color: #777;">Réf. {{ $buyer->reference_code }}</span>
                </td>
                <td><strong>{{ number_format($buyer->agreed_price, 2, ',', ' ') }} MAD</strong></td>
                <td style="color: #2E7D32; font-weight: bold;">{{ number_format($buyer->paid_amount, 2, ',', ' ') }} MAD</td>
                <td style="color: #C62828;">{{ number_format($buyer->agreed_price - $buyer->paid_amount, 2, ',', ' ') }} MAD</td>
                <td>{{ $buyer->payment_method }}</td>
                <td>
                    <span class="badge-status">{{ $buyer->payment_status }}</span>
                </td>
            </tr>
        </tbody>
    </table>

    @if($buyer->notes)
        <div style="background-color: #F8F9FA; border-left: 3px solid #666; padding: 10px 12px; margin-bottom: 25px; font-size: 11px; color: #555;">
            <strong>Note Particulière :</strong> {{ $buyer->notes }}
        </div>
    @endif

    <!-- Signatures -->
    <table class="signature-table">
        <tr>
            <td class="signature-box">
                <strong>Cachet & Signature LUXORIA</strong><br><br><br><br>
                <em>Direction Commerciale VIP</em>
            </td>
            <td style="width: 10%;"></td>
            <td class="signature-box">
                <strong>Signature de l'Acquéreur</strong><br><br><br><br>
                <em>Lu et approuvé - {{ $buyer->full_name }}</em>
            </td>
        </tr>
    </table>

    <div class="footer-note">
        LUXORIA Promotion Immobilière S.A. | Siège Social: {{ \App\Models\Setting::get('address_line1', 'LUXORIA') }} | Tél: {{ \App\Models\Setting::get('phone_primary', '') }} | Email: {{ \App\Models\Setting::get('email_vip', '') }}
    </div>

</body>
</html>
