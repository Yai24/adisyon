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
            detailListRemoveIndis:0,
            token:null
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

        fetch(`http://localhost:3002/api/order`, 
            {
                method:'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded',
                    'x-access-token':localStorage.getItem('token')
                },
                body:`masaid=${encodeURI(this.props.match.params.id)}&ürünid=${encodeURI(listNewItem.ürün_id)}`

                /*JSON.stringify({
                    masaid:this.props.match.params.id,
                    ürünid:listNewItem.ürün_id
                })*/
            }
        )
        .then(res => console.log(res));

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

    removeDetailList() {

        this.setState({
            detailListItemArray:[],
            detailListTotal:0
        })

        var deskId = this.props.match.params.id;
        console.log(deskId);
        fetch(`http://localhost:3002/api/order/${deskId}`, {
             method:'delete',
             headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'x-access-token':localStorage.getItem('token')
             }
        })
        .then(res => console.log(res));
    }

    componentDidMount() {

        if(localStorage.getItem('token') !== null) {
            var category = [];

            fetch('http://localhost:3002/api/product', {
                method:'GET',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    'x-access-token':localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(product => {
                product.map(x => {
                    if(!this.contains(category,x.ürün_kategori_adi)) {
                        category.push(x.ürün_kategori_adi);
                    }
                })
    
                let data = category.map((kategori,key) => {
                    return (
                        <div className="dropdown" key = {key} style = {{width:'100%', paddingTop:'25px'}}>
    
                            <button onClick = {() => this.dropdownSubMenu(kategori,key)} style={{width:'80%'}} className="dropbtn">{kategori}</button> 
                            {
                                product.map((ürün, key) => {
                                    if(kategori == ürün.ürün_kategori_adi) {
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
            })
    
            var deskId = this.props.match.params.id;
            fetch(`http://localhost:3002/api/order/${deskId}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    'x-access-token':localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(order => {
                this.setState({
                    detailListItemArray:order
                })
    
                var listArray = this.state.detailListItemArray;
                var detailListTotal = 0;
        
                for(var i = 0; i < listArray.length; i++) {
                    detailListTotal += listArray[i].ürün_fiyat;
                }
        
                this.setState({
                    detailListTotal:detailListTotal
                })
            })
        }else {
            this.props.history.push('/')
        }
     
       
       
    }

     render() {
         return(
            <div className="detail">
                <div className="container is-fluid">
                    <Navbar />
                    <div className="columns is-multiline">
                        <div className="column is-3" style={{height:'auto'}}>
                            {this.state.dropdownData}
                        </div>
                        <div className="column is-4" style={{height:'auto'}}>

                            <div className="product-name">
                                <h1 class="subtitle is-5">Ürün Adı:</h1>
                            </div>
                            <hr />    
                            <div className="product-adet">
                                <h1 class="subtitle is-5">Ürün Adet</h1>
                                <input class="input is-info" type="number" placeholder="1" />
                            </div>
                            <hr />
                            <div className="product-not">
                                <h1 class="subtitle is-5">Ürün Not</h1>
                                <textarea class="textarea is-info" rows="5" cols="100" type="text" placeholder="Not"></textarea>
                            </div>
                            <hr />
                            <div className="product-button">
                                <a class="button is-primary">Siparişi Onayla </a>
                                <a class="button is-danger">Siparişi İptal Et</a>
                            </div>
                        </div>
                        <div className="column is-5" style={{height:'auto'}}>
                            <div className="detail-list" style={{overflowX:'hidden'}}>
                                <div className="detail-list-header">
                                    <h3>Masa {this.props.match.params.id}</h3>
                                    <div className="detail-list-button">
                                        <button className="button is-danger is-outlined">Sil({this.state.detailListRemoveIndis})</button>
                                        <button className="button is-danger" onClick={() => {this.removeDetailList() }} >
                                            Temizle
                                        </button>
                                    </div>
                                </div>
                                <div className="detail-list-item">
                                    <ul>
                                        {
                                            this.state.detailListItemArray.map((item,key) => {
                                                return (
                                                    <li key = {key} onClick = {(e) => this.detailListItemColor(e,item)}>
                                                        <p disabled>{item.ürün_adi}</p>
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