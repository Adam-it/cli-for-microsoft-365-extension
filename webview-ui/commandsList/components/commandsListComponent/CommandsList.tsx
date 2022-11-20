import * as React from 'react';
import * as m365Commands from '../../../../data/m365Model.json';
import { ICommand } from '../../../../models/ICommand';
import './CommandsList.css';
import { ICommandsListProps } from './ICommandsListProps';
import { ICommandsListState } from './ICommandsListState';
import { vscode } from '../../utilities/vscode';
import { VSCodeDivider } from '@vscode/webview-ui-toolkit/react';
import CommandsAction from '../commandsActionComponent/CommandsAction';
import CommandsSearch from '../commandsSearchComponent/CommandsSearch';


export default class CommandsList extends React.Component<ICommandsListProps, ICommandsListState> {

  constructor(props: ICommandsListProps) {
    super(props);

    this.state = {
      commands: m365Commands.commands as ICommand[],
      previousSearchInput: ''
    };
  }

  public componentDidMount(): void {
    const previousState = vscode.getState() as ICommandsListState;

    if (previousState) {
      this.setState({
        commands: previousState.commands,
        previousSearchInput: previousState.previousSearchInput,
      });
    }
  }

  public render(): React.ReactElement<ICommandsListProps> {
    const { commands } = this.state;
    const { previousSearchInput } = this.state;

    return (
      <div>
        <div className='cli-commands-list-controls'>
          <CommandsAction />
          <VSCodeDivider />
          <CommandsSearch initialSearchInput={previousSearchInput} onSearch={event => this._handleSearch(event)} />
        </div>
        <div className='cli-commands-list-wrapper'>
          <ul className='cli-commands-list'>
            {commands.map(command => (<li key={commands.indexOf(command)} onClick={() => this._handleCommandClick(command.name)} className='cliCommand'>{command.name}</li>))}
          </ul>
        </div>
      </div>);
  }

  private _handleSearch(event: any): void {
    const searchInput: string = (event.target as HTMLInputElement)?.value;
    this._search(searchInput);
  }

  private _search(searchInput: string): void {
    const commands: ICommand[] = m365Commands.commands as ICommand[];
    const searchResult: ICommand[] = commands.filter(command => command.name.toLowerCase().includes(searchInput.toLowerCase()));
    this.setState({
      commands: searchResult,
      previousSearchInput: searchInput
    });
    const state = vscode.getState() as ICommandsListState ?? {} as ICommandsListState;
    state.commands = searchResult;
    state.previousSearchInput = searchInput;
    vscode.setState(state);
  }

  private _handleCommandClick(commandName: string): void {
    vscode.postMessage({
      command: 'showCommandManual',
      value: commandName,
    });
  }
}