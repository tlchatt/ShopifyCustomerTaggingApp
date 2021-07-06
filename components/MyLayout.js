import Header from './Header'




const Layout = (props) => (
 
  <div>
  <Header handleTab={props.handleTab} type={props.type}/>
    {props.children}
  </div>
)

export default Layout
