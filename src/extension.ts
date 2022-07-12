import * as vscode from 'vscode';
import { WebViewPanels } from './panels/WebViewPanels';

export function activate(context: vscode.ExtensionContext) {
    const cliM365Provider = new WebViewPanels(context?.extensionUri, {});
    const view = vscode.window.registerWebviewViewProvider('cliM365', cliM365Provider);
    context.subscriptions.push(view);
}

export function deactivate() { }