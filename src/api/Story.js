import React, { Component } from 'react'

class Story extends Component {
    capitalize = str => {
        return str.replace(/\w/, letter => letter.toUpperCase())
    }

    // replaces blanks in sentence with the syllables from the user's input
    makeStory = (sentence, syllables) => {
        let story = sentence
        let pattern = /\[[^\]]*\]/ // finds the first instance of [...]

        for (let i = 0; i < syllables.length; i++){
            story = story.replace(pattern, syllables[i])
        }
        return this.capitalize(story)
    }

    render() {
        const { sentence, syllables } = this.props
        this.makeStory(sentence, syllables)
        
        return (
            <p>{this.makeStory(sentence, syllables)}</p>
           
        )
    }
}

export default Story;