import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
class BurgerBUilder extends Component {
    render() {
        return (
            <Aux>
                <Burger/>
                <div>Burger control</div>
            </Aux>
        );
    }
}

export default BurgerBUilder;