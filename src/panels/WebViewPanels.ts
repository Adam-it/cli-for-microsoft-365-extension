import { WebviewViewProvider, WebviewView, Webview, Uri, EventEmitter, ViewColumn, window } from 'vscode';
import * as m365Commands from '../../data/m365Model.json';

export class WebViewPanels implements WebviewViewProvider {

  private mainView: any = null;

  constructor(
    private readonly extensionPath: Uri,
    private data: any,
    private _view: any = null
  ) { }

  public refresh(): void {
    this._onDidChangeTreeData.fire(null);
    this._view.webview.html = this._getHtmlWebviewForCommandsList(this._view?.webview);
  }

  public resolveWebviewView(webviewView: WebviewView): void | Promise<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionPath],
    };
    webviewView.webview.html = this._getHtmlWebviewForCommandsList(webviewView.webview);
    this._view = webviewView;
    this._activateListener();
  }

  private _activateListener() {
    this._view.webview.onDidReceiveMessage((message: any) => {
      switch (message.command) {
        case 'showCommandManual':
          this._getHtmlWebviewForDocsView(message.text);
          break;
        default:
          break;
      }
    });
  }

  private _getHtmlWebviewForDocsView(commandName: string) {
    if (this.mainView === null) {
      this.mainView = window.createWebviewPanel(
        'CLIManual',
        'CLI for Microsoft 365',
        ViewColumn.One,
        {}
      );

      this.mainView.webview.options = {
        enableScripts: true,
        localResourceRoots: [this.extensionPath],
      };

      this.mainView.onDidDispose(() => {
        this.mainView = null;
      });
    }

    const scriptUri = this.mainView.webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'docsView', 'build', 'assets', 'index.js'));
    const stylesUri = this.mainView.webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'docsView', 'build', 'assets', 'index.css'));

    const commandUrl = m365Commands.commands.find(command => command.name === commandName).url;
    this.mainView.webview.html = this._getHtmlWebview(this.mainView.webview, scriptUri, stylesUri, commandUrl);
  }

  private _getHtmlWebviewForCommandsList(webview: Webview) {
    const scriptUri = webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'commandsList', 'build', 'assets', 'index.js'));
    const stylesUri = webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'commandsList', 'build', 'assets', 'index.css'));
    return this._getHtmlWebview(webview, scriptUri, stylesUri);
  }

  private _getHtmlWebview(webview: Webview, scriptUri: Uri, stylesUri: Uri, initialData: string = '') {

     const codiconsUri = webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'media', 'codicon', 'codicon.css'));

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <link rel="stylesheet" type="text/css" href="${codiconsUri}">
        </head>
        ${initialData !== '' ?
        `<script>window.initialData = "${initialData}";</script>`
        : ''
      }
        <body>
          <div id="root"></div>
          <script type="module" src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }

  private _onDidChangeTreeData: EventEmitter<any | undefined | null | void> = new EventEmitter<any | undefined | null | void>();
}
