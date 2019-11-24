import React, {Component} from 'react';
import axios from 'axios';
import classes from './Search.module.css'
import Suggestions from "./Suggestions";

class Search extends Component {
    state = {
        query: '',
        results: []
    };


    getInfo = () => {
        axios.get(`/api/product/searchByName/${this.state.query}`)
            .then(res => {
                console.log(res)
                this.setState({
                    results: res.data
                }, () => console.log(this.state))
            })
    };

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getInfo()
            } else if (!this.state.query) {
            }
        })
    };

    render() {
        return (
            <form>
                <input
                    placeholder="Search"
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    className={classes.searchInput}
                />
                {
                    !this.props.hideSuggestions &&this.state.query && this.state.results.length > 0 ?
                        <Suggestions results={this.state.results} />
                        : null
                }
            </form>
        )
    }
}

export default Search