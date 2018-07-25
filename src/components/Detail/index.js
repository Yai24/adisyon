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

    subMenu(menuName) {
        
        var menuItem = document.getElementsByClassName('dropdown-content');
        for(var i = 0; i < menuItem.length; i++) {
            if(menuItem[i].innerHTML.indexOf(menuName) > -1) {
                var item = menuItem[i];

                if(item.style.display === 'none') {
                    item.style.display = 'block';
                }else {
                    item.style.display = 'none';
                }
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
        ];

        var category = fakedata.map(x => {
            return x.ürün_kategori
        });

        let kategoriler = [...new Set(category)];   


       let data = kategoriler.map((kategori,key) => {
            return (
                <div 
                    className="dropdown" 
                    key = {key} 
                    style = {{width:'100%', paddingTop:'25px'}}
                    onClick = {() => this.subMenu(kategori)}
                >

                    <button style={{width:'65%'}} className="dropbtn">{kategori}</button> 
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
                    </div>
                </div>
          </div>
         ) 
     }
 }

 export default Detail;