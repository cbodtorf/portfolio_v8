import React, { Component } from 'react';
import Layout from '../components/Layout';
import WindowFrame from '../components/WindowFrame';
import Landing from '../sections/Landing';
import Projects from '../sections/Projects';
import About from '../sections/About';
import Header from '../components/Header';
import Footer from '../components/Footer';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    console.log('this.props', props);

    this.state = {
      actionColor: false,
    };
  }

  updateActionColor = color => {
    console.log('this', this);
    this.setState({ actionColor: color });
  };

  render() {
    return (
      <Layout>
        <WindowFrame actionColor={this.state.actionColor} />
        <Header />
        <Landing />
        <About />
        <Projects handleActionColor={this.updateActionColor} />
        <Footer />
      </Layout>
    );
  }
}

export default IndexPage;
