import { WebviewViewProvider, WebviewView, Webview, Uri, EventEmitter, window } from "vscode";
import * as ReactDOMServer from "react-dom/server";
import SideBar from "../components/sideBar/SideBar";

export class CliM365Provider implements WebviewViewProvider {

	constructor(
		private readonly extensionPath: Uri,
		private data: any,
		private _view: any = null
	) { }

	private onDidChangeTreeData: EventEmitter<any | undefined | null | void> = new EventEmitter<any | undefined | null | void>();

	refresh(context: any): void {
		this.onDidChangeTreeData.fire(null);
		this._view.webview.html = this._getHtmlForWebview(this._view?.webview);
	}

	resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this.extensionPath],
		};
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
		this._view = webviewView;
	}

	private _getHtmlForWebview(webview: Webview) {

		return `<html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta http-equiv="Content-Security-Policy" 
                            content="default-src 'none';
                            img-src vscode-resource: https:;
                            font-src ${webview.cspSource};
                            style-src ${webview.cspSource} 'unsafe-inline';">             

                    <meta name="viewport" content="width=device-width, initial-scale=1.0">

                </head>
                <body>
				${
                        
					ReactDOMServer.renderToString((
						<SideBar></SideBar>
					))
				}
				</body>
            </html>`;
	}
}