import * as React from 'react';
import './App.css';
import { IAppProps } from './IAppProps';
import { IAppState } from './IAppState';
import CommandsList from '../commandsListComponent/CommandsList';

export default class SideBar extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
  }

  public render(): React.ReactElement<IAppProps> {

    return (
      <main>
        <CommandsList/>
      </main>
    );
  }
}
