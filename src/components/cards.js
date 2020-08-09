import React, { Component } from 'react'

class Cards extends Component {

    getheight = id => {
        let big = 300, small = 200
        if (Math.floor(id/4) % 2) {
            return ((id%4)%2) ? big : small
        } else {
            return ((id%4)%2) ? small : big
        }
    }

    render() {
        const { recipe } = this.props
        return (
            <div
                className="cards"
                style={{
                    backgroundImage: `url("/Images/Img${(recipe.id % 8) + 1}.jpg")`,
                    height: this.getheight(recipe.id)
                }}
            >
                {
                    recipe.label !== "" ?
                    <div className="label"> {recipe.label} </div>
                    : null
                }
                <div className="details">
                    <div>
                        <p className="name"> {recipe.name} </p>
                        <p className="price"> {recipe.price} </p>
                        <p className="price"> {recipe.category} </p>
                        <p className="description"> {recipe.description.slice(0, 60)} </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards