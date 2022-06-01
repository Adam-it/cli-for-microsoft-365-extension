import * as vscode from "vscode";
import { CliM365Provider } from "./providers/cliM365Provider";

export function activate(context: vscode.ExtensionContext) {
    let helloWorldCommand = vscode.commands.registerCommand(
        "vscode-webview-extension-with-react.helloWorld",
        () => {
            vscode.window.showInformationMessage(
                "Hello World from vscode-webview-extension-with-react!"
            );
        }
    );
    context.subscriptions.push(helloWorldCommand);

    const cliM365Provider = new CliM365Provider(context?.extensionUri, {});
    const view = vscode.window.registerWebviewViewProvider("cli.m365", cliM365Provider,);
    context.subscriptions.push(view);

};

export function deactivate() { }