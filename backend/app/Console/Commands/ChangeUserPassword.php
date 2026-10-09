<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class ChangeUserPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:password {email? : L\'adresse email de l\'utilisateur} {password? : Le nouveau mot de passe}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Changer le mot de passe ou le rôle d\'un utilisateur (Admin / Commercial / Client)';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email') ?? $this->ask('Adresse email du compte à modifier :');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("Aucun utilisateur trouvé avec l'email : {$email}");
            return Command::FAILURE;
        }

        $password = $this->argument('password') ?? $this->secret('Entrez le nouveau mot de passe sécurisé :');

        if (empty($password)) {
            $this->error('Le mot de passe ne peut pas être vide.');
            return Command::FAILURE;
        }

        $user->password = Hash::make($password);
        $user->save();

        $this->info("✓ Mot de passe mis à jour avec succès pour {$user->name} ({$user->email}, Rôle : {$user->role}) !");

        return Command::SUCCESS;
    }
}
