import React, { Component } from 'react';
import DetailStyle from './DetailStyle.css';
import Navbar from '../Navbar';


class Detail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data:[],
        }
    }

    contains(itemArray,searchItem) {
        var containStatus = false;
        for(var i = 0; i < itemArray.length; i++) {
            if(itemArray[i] == searchItem) {
                containStatus = true;
            }
        }

        return containStatus;
    }

    subMenu(menuName,key) {
        var dropDown = document.getElementsByClassName('dropdown')[key];
        var dropDownSubItem = dropDown.getElementsByClassName('dropdown-content');

        for(var i = 0; i < dropDownSubItem.length; i++) {
            var subItemDisplay = dropDownSubItem[i].style.display;
            if(subItemDisplay == 'none') {
                dropDownSubItem[i].style.display = 'block' 
            } else {
                dropDownSubItem[i].style.display = 'none';
            }
        }
       
    }

    componentDidMount() {
        var fakedata = [
            {
                ürün_id:'1',
                ürün_adi:'Karışık Pizza',
                ürün_fiyat:'20',
                ürün_kategori:'Pizza',
                ürün_stok:'50'
            },
            {
                ürün_id:'2',
                ürün_adi:'Kıymalı Pide',
                ürün_fiyat:'15',
                ürün_kategori:'Pide',
                ürün_stok:'30'
            },
            {
                ürün_id:'3',
                ürün_adi:'Tavuk Döner',
                ürün_fiyat:'12',
                ürün_kategori:'Döner',
                ürün_stok:'20'
            },
            {
                ürün_id:'4',
                ürün_adi:'Et Döner',
                ürün_fiyat:'12',
                ürün_kategori:'Döner',
                ürün_stok:'20'
            },
            {
                ürün_id:'5',
                ürün_adi:'Sucuklu Pizza',
                ürün_fiyat:'12',
                ürün_kategori:'Pizza',
                ürün_stok:'20'
            },
            {
                ürün_id:'6',
                ürün_adi:'Adana Kebap',
                ürün_fiyat:'12',
                ürün_kategori:'Kebap',
                ürün_stok:'20'
            },
            {
                ürün_id:'7',
                ürün_adi:'Çilekli Dondurma',
                ürün_fiyat:'12',
                ürün_kategori:'Dondurma',
                ürün_stok:'20'
            },
            {
                ürün_id:'7',
                ürün_adi:'Çilekli Deneme',
                ürün_fiyat:'12',
                ürün_kategori:'Deneme',
                ürün_stok:'20'
            },
        ];

        var category = [];
        for(var i = 0; i < fakedata.length; i++) {
            if(!this.contains(category,fakedata[i].ürün_kategori)) {
                category.push(fakedata[i].ürün_kategori);
            }
        }

        let data = category.map((kategori,key) => {
                return (
                    <div className="dropdown" key = {key} style = {{width:'100%', paddingTop:'25px'}}>

                        <button onClick = {() => this.subMenu(kategori,key)} style={{width:'65%'}} className="dropbtn">{kategori}</button> 
                        {
                            fakedata.map((ürün, key) => {
                                if(kategori == ürün.ürün_kategori) {
                                    return (
                                        <div id="myDropdown" style={{display:'none'}} key={key} className="dropdown-content">
                                            <a href="#home">{ürün.ürün_adi}</a>
                                        </div>
                                    );
                                }
                            })   
                        }
                    </div>
                );
            });
            
        this.setState({
            data
        });
    }

     render() {
         return(
            <div className="detail">
                <div className="container is-fluid">
                    <Navbar />
                    <div className="columns is-multiline">
                        <div className="column is-4" style={{height:'auto'}}>
                            {this.state.data}
                        </div>
                        <div className="column is-2" style={{height:'auto'}}>
                            
                        </div>
                        <div className="column is-6" style={{height:'auto'}}>
                            <div className="detail-list">
                                <div className="detail-list-header">
                                    <h3>Masa 1</h3>
                                    <div className="detail-list-button">
                                        <button className="button is-danger is-outlined">Sil(1)</button>
                                        <button className="button is-danger ">Temizle</button>
                                    </div>
                                </div>
                                <div className="detail-list-item">
                                    <ul>
                                        <li>
                                            <p>1x Adana Kebap</p>
                                            <p>20 TL</p>
                                        </li>
                                        <li>
                                            <p>Adana Kebap</p>
                                            <p>20 TL</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="detail-footer">
                                    <h3>TOPLAM</h3>
                                    <div className="detail-total">
                                        <p>0.00 TL</p>
                                        <p>0.00 TL</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
         ) 
     }
 }

 export default Detail;