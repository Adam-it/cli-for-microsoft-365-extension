import {
	WebviewViewProvider,
	WebviewView,
	Webview,
	Uri,
	EventEmitter,
	window,
	WebviewPanel,
	ViewColumn
} from "vscode";
import * as ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import fetch from "node-fetch";
import * as m365Commands from '../data/m365Model.json';
import SideBar from "../components/sideBar/SideBar";

export class CliM365Provider implements WebviewViewProvider {

	private mainView: WebviewPanel = null;

	constructor(
		private readonly extensionPath: Uri,
		private data: any,
		private _view: any = null
	) { }

	public refresh(context: any): void {
		this._onDidChangeTreeData.fire(null);
		this._view.webview.html = this._getHtmlWebviewForSideBar(this._view?.webview);
	}

	public resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this.extensionPath],
		};
		webviewView.webview.html = this._getHtmlWebviewForSideBar(webviewView.webview);
		this._view = webviewView;
		this._activateListener();
	}

	private _activateListener() {
		this._view.webview.onDidReceiveMessage((message) => {
			switch (message.action) {
				case 'showCliCommandDocs':
					this._getHtmlWebviewForMainView(message.command);
					break;
				default:
					break;
			}
		});
	}

	private _getHtmlWebviewForMainView(commandName: string) {

		if (this.mainView === null) {
			this.mainView = window.createWebviewPanel(
				'CLIManual',
				'CLI for Microsoft 365',
				ViewColumn.One,
				{}
			);

			this.mainView.onDidDispose(() => { this.mainView = null });
		}

		const commandUrl = m365Commands.commands.find(command => command.name === commandName).url;
		fetch(commandUrl)
			.then((response) => response.text())
			.then(response => {
				this.mainView.webview.html = `	
				<html>
					<head>
						<meta charSet="utf-8"/>
						<meta img-src vscode-resource: https:;
								font-src ${this.mainView.webview.cspSource};
								style-src ${this.mainView.webview.cspSource} 'unsafe-inline';">             

						<meta name="viewport" content="width=device-width, initial-scale=1.0">
					</head>
					<body>
						${ReactDOMServer.renderToString((<ReactMarkdown>{response}</ReactMarkdown>))}
					</body>
				</html>`;
			});
	}

	private _getHtmlWebviewForSideBar(webview: Webview) {

		const scriptUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "scripts", "listener.js")
		);

		const styleSideBarUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "styles", "sideBar.css")
		);

		return `<html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta http-equiv="Content-Security-Policy" 
                            img-src vscode-resource: https:;
                            font-src ${webview.cspSource};
                            style-src ${webview.cspSource} 'unsafe-inline';">             

                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
					<link href="${styleSideBarUri}" rel="stylesheet">
                </head>
                <body>
					${ReactDOMServer.renderToString((<SideBar></SideBar>))}
					<script src="${scriptUri}"></script>
				</body>
            </html>`;
	}

	private _onDidChangeTreeData: EventEmitter<any | undefined | null | void> = new EventEmitter<any | undefined | null | void>();
}