import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {CardComponent} from "../Components/CardComponent";
import SearchComponent from "../Components/SearchComponent";
import axios from 'axios'
import Qs from 'qs'
import Pagination from "@material-ui/lab/Pagination";


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
    pagination: {
        marginTop: 16,
        marginBottom: 16,
    },
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            recipeCount: 0,
            loading: true,
            error: null,
            page: 1,
            numberOfPages: null,
            ingredients: null
        }
    }

    async handleSubmit(ingredients, e) {
        e.preventDefault()
        await this.setState({loading: true, ingredients:ingredients, page: 1})
        await this.getRecipes()

    }

    async getRecipes(page) {
        let params = {page:page || 1}
        let endPoint = 'recipes'

        if(this.state.ingredients && this.state.ingredients.length){
            params.items = this.state.ingredients
            endPoint = 'recipesByItem'
        }

        let myAxios = axios.create({
            baseURL: "http://localhost:3333/",
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        })

        myAxios.get(`/${endPoint}`, {params})
            .then((data) => {
                let recipeCount = data.data.recipes.metadata[0].total
                let numberOfPage = Math.ceil(data.data.recipes.metadata[0].total / 12)
                this.setState({
                    recipes: data.data.recipes.data,
                    loading: false,
                    error: null,
                    recipeCount: recipeCount,
                    numberOfPages: numberOfPage,
                })

            })
            .catch((err) => {
                this.setState({loading: false, error: err.response ? err.response.data.message : err})
                console.log(err.response ? err.response.data.message : err)
            })

    }


    async componentDidMount() {
        await this.getRecipes()
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
            }) : null}
        </Grid>
    }

    render() {
        return (
            <main className={this.props.classes.root}>
                <Container className={this.props.classes.cardGrid} maxWidth="md">
                    <Container className={this.props.classes.searchComponent}>
                        <SearchComponent submit={this.handleSubmit.bind(this)}/>
                    </Container>
                    {!this.state.loading ? <h1>{this.state.recipeCount} Receitas encontradas</h1> : null}
                    {this.loadContent()}
                    {this.state.numberOfPages ? <Pagination page={this.state.page} count={this.state.numberOfPages}
                                                            className={this.props.classes.pagination}
                                                            onChange={this.handlePaginate.bind(this)}
                                                            color="primary"/> : null}
                </Container>
            </main>
        );
    }

    async handlePaginate(e, value) {
        this.setState({page: value, loading:true})
        await this.getRecipes(value)

    }
}

export default withStyles(styles)(Home)