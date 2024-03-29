import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Country, State} from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'
import Swal from 'sweetalert2'
import { Button, Form } from 'react-bootstrap'
import "./Payment.css"
import MetaData from '../MetaData'
import ShippingSteps from './ShippingSteps.js'
import { useNavigate } from 'react-router-dom'
import {savePaymentInfo} from '../../../actions/cart.action.js'
// This component stores all the billing address of the customer
const PaymentProcess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {shippingInfo}= useSelector((state)=>state.cart);
    // Using states to store the addresses
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pincode, setPinCode] = useState(shippingInfo.pincode);
    const [phoneNo, setPhNo] = useState(shippingInfo.phoneNo);
    const payFormSubmit=(e)=>{
        e.preventDefault()
        if(phoneNo.length < 10|| phoneNo.length>10){
            Swal.fire({
                icon:"error",
                title:"Phone number should be of ten digits"
            })
            return;
        }
        dispatch(
            //dispatching all the data
            savePaymentInfo({address,city,state,country,pincode,phoneNo})
        )
            navigate("/orders/confirm");
    }
  return (
    <>
    <MetaData title="Payment Details"/>
    <ShippingSteps activeStep={0}/>
      <div className="payContain">
        <div className="payBox">
            <h2 className="payHead mt-3">Payment Form</h2>
            {/* this form submits the data of the address */}
            <Form encType="multipart/form-data" className="payForm" onSubmit={payFormSubmit}>
                <div>
                    <Form.Control type="text" className='mb-3' placeholder='Enter your address' required value={address} onChange={(e)=> setAddress(e.target.value)} />
                </div> 
                <div> 
                    <Form.Control type="text" className='mb-3' placeholder='Enter your city' required value={city} onChange={(e)=> setCity(e.target.value)} />
                </div>
                <div>
                    <Form.Control type="number" className='mb-3' placeholder='Enter your pincode' required value={pincode} onChange={(e)=> setPinCode(e.target.value)} />
                </div> 
                <div>
                    <Form.Control type="number" className='mb-3' placeholder='Enter your phone number' required value={phoneNo} onChange={(e)=> setPhNo(e.target.value)} size="10" />
                </div>
                <div>
                    {/* This shows all the countries in select */}
                    <Form.Select required value={country} onChange={(e)=> setCountry(e.target.value)}>
                        <option value="">Country</option>
                        {Country && Country.getAllCountries().map((item)=>(
                            <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                        </option>
                        ))}
                    </Form.Select>
                </div>
                    {/* This shows all the State in select */}

                {country &&(
                    <div>
                    <Form.Select className='mt-3' required value={state} onChange={(e)=> setState(e.target.value)}>
                        <option value="">State</option>
                        {State &&
                        State.getStatesOfCountry(country).map((item)=>(
                            <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                            </option>
                        ))
                        }
                    </Form.Select>
                </div>
                )}
                <Button type='submit' className='mt-3 btn btn-primary' value="Proceed Payment" disabled={state? false :true}>Continue</Button>
            </Form>
        </div>
      </div>
    </>
  )
}

export default PaymentProcess
