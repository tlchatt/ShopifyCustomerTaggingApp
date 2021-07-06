import Card from '../components/Card.js'

import {Col126 , Row,Spacer}  from '../components/Grid.js'
const  TOS = (props) => (
        <Card>
          <section>
      <span className="card-title">We are excited to receive your FLÎKR Fire moment, before we can accept your content please review and accept the following</span>
      <br/>
            <span  className="card-title">Terms of Use</span>
            <Spacer/>
              <div className="card-content">
                <p>In order to submit material to the FLÎKR Fire (needs legal entitiy name) website, the user submitting material
                      ("Licensor") agrees to the following:</p><br/>
                      <p> 1. Licensor represents and warrants that it owns, is licensed, or otherwise possesses
                      legally enforceable rights to use all copyrights, trademarks, trade names,
                      service marks, trade dress rights, Internet domain names, patents, trade secrets, inventions, and any applications and registrations thereto of the
                      submitted material.</p>
                      <br/>
                      <p>2. Licensor is not, nor will it be as a result of the execution of this agreement or
                      the performance by Licensor of its obligations hereunder, in violation of any
                      license, sublicense or other agreements as to which Licensor is a party and
                      pursuant to which Licensor is authorized to use any third-party copyrights,
                      trademarks, trade names, service marks, trade dress rights, Internet domain</p>
                      <br/>
        <p>3. The Licensor hereby represents, warrants and covenants that FLÎKR Fire use
        of the submitted material shall not violate the copyrights, trademarks, trade
        names, service marks, trade dress rights, Internet domain names, patents, trade
        secrets, inventions of the Submission. If a third party shall claim any such
        practice by the Licensee constitutes infringement or other violation of its
        rights the Licensor shall defend, indemnify and hold  FLÎKR Fire harmless
                      against such claims.</p>
                </div>
                <div className="card-action">
                <h5 className="center"> Check here to indicate that you have read and agree to the Terms of Use above</h5>
                    <form onSubmit={props.handleAccept}>
                      <Row>
                      <Col126>
                        <label>
                          <input type="checkbox" id="checkbox" name="checkbox" onChange={props.handleChange}/>
                          <span>I accept the terms of use</span>
                        </label>
                       </Col126>
                       <Col126>
                       <Spacer></Spacer>
                        <input className="waves-effect waves-light btn right"  type="submit" value="submit" />
                        </Col126>
                        </Row>
                    </form>    
                  </div>
                        
            </section>
                    </Card>
                   
)
   





export default TOS 
