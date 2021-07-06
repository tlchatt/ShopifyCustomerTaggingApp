import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

function Header(props)
    {
   
  if (props.type !== 'admin'){
    return (
      <header>    
   
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  
                           rel="stylesheet"></link>
     <div className="row">
     <div className="col s12">
       <ul className="tabs z-depth-1">
         <li className="tab col s3"><a onClick={props.handleTab} name="ProfilePageView" >Profile</a></li>
         <li className="tab col s3"><a onClick={props.handleTab} name="SubmissionsPageView">Submissions</a></li>
       </ul>
     </div>
   </div>
   </header>
    )
  }
  else{
    return(

        <header>    
     
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  
                             rel="stylesheet"></link>
       <div className="row">
       <div className="col s12">
         <ul className="tabs z-depth-1">
           <li className="tab col s3"><a onClick={props.handleTab} name="ProfilePageView" >Profiles</a></li>
           <li className="tab col s3"><a onClick={props.handleTab} name="AllSubmissions">All Submissions</a></li>
           <li className="tab col s3"><a onClick={props.handleTab} name="SubmissionsPageView">My Submissions</a></li>
         </ul>
       </div>
     </div>
     </header>
      
    ) 
    }
  /** 
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
    </div>

    **/

    }
export default Header
