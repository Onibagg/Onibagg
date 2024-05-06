<?php
session_start();

$_SESSION['username'] = 'JohnDoe';
$_SESSION['email'] = 'johndoe@example.com';

$username = $_SESSION['username'];
$email = $_SESSION['email'];

echo "Username: " . $username . "<br>";
echo "Email: " . $email;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gabin Demé</title>
    <style>
        body { 
            background: black; 
            text-align: center;
            color: green;
        }

    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Gabrielius (Gabe) Gintalas</h1>
            <nav>
                <ul>
                    <li><a href="#about">About Me</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#resume">Resume</a></li>
                </ul>
            </nav>
        </header>
        <section id="about">
            <h2>Bio</h2>
            <p>Name: Gabrielius (Gabe) Gintalas</p>
            <p>Specialization: Game Development</p>
            <p>Title: ACM Game Dev Officer</p>
            <h2>Contact Info</h2>
            <p>Email address: email@example.com</p>
            <p>Phone number: 123-456-7890</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/example">linkedin.com/in/example</a></p>
            <p>GitHub: <a href="https://github.com/example">github.com/example</a></p>
        </section>
        <section id="technical-skills">
            <h2>Technical Skills</h2>
            <p>Languages: C#, C++, HTML, CSS, GScript</p>
            <p>Frameworks and Libraries: Unity, Godot</p>
            <p>Tools and Software: GitHub, Git, Replit, Visual Studio Code</p>
        </section>
    </div>
</body>
</html>