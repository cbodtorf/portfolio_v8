import React, { Component } from 'react';
import Timeout from './Timeout';
import TextScramble from '../utils/scramble';

class Scramble extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    const el = document.querySelector(`.${this.props.name}`);
    const fx = new TextScramble(el);
    let that = this;

    let next = function() {
      fx.setText(that.props.wordList[that.state.counter]).then(function() {
        that.props.setTimeout(next, 2000);
      });

      // make sure component is mounted.
      if (that.refs.ScrambleRef) {
        that.setState({
          counter: (that.state.counter + 1) % that.props.wordList.length,
        });
      }
    };

    next();
  }

  render() {
    return (
      <section
        ref="ScrambleRef"
        className="scramble-headline featured-content section section--scramble-headline py4"
      >
        <div className="wrapper section--wrapper">{this.props.el}</div>
      </section>
    );
  }
}

export default Timeout(Scramble);
