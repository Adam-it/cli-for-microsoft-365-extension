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
      switch (message.command) {
        case 'showCommandManual':
          this._getHtmlWebviewForEditor(message.text);
          break;
        default:
          break;
      }
    });
  }

  private _getHtmlWebviewForEditor(commandName: string) {
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

    const scriptUri = this.mainView.webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'editor', 'build', 'assets', 'index.js'));
    const stylesUri = this.mainView.webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'editor', 'build', 'assets', 'index.css'));

    const commandUrl = m365Commands.commands.find(command => command.name === commandName).url;
    this.mainView.webview.html = this._getHtmlWebview(scriptUri, stylesUri, commandUrl);
  }

  private _getHtmlWebviewForActivityBar(webview: Webview) {
    const scriptUri = webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'activityBar', 'build', 'assets', 'index.js'));
    const stylesUri = webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'activityBar', 'build', 'assets', 'index.css'));
    return this._getHtmlWebview(scriptUri, stylesUri);
  }

  private _getHtmlWebview(scriptUri: Uri, stylesUri: Uri, initialData: string = '') {
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
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
