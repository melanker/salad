import React from 'react';
import {useDispatch} from 'react-redux';
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addIngredient, removeIngredient} from "../../../../reducers/ingredientsSlice";

const operations = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
}

const Table = ({ingredients = []}) => {
    const dispatch = useDispatch();

    const handleAddRemove = (event) => {
        const action = event?.target?.parentElement?.dataset?.action ?? null;

        if (!action) {
            return null;
        }

        const [ingredient, operation] = action.split('_');

        if (operation === operations.ADD) {
            dispatch(addIngredient(ingredient));
        }

        if (operation === operations.REMOVE) {
            dispatch(removeIngredient(ingredient));
        }
    }

    return (
        <table onClick={handleAddRemove}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Add/Remove</th>
                <th>Sum</th>
            </tr>
            </thead>
            <tbody>
            {
                (ingredients || []).map(ingredient => (
                    <tr key={ingredient.name}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.price}</td>
                        <td>{ingredient.quantity}</td>
                        <td>
                            <IconButton data-action={`${ingredient.name}_${operations.ADD}`}>
                                <AddIcon/>
                            </IconButton>
                            <IconButton data-action={`${ingredient.name}_${operations.REMOVE}`}>
                                <RemoveIcon/>
                            </IconButton>
                        </td>
                        <td>{(ingredient.quantity * ingredient.price).toFixed(2)}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};

export default Table;