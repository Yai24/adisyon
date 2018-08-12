import React, { Component } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import ProductsStyle from './ProductsStyle.css';

class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [] || {},
            text:''
        }

        this.getData = this.getData.bind(this);
    }

    getData() {
        fetch('http://localhost:3002/api/product', {
            method:'GET',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'x-access-token':localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                data
            })
        })
    }

    getSearch(e) {
        this.setState({
            text:e.target.value
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {

        const filteredData = this.state.data.filter(x => {
            return x.ürün_adi.toLowerCase().indexOf(this.state.text.toLowerCase()) !== -1
        })

        console.log(filteredData);

        return(
            <div className='container is-fluid'>
                <Navbar />

                <div className="columns is-multiline">
                  <div className="column is-9 ">

                    <div className="search">
                        <div class="field is-grouped">
                        <p class="control is-expanded">
                            <input onChange={(e) => {
                                    this.getSearch(e);
                                } 
                            } class="input is-success" type="text" placeholder="Ürün İsmi" />
                        </p>
                        </div>
                    </div>

                    <div className="list" style={{marginTop:'20px'}}>
                        <table class="table" style={{width:'100%'}}>
                            <thead>
                                <tr>
                                <th>Ürün İsmi</th>
                                <th>Ürün Kategorisi</th>
                                <th>Ürün Fiyat</th>
                                <th>Stok Durumu</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    filteredData.map(x => {
                                        return (
                                            <tr>
                                            <th>{x.ürün_adi}</th>
                                            <td>{x.ürün_kategori_adi}</td>
                                            <td>{x.ürün_fiyat} ₺ </td>  
                                            <td>
                                            <label class="switch">
                                                <input type="checkbox" checked />
                                                <span class="slider round"></span>
                                                </label>
                                            </td>            
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                  </div>
                  <Menu />
              </div>
            </div>
        ) 
    }
}

export default Products;