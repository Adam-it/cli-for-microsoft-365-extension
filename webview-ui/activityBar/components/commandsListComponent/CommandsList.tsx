import * as React from 'react';
import * as m365Commands from '../../../../data/m365Model.json';
import { ICommand } from '../../../../models/ICommand';
import './CommandsList.css';
import { ICommandsListProps } from './ICommandsListProps';
import { ICommandsListState } from './ICommandsListState';
import { vscode } from '../../utilities/vscode';
import { VSCodeDivider, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';

export default class CommandsList extends React.Component<ICommandsListProps, ICommandsListState> {

  constructor(props: ICommandsListProps) {
    super(props);

    this.state = {
      commands: m365Commands.commands as ICommand[]
    };
  }

  public render(): React.ReactElement<ICommandsListProps> {
    const { commands } = this.state;

    return (
      <div>
        <div className='cliCommandsSearch'>
          <VSCodeTextField placeholder="Search" size={50} onInput={e => this._handleSearch((e.target as HTMLInputElement)?.value)}>
            <span slot="start" className="codicon codicon-search"></span>
          </VSCodeTextField>
          <VSCodeDivider />
        </div>
        <ul className='cliCommandsList'>
          {commands.map(command => (<li key={commands.indexOf(command)} onClick={() => this._handleCommandClick(command.name)} className='cliCommand'>{command.name}</li>))}
        </ul>
      </div>);
  }

  private _handleSearch(searchInput: string): void {
    const commands = m365Commands.commands as ICommand[];
    const searchResult = commands.filter(command => command.name.includes(searchInput));
    this.setState({ commands: searchResult });
  }

  private _handleCommandClick(commandName: string): void {
    vscode.postMessage({
      command: 'showCommandManual',
      text: commandName,
    });
  }
}