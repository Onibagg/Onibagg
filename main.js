document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');

    function createInput() {
        const inputLine = document.createElement('div');
        inputLine.className = 'input-line';
        const prompt = document.createElement('span');
        prompt.textContent = '$ ';
        prompt.className = 'prompt';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'terminal-input';
        input.autofocus = true;

        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && this.value.trim() !== '') {
                handleCommand(this.value);
                this.value = ''; // Clear the input
            }
        });

        inputLine.appendChild(prompt);
        inputLine.appendChild(input);
        output.prepend(inputLine); // Place new input at the top
        input.focus();
    }

    function handleCommand(command) {
        const commandOutput = document.createElement('div');
        commandOutput.textContent = `$ ${command}`;
        output.prepend(commandOutput);
        // Expand this function to handle different commands
        const result = document.createElement('div');
        result.textContent = `Command '${command}' executed.`; // Placeholder response
        output.prepend(result);
    }

    createInput(); // Initial call to create input
});
