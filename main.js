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
});

document.addEventListener('click', function(event) {
    var inputArea = document.getElementById('inputArea');

    // Vérifie si l'élément cliqué est la textarea ou pas
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
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="help_out">Available commands: clear, help<p>';
                break;
            default:
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<br>' + `command not found: ${inputText}.<br>Type 'help' to view a list of available commands.<br>`;
                break;
        }
        
        this.value = ''; // Efface le contenu de la textarea après l'envoi
    }
});
