import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Api from "../Utils/Api";

const styles = {
    root: {
        flex: 1,
        backgroundColor:'#eeedf2'
    }, cardGrid: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }

    async componentDidMount() {
        let recipes = await Api.get('/recipes').catch((err) => {
            console.log(err)
        })
        this.setState({recipes: recipes.data.recipes})
    }

    render() {
        return (
            <main className={this.props.classes.root}>
                <div >
                    <Container maxWidth="lg">
                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                            Aqui vai ficar o os campos pra buscar as receitas
                        </Typography>

                    </Container>
                </div>
                <Container className={this.props.classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {this.state.recipes.length ? this.state.recipes.map((card) => {
                            console.log(card)
                            return (
                                <Grid item key={card._id} xs={12} sm={6} md={6}>
                                    <Card className={this.props.classes.card}>
                                        <CardContent className={this.props.classes.cardContent}>
                                            <Typography gutterBottom component="h2">
                                                {card.name}
                                            </Typography>
                                            <Typography>
                                            </Typography>
                                                Categoria: {card.category}
                                            <Typography>
                                                Quantidade: {card.portions.toLowerCase()}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Abrir
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        }) : <div>Carregando receitas...</div>}
                    </Grid>
                </Container>
            </main>
        );
    }
}

export default withStyles(styles)(Home)