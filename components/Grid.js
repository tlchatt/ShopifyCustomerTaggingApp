export const  Container = (props) => (
  <section>
  <div className="container">
  
 
  {props.children}


  
 
   </div>
   </section>

)
export const  Row = (props) => (
    <div className="row">
    
   
    {props.children}
  
  
    
   
     </div>
  
  
  )

export const  Col1210 = (props) => (

  
  <div className="col s12 m10 offset-m1">
  {props.children}
  
  </div>
  


)

export const  Col1210NoOffset = (props) => (

  
  <div className="col s12 m10">
  {props.children}
  
  </div>
  


)
export const  Col128 = (props) => (

  
  <div className="col s12 m8">
  {props.children}
  
  </div>
  


)
   
export const  Col126 = (props) => (

  
  <div className="col s12 m6">
  {props.children}
  
  </div>
  


)
export const  Col124 = (props) => (

  
  <div className="col s12 m4 offset-m8">
  {props.children}
  
  </div>
  


)
   

export const  Col86 = (props) => (

  
    <div className="col s8 offset-s2 m6">
    {props.children}
    
    </div>
    
  
  
  )
     
 export const  Col64 = (props) => (

  
    <div className="col s6 m4">
    {props.children}
    
    </div>
    
  
  
  )

  export const  Spacer  = (props) => (

  
    <div className="spacer">
    {props.children}
    
    </div>
    
  
  
  )
  export const  Grid  = (props) => (

    
    <div className="grid">
    {props.children}
    
    </div>
   
    
  
  
  )
  export const  GridItem  = (props) => (

    
    <div className="grid-item">
    {props.children}
    
    </div>
   
    
  
  
  )
  export const  GridSizer  = (props) => (

    
    <div className="grid-sizer">
    {props.children}
    
    </div>
   
    
  
  
  )