<?php
include("intranav.html");

echo '<h1>Gestionnaire de fichiers</h1>';

// Fonction récursive pour afficher le contenu du dossier
function afficherContenuDossier($chemin)
{
    // Vérifier si le dossier existe
    if (is_dir($chemin)) {
        // Ouvrir le dossier
        $dossier = opendir($chemin);

        // Initialiser les tableaux pour les dossiers et les fichiers
        $dossiers = [];
        $fichiers = [];

        // Parcourir le contenu du dossier
        while (($element = readdir($dossier)) !== false) {
            // Ignorer les dossiers parent et courant
            if ($element == '.' || $element == '..') {
                continue;
            }

            // Chemin complet de l'élément
            $cheminComplet = $chemin . '/' . $element;

            // Vérifier si c'est un dossier
            if (is_dir($cheminComplet)) {
                // Ajouter le dossier au tableau des dossiers
                $dossiers[] = $element;
            } else {
                // Ajouter le fichier au tableau des fichiers
                $fichiers[] = $element;
            }
        }

        // Tri des dossiers et fichiers par ordre alphabétique
        sort($dossiers);
        sort($fichiers);

        // Afficher un formulaire d'upload de fichiers et de dossiers
        echo '<div class="row">';
        echo '<div class="col-3">';
        echo '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nouveauDossierModal">';
        echo 'Créer un nouveau dossier';
        echo '</button>';
        echo '</div>';
        echo '<div class="col-6">';
        echo '<form action="" method="post" enctype="multipart/form-data">';
        echo '<div class="mb-3 input-group">';
        echo '<input class="form-control" name="fichier[]" type="file" id="formFileMultiple" multiple>';
        echo '<button class="btn btn-success" value="Upload" type="submit">Upload</button>';
        echo '</div>';
        echo '</form>';
        echo '</div>';
        echo '<div class="col-3"></div>';
        echo '</div>';

        // Créer le tableau
        echo '<table class="table">';
        echo '<thead><tr><th>Nom du fichier</th><th>Taille</th><th>Dernière modification</th></tr></thead>';
        echo '<tbody>';

        // Vérifier si ce n'est pas le dossier racine
        if ($chemin !== 'Images') {
            // Afficher un lien pour retourner au dossier parent
            $dossierParent = dirname($chemin);
            echo '<tr><td><a class="text-dark" style="text-decoration: none;" href="?chemin=' . urlencode($dossierParent) . '"><i class="bi bi-arrow-up"></i> Parent</a></td><td></td><td></td></tr>';
        }

        // Afficher les dossiers en premier
        foreach ($dossiers as $dossier) {
            $cheminComplet = $chemin . '/' . $dossier;
            echo '<tr><td><a class="text-dark" style="text-decoration: none;" href="?chemin=' . urlencode($cheminComplet) . '"><i class="bi bi-folder"></i> ' . $dossier . '</a></td><td></td><td></td></tr>';
        }

        // Afficher les fichiers
        foreach ($fichiers as $fichier) {
            $cheminComplet = $chemin . '/' . $fichier;
            $taille = filesize($cheminComplet);
            $dateModif = date("Y-m-d H:i:s", filemtime($cheminComplet));
            echo '<tr><td><a class="text-dark" style="text-decoration: none;" target="_blank" href="' . $cheminComplet . '"><i class="bi bi-file-earmark"></i> ' . $fichier . '</a></td><td>' . $taille . ' octets</td><td>' . $dateModif . '</td></tr>';
        }

        echo '</tbody>';
        echo '</table>';
    } else {
        echo 'Le dossier n\'existe pas.';
    }
}

// Vérifier si un nouveau dossier doit être créé
if (isset($_POST['nomDossier'])) {
    $chemin = $_GET['chemin'];
    $nouveauDossier = $_POST['nomDossier'];

    // Vérifier si le nom du dossier est valide
    if (!empty($nouveauDossier)) {
        $cheminNouveauDossier = $chemin . '/' . $nouveauDossier;

        // Vérifier si le dossier n'existe pas déjà
        if (!file_exists($cheminNouveauDossier)) {
            // Créer le nouveau dossier
            mkdir($cheminNouveauDossier);

            // Afficher un message de succès
            echo '<div class="alert alert-success" role="alert">Le dossier "' . $nouveauDossier . '" a été créé avec succès.</div>';
        } else {
            // Afficher un message d'erreur si le dossier existe déjà
            echo '<div class="alert alert-danger" role="alert">Le dossier "' . $nouveauDossier . '" existe déjà.</div>';
        }
    }
}

// Vérifier si un sous-dossier est spécifié dans l'URL
if (isset($_GET['chemin'])) {
    $sousDossier = $_GET['chemin'];

    // Vérifier si des fichiers ont été uploadés
    if (isset($_FILES['fichier'])) {
        // Emplacement où les fichiers seront sauvegardés
        $emplacement = $sousDossier . '/';

        // Parcourir tous les fichiers uploadés
        foreach ($_FILES['fichier']['tmp_name'] as $index => $tmpName) {
            // Vérifier si le fichier est valide
            if ($_FILES['fichier']['error'][$index] === UPLOAD_ERR_OK) {
                // Chemin de destination du fichier
                $destination = $emplacement . $_FILES['fichier']['name'][$index];

                // Déplacer le fichier vers sa destination finale
                move_uploaded_file($tmpName, $destination);
            }
        }
    }

    afficherContenuDossier($sousDossier);
} else {
    // Chemin du dossier racine à afficher
    $dossierRacine = 'Images';

    // Vérifier si des fichiers ont été uploadés
    if (isset($_FILES['fichier'])) {
        // Emplacement où les fichiers seront sauvegardés
        $emplacement = $dossierRacine . '/';

       // Parcourir tous les fichiers uploadés
        foreach ($_FILES['fichier']['tmp_name'] as $index => $tmpName) {
            // Vérifier si le fichier est valide
            if ($_FILES['fichier']['error'][$index] === UPLOAD_ERR_OK) {
                // Chemin de destination du fichier
                $destination = $emplacement . $_FILES['fichier']['name'][$index];

                // Déplacer le fichier vers sa destination finale
                move_uploaded_file($tmpName, $destination);
            }
        }
    }

    afficherContenuDossier($dossierRacine);
}
?>

<!-- Modal de création de dossier -->
<div class="modal fade" id="nouveauDossierModal" tabindex="-1" aria-labelledby="nouveauDossierModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="nouveauDossierModalLabel">Créer un nouveau dossier</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="" method="post">
                    <div class="mb-3">
                        <label for="nomDossier" class="form-label">Nom du dossier</label>
                        <input type="text" class="form-control" id="nomDossier" name="nomDossier" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Créer</button>
                </form>
            </div>
        </div>
    </div>
</div>


</div>

<?php
include("intranavclose.html");
?>
