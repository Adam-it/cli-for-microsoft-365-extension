import * as vscode from 'vscode';
import { CliM365Provider } from './providers/cliM365Provider';

export function activate(context: vscode.ExtensionContext) {
    const cliM365Provider = new CliM365Provider(context?.extensionUri, {});
    const view = vscode.window.registerWebviewViewProvider('clim365', cliM365Provider);
    context.subscriptions.push(view);
}

export function deactivate() { }