function OutputField(props)
    {
        if (props.type  === "name"){
            return(
                <div className="output-field">
                <i className="material-icons prefix">account_circle</i>  <p>{props.customer.firstName + ' ' +props.customer.lastName}
                </p>
                </div>

            )
          
    
        }
        if (props.type  === "email"){
            return(
               
                <div className="output-field">
                <i className="material-icons prefix">email</i><p>
                {props.customer.email ? ` ${props.customer.email}` : ' No Email Saved'} 
                </p>
                </div>

            )
          
    
        }

        if (props.type  === "phone"){
            return(
                        
                <div className="output-field">
                <i className="material-icons prefix">phone</i><p>
                {props.customer.phone ? ` ${props.customer.phone}` : ' No Phone Number Saved'}
                </p></div>

            )
          
    
        }
        if (props.type  === "businessName"){
            return(
                <div className="output-field">
                <i className="material-icons prefix">business</i> <p>
                {props.customer.businessName ? ` ${props.customer.businessName}` : ' No Business Name Saved'} 
                </p></div>

            )
          
    
        }
        if (props.type  === "defaultAddress"){
            return(
                <div className="output-field">
                <i className="material-icons prefix">location_on</i> <p>
                {props.customer.defaultAddress ? `${props.customer.defaultAddress}` : ' No Default Address Saved'}
                </p></div>

            )
          
    
        }
        if (props.type  === "website"){
            return(
                <div className="output-field">
                <i className="material-icons prefix">web</i> <p>
                {props.customer.website ? `${props.customer.website}` : ' No Website Saved'}
                </p></div>

            )
          
    
        }
        if (props.type  === "iGHandle"){
            return(
                <div className="output-field">
                <i className="material-icons prefix">person_outline</i><p>
                {props.customer.iGHandle ? `${props.customer.iGHandle}` : ' No Instagram Handle Saved'} 
                </p></div>

            )
          
    
        }

        else{

            return(
                <div className="col s10 output-field">
                <p>Something went wrong with our web application, please kindly email greggorywiley@tlchatt.com</p>
                </div>

            )
        }

    }
   
    






export default OutputField 

