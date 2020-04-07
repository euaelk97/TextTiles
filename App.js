import React, { Component } from 'react';


import sentence from './api/Sentence.json';
import Form from './api/Form';
import Story from './api/Story';

class App extends Component {
  
  constructor() {
    super();
  
    this.state = {
      sentence: '',
      syllablesNeeded: 0,
      order: [],
      syllables: [],
      submitted: false

    };

  }
    componentDidMount = () => {
      this.getOrder()
      
    }

    // Grab random sentence from sentence file
    grabRandomPassage = () => {
      let i = Math.floor(Math.random() * sentence.length)
      return sentence[i]
    }

    // Takes sentence and extracts:
    // (1) Order of the words
    // (2) Replace those words with order index number
    getOrder = () => {
      let random = this.grabRandomPassage()
      let randomSentence = random.sentence
      let syllablesNeeded = random.syllablesNeeded
      let pattern = /<[^>]*>/
      let orderArray = []

      for (let i = 0; i < syllablesNeeded; i++) {
        let foundSyllable = randomSentence.match(pattern)[0]
        let orderWord = foundSyllable.split('').splice(1, foundSyllable.length -2).join('') //ex. exclaim
        randomSentence = randomSentence.replace(pattern, `[${i}]`)
        orderArray.push(orderWord)
      }

      this.setState({
        sentence: randomSentence,
        syllablesNeeded: syllablesNeeded,
        order: orderArray
      })

    }

    // Prevent page from reloading when using presses "Return"
    handleFormSubmit = event => {
      event.preventDefault()
      this.setState({
        submitted: true
      })
    }

    // When user clicks submit button
    handleSubmitButton = event => {
      const { syllablesNeeded, syllables } = this.state
      
      const hasSyllables = syllables.filter(syllable => syllable)

      if (hasSyllables.length === syllablesNeeded) {
        this.setState({
          submitted: true
        })
      } else {
        console.log(`only filled out ${hasSyllables.length} syllables out of ${syllablesNeeded}`)
      }
    }

    // When user clicks for another sentence
    handleAnotherButton = event => {
      this.setState({
        syllables: [],
        submitted: false
      })

      this.componentDidMount()
    }

    // Tracks input changes and add to state
    handleInputChange = event => {
      let newSyllables = this.state.syllables
      let i = parseInt(event.target.id)
      newSyllables[i] = event.target.value

      this.setState({
        syllables: newSyllables
      })
    }

  // let [points, setPoints] = useState(5);
  // let [correct, setCorrect] = useState(false);

  // need to extract sentences, then display somehow
    extractJSON(obj, index) {
    for(const i in obj) {
      if(i == 0){
        console.log()
      }
    }
  }

  
  render(){
    const { sentence, order, syllables, submitted} = this.state

    const story = (
      <div className='main'>
        <div className='main-story'>
          <Story
            sentence={sentence}
            syllables={syllables} />
        </div>
        <div className='button-bottom-div'>
          <button onClick={this.handleAnotherButton}>Another one</button>
        </div>
      </div>
    )

    const form = (
      <div className='main'>
        <div className='button-top-div'>
          <button onClick={this.handleAnotherButton}>Another One</button>
        </div>

        <div className='main-form'>
          <Form 
            syllables={syllables}
            order={order}
            handleForm={this.handleFormSubmit}
            handleInput={this.handleInputChange} />
        </div>
        <div className='button-bottom-div' >
          <button onClick={this.handleSubmitButton}>Submit</button>
        </div>
      </div>

    )
    
    return (
      <div className='container'>
        <h1>BigWords</h1>
        {submitted ? story : form}
      
      </div>
    )
  }
}

export default App;