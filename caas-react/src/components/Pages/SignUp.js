import React from 'react';
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import '../../App.css';
import Logo from '../logo.png';

class SignUp extends React.Component {

    signUpForm = async (email, password, f_name, l_name)=> {
        var url = "signup/?email="+ email + "?password=" + password + "?first_name=" + f_name + "?last_name=" + l_name;
        var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
        var data = await res.json()
        if (data.signed_in) {
            window.location.replace("/Home");
        } else {
            alert(data.error);
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
                    <div class= "container">
                        <div class="row align-items-center">   
                            <div class="card d-flex col-md-6 col-md-offset-4 mx-auto border-0">
                            <img class="img-thumbnail mt-5 col-md-4 border-0" src={Logo}/>
                        {/*  <div className="card-heading text-primary">California Auto Store</div> */}
                                <div className="card-body align-items-center justify-content-center">
                                    <h3 class="mb-3">Sign Up:</h3> 
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
                                            <FormGroup controlId="first_name">
                                                <FormLabel class="mt-3">First Name</FormLabel>
                                                <FormControl
                                                type="first_name"
                                                name="first_name"
                                                onChange={e => {
                                                    this.handleChange(e.target.value, 'first_name');
                                                }}
                                                />
                                            </FormGroup>
                                            <FormGroup controlId="last_name">
                                                <FormLabel class="mt-3">Last Name</FormLabel>
                                                <FormControl
                                                type="last_name"
                                                name="last_name"
                                                onChange={e => {
                                                    this.handleChange(e.target.value, 'last_name');
                                                }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Button
                                                    class="btn btn-primary"
                                                    block
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.signUpForm(e.target.form[0].value, e.target.form[1].value, e.target.form[2].value, e.target.form[3].value)
                                                    }}
                                                    disabled={this.loading}
                                                    type="submit"
                                                >
                                                    Sign Up
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

export default SignUp;
