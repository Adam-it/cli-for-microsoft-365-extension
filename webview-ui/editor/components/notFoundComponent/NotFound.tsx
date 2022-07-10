import * as React from 'react';
import './NotFound.css';
import { INotFoundProps } from './INotFoundProps';
import { INotFoundState } from './INotFoundState';

export default class NotFound extends React.Component<INotFoundProps, INotFoundState> {

  constructor(props: INotFoundProps) {
    super(props);
  }

  public render(): React.ReactElement<INotFoundProps> {
    return (
      <div className='notFound'>
        <div>
          <i className='codicon codicon-bug' />
          <p className='notFoundTitle'>Wait what just happened? </p>
          <p className='notFoundDescription'>
            ... it could be that the command docs were removed from the repo 🤔, and this command will not be here after next release 😉  <br />
            ... or it is possible you don't have internet connection 📶  <br />
            ... or it's a bug 🪲😅, in that case please open an issue, thanks 👍
          </p>
        </div>
      </div>
    );
  }
}
