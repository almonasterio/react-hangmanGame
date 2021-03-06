import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from './words.js'

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, nRight:0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      nRight: st.nRight + (st.answer.includes(ltr) ? 1 : 0)
    }));
    

  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,id) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={id}
      >
        {ltr}
      </button>
    ));
  }

  handleRestart(e) {
    this.setState(st => ({ 
  nWrong: 0,
  nRight: 0,
  guessed: new Set(),
  answer: randomWord()
    }))
    


  }

  /** render: render game */
  render() {
      console.log(this.state.answer)
      console.log(this.state.nRight)
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses out of your ${this.props.maxWrong} guesses allowed`}/>
        <p>Number wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
         {this.state.nRight===this.state.answer.length? <div className="win-message"><h1 >YOU WIN!</h1><button className="restart-btn" onClick={this.handleRestart}>RESTART</button></div> : this.state.nWrong===this.props.maxWrong? <div className="lose-message"><h1 >YOU LOSE!</h1><button className="restart-btn" onClick={this.handleRestart}>RESTART</button></div> : <p className='Hangman-btns'>{this.generateButtons()}</p>}
      </div>
    );
  }
}

export default Hangman;
