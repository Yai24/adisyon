import React, { Component } from 'react';
import DetailStyle from './DetailStyle.css';
import Navbar from '../Navbar';


class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownData:[],
            detailListItemArray:[],
            detailListTotal: 0,
            detailRemoveListTotal: 0,
            detailListRemoveIndis:0
        }

        this.detailListItemColor = this.detailListItemColor.bind(this);
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

    dropdownSubMenu(menuName,key) {
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
    
    detailListAction(listNewItem) {
        var listArray = this.state.detailListItemArray;
        listArray.push(listNewItem);

        var detailListTotal = 0;

        for(var i = 0; i < listArray.length; i++) {
            detailListTotal += listArray[i].ürün_fiyat;
        }

        this.setState({
            detailListItemArray:listArray,
            detailListTotal:detailListTotal
        })
    }

    detailListItemColor(e,item) {
        var itemColor = e.target.style;

        if(itemColor.backgroundColor == '') {
            itemColor.backgroundColor = '#FFDB4A';
            itemColor.color = '#FFF';

            this.setState({
                detailListRemoveIndis:this.state.detailListRemoveIndis+1,
                detailRemoveListTotal:this.state.detailRemoveListTotal+item.ürün_fiyat
            })
        }else {
            itemColor.backgroundColor = '';
            itemColor.color = 'black';

            this.setState({
                detailListRemoveIndis:this.state.detailListRemoveIndis-1,
                detailRemoveListTotal:this.state.detailRemoveListTotal-item.ürün_fiyat
            })
        }
    }

    componentDidMount() {
        var fakedata = [
            {
                ürün_id:'1',
                ürün_adi:'Karışık Pizza',
                ürün_fiyat:20,
                ürün_kategori:'Pizza',
                ürün_stok:'50'
            },
            {
                ürün_id:'2',
                ürün_adi:'Kıymalı Pide',
                ürün_fiyat:15,
                ürün_kategori:'Pide',
                ürün_stok:'30'
            },
            {
                ürün_id:'3',
                ürün_adi:'Tavuk Döner',
                ürün_fiyat:12,
                ürün_kategori:'Döner',
                ürün_stok:'20'
            },
            {
                ürün_id:'4',
                ürün_adi:'Et Döner',
                ürün_fiyat:12,
                ürün_kategori:'Döner',
                ürün_stok:'20'
            },
            {
                ürün_id:'5',
                ürün_adi:'Sucuklu Pizza',
                ürün_fiyat:12,
                ürün_kategori:'Pizza',
                ürün_stok:'20'
            },
            {
                ürün_id:'6',
                ürün_adi:'Adana Kebap',
                ürün_fiyat:12,
                ürün_kategori:'Kebap',
                ürün_stok:'20'
            },
            {
                ürün_id:'7',
                ürün_adi:'Çilekli Dondurma',
                ürün_fiyat:12,
                ürün_kategori:'Dondurma',
                ürün_stok:'20'
            },
            {
                ürün_id:'7',
                ürün_adi:'Çilekli Deneme',
                ürün_fiyat:12,
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

                        <button onClick = {() => this.dropdownSubMenu(kategori,key)} style={{width:'65%'}} className="dropbtn">{kategori}</button> 
                        {
                            fakedata.map((ürün, key) => {
                                if(kategori == ürün.ürün_kategori) {
                                    return (
                                        <div id="myDropdown" style={{display:'none'}} key={key} className="dropdown-content">
                                            <a onClick={() => this.detailListAction(ürün)}>{ürün.ürün_adi}</a>
                                        </div>
                                    );
                                }
                            })   
                        }
                    </div>
                );
            });
            
        this.setState({
            dropdownData:data
        });
    }

     render() {
         return(
            <div className="detail">
                <div className="container is-fluid">
                    <Navbar />
                    <div className="columns is-multiline">
                        <div className="column is-4" style={{height:'auto'}}>
                            {this.state.dropdownData}
                        </div>
                        <div className="column is-2" style={{height:'auto'}}>
                            
                        </div>
                        <div className="column is-6" style={{height:'auto'}}>
                            <div className="detail-list">
                                <div className="detail-list-header">
                                    <h3>Masa {this.props.match.params.id}</h3>
                                    <div className="detail-list-button">
                                        <button className="button is-danger is-outlined">Sil({this.state.detailListRemoveIndis})</button>
                                        <button className="button is-danger ">Temizle</button>
                                    </div>
                                </div>
                                <div className="detail-list-item">
                                    <ul>
                                        {
                                            this.state.detailListItemArray.map((item,key) => {
                                                return (
                                                    <li key = {key} onClick = {(e) => this.detailListItemColor(e,item)}>
                                                        <p>{item.ürün_adi}</p>
                                                        <p>{item.ürün_fiyat} TL</p>
                                                     </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="detail-footer">
                                <h3>TOPLAM</h3>
                                <div className="detail-total">
                                    <p>{this.state.detailRemoveListTotal} TL</p>
                                    <p>{this.state.detailListTotal} TL</p>
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