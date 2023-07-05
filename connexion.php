<?php
$submitted = isset($_POST['submit']);

if ($submitted) {
    $username = $_POST['uname'];
    $password = $_POST['pswd'];

    $users = [];

    if (file_exists('Json/users.json')) {
        $users = json_decode(file_get_contents('Json/users.json'), true);
    }

    $valid = false;

    foreach ($users as $user) {
        if ($user['username'] === $username && $user['password'] === $password) {
            $valid = true;
            break;
        }
    }
}


?>

<!DOCTYPE html>
<html>

<head>
    <title>Page de Connexion</title>
    <link rel="stylesheet" type="text/css" href="connexion.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <button type="button" class="btn btn-outline-dark text-black custom-btn" data-bs-toggle="modal" data-bs-target="#myModal" style="width: 150px; height: 130px;" onmouseover="document.getElementById('texte5').style.fontWeight='bold';" onmouseout="document.getElementById('texte5').style.fontWeight='normal';">
        <img id="connexion" src="Images/person.png" width="40" height="40" class="rounded" alt="Connexion"></br></br>
        <p id="texte5">Connexion</p>
    </button>

    <div class="modal fade" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="login-form">
                    <form id="connexion" action="connexion.php" method="POST" class="needs-validation">
                        <div class="modal-header">
                            <p class="modal-title display-5">Connexion</p>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">

                            <br>
                            <div class="form-group">
                                <label for="uname" class="form-label">Utilisateur:</label>
                                <input type="text" class="form-control" id="user" name="user" placeholder="Utilisateur" required>
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">Veuillez compléter ce champ</div>
                            </div>
                            <br>

                            <div class="form-group">
                                <label>Mot de passe</label>
                                <input type="password" class="form-control" id="mdp" name="mdp" placeholder="Mot de passe" required>
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">Veuillez compléter ce champ</div>
                            </div>
                            <!-- 
                        <div class="form-group">
                            <a href="reset-password.php">Mot de passe oublié ?</a>
                        </div> 
                        -->
                            <br>
                            <div class="form-group">
                                Pas de compte? <a href="new-account.php">Faire une demande</a>
                            </div>

                        </div>

                        <div class="modal-footer">
                            <div class="form-group">
                                <button type="submit" name="connexion" class="btn btn-outline-dark">Se connecter</button>
                            </div>
                        </div>
                    </form>
                </div>
                <?php
                if (isset($_POST['connexion'])) {
                    connexion();
                } else {
                }
                ?>
            </div>
        </div>
    </div>
</body>

</html>

<?php


function file_decod($file)
{
    return json_decode(file_get_contents($file), true);
}

function connexion()
{
    if (!isset($_POST['user'])) {
        echo 'Utilisateur non renseigné';
        $user = "";
    } else {
        $user = $_POST['user'];
    }

    if (!isset($_POST['mdp'])) {
        echo 'Mot de Passe non renseigné';
        $mdp = "";
    } else {
        $mdp = $_POST['mdp'];
    }

    $data = file_decod('Json/user.json');
    $ok = false;

    // foreach ($data as $u) {
    //     if ($u['user'] == $user && password_verify($mdp, $u['mdp']) == true) {
    //         $ok = true;
    //         break;
    //     }
    // }
    foreach ($data as $u) {
        if ($u['username'] == $user && $u['password'] == $mdp ) {
            $ok = true;
            break;
        }
    }

    if ($ok) {
        $_SESSION["user"] = $user;
        echo '<meta http-equiv="refresh" content="0; url=intranet.php">';
    }
}
?>