import React, {Component} from 'react';
import './style.css';

export default class Sentence extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sentenceContent: '',
      sentencePoetryName: '',
      sentenceAuthorName: '',
      isPoetryShown: false,
      poetryContent: ''
    };
    this.showPoetry = this.showPoetry.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  showPoetry() {
    this.setState({
      isPoetryShown: !this.state.isPoetryShown
    });
  }

  getData() {
    const id = Math.floor(6000 * Math.random());
    const query = `query{
                     sentence(id: "${id}"){
                       sentenceContent
                       sentencePoetryName
                       sentenceAuthorName
                       sentencePoetry{
                         content
                       }
                     }
                   }`;
    fetch('/graphql?query=' + query).then(res => res.json()).then(res => {
      if (res.data.sentence) {
        this.setState({
          sentenceContent: res.data.sentence.sentenceContent,
          sentencePoetryName: res.data.sentence.sentencePoetryName,
          sentenceAuthorName: res.data.sentence.sentenceAuthorName,
          poetryContent: res.data.sentence.sentencePoetry ? res.data.sentence.sentencePoetry.content : '暂无内容'
        });
      } else {
        this.getData();
      }
    });
  }

  render() {
    return (
      <div className="Sentence">
        <img className="background" src="https://picsum.photos/1440/900/?random" alt=""/>
        <div className="sentence-container">
          <span className="content">{this.state.sentenceContent}</span>
          <span className="tail" onClick={this.showPoetry}>--{this.state.sentencePoetryName} {this.state.sentenceAuthorName}</span>
        </div>
        {
          this.state.isPoetryShown ?
            <div className="poetry-container">
              <span className="poetry">{this.state.poetryContent}</span>
            </div> : null
        }
      </div>
    );
  }
}
