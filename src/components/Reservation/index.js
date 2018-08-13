import React, { Component } from 'react';
import ReservationStyle from './ReservationStyle.css';
import Navbar from '../Navbar';
import Menu from '../Menu';
import swal from 'sweetalert2';

class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:[] || {},
            text:'',
        }
    }

    getData() {
        fetch('http://localhost:3002/api/reservation', {
            method:'GET',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'x-access-token':localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                data:data
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
            return x.rezervasyon_ad.toLowerCase().indexOf(this.state.text.toLowerCase()) !== -1
        })

        return(
            <div className="container is-fluid"> 
                <Navbar />

                <div className="columns">
                  <div className="column is-9 is-multiline">

                    <div className="search">
                            <div class="field is-grouped">
                            <p class="control is-expanded">
                                <input onChange={(e) => {
                                        this.getSearch(e);
                                    } 
                                } class="input is-success" type="text" placeholder="Rezervasyon Yapılan Kişi Adı" />
                            </p>
                            </div>
                        </div>
                        <div className="list" style={{marginTop:'20px'}}>
                            <table class="table" style={{width:'100%'}}>
                                <thead>
                                    <tr>
                                        <th>Rezervasyon Adı</th>
                                        <th>Rezervasyon Soyadı</th>
                                        <th>Rezervasyon Telefon</th>
                                        <th>Rezervasyon Masa</th>
                                        <th>Rezervasyon Tarih</th>
                                        <th>Rezervasyon Not</th>
                                        <th>Rezervasyon İşlemleri</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {

                                        filteredData.map(x => {
                                            return(
                                                <tr>
                                                <td>{x.rezervasyon_ad}</td>
                                                <td>{x.rezervasyon_soyad}</td>
                                                <td>{x.rezervasyon_telefon}</td>
                                                <td>{x.masa_id}</td>
                                                <td>{x.rezervasyon_tarih}</td>
                                                <td>
                                                    <a class="button is-link is-small" style={{marginRight:'10px',fontSize:'14px'}}>
                                                        <span class="icon is-small">
                                                        <i class="fas fa-sticky-note"></i>
                                                        </span>
                                                        <span>Notu Görüntüle</span>
                                                    </a>
                                                </td>
                                                <td style={{display:'flex'}}>
                                                    <a class="button is-link is-small" style={{marginRight:'10px',fontSize:'14px'}}>
                                                        <span class="icon is-small">
                                                        <i class="fas fa-pencil-alt"></i>
                                                        </span>
                                                        <span>Düzenle</span>
                                                    </a>

                                                    <a class="button is-danger is-small" style={{fontSize:'14px'}} >
                                                    <span class="icon is-small">
                                                        <i class="fas fa-ban"></i>
                                                        </span>
                                                        <span>İptal Et</span>
                                                    </a>
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

export default Reservation;