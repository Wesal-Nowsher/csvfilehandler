import React, {Component} from 'react';

import {Consumer} from '../../store/context';
import Control from './index';

class controlcontainer extends Component{
    render(){
        return(
            <Consumer>
                {
                    ({dispatch, data, check}) => (
                        <Control  data={data} check={check}/>
                    )
                }
            </Consumer>
        )
    }
}
export default controlcontainer;