import { WebviewViewProvider, WebviewView, Webview, Uri, EventEmitter } from 'vscode';

export class WebViewPanels implements WebviewViewProvider {

  constructor(
    private readonly extensionPath: Uri,
    private data: any,
    private _view: any = null
  ) { }

  public refresh(): void {
    this._onDidChangeTreeData.fire(null);
    this._view.webview.html = this._getHtmlWebviewForActivityBar(this._view?.webview);
  }

  public resolveWebviewView(webviewView: WebviewView): void | Promise<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionPath],
    };
    webviewView.webview.html = this._getHtmlWebviewForActivityBar(webviewView.webview);
    this._view = webviewView;
    this._activateListener();
  }

  private _activateListener() {
    this._view.webview.onDidReceiveMessage((message: any) => {
      console.log('message', message);
    });
  }

  private _getHtmlWebviewForActivityBar(webview: Webview) {

    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionPath, 'webview-ui', 'activityBar', 'build', 'assets', 'index.js')
    );

    const stylesUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionPath, 'webview-ui', 'activityBar', 'build', 'assets', 'index.css')
    );

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }

  private _onDidChangeTreeData: EventEmitter<any | undefined | null | void> = new EventEmitter<any | undefined | null | void>();
}
