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
        "          /\\                   ",
        "         /**\\                  ",
        "        /****\\   /\\         ______      __    _          ____                  __  ",
        "       /      \\ /**\\       / ____/___  / /_  (_)___     / __ \\___  ____ ___  _/_/  ",
        "      /  /\\    /    \\     / / __/ __ `/ __ \\/ / __ \\   / / / / _ \\/ __ `__ \\/ _ \\  ",
        "     /  /  \\  /      \\   / /_/ / /_/ / /_/ / / / / /  / /_/ /  __/ / / / / /  __/  ",
        "    /  /    \\/ /\\     \\  \\____/\\__,_/_.___/_/_/ /_/  /_____/\\___/_/ /_/ /_/\\___/   ",
        "   /  /      \\/  \\/\\   \\ ",
        "  /__/_______/___/\\_\\___\\                      \u00A9 " + new Date().getFullYear()
    ];

    var outputDiv = document.getElementById('banner');
    outputDiv.innerHTML += `<pre class="banner">${banner.join('\n')}</pre>`;
    outputDiv.innerHTML += 'Welcome to Gabin Demé\'s Terminal!<br>';
    outputDiv.innerHTML += 'Type <gab id="glow_cmd">help</gab> to view a list of available commands.<br><br>';
});

document.addEventListener('click', function(event) {
    var inputArea = document.getElementById('inputArea');
    if (event.target !== inputArea) {
        inputArea.focus();
    }
}, false);

const helpCommands = [
    { command: 'help', description: 'List all available commands' },
    { command: 'whois', description: 'Who is Gabin Demé?' },
    { command: 'socials', description: 'Contact me' },
    { command: 'education', description: 'Where am I from?' },
    { command: 'cv', description: 'Check out my CV [pdf - 252KB]' },
    { command: 'employment', description: 'Where did I work?' },
    { command: 'projects', description: 'View my projects' },
    { command: 'clear', description: 'Clean everithing' }
];

function findMatchingCommand(input) {
    return helpCommands.filter(cmd => cmd.command.startsWith(input));
}

function generateHelpOutput() {
    let output = '<div>Just type any of the commands below to get some more info. You can even type a few letters and press [tab] to autocomplete:<br>';
    helpCommands.forEach(({ command, description }) => {
        output += `<gab id="glow_cmd" class="help-command">${command}</gab><br>`;
        if (description) {
            output += `<span class="help-description"> - ${description}</span><br>`;
        }
        output += '<br>';
    });
    output += '</div>';
    return output;
}

function generateSocialsOutput() {
    return 'LinkedIn: <a href="https://www.linkedin.com/in/gabindeme/" target="_blank">linkedin.com/in/gabindeme</a><br>GitHub: <a href="">github.com/Onibagg</a>';
}

function generateWhoisOutput() {
    return 'Name: Gabin Demé<br>Age: 21 years<br>Location: Paris, France<br>Occupation: Apprentice Pre-Sales Engineer at Harmonic<br>Interests: Sports, Music';
}

function generateEducationOutput() {
    return 'I am an engineering student at IMT Nord Europe, studying Telecommunications and Computer Science.';
}

function generateEmploymentOutput() {
    return 'I am currently working as an Apprentice Pre-Sales Engineer at Harmonic.';
}

const commandHistory = [];
let historyIndex = -1;

document.getElementById('inputArea').addEventListener('keydown', function(event) {
    const inputArea = this;
    const inputText = inputArea.value.trim();
    
    if (event.key === 'Enter') {
        event.preventDefault(); // Empêche le retour à la ligne dans la textarea
        
        // Ajout de la commande à l'historique
        if (inputText !== '') {
            commandHistory.push(inputText);
            historyIndex = commandHistory.length; // Réinitialise l'index de l'historique
        }

        switch (inputText) {
            case 'clear':
                document.getElementById('output').innerHTML = ''; // Efface tout le contenu de la div
                break;
            case '':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + '<br>'; // Ajoute simplement une nouvelle ligne
                break;
            case 'help':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="help_out">' + generateHelpOutput() + '</p>';
                break;
            case 'whois':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="whois_out">' + generateWhoisOutput() + '</p>';
                break;
            case 'socials':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="whois_out">' + generateSocialsOutput() + '</p>';
                break;
            case 'education':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="whois_out">' + generateEducationOutput() + '</p>';
                break;
            case 'employment':
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<p id="whois_out">' + generateEmploymentOutput() + '</p>';
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
            case 'projects':
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
                        <span id="project_out">
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
                        </span>
                        <br>

                    `;
                });
                break;
            default:
                document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + `<br><p id="false_1">command not found: ${inputText}</p><p id="false_2">Type <gab id="glow_cmd">help</gab> to view a list of available commands.</p><br>`;
                break;
        }
        
        this.value = ''; // Efface le contenu de la textarea après l'envoi
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            inputArea.value = commandHistory[historyIndex];
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputArea.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            inputArea.value = '';
        }
    } else if (event.key === 'Tab') {
        event.preventDefault(); // Plus de tabulation dans la textarea
        const inputText = inputArea.value.trim();
        const matchingCommands = findMatchingCommand(inputText);

        if (matchingCommands.length === 1) {
            inputArea.value = matchingCommands[0].command;
        } else if (matchingCommands.length > 1) {
            const suggestionsText = matchingCommands.map(cmd => cmd.command).join(' '.repeat(5));
            document.getElementById('output').innerHTML += 'visitor@gabindeme.com:~$ ' + inputText + '<br><span id="tab_out">' + suggestionsText + '</span><br>';
        }
    }
});
