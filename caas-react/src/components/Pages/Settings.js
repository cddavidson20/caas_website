import React from 'react';
import '../../App.css';
import Menubar from '../Menubar';
import { Button, FormGroup, FormControl, FormLabel, Form, InputGroup } from "react-bootstrap";

function Settings() {
    const defaultVIN = "1D4HB48N54F129829";
    return (
        <div>
            <Menubar />
            <div class="page-holder align-items-center py-4 bg-gray-100 vh-100">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="card col-md-6 col-md-offset-4 mx-auto border-0">

                            {/*  <div className="card-heading text-primary">California Auto Store</div> */}
                            <div className="card-body p-lg-1 ">
                                <h3 class="mb-4 text-center">Settings</h3>
                                <Form class="form-floating mb-3">
                                    <FormLabel >Current Account:</FormLabel>
                                    <FormControl disabled type="email" placeholder="test.user@caas.com" />
                                    <FormLabel class="mt-3">Current Password:</FormLabel>
                                    <FormControl type="password" name="password" />
                                    <FormLabel class="mt-3">New Password:</FormLabel>
                                    <FormControl type="password" name="password" />
                                    <FormLabel class="mt-3">Re-Type New Password:</FormLabel>
                                    <FormControl type="password" name="password" />
                                    <Button class="mt-4 mb-4 btn btn-primary" block type="submit">Change Password</Button>
                                </Form>
                                <div>
                                    <p class="border-short ">Analytics Settings:</p>
                                    <Form.Check
                                            type="checkbox"
                                            label="Include Popular Listings"
                                        />
                                    <Form.Check
                                            type="checkbox"
                                            label="Include Engagement"
                                        />
                                </div>
                                <div>
                                    <p class="border-short ">Catolog Settings:</p>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon3">{defaultVIN}</InputGroup.Text>
                                    </InputGroup> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Settings;