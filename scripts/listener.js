/* eslint-disable no-undef */
(function () {
    const vscode = acquireVsCodeApi();
    const cliCommands = document.getElementsByClassName('cliCommand');
    for (var i = 0; i < cliCommands.length; i++) {
        const message = {
            action: 'showCliCommandDocs',
            command: cliCommands[i].textContent
        };
        cliCommands[i].addEventListener('click', () => {
            vscode.postMessage(message);
        });
    }
}());