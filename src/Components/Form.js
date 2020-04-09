import React, { Component } from 'react'

class Form extends Component {
    render() {
        const { syllables, order, handleForm, handleInput } = this.props
        
        return (
            <form onSubmit={handleForm}>
                {order.map((syllable, index) => (
                    <div className='single-input-div' key={index}>
                        <input
                            type='text' name='syllables'
                            id={index} placeholder={syllable}
                            onChange={handleInput}
                            value={syllables[index] || ''} />
                    </div>
                ))}
            </form>
        )
    }
}

export default Form