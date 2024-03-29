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
        const { isTreeViewEnabled,
            showListView,
            showTreeView } = this.props;

        return (
            <div className='cli-commands-list-actions'>
                {!isTreeViewEnabled ?
                    <VSCodeButton appearance='icon' title='Tree view' onClick={showTreeView}>
                        <span className='codicon codicon-list-tree'></span>
                    </VSCodeButton> :
                    <VSCodeButton appearance='icon' title='List view' onClick={showListView}>
                        <span className='codicon codicon-list-unordered'></span>
                    </VSCodeButton>
                }
                <VSCodeButton appearance='icon' title='CLI for Microsoft 365 samples' onClick={() => this._handleShowSamplesButtonClick()}>
                    <span className='codicon codicon-file-code'></span>
                </VSCodeButton>
                <VSCodeButton appearance='icon' title='CLI for Microsoft 365 docs web page' onClick={() => this._handleGoToHomePageButtonClick()}>
                    <span className='codicon codicon-browser'></span>
                </VSCodeButton>
                <VSCodeButton appearance='icon' title='CLI for Microsoft 365 GitHub Repo' onClick={() => this._handleGoToRepoButtonClick()}>
                    <span className='codicon codicon-github-inverted'></span>
                </VSCodeButton>
                <VSCodeButton appearance='icon' title='CLI for Microsoft 365 Discord' onClick={() => this._handleGoToDiscordButtonClick()}>
                    <span className='codicon codicon-feedback'></span>
                </VSCodeButton>
            </div>
        );
    }

    private _handleGoToDiscordButtonClick(): void {
        vscode.postMessage({
            command: 'openLink',
            value: CONSTANTS.discordLink
        });
    }

    private _handleGoToRepoButtonClick(): void {
        vscode.postMessage({
            command: 'openLink',
            value: CONSTANTS.repoLink
        });
    }

    private _handleGoToHomePageButtonClick(): void {
        vscode.postMessage({
            command: 'openLink',
            value: CONSTANTS.homePageLink
        });
    }

    private _handleShowSamplesButtonClick(): void {
        vscode.postMessage({
            command: 'showSamples'
        });
    }
}