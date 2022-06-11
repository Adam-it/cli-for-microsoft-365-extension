import * as React from 'react';
import * as m365Commands from '../../data/m365Model.json';
import { ICommand } from '../../models/ICommand';
import { ISideBarProps } from './ISideBarProps';
import { ISideBarState } from './ISideBarState';

export default class SideBar extends React.Component<ISideBarProps, ISideBarState> {

  constructor(props: ISideBarProps) {
    super(props);

    this.state = {
      commands: m365Commands.commands as ICommand[]
    };
  }

  public render(): React.ReactElement<ISideBarProps> {
    const { commands } = this.state;

    return (
      <div>
        <ul className='cliCommandsList'>
          {commands.map(command => (<li key={commands.indexOf(command)} className='cliCommand'>{command.name}</li>))}
        </ul>
      </div>);
  }
}