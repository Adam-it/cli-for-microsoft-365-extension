import * as React from 'react';
import { ISideBarProps } from './ISideBarProps';
import { ISideBarState } from './ISideBarState';

export default class SideBar extends React.Component<ISideBarProps, ISideBarState> {

  public render(): React.ReactElement<ISideBarProps> {
    return <p>React works</p>;
  }
}