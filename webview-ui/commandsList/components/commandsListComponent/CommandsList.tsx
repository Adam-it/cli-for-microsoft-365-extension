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
import { ICommandGroup } from './model/ICommandGroup';


export default class CommandsList extends React.Component<ICommandsListProps, ICommandsListState> {

  constructor(props: ICommandsListProps) {
    super(props);

    const commands = m365Commands.commands as ICommand[];

    this.state = {
      commandsListView: commands,
      commandsTreeView: this._getTreeView(commands),
      isTreeViewEnabled: false,
      previousSearchInput: ''
    };
  }

  public componentDidMount(): void {
    const previousState = vscode.getState() as ICommandsListState;

    if (previousState) {
      this.setState({
        isTreeViewEnabled: previousState.isTreeViewEnabled,
        previousSearchInput: previousState.previousSearchInput,
        commandsListView: previousState.commandsListView,
        commandsTreeView: previousState.commandsTreeView
      });
    }
  }

  public render(): React.ReactElement<ICommandsListProps> {
    const { commandsListView,
      isTreeViewEnabled,
      commandsTreeView,
      previousSearchInput } = this.state;

      console.log('a', commandsListView, 'b', commandsTreeView);

    return (
      <div>
        <div className='cli-commands-list-controls'>
          <CommandsAction isTreeViewEnabled={isTreeViewEnabled} showListView={() => this._handleShowListViewButtonClick()} showTreeView={() => this._handleShowTreeViewButtonClick()} />
          <VSCodeDivider />
          <CommandsSearch initialSearchInput={previousSearchInput} onSearch={event => this._handleSearch(event)} />
        </div>
        <div className='cli-commands-list-wrapper'>
          {isTreeViewEnabled ?
            <div className='cli-commands-tree'>
              {commandsTreeView.map((group: ICommandGroup) => {
                // const chevronExpandedIcon = group.isExpanded ? 'codicon-chevron-down' : 'codicon-chevron-right';
                // return (
                //   <div key={group.name}>
                //     <div className='cli-commands-tree-group'>
                //       <span className={'codicon ' + chevronExpandedIcon}></span>
                //       <span className='pnp-commands-tree-group-name'>{group.name}</span>
                //     </div>
                //     <div className='cli-commands-tree-commands'>
                //       {group.isExpanded ?
                //         <ul>
                //           {group.commands.map(command => (<li key={commandsListView.indexOf(command)} onClick={() => this._handleCommandClick(command.name)}>{command.name}</li>))}
                //         </ul> :
                //         ''
                //       }
                //     </div>
                //   </div>
                );
              })}
            </div> :
            <div className='cli-commands-list'>
              <ul>
                {commandsListView.map(command => (<li key={commandsListView.indexOf(command)} onClick={() => this._handleCommandClick(command.name)}>{command.name}</li>))}
              </ul>
            </div>
          }
        </div>
      </div>);
  }

  private _handleShowListViewButtonClick(): void {
    const treeView = this.state.commandsTreeView;
    const collapse = (group: ICommandGroup) => {
      group.isExpanded = false;
      group.commandGroup.forEach(group => collapse(group));
    };
    treeView.forEach(group => collapse(group));
    this.setState({
      isTreeViewEnabled: false,
      commandsTreeView: treeView
    });
    const state = vscode.getState() as ICommandsListState;
    state.isTreeViewEnabled = false;
    state.commandsTreeView = treeView;
    vscode.setState(state);
  }

  private _handleShowTreeViewButtonClick(): void {
    this.setState({ isTreeViewEnabled: true });
    const state = vscode.getState() as ICommandsListState;
    state.isTreeViewEnabled = true;
    vscode.setState(state);
  }

  private _handleSearch(event: any): void {
    const searchInput: string = (event.target as HTMLInputElement)?.value;
    this._search(searchInput);
  }

  private _search(searchInput: string): void {
    const commands: ICommand[] = m365Commands.commands as ICommand[];
    const searchResult: ICommand[] = commands.filter(command => command.name.toLowerCase().includes(searchInput.toLowerCase()));
    const searchResultTreeView: ICommandGroup[] = this._getTreeView(searchResult);
    this.setState({
      commandsListView: searchResult,
      commandsTreeView: searchResultTreeView,
      previousSearchInput: searchInput
    });
    const state = vscode.getState() as ICommandsListState;
    state.commandsListView = searchResult;
    state.commandsTreeView = searchResultTreeView;
    state.previousSearchInput = searchInput;
    vscode.setState(state);
  }

  private _handleCommandClick(commandName: string): void {
    vscode.postMessage({
      command: 'showCommandManual',
      value: commandName,
    });
  }

  private _getTreeView(commands: ICommand[]): ICommandGroup[] {
    const groups: string[] = commands.map(command => command.name.split(' ')[0]).filter((value, index, self) => self.indexOf(value) === index);
    const treeView: ICommandGroup[] = groups.map(group => {
      const groupCommands: ICommand[] = commands.filter(command => command.name.startsWith(`${group} `) && command.name.split(' ').length <= 2);
      const innerGroups: ICommand[] = commands.filter(command => command.name.startsWith(`${group} `) && command.name.split(' ').length > 2);

      return {
        name: group,
        isExpanded: false,
        commands: groupCommands,
        commandGroup: this._getTreeView(innerGroups.map(innerGroup => { return {...innerGroup, name: innerGroup.name.split(' ')[1]}; }))
      } as ICommandGroup;
    });

    // if (this.state) {
    //   treeView.forEach(group => {
    //     this.state.commandsTreeView.find(treeGroup => treeGroup.name === group.name)?.isExpanded ? group.isExpanded = true : group.isExpanded = false;
    //   });
    // }

    return treeView;
  }
}