import React , { Component } from 'react';
import DeskStyle from './MasalarStyle.css';
class Masalar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
      
    }


    render()  {
        return (
          <div className="desk">
            <div class="container is-fluid">
              <div class="columns is-multiline">
                  <div class="column is-9 ">
                    <div class="columns is-multiline is-mobile">
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>
                      <div class="column is-3 ">
                          <a style={{height:'100px'}} class="button is-success is-large is-fullwidth">Masa 1</a>
                      </div>

                    </div>
                  </div>
                  <div class="column is-3">
                      <div class="columns is-multiline is-mobile">
                        <div class="column is-12">
                          <a style={{height:'50px'}} class="button is-info is-fullwidth "> 
                            <i style={{marginRight:'10px'}} class="fab fa-cc-amazon-pay"></i>
                            Kredi Kartlarını Aktar
                          </a>
                        </div>
                        <div class="column is-12">
                          <a style={{height:'50px'}} class="button is-link is-fullwidth "> 
                            <i style={{marginRight:'10px'}} class="fas fa-shopping-basket"></i>
                            Ürünler
                          </a>
                        </div>
                        <div class="column is-12">
                          <a style={{height:'50px'}} class="button is-primary is-fullwidth "> 
                            <i style={{marginRight:'10px'}} class="fas fa-check"></i>
                            Rezervasyonlar
                          </a>
                        </div>
                         <div class="column is-12">
                          <a style={{height:'50px'}} class="button is-primary is-fullwidth"> 
                            <i style={{marginRight:'10px'}} class="fas fa-pencil-alt"></i>
                            Hesap Düzelt
                          </a>
                        </div>
                         <div class="column is-12">
                          <a style={{height:'50px'}} class="button is-primary is-fullwidth"> 
                            <i style={{marginRight:'10px'}} class="fas fa-plus"></i>
                            Gider Ekle
                          </a>
                        </div>
                         <div class="column is-12">
                          <a style={{height:'50px'}} class="button is-primary is-fullwidth"> 
                            <i style={{marginRight:'10px'}} class="fas fa-plus"></i>
                            Gelen Ödeme
                          </a>
                        </div>
                        <div class="column is-12">
                          <a style={{height:'50px'}} class="button is-danger is-fullwidth"> 
                            <i style={{marginRight:'10px'}} class="fas fa-lock"></i>
                              Kapat
                          </a>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        )
    }
}

export default Masalar;