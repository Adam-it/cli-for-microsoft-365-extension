<h1 align="center">
  CLI for Microsoft 365 extension
</h1>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=adamwojcikit.cli-for-microsoft-365-extension&ssr=false#overview">
    <img src="https://vscode-marketplace-badge.vercel.app/api/badge/version/adamwojcikit.cli-for-microsoft-365-extension?color=%23276EC2&style=flat-square"
      alt="version" />
  </a>

  <a href="https://marketplace.visualstudio.com/items?itemName=adamwojcikit.cli-for-microsoft-365-extension&ssr=false#overview">
    <img src="https://vscode-marketplace-badge.vercel.app/api/badge/installs/adamwojcikit.cli-for-microsoft-365-extension?color=%234B51B8&style=flat-square"
      alt="installs" />
  </a>
</p>

This extension provides functionalities that may be helpful when creating scripts using CLI for Microsoft 365. Currently, the extension provides:

- docs viewer inside VS Code
- samples gallery
- snippets with all possible commands

Please check [CLI for Microsoft 365 docs](https://pnp.github.io/cli-microsoft365/) for more information.

## ✨ Features

### Script samples gallery

Using `CLI M365: Open samples gallery` command or 'Samples' button you may open the gallery with all available samples. Currently, the samples shown are retrieved from the [PnP script samples repository](https://github.com/pnp/script-samples). From the samples gallery you may go to the sample location or create a new tab in the editor prefilled with the CLI for Microsoft 365 script. It is possible to search for samples by:

- title
- authors
- commands used in samples

![samples](/assets/images/samples.gif)

### Docs

This functionality provides CLI docs view for all commands inside VS Code. No more transition between the code editor and browser is needed. It is possible to go to docs original website location and also open a sample gallery showing all samples using the command.

![docs](/assets/images/howDocsWork.gif)
![docs](/assets/images/docsSearch.gif)

It is also possible to use the command `CLI M365: Open docs for command` to open the docs for a specific command.

![docs](/assets/images/docsCommand.gif)

### Snippets

The extensions help to quickly find the proper CLI for Microsoft 365 command and add it into the code using snippets. The command is added to the list of obligatory parameters. It is possible to quickly move between parameters using 'Tab' key. Each CLI command snippet is also provided with the same description as may be found in the docs which is a great help to quickly understand the commands functionality.

![snippetsList](/assets/images/snippets.gif)

In order to use snippets please type part of a snippet and press enter or tab. The command will be automatic with the possibility to provide obligatory parameters. You may also use 'Ctrl + Space' (Windows, Linux) or 'Cmd + Space' (macOS) to activate snippets from within the editor.

![snippetsList](/assets/images/snippetsList.png)

It is also possible to use the command `Insert Snippet` in VS Code to see the full list

![snippetsList](/assets/images/listOfCommandsFromToolbar.png)

### Actions

The extension provides additional links above the command list which allows opening docs web page, GitHub repository, and CLI for Microsoft 365 Discord server in your default browser.

![commandActions](/assets/images/commandActions.png)

## 🤖 Commands

The extension provides the following commands:

| command   |      description      |
|----------|:-------------:|
| CLI M365: Open samples gallery |  Opens up the sample gallery |
| CLI M365: Open docs for command |    Search for command doc file. The command may also be prefilled by the selected CLI for Microsoft 365 command   |

![commands](/assets/images/commands.png)

## 📑 Language

Currently, the extension supports the following language:

- shellscript
- powershell
- javascript

![languageSupport](/assets/images/languageSupport.png)

## 💬 Feedback

Any questions, problems, or feedback is more than welcome. Please create an issue in the extension repository [issue list](https://github.com/Adam-it/cli-for-microsoft-365-extension/issues).
Any ideas or want to see what is on the list of features to show up? Please check the [discussions](https://github.com/Adam-it/cli-for-microsoft-365-extension/discussions)

## 🔑 License

[MIT License](https://github.com/Adam-it/cli-for-microsoft-365-extension/blob/main/LICENSE.md)
