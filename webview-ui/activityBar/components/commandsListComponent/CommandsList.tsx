import * as React from 'react';
import * as m365Commands from '../../../../data/m365Model.json';
import { ICommand } from '../../../../models/ICommand';
import './CommandsList.css';
import { ICommandsListProps } from './ICommandsListProps';
import { ICommandsListState } from './ICommandsListState';
import { vscode } from '../../utilities/vscode';

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
        <ul className='cliCommandsList'>
          {commands.map(command => (<li key={commands.indexOf(command)} onClick={() => this.handleCommandClick(command.name)} className='cliCommand'>{command.name}</li>))}
        </ul>
      </div>);
  }

  private handleCommandClick(commandName: string): void {
    vscode.postMessage({
      command: 'showCommandManual',
      text: commandName,
    });
  }
}