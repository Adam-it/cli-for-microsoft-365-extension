import * as React from 'react';
import './App.css';
import { IAppProps } from './IAppProps';
import { IAppState } from './IAppState';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default class SideBar extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      loading: true,
      docs: ''
    };
  }

  public componentDidMount(): void {
    const commandUrl = this.props.commandUrl;

    axios
      .get(commandUrl)
      .then(res => {
        const docs = res.data.replaceAll('\n', ' \n');
        this.setState({
          docs: docs,
          loading: false
        });
      });
    // .catch((error: AxiosError) => {
    // });
  }

  public render(): React.ReactElement<IAppProps> {

    const { loading, docs } = this.state;
    console.log(docs);
    return (
      <main className='docs'>
        {loading ? 'laoding' : <ReactMarkdown>{docs}</ReactMarkdown>}
      </main>
    );
  }
}
