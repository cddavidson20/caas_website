import React from 'react';
import { Button, FormGroup, FormControl, FormLabel, Form, Row, Col } from "react-bootstrap";
import '../../App.css';
import { Link } from "react-router-dom";
import Logo from '../logo.png';
class Login extends React.Component {

    constructor(props){
        super(props);
    }
    
    validateForm = async (email)=> {
        var url = "login/?email="+ email;
        var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
        var data = await res.json()
        if (data.signed_in) {
            window.location.replace("/Home");
        } else {
            alert("Invalid Username or Password");
        }
    }

    handleChange=(value, stateName)=>({
        value: value,
        stateName: stateName
    });

    render () {
        return (
            <div>
                <div class="page-holder align-items-center py-4 bg-gray-100 vh-100">
                    <div class="container">
                        <div class="row align-items-center">   
                            <div class="card d-flex col-md-6 col-md-offset-4 mx-auto border-0">
                            <img class="img-thumbnail mt-5 col-md-4 border-0" src={Logo}/>
                        {/*  <div className="card-heading text-primary">California Auto Store</div> */}
                                <div className="card-body align-items-center justify-content-center">
                                    <h3 class="mb-3">Sign In:</h3> 
                                        <Form class="mr-5">
                                            <FormGroup controlId="email">
                                                <FormLabel >Email</FormLabel>
                                                <FormControl
                                                autoFocus
                                                type="email"
                                                name="email"
                                                onChange={e => {
                                                    this.handleChange(e.target.value, 'email');
                                                }}
                                                />
                                            </FormGroup>
                                            <FormGroup controlId="password">
                                                <FormLabel class="mt-3">Password</FormLabel>
                                                <FormControl
                                                type="password"
                                                name="password"
                                                onChange={e => {
                                                    this.handleChange(e.target.value, 'password');
                                                }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Remember Me"
                                                />
                                                <div className="login-register ">
                                                        Don't have an account? <Link to="/SignUp">Sign Up</Link>
                                                </div>
                                                <br/>
                                                <Button
                                                    class="btn btn-primary"
                                                    block
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.validateForm(e.target.form[0].value)
                                                    }}
                                                    disabled={this.loading}
                                                    type="submit"
                                                >
                                                    Login
                                                </Button>
                                                    
                                                <div class="container"></div>
                                            </FormGroup>
                                        </Form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }

}

export default Login;
