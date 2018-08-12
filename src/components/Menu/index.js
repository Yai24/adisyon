import React , { Component } from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logOut() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    render()  {
        return (
            <div className="column is-3">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-12">
                        <a href='/products' style={{height:'50px',width:'80%',marginLeft:'auto'}} className="button is-link is-fullwidth ">
                            <div style={{width:'20%',display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:'30%'}}> 
                                <i style={{marginRight:'10px'}} className="fas fa-shopping-basket"></i>
                                <span>Ürünler</span>
                            </div>
                        </a>
                    </div>
                    <div className="column is-12">
                        <a style={{height:'50px',width:'80%',marginLeft:'auto'}} className="button is-primary is-fullwidth "> 
                            <div style={{width:'20%',display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:'30%'}}> 
                                <i style={{marginRight:'10px'}} className="fas fa-check"></i>
                                <span>Rezervasyonlar</span>
                            </div>
                        </a>
                    </div>
                    <div className="column is-12">
                        <a style={{height:'50px',width:'80%',marginLeft:'auto'}} className="button is-primary is-fullwidth"> 
                            <div style={{width:'20%',display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:'30%'}}> 
                                <i style={{marginRight:'10px'}} className="fas fa-plus"></i>
                                <span>Gider Ekle</span>
                            </div>
                        </a>
                    </div>
                    <div className="column is-12">
                        <a style={{height:'50px',width:'80%',marginLeft:'auto'}} className="button is-primary is-fullwidth"> 
                            <div style={{width:'20%',display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:'30%'}}> 
                                <i style={{marginRight:'10px'}} className="fas fa-caret-square-right"></i>
                                <span>Gelen Ödeme</span>
                            </div>
                        </a>
                    </div>
                    <div className="column is-12">
                        <a onClick={() => this.logOut()} style={{height:'50px',width:'80%',marginLeft:'auto'}} className="button is-danger is-fullwidth"> 
                            <div style={{width:'20%',display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:'30%'}}> 
                                <i style={{marginRight:'10px'}} className="fas fa-lock"></i>
                                <span>Çıkış</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;