# CLI for Microsoft 365 extension

This extension provides functionalities that may be helpful when creating scripts using CLI for Microsoft 365. Currently the extension provides:
- snippets with all possible commands
- syntax support
- docs viewer inside vscode


Please check [CLI for Microsoft 365 docs](https://pnp.github.io/cli-microsoft365/) for more information.

## ⚠️ Please be aware 

The current solution (extension) is in prototype phase so may not have regular releases.

## 🪄 Features 

### Snippets

The extensions helps to quickly find the proper CLI for Microsoft 365 command and add it into the code using snippets. The command is added with the list of obligatory parameters. It is possible to quickly move between parameters using 'Tab' key. Each CLI command snippet is also provided with the same description as may be found in the docs which is a great help to quickly understand the commands functionality.

![snippetsList](/assets/snippets.gif)

In order to use snippets please type part of a snippet and press enter or tab. The command will be automatically with possibility to provide obligatory parameters. You may also use 'Ctrl + Space' (Windows, Linux) or 'Cmd + Space' (macOS) to activate snippets from within the editor.

![snippetsList](/assets/snippetsList.png)

It is also possible to use command `Insert Snippet` in VS Code to see the full list

![snippetsList](/assets/listOfCommandsFromToolbar.png)

### Syntax

As first step of syntax support the extension has syntax highlight.

![syntaxColor](/assets/syntaxColor.gif)

### Docs

This functionality provides CLI docs view for all commands inside vscode. No more transition between the code editor and browser is needed. 

![docs](/assets/howDocsWork.gif)

## 📑 Language 

Currently the extension supports the following language:
- shellscript
- powershell
- javascript

![languageSupport](/assets/languageSupport.png)

## 💬 Feedback 

Any questions, problems, feedback is more than welcome. Please create an issue in the extension repository [issue list](https://github.com/Adam-it/cli-for-microsoft-365-extension/issues).
Any ideas or want to see what is on the list of features to show up? Please check the [discussions](https://github.com/Adam-it/cli-for-microsoft-365-extension/discussions)