import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {CardComponent} from "../Components/CardComponent";
import SearchComponent from "../Components/SearchComponent";
import axios from 'axios'
import Qs from 'qs'


const styles = {
    root: {
        flex: 1,
        backgroundColor: '#eeedf2'
    }, cardGrid: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    searchComponent: {
        marginBottom: '10px'
    },
    errorMessage: {
        color: 'red'
    },
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            loading: true,
            error: null
        }
    }

    async handleSubmit(ingredients, e) {
        e.preventDefault()
        this.setState({loading: true})
        let params = {
            items: ingredients
        }

        let myAxios = axios.create({
            baseURL: "http://localhost:3333/",
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })

        myAxios.get('/recipesByItem', {params})
            .then((data) => {
                this.setState({recipes: data.data.recipes, loading: false, error: null})

            })
            .catch((err) => {
                this.setState({loading: false, error: err.response ? err.response.data.message : err})
                console.log(err.response ? err.response.data.message : err)
            })

    }

    async componentDidMount() {
        await axios.create({
            baseURL: "http://localhost:3333/",
            responseType: "json"
        }).get('/recipes').then((data) => {
            this.setState({recipes: data.data.recipes, loading: false, error: null})
        }).catch((err) => {
            this.setState({loading: false, error: err.response ? err.response.data.message : err})
            console.log(err.response ? err.response.data.message : err)
        })

    }

    loadContent() {
        if (this.state.loading) {
            return <h1>Carregando Receitas</h1>
        }
        if (this.state.error) {
            return <h1 className={this.props.classes.errorMessage}> Erro ao carregar receitas: {this.state.error}</h1>
        }
        return <Grid container spacing={4}>
            {this.state.recipes.length ? this.state.recipes.map((card) => {
                return (
                    <Grid item key={card._id} xs={12} sm={6} md={6}>
                        <CardComponent card={card}/>
                    </Grid>
                )
            }) : <h1 className={this.props.classes.cardGrid}>Nenhuma receita encontrada</h1>}
        </Grid>
    }

    render() {
        return (
            <main className={this.props.classes.root}>
                <Container className={this.props.classes.cardGrid} maxWidth="md">
                    <Container className={this.props.classes.searchComponent}>
                        <SearchComponent submit={this.handleSubmit.bind(this)}/>
                    </Container>
                    {this.loadContent()}
                </Container>
            </main>
        );
    }
}

export default withStyles(styles)(Home)