import React, { Component } from 'react';
import DetailStyle from './DetailStyle.css';
import Navbar from '../Navbar';
import swal from 'sweetalert2';

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownData:[],
            detailListItemArray:[],
            detailListTotal: 0,
            detailRemoveListTotal: 0,
            detailListRemoveIndis:0,
            token:null,
            productName:'',
            productSalary:0,
            productAdet:1,
            productNot:'',
            currentItem:[]
        }

        this.detailListItemColor = this.detailListItemColor.bind(this);
    }

    getData() {
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
                                                    <a onClick={(e) => {
                                                        this.changeProductName(e, ürün)
                                                        }}>{ürün.ürün_adi}</a>
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
                var total = 0;
                let data = order.map((x,key) => {
                    total += x.siparis_fiyat;
                    return x;
                })

                this.setState({
                    detailListTotal:total,
                    detailListItemArray:data
                })
            })
        }else {
            this.props.history.push('/')
        }
    }

    detailListAction(item) {
        item.siparis_adet = this.state.productAdet;
        item.siparis_fiyat = this.state.currentItem.ürün_fiyat * this.state.productAdet;
        var arrayList = this.state.detailListItemArray.push(item);
        
        this.setState({
            currentItem:arrayList,
            detailListTotal:this.state.detailListTotal + this.state.currentItem.ürün_fiyat * this.state.productAdet
        })
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

    orderInsert() {

        if(this.state.productName !== '') {
            this.detailListAction(this.state.currentItem);

            var orderItem = {
                masaid:this.props.match.params.id,
                ürünid:this.state.currentItem.ürün_id,
                siparisAdet:this.state.productAdet,
                siparisFiyat:this.state.currentItem.ürün_fiyat * this.state.productAdet,
                siparisNot:this.state.productNot
            }

            fetch(`http://localhost:3002/api/order`, 
                {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded',
                        'x-access-token':localStorage.getItem('token')
                    },
                    body:`masaid=${encodeURI(this.props.match.params.id)}&ürünid=${encodeURI(orderItem.ürünid)}&siparisadet=${encodeURI(orderItem.siparisAdet)}&siparisfiyat=${encodeURI(orderItem.siparisFiyat)}&siparisnot=${encodeURI(orderItem.siparisNot)}`
                }
            )
            .then(res => console.log(res));
        }else {
            swal({
                title: 'Lütfen bir ürün seçiniz',
                type: 'error',
                timer:1500
              })
        }
        
        
    }

    changeProductName(e, item) {
        this.setState({
            productName:e.target.innerHTML,
            currentItem:item
        })        
    }

    changeProductAdet(e) {
        this.setState({
            productAdet:e.target.value
        })
    }

    changeProductNot(e) {
        this.setState({
            productNot:e.target.value
        })
    }

    detailListItemColor(e,item) {
        
        if(e.target.tagName == 'LI') {
            var itemColor = e.target.style;

            if(itemColor.backgroundColor == '') {
                itemColor.backgroundColor = '#FFDB4A';
                itemColor.color = '#FFF';

                this.setState({
                    detailListRemoveIndis:this.state.detailListRemoveIndis+1,
                    detailRemoveListTotal:this.state.detailRemoveListTotal+item.siparis_fiyat
                })
            }else {
                itemColor.backgroundColor = '';
                itemColor.color = 'black';

                this.setState({
                    detailListRemoveIndis:this.state.detailListRemoveIndis-1,
                    detailRemoveListTotal:this.state.detailRemoveListTotal-item.siparis_fiyat
                })
            }
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
        .then(res => {
            if(res.status === 200) {
                swal({
                    title: 'İşlem Başarılı',
                    type: 'success',
                    timer:1000
                })
            }
        });
    }

    productCancel() {
        var deskId = this.props.match.params.id;
        console.log(deskId);
        fetch(`http://localhost:3002/api/detail`, {
             method:'put',
             headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'x-access-token':localStorage.getItem('token')
             },
             body:`id=${encodeURI(deskId)}`
        })
        .then(res => {
            console.log(res);
        })
    }
    
    orderCancel() {
        this.setState({
            productName:'',
            productAdet:1,
            productNot:''
        })
    }

    componentDidMount() {
        this.getData();
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
                                <h1 class="subtitle is-5">Ürün Adı: {this.state.productName}</h1>
                            </div>
                            <hr />    
                            <div className="product-adet">
                                <h1 class="subtitle is-5">Ürün Adet</h1>
                                <input onChange={(e) => this.changeProductAdet(e)} class="input is-info" type="number" placeholder="1" />
                            </div>
                            <hr />
                            <div className="product-not">
                                <h1 class="subtitle is-5">Ürün Not</h1>
                                <textarea onChange = {(e) => this.changeProductNot(e)} class="textarea is-info" rows="5" cols="100" type="text" placeholder="Not"></textarea>
                            </div>
                            <hr />
                            <div className="product-button">
                                <a onClick = {() => this.orderInsert()} class="button is-primary">Siparişi Onayla </a>
                                <a onClick = {() => this.orderCancel()} class="button is-danger">Siparişi İptal Et</a>
                            </div>
                            <div className="product-cancel">
                                <a onClick={() => {
                                    this.productCancel();
                                    this.removeDetailList();
                                }
                                } class="button is-danger">Adisyonu Kapat</a>
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

                                                        <div className="siparis_adet" style={{width:'10%'}}>
                                                            <p disabled>{item.siparis_adet} Adet</p>
                                                        </div>
                                                            
                                                        <div style={{width:'10%',height:'100%',display:'flex',justifyContent:'start'}} className="ürün_ad">
                                                            <p disabled>{item.ürün_adi}</p>
                                                        </div>

                                                         <div className="siparis_adet" style={{width:'10%',display:'flex',justifyContent:'flex-end'}}>
                                                            <p>{item.siparis_fiyat} TL</p>
                                                        </div>
                                                       
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