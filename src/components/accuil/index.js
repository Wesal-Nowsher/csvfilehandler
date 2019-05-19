import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
class accuil extends Component{

    render(){
        return(
            <div>
                <div className="starter-head" >
                    <div className="container-inside">
                        <div className="header">
                            <span className="header-text" >Contrôle WEB</span>
                        </div>
                        <div className="empty-space"></div>
                        <Link className="link1">
                            <div className="link-text">Accueil</div>
                        </Link>
                        <Link to="/importation" className="link2">
                            <div className="">Importation</div>
                        </Link>
                        <Link to="/controle" className="link3">
                            <div className="">Contrôles</div>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}
export default accuil;