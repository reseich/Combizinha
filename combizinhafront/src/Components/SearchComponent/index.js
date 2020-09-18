import React from 'react'
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    form: {},
    submit: {}

}));


function SearchComponent(props) {
    const [ingredients, setIngredients] = React.useState(null);
    const classes = useStyles();

    function _handleTextFieldChange(e) {
        setIngredients(e.target.value.split(',').filter((it) => it).map((it)=> it.trim()))
    }


    return (<div>
        <Container maxWidth="lg">
            <form onSubmit={props.submit.bind(null, ingredients)} className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={_handleTextFieldChange}
                    id="ingredients"
                    error={ingredients !== null && !ingredients.length && (ingredients[0] && ingredients[0].length <= 1)}
                    helperText={ingredients !== null && !ingredients.length && (ingredients[0] && ingredients[0].length <= 1)? "Preencha pelo menos um ingrediente": null}
                    placeholder="Coloque os ingredientes separados por virgula. Ex. batata, macarrão"
                    label="Ingredientes"
                    name="ingredients"
                    autoFocus
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={ingredients === null || !ingredients.length || ingredients[0].length <= 1}
                    color="primary"
                    className={classes.submit}
                >
                    Procurar Receitas
                </Button>

            </form>

        </Container>
    </div>)
}

export default SearchComponent