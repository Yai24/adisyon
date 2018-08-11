import React, { Component } from 'react';
import LoginStyle from './LoginStyle.css';
import swal from 'sweetalert2';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username:null,
            password:null
        }
    }

    changeUsername(value) {
        this.setState({
            username:value
        })
    }

    changePassword(value) {
        this.setState({
            password:value
        })
    }

    loginSubmit(e) {
        e.preventDefault();

        var login = {
            username: this.state.username,
            password: this.state.password
        }

        fetch('http://localhost:3002/login', {
            method:'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:`username=${encodeURI(login.username.trim())}&parola=${encodeURI(login.password.trim())}`
        })
        .then(res => res.json())
        .then(data => {
            if(data.status) {
                swal({
                    title: 'Giriş Başarılı',
                    type: 'success',
                    timer:1000
                  })
                localStorage.setItem('token', data.token);
                
                setTimeout(() => {
                    this.props.history.push('/desk');
                },1200)
            }else {
                swal({
                    title: 'Giriş Başarısız',
                    type: 'error',
                    timer:1000
                  })
            }
        })
        .catch(err => {
            swal({
                title: 'Giriş Başarısız',
                type: 'error',
                timer:1000
              })
        })
    }

    componentDidMount() {
        if(localStorage.getItem('token') !== null) {
            this.props.history.push('/desk');
        } 
    }

    render() {
        return(
            <div className="container-login">
            <h2 class="subtitle is-2">Looktech Adisyon Sistemi</h2>
                <div className="login">
                    
                    <form>

                        <div class="field">
                            <label class="label">Personel Numarası</label>
                            <p class="control has-icons-left">
                                <input
                                    onChange ={(e) => {
                                        this.changeUsername(e.target.value)
                                    }} 
                                    class="input" 
                                    type="username" 
                                    placeholder="Örn:001" 
                                    required />
                                <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                                </span>
                            </p>
                        </div>

                        <div class="field">
                            <label class="label">Parola</label>
                            <p class="control has-icons-left">
                                <input
                                    onChange = {(e) => this.changePassword(e.target.value)} 
                                    class="input" 
                                    type="password"
                                    placeholder="Örn:123456" 
                                    required />
                                <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>

                        <div class="submit">
                            <button onClick = {(e) => this.loginSubmit(e) } type="submit" class="button is-link">Giriş Yap</button>
                        </div>

                    </form>
                    <hr />
                </div>
            </div>
        )
    }
}

export default Login;