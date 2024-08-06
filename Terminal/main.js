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
        var inputText = this.value.trim(); // Trim ici pour nettoyer l'entrée dès le départ
        
        switch (inputText) {
            case 'clear':
                document.getElementById('output').innerHTML = ''; // Efface tout le contenu de la div
                break;
            case '':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + '<br>'; // Ajoute simplement une nouvelle ligne
                break;
            case 'help':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="help_out">Available commands: <gab id="glow_cmd">clear</gab>, <gab id="glow_cmd">help</gab>, <gab id="glow_cmd">cv</gab>, <gab id="glow_cmd">projects</gab></p>';
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
            case 'projecs':
                var projects = [
                    {
                        title: "gabindeme.com",
                        description: "This very own website😄.",
                        demoLink: "https://gabindeme.com/",
                        githubLink: "https://github.com/Onibagg/Onibagg"
                    },
                    {
                        title: "SAE23-Groupe7",
                        description: "This is my first PHP project. It's a showcase website with a PHP intranet that hosts a file explorer.",
                        demoLink: "#",
                        githubLink: "https://github.com/Onibagg/SAE23-Groupe7"
                    },
                    {
                        title: "NotationJeuVideo",
                        description: "This is my first MySQL project — a PHP-based game scoring website seamlessly integrated with MySQL.",
                        demoLink: "http://example.com/demo2",
                        githubLink: "https://github.com/Onibagg/NotationJeuVideo"
                    }
                ];
                

                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<br>';
                projects.forEach(project => {
                    document.getElementById('output').innerHTML += `
                        <p id="project_out">
                            <strong>${project.title}</strong><br>
                            ${project.description}<br>
                            <span class="link-container">
                                <a href="${project.demoLink}" target="_blank" class="centered-link glow-cmd">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g id="Interface / External_Link">
                                                <path id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </g>
                                        </g>
                                    </svg> Demo
                                </a> |
                                <a href="${project.githubLink}" target="_blank" class="centered-link glow-cmd">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g id="Interface / External_Link">
                                                <path id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </g>
                                        </g>
                                    </svg> Code
                                </a>
                            </span>
                        </p>

                    `;
                });
                break;
            default:
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + `<br><p id="false_1">command not found: ${inputText}</p><p id="false_2">Type <gab id="glow_cmd">help</gab> to view a list of available commands.</p><br>`;
                break;
        }
        
        this.value = ''; // Efface le contenu de la textarea après l'envoi
    }
});
