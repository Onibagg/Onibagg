function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

const observer = new MutationObserver((mutations) => {
    scrollToBottom(); // Scroll to bottom every time a mutation occurs
});

observer.observe(document.body, {
    childList: true, // direct children changes
    subtree: true, // all descendants changes
    characterData: true // text changes
});
// observer.disconnect();

document.addEventListener('DOMContentLoaded', function() {
    var inputArea = document.getElementById('inputArea');
    inputArea.focus(); // Met le focus sur la textarea dès que le DOM est chargé

    var banner = [
        "           /\\                  ",
        "          /**\\                 ",
        "         /****\\   /\\      ",
        "        /      \\ /**\\     ",
        "       /  /\\    /    \\    ",
        "      /  /  \\  /      \\   ",
        "     /  /    \\/ /\\     \\  ",
        "    /  /      \\/  \\/\\   \\ ",
        "   /__/_______/___/\\_\\___\\ "
    ];

    var name_banner = [
        "",
        "",
        "   ______      __    _          ____                  __",
        "  / ____/___  / /_  (_)___     / __ \\___  ____ ___  _/_/",
        " / / __/ __ `/ __ \\/ / __ \\   / / / / _ \\/ __ `__ \\/ _ \\",
        "/ /_/ / /_/ / /_/ / / / / /  / /_/ /  __/ / / / / /  __/",
        "\\____/\\__,_/_.___/_/_/ /_/  /_____/\\___/_/ /_/ /_/\\___/ ",
        "",
        "                     \u00A9 " + new Date().getFullYear()
    ];

    function padRight(str, length) {
        return str + " ".repeat(Math.max(0, length - str.length));
    }

    var mergedBanner = "";
    for (var i = 0; i < Math.max(banner.length, name_banner.length); i++) {
        var line1 = banner[i] || ""; 
        var line2 = name_banner[i] || ""; 
        mergedBanner += line1 + padRight(line2, 53) + "\n"; 
    }

    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML += `<pre>${mergedBanner}</pre>`;
    outputDiv.innerHTML += 'Welcome to Gabin Demé\'s Terminal!<br>';
    outputDiv.innerHTML += 'Type <gab id="glow_cmd">help</gab> to view a list of available commands.<br><br>';
});

document.addEventListener('click', function(event) {
    var inputArea = document.getElementById('inputArea');
    if (event.target !== inputArea) {
        inputArea.focus();
    }
}, false);

document.getElementById('inputArea').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Empêche le retour à la ligne dans la textarea
        var inputText = this.value.trim(); // Utilisez trim ici pour nettoyer l'entrée dès le départ
        
        switch (inputText) {
            case 'clear':
                document.getElementById('output').innerHTML = ''; // Efface tout le contenu de la div
                break;
            case '':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + '<br>'; // Ajoute simplement une nouvelle ligne
                break;
            case 'help':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="help_out">Available commands: <gab id="glow_cmd">clear</gab>, <gab id="glow_cmd">help</gab>, <gab id="glow_cmd">cv</gab></p>';
                break;
            case 'cv':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<br><p id="cv_out">Downloading my CV...<p>';
                var link = document.createElement('a');
                link.href = 'Downloads/CV_Gabin-Deme.pdf';
                link.download = 'CV_Gabin-Deme.pdf';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                break;
            case 'banner':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="banner_out>';
                var outputDiv = document.getElementById('output');
                outputDiv.innerHTML += `<pre>${mergedBanner}</pre>`;
                outputDiv.innerHTML += 'Welcome to Gabin Demé\'s Terminal!<br>';
                outputDiv.innerHTML += 'Type <gab id="glow_cmd">help</gab> to view a list of available commands.</p><br><br>';
                break;
            default:
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + `<br><p id="false_1">command not found: ${inputText}</p><p id="false_2">Type <gab id="glow_cmd">help</gab> to view a list of available commands.</p><br>`;
                break;
        }
        
        this.value = ''; // Efface le contenu de la textarea après l'envoi
    }
});
