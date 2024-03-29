import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckLoading, faShippingFast,faCheck,faTruck,faCircleH, faCircleCheck, faHome, faBank, faTruckArrowRight, faCreditCard, faKey } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Step, StepLabel, Stepper } from '@material-ui/core'
import './ShippingSteps.css'

const ShippingSteps = ({activeStep}) => {
    const step=[
        {
            label: <b>Ordered Successfully</b>,
            icon: <FontAwesomeIcon icon={faTruckLoading} /> 
        },
        {
            label: <b>Shipped Successfully</b>,
            icon: <FontAwesomeIcon icon={faTruck}/>
        },
        {
            label: <b>Out for Delivery</b>,
            icon: <FontAwesomeIcon icon={faBank}/>
        }
    ]
    const stepStyle={
      boxSizing: "border-box",
      background: "none",
    }
  return (
    <>
      <Stepper alternativeLabel className='steps' activeStep={activeStep} style={stepStyle}>
        {step.map((item,index)=>(
          <Step className='step1' key={index} active={activeStep===index?true:false}
                completed={activeStep>=index?true:false}
          >
            <StepLabel className='stepLabel'
            style={{color: activeStep>=index?"blue":"black"}}
             icon={item.icon}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  )
}

export default ShippingSteps
