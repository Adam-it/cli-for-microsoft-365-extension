import * as React from 'react';
import './Card.css';
import { ICardProps } from './ICardProps';
import { ICardState } from './ICardState';
import { vscode } from '../../utilities/vscode';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

export default class Card extends React.Component<ICardProps, ICardState> {

  constructor(props: ICardProps) {
    super(props);
  }

  public render(): React.ReactElement<ICardProps> {
    const { sample } = this.props;
    const sampleDescriptionLimit: number = 300;
    const sampleTitleLimit: number = 100;

    return (
      <div className='card'>
        <div className='card-header'>
          <img src={sample.image} />
        </div>
        <div className='card-body'>
          <h3>{sample.title.length > sampleTitleLimit ? `${sample.title.substring(0, sampleTitleLimit)}...` : sample.title}</h3>
          <p>{sample.description.length > sampleDescriptionLimit ? `${sample.description.substring(0, sampleDescriptionLimit)}...` : sample.description}</p>
          <div className='card-footer'>
            <VSCodeButton onClick={() => this._handleOpenRepoButtonClick(sample.url)}>
              <span className="codicon codicon-github-inverted"></span>
            </VSCodeButton>
          </div>
        </div>
      </div>
    );
  }

  private _handleOpenRepoButtonClick(repoUrl: string): void {
    vscode.postMessage({
      command: 'openLink',
      value: repoUrl,
    });
  }
}
