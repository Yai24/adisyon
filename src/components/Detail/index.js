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

     
        var category = [];

        fetch('http://localhost:3001/product')
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

                        <button onClick = {() => this.dropdownSubMenu(kategori,key)} style={{width:'65%'}} className="dropbtn">{kategori}</button> 
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
        fetch(`http://localhost:3001/order/${deskId}`)
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