import React from 'react';
import { CONSTANTS } from '../../../../constants/Constants';
import './CommandsAction.css';
import { ICommandsActionProps } from './ICommandsActionProps';
import { ICommandsActionState } from './ICommandsActionState';
import { vscode } from '../../utilities/vscode';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';


export default class CommandAction extends React.Component<ICommandsActionProps, ICommandsActionState> {

    constructor(props: ICommandsActionProps) {
        super(props);
    }

    render(): React.ReactElement<ICommandsActionProps> {
        return (
            <div className='cli-commands-list-actions'>
            <VSCodeButton appearance='icon' title='CLI for Microsoft 365 samples' onClick={() => this._handleShowSamplesButtonClick()}>
              <span className='codicon codicon-file-code'></span>
            </VSCodeButton>
            <VSCodeButton appearance='icon' title='CLI for Microsoft 365 web page' onClick={() => this._handleGoToHomePageButtonClick()}>
              <span className='codicon codicon-browser'></span>
            </VSCodeButton>
          </div>
        );
    }

    private _handleGoToHomePageButtonClick(): void {
        vscode.postMessage({
            command: 'openLink',
            value: CONSTANTS.repoHomePageLink
        });
    }

    private _handleShowSamplesButtonClick(): void {
        vscode.postMessage({
            command: 'showSamples'
        });
    }
}