import React , { Component } from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render()  {
        return (
            <div className="column is-3">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-12">
                        <a style={{height:'50px'}} className="button is-info is-fullwidth "> 
                        <i style={{marginRight:'10px'}} className="fab fa-cc-amazon-pay"></i>
                        Kredi Kartlarını Aktar
                        </a>
                    </div>
                    <div className="column is-12">
                        <a style={{height:'50px'}} className="button is-link is-fullwidth "> 
                        <i style={{marginRight:'10px'}} className="fas fa-shopping-basket"></i>
                        Ürünler
                        </a>
                    </div>
                    <div className="column is-12">
                        <a style={{height:'50px'}} className="button is-primary is-fullwidth "> 
                        <i style={{marginRight:'10px'}} className="fas fa-check"></i>
                        Rezervasyonlar
                        </a>
                    </div>
                        <div className="column is-12">
                        <a style={{height:'50px'}} className="button is-primary is-fullwidth"> 
                        <i style={{marginRight:'10px'}} className="fas fa-pencil-alt"></i>
                        Hesap Düzelt
                        </a>
                    </div>
                        <div className="column is-12">
                        <a style={{height:'50px'}} className="button is-primary is-fullwidth"> 
                        <i style={{marginRight:'10px'}} className="fas fa-plus"></i>
                        Gider Ekle
                        </a>
                    </div>
                        <div className="column is-12">
                        <a style={{height:'50px'}} className="button is-primary is-fullwidth"> 
                        <i style={{marginRight:'10px'}} className="fas fa-caret-square-right"></i>
                        Gelen Ödeme
                        </a>
                    </div>
                    <div className="column is-12">
                        <a style={{height:'50px'}} className="button is-danger is-fullwidth"> 
                        <i style={{marginRight:'10px'}} className="fas fa-lock"></i>
                            Çıkış
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;