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
    <form action="" class="<?php if (isset($_POST['submit'])) echo 'was-validated'; ?>">
        <div class="row">

            <div class="col">
                <a href="/">
                    <img src="Images/maison.png" style="height: 100px;">
                </a>


            </div>
            <div class="col">
                <div class="card mt-5">
                    <div class="card-header display-4">Connexion</div>
                    <div class="card-body">

                        <div class=" ms-5 me-5 mb-3 mt-3">
                            <label for="uname">Nom d'utilisateur:</label>
                            <input type="text" class="form-control" id="uname" placeholder="Entrez votre nom d'utilisateur" name="uname" required>
                            <div class="valid-feedback">OK.</div>
                            <div class="invalid-feedback">Veuillez remplir ce champ.</div>
                        </div>
                        <div class=" ms-5 me-5 mb-5">
                            <label for="pwd" class="form-label">Mot de passe:</label>
                            <input type="password" class="form-control" id="pwd" placeholder="Entrez votre mot de passe" name="pswd" required>
                            <div class="valid-feedback">OK.</div>
                            <div class="invalid-feedback">Veuillez remplir ce champ.</div>
                        </div>
                        <button type="submit" class="mt-2 btn btn-primary">Submit</button>
                    </div>
                </div>
                <?php if ($submitted && !$valid) : ?>
                    <div class="error-message">Invalid username or password.</div>
                <?php endif; ?>
                <?php if ($submitted && $valid) : ?>
                    <div class="success-message">Login successful.</div>
                <?php endif; ?>
            </div>
            <div class="col"></div>
        </div>
    </form>
</body>

</html>