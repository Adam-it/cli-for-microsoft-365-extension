import { WebviewViewProvider, WebviewView, Webview, Uri, EventEmitter, ViewColumn, window } from 'vscode';
import * as m365Commands from '../../data/m365Model.json';

export class WebViewPanels implements WebviewViewProvider {

  private docsView: any = null;
  private sampleView: any = null;

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

  public getHtmlWebviewForSamplesView(){
    if (this.sampleView === null) {
      this.sampleView = window.createWebviewPanel(
        'CLISamples',
        'CLI for Microsoft 365 - samples',
        ViewColumn.One,
        {}
      );

      this.sampleView.webview.options = {
        enableScripts: true,
        localResourceRoots: [this.extensionPath],
      };

      this.sampleView.iconPath = {
        dark: Uri.file(Uri.joinPath(this.extensionPath, 'assets', 'logo.svg').path),
        light: Uri.file(Uri.joinPath(this.extensionPath, 'assets', 'logo.svg').path)
      };

      this.sampleView.onDidDispose(() => {
        this.sampleView = null;
      });
    }

    const scriptUri = this.sampleView.webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'samplesView', 'build', 'assets', 'index.js'));
    const stylesUri = this.sampleView.webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'samplesView', 'build', 'assets', 'index.css'));

    this.sampleView.webview.html = this._getHtmlWebview(this.sampleView.webview, scriptUri, stylesUri);
  }

  public getHtmlWebviewForDocsView(commandName: string) {
    if (this.docsView === null) {
      this.docsView = window.createWebviewPanel(
        'CLIManual',
        'CLI for Microsoft 365 - docs',
        ViewColumn.One,
        {}
      );

      this.docsView.webview.options = {
        enableScripts: true,
        localResourceRoots: [this.extensionPath],
      };

      this.docsView.iconPath = {
        dark: Uri.file(Uri.joinPath(this.extensionPath, 'assets', 'logo.svg').path),
        light: Uri.file(Uri.joinPath(this.extensionPath, 'assets', 'logo.svg').path)
      };

      this.docsView.onDidDispose(() => {
        this.docsView = null;
      });
    }

    const scriptUri = this.docsView.webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'docsView', 'build', 'assets', 'index.js'));
    const stylesUri = this.docsView.webview.asWebviewUri(Uri.joinPath(this.extensionPath, 'webview-ui', 'docsView', 'build', 'assets', 'index.css'));

    const commandUrl = m365Commands.commands.find(command => command.name === commandName).url;
    this.docsView.webview.html = this._getHtmlWebview(this.docsView.webview, scriptUri, stylesUri, commandUrl);
  }

  private _activateListener() {
    this._view.webview.onDidReceiveMessage((message: any) => {
      switch (message.command) {
        case 'showCommandManual':
          this.getHtmlWebviewForDocsView(message.text);
          break;
        default:
          break;
      }
    });
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
