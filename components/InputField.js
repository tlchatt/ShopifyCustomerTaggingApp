function InputField(props)
    {
        if (props.type  === "name"){
            return(
                <div className="input-field col s10">
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_prefix" type="text"  className="validate"  placeholder={props.customer.firstName + ' ' +props.customer.lastName}  name="fullName" onChange={props.handleChange}/>
                <label htmlFor="icon_prefix" className="active">First and last name</label>
                </div>

            )
          
    
        }
        if (props.type  === "email"){
            return(

                <div className="input-field col s10">
                <i className="material-icons prefix">email</i>
                <input placeholder={props.customer.email} id="icon_email" name="email" type="email"  className="validate" onChange={props.handleChange}/>
                <label htmlFor="icon_email" className="active">Email</label>
                </div>

            )
          
    
        }

        if (props.type  === "phone"){
            return(
                        
                <div className="input-field col s10">
                <i className="material-icons prefix">phone</i>
                <input placeholder={props.customer.phone} id="icon_phone" name="phone" type="tel"  className="validate" onChange={props.handleChange}/>
                <label htmlFor="icon_phone" className="active">Phone</label>
                </div>

            )
          
    
        }
        if (props.type  === "businessName"){
            return(
                <div className="input-field col s10">
                <i className="material-icons prefix">business</i>
                <input placeholder={props.customer.businessName} id="icon_business" name="businessName" type="text" className="validate active" onChange={props.handleChange}/>
                <label className="active" htmlFor="icon_business">Business name</label>
                </div>

            )
          
    
        }
        if (props.type  === "defaultAddress"){
            return(
                <div className="input-field col s10">
                <i className="material-icons prefix">location_on</i>
                <input placeholder={props.customer.defaultAddress} id="icon_address" name="defaultAddress" type="text" className="validate" onChange={props.handleChange}/>
                <label htmlFor="icon_address" className="active">Business Address</label>
                </div>

            )
          
    
        }
        if (props.type  === "website"){
            return(
                <div className="input-field col s10">
                  <i className="material-icons prefix">web</i>
                  <input placeholder={props.customer.website} id="icon_website" name="website" type="text" className="validate" onChange={props.handleChange}/>
                  <label htmlFor="icon_website" className="active">Website Address</label>
                  </div>

            )
          
    
        }
        if (props.type  === "iGHandle"){
            return(
                <div className="input-field col s10">
                <i className="material-icons prefix">person_outline</i>
                <input placeholder={props.customer.iGHandle} id="icon_instagram" name="iGHandle" type="text" className="validate" onChange={props.handleChange}/>
                <label htmlFor="icon_instagram" className="active">Instagram Handle</label>
                </div>

            )
          
    
        }
        if (props.type  === "imageDescription"){
            return(
                <div className="input-field col s10">
                <i className="material-icons prefix">description</i>
                <input placeholder={props.image.description} id="imageDescription" name="imageDescription" type="text" className="validate" onChange={props.handleChange}/>
                <label className="active">Description</label>
                
                </div>

            )
          
        }
        if (props.type  === "imagePhotographer"){
            return(
                <div className="input-field col s10">
                <i className="material-icons prefix">person_outline</i>
                <input placeholder={props.image.photographer} id="imagePhotographer" name="imagePhotographer" type="text" className="validate" onChange={props.handleChange}/>
                <label className="active">Photographer</label>
                </div>

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
   
    






export default InputField 

