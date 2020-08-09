import React, { Component } from 'react'
import './../styles/home.css';
import Masonry from 'react-masonry-css';
import Cards from './cards';
import { InputBase } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { fade, withStyles } from '@material-ui/core/styles';

const styles = ((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
        backgroundColor: '#0000001f',
        borderRadius: '5px'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      }
  }));

class Home extends Component {
    state={
        searchValue: '',
        recipes: []
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.searchValue !== this.state.searchValue && this.state.searchValue !== '') {
            let recipes = this.props.recipes
            this.setState({
                recipes: recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
            })
        }
    }

    renderCards = () => {
        let recipes =  this.state.searchValue === ''
        ? this.props.recipes : this.state.recipes
        if (!recipes.length){
            return <p>Nothing to show</p>
        }
        return recipes.map(recipe => {
            return(
                <Cards recipe={recipe} key={recipe.id} />
            )
        })
    }

    handleChange = e => {
        e.persist()
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        // const classes = useStyles();
        const { classes } = this.props
        return (
            <div className="home">
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <Search />
                    </div>
                    <InputBase
                    placeholder="Search By Name…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={this.state.searchValue}
                    onChange={this.handleChange}
                    />
                </div>
                <h3>Pizza And Noodles</h3>
                <Masonry
                    breakpointCols={4}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {this.renderCards()}
                </Masonry>
            </div>
        )
    }
}

export default withStyles(styles)(Home)