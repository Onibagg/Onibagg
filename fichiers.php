<?php
include("intranav.html");
?>

<h1>Gestionnaire de fichiers</h1>
<?php
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

        // Créer le tableau
        echo '<table class="table">';
        echo '<thead><tr><th>Nom du fichier</th><th>Taille</th><th>Dernière modification</th><th></th></tr></thead>';
        echo '<tbody>';

        // Vérifier si ce n'est pas le dossier racine
        if ($chemin !== 'Images') {
            // Afficher un lien pour retourner au dossier parent
            $dossierParent = dirname($chemin);
            echo '<tr><td><a class="text-dark" style="text-decoration: none;" href="?chemin=' . urlencode($dossierParent) . '"><i class="bi bi-arrow-up"></i> Parent</a></td><td></td><td></td><td></td></tr>';
        }

        // Afficher les dossiers en premier
        foreach ($dossiers as $dossier) {
            $cheminComplet = $chemin . '/' . $dossier;
            echo '<tr><td><a class="text-dark" style="text-decoration: none;" href="?chemin=' . urlencode($cheminComplet) . '"><i class="bi bi-folder"></i> ' . $dossier . '</a></td><td></td><td></td><td><a href="#" data-bs-toggle="modal" data-bs-target="#modalNomDossier" data-dossier="' . $dossier . '"><i class="bi bi-pencil"></i></a></td></tr>';
        }

        // Afficher les fichiers
        foreach ($fichiers as $fichier) {
            $cheminComplet = $chemin . '/' . $fichier;
            $taille = filesize($cheminComplet);
            $dateModif = date("Y-m-d H:i:s", filemtime($cheminComplet));
            echo '<tr><td><a class="text-dark" style="text-decoration: none;" target="_blank" href="' . $cheminComplet . '"><i class="bi bi-file-earmark"></i> ' . $fichier . '</a></td><td>' . $taille . ' octets</td><td>' . $dateModif . '</td><td><a href="#" data-bs-toggle="modal" data-bs-target="#modalNomFichier" data-fichier="' . $fichier . '"><i class="bi bi-pencil"></i></a></td></tr>';
        }

        echo '</tbody>';
        echo '</table>';

        // Fermer le dossier
        // closedir($dossier);
    } else {
        echo 'Le dossier n\'existe pas.';
    }
}

// Vérifier si un sous-dossier est spécifié dans l'URL
if (isset($_GET['chemin'])) {
    $sousDossier = $_GET['chemin'];
    afficherContenuDossier($sousDossier);
} else {
    // Chemin du dossier racine à afficher
    $dossierRacine = 'Images';
    afficherContenuDossier($dossierRacine);
}
?>

<!-- Modal pour modifier le nom du dossier -->
<div class="modal fade" id="modalNomDossier" tabindex="-1" aria-labelledby="modalNomDossierLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalNomDossierLabel">Modifier le nom du dossier</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="dossierOldName">
                <input type="text" class="form-control" placeholder="Nouveau nom du dossier" id="dossierNewName">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary" onclick="modifierNomDossier()">Enregistrer</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal pour modifier le nom du fichier -->
<div class="modal fade" id="modalNomFichier" tabindex="-1" aria-labelledby="modalNomFichierLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalNomFichierLabel">Modifier le nom du fichier</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="fichierOldName">
                <input type="text" class="form-control" placeholder="Nouveau nom du fichier" id="fichierNewName">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary" onclick="modifierNomFichier()">Enregistrer</button>
            </div>
        </div>
    </div>
</div>

<script>
    // Fonction pour modifier le nom du dossier
    function modifierNomDossier() {
        var ancienNom = document.getElementById('dossierOldName').value;
        var nouveauNom = document.getElementById('dossierNewName').value;

        // Effectuer une requête AJAX pour modifier le nom du dossier sur le serveur
        // Remplacez l'URL "modifier_dossier.php" par l'URL de votre script de modification de nom de dossier
        $.ajax({
            url: 'modifier_dossier.php',
            type: 'POST',
            data: {
                ancienNom: ancienNom,
                nouveauNom: nouveauNom
            },
            success: function(response) {
                // Traitement de la réponse du serveur
                if (response === 'success') {
                    // Le nom du dossier a été modifié avec succès
                    // Actualiser la page ou effectuer toute autre action nécessaire
                    location.reload();
                } else {
                    // Une erreur s'est produite lors de la modification du nom du dossier
                    // Afficher un message d'erreur ou effectuer toute autre action nécessaire
                    alert('Erreur lors de la modification du nom du dossier.');
                }
            },
            error: function() {
                // Une erreur s'est produite lors de la requête AJAX
                // Afficher un message d'erreur ou effectuer toute autre action nécessaire
                alert('Erreur de communication avec le serveur.');
            }
        });
    }

    // Fonction pour modifier le nom du fichier
    function modifierNomFichier() {
        var ancienNom = document.getElementById('fichierOldName').value;
        var nouveauNom = document.getElementById('fichierNewName').value;

        // Effectuer une requête AJAX pour modifier le nom du fichier sur le serveur
        // Remplacez l'URL "modifier_fichier.php" par l'URL de votre script de modification de nom de fichier
        $.ajax({
            url: 'modifier_fichier.php',
            type: 'POST',
            data: {
                ancienNom: ancienNom,
                nouveauNom: nouveauNom
            },
            success: function(response) {
                // Traitement de la réponse du serveur
                if (response === 'success') {
                    // Le nom du fichier a été modifié avec succès
                    // Actualiser la page ou effectuer toute autre action nécessaire
                    location.reload();
                } else {
                    // Une erreur s'est produite lors de la modification du nom du fichier
                    // Afficher un message d'erreur ou effectuer toute autre action nécessaire
                    alert('Erreur lors de la modification du nom du fichier.');
                }
            },
            error: function() {
                // Une erreur s'est produite lors de la requête AJAX
                // Afficher un message d'erreur ou effectuer toute autre action nécessaire
                alert('Erreur de communication avec le serveur.');
            }
        });
    }

    // Gérer l'événement d'ouverture du modal pour modifier le nom du dossier
    $('#modalNomDossier').on('show.bs.modal', function(event) {
        var bouton = $(event.relatedTarget);
        var dossier = bouton.data('dossier');
        var modal = $(this);
        modal.find('.modal-title').text('Modifier le nom du dossier ' + dossier);
        modal.find('#dossierOldName').val(dossier);
        modal.find('#dossierNewName').val(dossier);
    });

    // Gérer l'événement d'ouverture du modal pour modifier le nom du fichier
    $('#modalNomFichier').on('show.bs.modal', function(event) {
        var bouton = $(event.relatedTarget);
        var fichier = bouton.data('fichier');
        var modal = $(this);
        modal.find('.modal-title').text('Modifier le nom du fichier ' + fichier);
        modal.find('#fichierOldName').val(fichier);
        modal.find('#fichierNewName').val(fichier);
    });
</script>



</diV>


<?php
include("intranavclose.html");
?>