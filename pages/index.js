//import fetch from 'isomorphic-unfetch'
import Layout from '../components/MyLayout.js'
import LayoutNoHeader from '../components/LayoutNoHeader.js'
import axios from 'axios'
import { Col1210, Col126, Col128, Col124, Col64, Row, Container, Spacer, GridSizer, Grid, GridItem, Col1210NoOffset, Col86 } from '../components/Grid.js'
import TOS from '../components/TOS.js'
import OutputField from '../components/OutputField.js'
import InputField from '../components/InputField.js'
import Card from '../components/Card.js'
import CardBlank from '../components/CardBlank.js'
import { getToken, fisherYates } from '../lib/api'
//import Link from 'next/link'
//import dynamic from 'next/dynamic'
import React from 'react'
import Router from 'next/router'

//import "../node_modules/iframe-resizer/js/iframeResizer.contentWindow.js"
if (typeof window !== 'undefined') { require('../styles/materialize-src/js/bin/materialize.min.js'); }
//if (typeof window !== 'undefined') { var Masonry = require('masonry-layout'); }
import Masonry from 'react-masonry-css'
//if (typeof window !== 'undefined') { var Imagesloaded = require('imagesloaded'); }


class Post extends React.Component {

    constructor(props) {
        
        super(props);
        console.log(props)
        this.state = { value: '', tos: '', customerExists: '', newCustomerID: '', images: '', allImages: '' };
        this.state.isToggleOn = false;
        this.state.active = false;
        this.state.newCustomerID = props.newcustomerid;
        this.state.uploading = false;
        this.state.images = props.images
        this.state.imagesAll = props.imagesAll
        this.state.tos = props.customer.AcceptedTermsGeneralBoolean;
        this.state.customerExists = props.customer;
        this.state.token = props.token
        //this.state = { checked:'check_box_outline_blank'}
        if (this.state.images == undefined) {
            this.state.images = ''
        }

        /**
         * Step 3 Conditional Rendering of different "views" based on props for different "customer" / user
         * 3 types New App User, Existing App User, Admin User
         */
        if (this.props.customer == undefined) { //If you have not joined the program //Step 4 join program (hits node app on server)
            this.state.view = "JoinProgram"
            this.state.userType = "New"
        }
        if (this.state.tos == true) {   // if customer is defined have they accepted terms.
            if (this.props.customer.admin == true) { //Admin or regular user
                this.state.userType = "Admin"
                this.state.view = "ProfilePageView"
            }
            else {
            // If your terms of service status has been accepted
                this.state.userType = "User"
                this.state.view = "ProfilePageView"
            }                  
        }
        else { // has not accepted terms.
            this.state.userType = "UserNeedsAcceptTOS"
            this.state.view = "AcceptTerms"
        }
        console.log('User Type : ' +  this.state.userType)
        console.log('Current View :' + this.state.view)
        //user view states
        // This binding is necessary to make `this` work in the callback
       // this.handlePutProfile = this.handlePutProfile.bind(this);
        this.handleSubmitImages = this.handleSubmitImages.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAcceptTerms = this.handleAcceptTerms.bind(this);
        this.handleJoinProgram = this.handleJoinProgram.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleEditProfileView = this.handleEditProfileView.bind(this);
        this.handleSaveProfile = this.handleSaveProfile.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModal2 = this.closeModal2.bind(this);
        this.handleApproveAdmin = this.handleApproveAdmin.bind(this);
        this.handleEditImage = this.handleEditImage.bind(this);
        this.getToken = getToken()
        //console.log(this.state)
        // console.log(this.props)
    }
    componentDidMount = () => {

        var elem3 = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elem3, { direction: 'left', hoverEnabled: false });

        let elem2 = document.querySelectorAll('.modal');
        console.log(elem2)
        M.Modal.init(elem2, { preventScrolling: false });

        let elem = document.querySelector('.tabs')
        M.Tabs.init(elem, {})
        
        if (this.state.imagesAll !== undefined) {
            console.log(this.state.imagesAll)
            this.state.imagesAll.forEach((picture) => {
                const img = new Image();
                if (picture.upload !== undefined) {
                    img.src = `https://api.technologic.gq/${picture.upload.url}`
                }

            });

        }

        console.log("did mount");

    }
    componentDidUpdate = () => {
        var elem3 = document.querySelectorAll('.floating-action-btn');
        M.FloatingActionButton.init(elem3, { direction: 'left', hoverEnabled: false });

        let elem2 = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elem2, { preventScrolling: false });

        if (this.state.modal === "close") {
            if (document.querySelector('.modal') !== null) {
                document.querySelector('.modal').style.display = 'none';
            }
        }

        if (this.state.view === "ProfilePageView") {
            window.scrollTo(0, 0);
        }
       /* repalce masonry grid if (document.querySelector('.grid') !== null) {
            Imagesloaded(document.querySelector('.container'), function (instance) {
                console.log('all images are loaded');
                // this.setState(state => ({timagesLoadedos: true}));

                var elem3 = document.querySelector('.grid');

                var msnry = new Masonry(elem3, {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                    stagger: 100,
                    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
                    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
                });
                console.log('Masonry Loaded');
            });
        } */
        console.log(" -- component did update -- view : " + this.state.view );
   

    }
     handleJoinProgram() { //curently handled by redirect to node app with Shopify API Scripts
        // Step 4 Join Program Hits node routerapp serverside with Shopify Api //Fix these need to be updated tolocalized URLs on rollout.
        Router.push(`https://technologic.gq/users/addUser?id=${this.state.newCustomerID}`)
    }//working
    async handleAcceptTerms(event) {
          // Step 5 Accept Terms
        event.preventDefault();
        var checkbox = document.getElementById("checkbox");
        if (checkbox.checked) {    
            let headers = this.state.token
            var response = await putAccept(this, headers)
            console.log(response)
        }
        else {
            alert("Please Accept the terms of service to conitnue");
        }

            async function putAccept(acceptData, headers){
                var data = {
                    AcceptedTermsGeneralBoolean: true
                }
              let response = await  axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shopifyUsers/${acceptData.props.customer.id}`, data, { headers })
                    .then(response => {
                        // Handle success.
                        return (response.data)
                        //Router.push(`?id=${acceptData.props.customer.shopifyCustomerID}`)
                    })
                    .catch(error => {
                        // Handle error.
                        console.log(response);
                        return (error);
                    });

                return (response)
            }

    }//working 
    handleEditProfileView() {
        console.log("edit profile button pressed")
        this.setState(state => ({ view: "ProfilePageEdit" }));
    }// working
    async handleSaveProfile(event) {
        event.preventDefault();
        console.log(this)
        let currentState = this.state
        let currentProps = this.props
        let headers = this.state.token
      
        let response = await handlePutProfile(currentState, currentProps, headers)
        async function handlePutProfile(currentState, currentProps,headers) {
          
           
                let id = currentProps.customer.id
                //change this to not edit props according to react docs
                // Whether you declare a component as a function or a class, it must never modify its own props. Consider this sum function:
                //https://reactjs.org/docs/components-and-props.html
                //Also make this find only what is changed( clean it up)
                if (currentState.firstName) {
                    console.log(`first name change detected ${currentState.firstName}`)
                    currentProps.customer.firstName = currentState.firstName
                }
                if (currentState.lastName) {
                    console.log(`first name change detected ${currentState.lastName}`)
                    currentProps.customer.lastName = currentState.lastName
                }
                if (currentState.email) {
                    console.log(`first name change detected ${currentState.email}`)
                    currentProps.customer.email = currentState.email
                }
                if (currentState.phone) {
                    console.log(`first name change detected ${currentState.phone}`)
                    currentProps.customer.phone = currentState.phone
                }
                if (currentState.businessName) {
                    console.log(`business name change detected ${currentState.businessName}`)
                    currentProps.customer.businessName = currentState.businessName
                }
                if (currentState.defaultAddress) {
                    console.log(`default  change Address detected ${currentState.defaultAddress}`)
                    currentProps.customer.defaultAddress = currentState.defaultAddress
                }
                if (currentState.website) {
                    console.log(`website change detected ${currentState.website}`)
                    currentProps.customer.website = currentState.website
                }
                if (currentState.iGHandle) {
                    console.log(`igHandle change detected ${currentState.iGHandle}`)
                    currentProps.customer.iGHandle = currentState.iGHandle
                }
                let data = {
                    firstName: currentProps.customer.firstName,
                    lastName: currentProps.customer.lastName,
                    email: currentProps.customer.email,
                    phone: currentProps.customer.phone,
                    businessName: currentProps.customer.businessName,
                    defaultAddress: currentProps.customer.defaultAddress,
                    website: currentProps.customer.website,
                    iGHandle: currentProps.customer.iGHandle
                }
                console.log(data)
                let response = await axios
                    .put(`${process.env.NEXT_PUBLIC_API_URL}/shopifyUsers/${id}`, data, { headers })
                    .then(response => {
                        // Handle success.
                        return (response)
                        console.log(
                            'Well done, your post has been successfully created: ',
                            response.data
                        );
                    })
                    .catch(error => {
                        // Handle error.
                        return (error)
                        console.log('An error occurred:', error);
                    });
                return (response)
            
        }
        console.log(response)
        this.setState(state => ({ view: "ProfilePageView" }));
    } // working
    handleSubmitImages(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const fd = new FormData(formElement)
        console.log(formElement)
        

        creatNewImageSubmission(this)
        function creatNewImageSubmission(submissionData) {
            console.log(submissionData)
           let data = {
                shopifyuser: submissionData.props.customer.id,
                photographer: submissionData.state.photographer,
                description: submissionData.state.description
                }
            console.log(data)
            let headers = submissionData.state.token
            
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/imagesubmissions/`, data, { headers })
                .then(response => {
                    // Handle success.
                    console.log(
                        'Image Submissions Item Created: ',
                        response.data
                    );
                    //clear form and pass id of new imagesubmission entry (not the actual image upload) to the image upload post function as refid

                    console.log('set state files blank')
                    submissionData.setState(state => ({ files: "" }));
                    console.log('set state modal close')
                    submissionData.setState(state => ({ modal: "close" }));
                    console.log('append ref id to response.data')
                    console.log(response.data.id)
                    fd.append("refId", response.data.id);
                    console.log(formElement)
                    console.log('post New Images')
                    postNewImages(fd, submissionData)
                    console.log('update current Images')
                    updateCurrentImages(response, submissionData)
                 
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });
        }// working
        function updateCurrentImages(response, submissionData) {//this brings submited image into live state.console.log
            //update image array but gets URL from update Current Images after postNewImages
            if (submissionData.state.images !== undefined) {
                submissionData.setState(previousState => ({
                    images: [...previousState.images, {
                        id: response.data.id,
                        description: response.data.description,
                        photographer: response.data.photographer,
                        upload: {
                            //some filler would like to actually get this to be a filler image but the path to desired filler image did not work /static/baseline-add_photo_alternate-24px.png
                            url: '/baseline-add_photo_alternate-24px.png'
                        },
                    }]
                }));
                console.log(submissionData.props.images)
            }
            else {
                submissionData.setState(previousState => ({
                    images: [...previousState.images, {
                        id: response.data.id,
                        description: response.data.description,
                        photographer: response.data.photographer,
                        upload: {
                            //some filler would like to actually get this to be a filler image but the path to desired filler image did not work /static/baseline-add_photo_alternate-24px.png
                            url: '/baseline-add_photo_alternate-24px.png'
                        },
                    }]
                }));
                console.log('fix this show first image')
            }

            submissionData.setState(state => ({ view: "SubmissionsPageView" }));
        }
        function postNewImages(fd, submissionData) {
            let headers = submissionData.state.token
            console.log(formElement)
            axios
                .post(`https://api.technologic.gq/upload/`, fd,{headers})
                .then(response => {
                    // Handle success.
                    console.log(
                        'Image Uploaded: ',
                        response.data
                    );
                    //ads url to image props. 
                    updateCurrentImage(response, submissionData)

                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });
        }
        function updateCurrentImage(response, submissionData) {
        
            console.log(submissionData)
            //append url to image which was added to this.state.images earlier.
            if (submissionData.state.images !== undefined) {
                console.log('not undefined')
                var length = submissionData.state.images.length - 1
                console.log(response.data[0].url)
          
                submissionData.state.images[length].upload.url = response.data[0].url
                console.log(submissionData.state.images)

            }


            submissionData.setState(state => ({ view: "SubmissionsPageView" }));

        }
        //can we get this to use the class function
    }// working
    handleEditImage(event) {
        event.preventDefault();
        //get current image data and put new data on imageSubmissionObject
        const id = event.currentTarget.getAttribute("valueid")
        const description = this.state.imageDescription
        const photographer = this.state.imagePhotographer
        console.log(id)
        console.log(this.state.imageDescription)
        console.log(this.state.imagePhotographer)
        updateCurrentImageSubmission(id, description, photographer)

        //This creates a new image submission database entry and ads data to it. 
        function updateCurrentImageSubmission(data) {

            axios
                .put(`https://api.technologic.gq/imagesubmissions/${id}`,
                    {
                        description: description,
                        photographer: photographer
                    })
                .then(response => {
                    // Handle success.
                    console.log(
                        'Well done, your post has been successfully created: ',
                        response.data
                    );
                    closeModal()
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });

        }
        //can we get this to use the class function
    }
    handleDeleteImage(event) {

        const id = event.currentTarget.getAttribute("valueid")

        updateCurrentImages(this, id)
        deleteCurrentImage(id)
        //deleteCurrentImage(value)
        function deleteCurrentImage(id) {
            axios
                .delete(`https://api.technologic.gq/imagesubmissions/${id}`)
                .then(response => {
                    // Handle success.
                    console.log(
                        'Image Deleted: ',
                        response.data
                    );
                    console.log('fix this, delete image file also this just deletes submission object')
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });
        }

        function updateCurrentImages(data, id) {
            console.log('does this still work delete current image')
            //maybe try to convert this to an arrow function for greater sexyness later
            var images = data.state.images
            Object.keys(images).find(function (e) {
                console.log(e)
                console.log(images[e])
                if (images[e] !== undefined) {
                    if (images[e].id == id) {
                        images.splice(e, 1)
                        data.setState(state => ({ view: "SubmissionsPageView" }));

                    }
                }
            }
            );

        }


    }
    handleDeleteImageAdmin(event) {


        const id = event.currentTarget.getAttribute("valueid")

        updateCurrentImageAdmin(this, id)
        deleteCurrentImageAdmin(id)
        //deleteCurrentImage(value)
        function deleteCurrentImageAdmin(id) {
            axios
                .delete(`https://api.technologic.gq/imagesubmissions/${id}`)
                .then(response => {
                    // Handle success.
                    console.log(
                        'Image Deleted: ',
                        response.data
                    );
                    console.log('fix this, delete image file also this just deletes submission object')
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });
        }

        function updateCurrentImagesAdmin(data, id) {
            //maybe try to convert this to an arrow function for greater sexyness later
            var images = data.state.imagesAll
            Object.keys(imagesAll).find(function (e) {
                console.log(e)
                console.log(imagesAll[e])
                if (imagesAll[e] !== undefined) {
                    if (imagesAll[e].id == id) {
                        imagesAll.splice(e, 1)
                        data.setState(state => ({ view: "AllSubmissions" }));

                    }
                }
            }
            );

        }


    }
    handleApproveAdmin(event) {
        const id = event.currentTarget.getAttribute("valueid")
        const approvedStatus = event.currentTarget.getAttribute("valueapproved")


        if (approvedStatus == 1) {
            var OppositeStatus = false
        }
        else {
            var OppositeStatus = true
        }

        function updateApprovalStateServer(id, OppositeStatus) {
            axios
                .put(`https://api.technologic.gq/imagesubmissions/${id}`, {
                    Approved: OppositeStatus
                })
                .then(response => {
                    // Handle success.
                    console.log(
                        'Image Status Updated: ',
                        response.data
                    );
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });
        }

        function updateApprovalStateLocal(data, id, OppositeStatus) {

            var images = data.state.imagesAll

            Object.keys(images).find(function (e) {

                if (images[e] !== undefined) {
                    if (images[e].id == id) {
                        let obj = data.state;
                        console.log(obj)
                        obj.imagesAll[e].Approved = OppositeStatus
                        // data.setState(state => ({[`imagesAll[${e}].Approved`]: OppositeStatus }));
                        // data.setState(state => ({view: "AllSubmissions"}));
                        data.setState(obj)
                    }

                }
            });



        }

        updateApprovalStateServer(id, OppositeStatus)
        updateApprovalStateLocal(this, id, OppositeStatus)

        console.log(this)
    }
    handleChange() {
        //will need to adress checked box value now that logic has been broken down in if else may just work
        const target = event.target;
        const name = target.name;
        const value = target.value;

        //split full name into first and last
        if (target.name === 'fullName') {
            var res = target.value.split(" ");

            this.setState({
                firstName: res[0], lastName: res[1]
            });
        }
        //remove fakepath prefix from files. 
        if (name === 'files') {
            var file = document.querySelector('#file');
            var FileSize = file.files[0].size / 1024 / 1024; // in MB
            if (FileSize > 5) {
                alert('File size exceeds 5 MB');

                this.setState(state => ({ files: "" }));
                document.querySelector('form').reset()

            } else {
                console.log(this.state)
                /** 
                this.setState({
                  files: value.replace("C:\\fakepath\\", "")
                });
            */
            }
            //quickfix for weird modal bug, fix later.
            this.setState(state => ({ modal: "open" }));
        }
        if (name === 'description') {
            this.setState(state => ({ modal: "open" }));
        }
        if (name === 'photographer') {
            this.setState(state => ({ modal: "open" }));
        }
        if (name === 'checkbox') {
        }
        else {
            this.setState({
                [name]: value
            });
        }
        console.log(' handle change state : State Following')
        console.log(this.state)
    }
    handleTab(event) {
        console.log('handletab')
        this.setState(
            {
                view: event.target.name
            }

        )
        console.log(event.target.name)
    }
    closeModal() {

        //empowers x button
        console.log('close modal initiated')
        this.setState(state => ({ modal: "close" }));
        //  this.setState(state => ({view: "SubmissionsPageView"}));

    }
    closeModal2() {

        //empowers x button
        console.log('close modal initiated')
        this.setState(state => ({ modal: "close" }));
        //  this.setState(state => ({view: "SubmissionsPageView"}));

    }

 
    render() { //check if customer has enroled
        if (this.state.userType !== 'Admin') {
            switch (this.state.view) {
                case 'JoinProgram':
                    return (
                        <LayoutNoHeader>
                            <Container>
                                <Spacer />
                                <Card>
                                    <Row>
                                        <Col1210>
                                            <span className="card-title">FLÎKR Fire Moments</span>
                                            <br />
                                            <p> We’re a tiny company driven to enable what we call, “FLÎKR Fire Moments.” Maybe it’s coffee as you watch sunrise. Or it’s ambience on date night. Hey, maybe marshmallows get involved; or a hot dog or two get roasted. Need a unique touch for a dinner party? Done. Maybe FLÎKR Fire even provides some emergency light and warmth. Have a moment to share? Let us know! Because this isn’t marketing language for us; we truly thrive on bettering your moments.</p>
                                        </Col1210>
                                    </Row>
                                    <Row>
                                        <Col124>
                                            <button className="waves-effect waves-light btn btn-large" type="submit" value="submit" onClick={this.handleJoinProgram}>  Share a Moment </button>
                                        </Col124>
                                    </Row>
                                </Card>
                                <Spacer />
                            </Container>
                        </LayoutNoHeader>
                    )
                case 'AcceptTerms':
                    return (
                        <LayoutNoHeader>
                            <Container>
                                <Row>
                                    <Spacer />
                                    <Col1210>
                                        <TOS handleAccept={this.handleAcceptTerms} handleChange={this.handleChange} />
                                    </Col1210>
                                </Row>
                                <Spacer />
                            </Container>
                        </LayoutNoHeader>
                    )
                case 'ProfilePageView':
                    return (
                        <Layout handleTab={this.handleTab}>
                            <Container>
                                <Spacer />
                                <Card>
                                    <span className="card-title">Your Profile</span>
                                    <br />
                                    <Row>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="name" />
                                        </Col126>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="email" />
                                        </Col126>
                                    </Row>
                                    <Row>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="phone" />
                                        </Col126>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="businessName" />
                                        </Col126>
                                    </Row>
                                    <Row>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="website" />
                                        </Col126>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="iGHandle" />
                                        </Col126>
                                    </Row>
                                    <Row>
                                        <Col1210NoOffset>
                                            <OutputField customer={this.props.customer} type="defaultAddress" />
                                        </Col1210NoOffset>
                                    </Row>
                                    <Row>
                                        <Col124>
                                            <div className="s10 output-field">
                                                <button className="waves-effect waves-light btn btn-large .special-button" onClick={this.handleEditProfileView}> Edit Info<i className="material-icons left">edit</i>
                                                </button>
                                            </div>
                                        </Col124>
                                    </Row>
                                </Card>
                            </Container>
                        </Layout>
                    )
                case 'ProfilePageEdit':
                    return (
                        <Layout handleTab={this.handleTab}>
                            <Container>
                                <Card>
                                    <form ref onSubmit={this.handleSubmit}>
                                        <span className="card-title">Tell Us About Yourself</span>
                                        <br />
                                        <Row>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="name" />
                                            </Col126>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="email" />
                                            </Col126>
                                        </Row>
                                        <Row>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="phone" />
                                            </Col126>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="businessName" />
                                            </Col126>
                                        </Row>
                                        <Row>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="website" />
                                            </Col126>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="iGHandle" />
                                            </Col126>
                                            <Col128>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="defaultAddress" />
                                            </Col128>
                                        </Row>
                                        <Row>
                                            <Col124>
                                                <button className="waves-effect waves-light btn btn-large" type="submit" value="submit" onClick={this.handleSaveProfile}> Save changes<i className="material-icons left">save</i>
                                                </button>
                                            </Col124>
                                        </Row>
                                    </form>
                                </Card>
                            </Container>
                        </Layout>
                    )

                case 'SubmissionsPageView':
                    return (
                        <Layout handleTab={this.handleTab}>
                            <Container>
                                <Spacer />
                                <Card>
                                    <Col1210>
                                        <span className="card-title dpr">Your Submissions</span>
                                    </Col1210>
                                    <Spacer />
                                    <Grid>
                                        <GridSizer />
                                        <GridItem>
                                            <CardBlank>
                                                <div className="card-image">
                                                    <img src="/baseline-add_photo_alternate-24px.png" className="responsive-img" />
                                                    <span className="card-title special">Upload a New Image</span>
                                                    <a className="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" ><i className="material-icons">add</i></a>
                                                </div>
                                                <div className="card-content">
                                                </div>
                                            </CardBlank>
                                        </GridItem>

                                        {this.state.images ?
                                            (
                                                this.state.images.map((image) =>

                                                    <GridItem>
                                                        <CardBlank>
                                                            <div className="card-image">
                                                               
                                                                <img key={image.id}
                                                                    src={`${process.env.NEXT_PUBLIC_API_URL}${image.upload.url}`}
                                                                    className="responsive-img" />
                                                                <a className="btn-floating halfway-fab waves-effect waves-light red" valueid={image.id} onClick={this.handleDeleteImage}><i className="material-icons">delete</i></a>
                                                            </div>
                                                            <div className="card-content no-pad">
                                                                <blockquote>
                                                                    <p><b>Image Description:</b></p>
                                                                    <p>{image.description}</p>
                                                                    <p><b>Photograher:</b></p>
                                                                    <p>{image.photographer}</p>
                                                                </blockquote>
                                                            </div>
                                                        </CardBlank>
                                                    </GridItem>
                                                )
                                            )
                                            :
                                            (<Col64></Col64>)
                                        }
                                    </Grid>
                                </Card>
                            </Container>
                            <div id="modal1" className="modal">
                                <div className="modal-content">
                                    <a className="modal-close" href="#!" onClick={this.closeModal}><i className="right material-icons">close</i></a>
                                    <Spacer />
                                    <form ref onSubmit={this.handleSubmitImages}>
                                        <Row>
                                            <div className="input-field col s12 m10">
                                                <div className="file-field input-field">
                                                    <div className="btn">
                                                        <span>Select Image</span>
                                                        <input id="file" type="file" name="files" onChange={this.handleChange} accept="image/*" />
                                                    </div>
                                                    <div className="file-path-wrapper">
                                                        <input className="file-path validate" type="text" placeholder={this.state.files ? `${this.state.files}` : `Max Size 5MB`} /><input type="text" name="ref" defaultValue="imagesubmission" className="hide" />
                                                        <input type="text" name="field" defaultValue="upload" className="hide" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input-field col s12 m6">
                                                <input name="description" className="validate" onChange={this.handleChange} />
                                                <label className="active">Description</label>
                                            </div>
                                            <div className="input-field col s12 m6">
                                                <input name="photographer" className="validate" onChange={this.handleChange} />
                                                <label className="active">Photographer</label>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="submit" value="Submit" className="modal-close waves-effect waves-light btn" />
                                            </div>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </Layout>
                    )
                default:
                    return (
                        <p>Application Error please email greggorywiley@tlchatt.com</p>
                    )
            }
        }
        else {

            switch (this.state.view) {
                case 'ProfilePageView':
                    return (
                        <Layout handleTab={this.handleTab} type="admin">
                            <Container>
                                <Spacer />
                                <Card>
                                    <span className="card-title">Your Profile</span>
                                    <br />
                                    <Row>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="name" />
                                        </Col126>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="email" />
                                        </Col126>
                                    </Row>
                                    <Row>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="phone" />
                                        </Col126>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="businessName" />
                                        </Col126>
                                    </Row>
                                    <Row>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="website" />
                                        </Col126>
                                        <Col126>
                                            <OutputField customer={this.props.customer} type="iGHandle" />
                                        </Col126>
                                    </Row>
                                    <Row>
                                        <Col1210NoOffset>
                                            <OutputField customer={this.props.customer} type="defaultAddress" />
                                        </Col1210NoOffset>
                                    </Row>
                                    <Row>
                                        <Col124>
                                            <div className="s10 output-field">
                                                <button className="waves-effect waves-light btn btn-large .special-button" onClick={this.handleEditProfileView}> Edit Info<i className="material-icons left">edit</i>
                                                </button>
                                            </div>
                                        </Col124>
                                    </Row>
                                </Card>
                            </Container>
                        </Layout>
                    )
                case 'ProfilePageEdit':
                    return (
                        <Layout handleTab={this.handleTab} type="admin">
                            <Container>
                                <Card>
                                    <form ref onSubmit={this.handleSubmit}>
                                        <span className="card-title">Tell Us About Yourself</span>
                                        <br />
                                        <Row>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="name" />
                                            </Col126>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="email" />
                                            </Col126>
                                        </Row>
                                        <Row>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="phone" />
                                            </Col126>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="businessName" />
                                            </Col126>
                                        </Row>
                                        <Row>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="website" />
                                            </Col126>
                                            <Col126>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="iGHandle" />
                                            </Col126>
                                            <Col128>
                                                <InputField handleChange={this.handleChange} customer={this.props.customer} type="defaultAddress" />
                                            </Col128>
                                        </Row>
                                        <Row>
                                            <Col124>
                                                <button className="waves-effect waves-light btn btn-large" type="submit" value="submit" onClick={this.handleSaveProfile}> Save changes<i className="material-icons left">save</i>
                                                </button>
                                            </Col124>
                                        </Row>
                                    </form>
                                </Card>
                            </Container>
                        </Layout>
                    )
                case 'SubmissionsPageView':
                    return (
                        <Layout handleTab={this.handleTab} type="admin">
                            <Container>
                                <Spacer />
                                <Card>
                                    <Col1210>
                                        <span className="card-title dpr">Your Submissions</span>
                                    </Col1210>
                                    <Spacer />
                                    <Grid>
                                        <GridSizer />
                                        <GridItem>
                                            <CardBlank>
                                                <div className="card-image">
                                                    <img src="/baseline-add_photo_alternate-24px.png" className="responsive-img" />
                                                    <span className="card-title special">Upload a New Image</span>
                                                    <a className="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" ><i className="material-icons">add</i></a>
                                                </div>
                                                <div className="card-content">
                                                </div>
                                            </CardBlank>
                                        </GridItem>

                                        {this.state.images ?
                                            (
                                                this.state.images.map((image) =>

                                                    <GridItem>
                                                        <CardBlank>
                                                            <div className="card-image">
                                                                <img key={image.id}
                                                                    src={`${process.env.NEXT_PUBLIC_API_URL}${image.upload.url}`}
                                                                    className="responsive-img" />
                                                                <a className="btn-floating halfway-fab waves-effect waves-light red" valueid={image.id} onClick={this.handleDeleteImage}><i className="material-icons">delete</i></a>
                                                            </div>
                                                            <div className="card-content no-pad">
                                                                <blockquote>
                                                                    <p><b>Image Description:</b></p>
                                                                    <p>{image.description}</p>
                                                                    <p><b>Photograher:</b></p>
                                                                    <p>{image.photographer}</p>
                                                                </blockquote>
                                                            </div>
                                                        </CardBlank>
                                                    </GridItem>
                                                )
                                            )
                                            :
                                            (<Col64></Col64>)
                                        }
                                    </Grid>
                                </Card>
                            </Container>
                            <div id="modal1" className="modal">
                                <div className="modal-content">
                                    <a className="modal-close" href="#!" onClick={this.closeModal}><i className="right material-icons">close</i></a>
                                    <Spacer />
                                    <form ref onSubmit={this.handleSubmitImages}>
                                        <Row>
                                            <div className="input-field col s12 m10">
                                                <div className="file-field input-field">
                                                    <div className="btn">
                                                        <span>Select Image</span>
                                                        <input id="file" type="file" name="files" onChange={this.handleChange} accept="image/*" />
                                                    </div>
                                                    <div className="file-path-wrapper">
                                                        <input className="file-path validate" type="text" placeholder={this.state.files ? `${this.state.files}` : `Max Size 5MB`} /><input type="text" name="ref" defaultValue="imagesubmission" className="hide" />
                                                        <input type="text" name="field" defaultValue="upload" className="hide" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input-field col s12 m6">
                                                <input name="description" className="validate" onChange={this.handleChange} />
                                                <label className="active">Description</label>
                                            </div>
                                            <div className="input-field col s12 m6">
                                                <input name="photographer" className="validate" onChange={this.handleChange} />
                                                <label className="active">Photographer</label>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="submit" value="Submit" className="modal-close waves-effect waves-light btn" />
                                            </div>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </Layout>
                    )
                case 'AllSubmissions':
                    return (
                        <Layout handleTab={this.handleTab} type="admin">
                            <Container>
                                <Spacer />
                                <Card>
                                    <Col1210>
                                        <span className="card-title dpr">All Submissions</span>
                                    </Col1210>
                                    <Spacer />
                                    <Grid>
                                        <GridSizer />
                                        <GridItem>
                                            <CardBlank>
                                                <div className="card-image">
                                                    <img src="/baseline-add_photo_alternate-24px.png" className="responsive-img" />
                                                    <span className="card-title special">Upload a New Image</span>
                                                    <a className="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" ><i className="material-icons">add</i></a>
                                                </div>
                                                <div className="card-content">
                                                </div>
                                            </CardBlank>
                                        </GridItem>

                                        {this.state.imagesAll ?
                                            (
                                                this.state.imagesAll.map((image) =>
                                                    <GridItem>
                                                        <CardBlank>
                                                            <div className="card-image">
                                                                <img key={image.id}
                                                                    src={`${process.env.NEXT_PUBLIC_API_URL}${image.upload.url}`}
                                                                    className="responsive-img" />
                                                                <a className="" valueid={image.id} valueapproved={image.Approved ? 1 : 0} onClick={this.handleApproveAdmin}>
                                                                    <i className="material-icons icons_special">
                                                                        {image.Approved ? 'check_box' : 'check_box_outline_blank'}
                                                                    </i></a>
                                                                <div className="floating-action-btn horizontal direction-top direction-left">
                                                                    <a className=" btn-floating red" >
                                                                        <i className="large material-icons">mode_edit</i>

                                                                    </a>
                                                                    <ul>
                                                                        <li><p>Delete</p><a className="btn-floating red" valueid={image.id} onClick={this.handleDeleteImage}><i className="material-icons">delete</i></a></li>
                                                                        <li><p>Edit</p><a className="btn-floating yellow darken-1 modal-trigger" href={"#modal" + image.id} ><i className="material-icons">edit</i></a></li>


                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div className="card-content no-pad">
                                                                <blockquote>
                                                                    <p><b>Image Description:</b></p>
                                                                    <p>{image.description}</p>
                                                                    <p><b>Photograher:</b></p>
                                                                    <p>{image.photographer}</p>
                                                                </blockquote>
                                                            </div>
                                                            <div id={"modal" + image.id} className="modal">
                                                                <div className="modal-content">
                                                                    <a className="modal-close" href="#!" onClick={this.closeModal}><i className="right material-icons">close</i></a>
                                                                    <Spacer />
                                                                    <form>
                                                                        <Row>
                                                                            <Col1210>
                                                                                <img key={image.id}
                                                                                    src={`${process.env.NEXT_PUBLIC_API_URL}${image.upload.url}`}
                                                                                    className="responsive-img notToTall" />
                                                                            </Col1210>

                                                                            <InputField handleChange={this.handleChange} image={image} type="imageDescription" />
                                                                            <InputField handleChange={this.handleChange} image={image} type="imagePhotographer" />

                                                                            <div className="modal-footer">
                                                                                <input type="submit" value="Submit" onClick={this.handleEditImage} valueid={image.id} className="modal-close waves-effect waves-light btn" />
                                                                            </div>
                                                                        </Row>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </CardBlank>
                                                    </GridItem>
                                                )
                                            )
                                            :
                                            (<Col64></Col64>)
                                        }
                                    </Grid>
                                </Card>
                            </Container>


                        </Layout>
                    )
                default:
                    return (
                        <p>Application Error please email greggorywiley@tlchatt.com</p>
                    )
            }
        }

    }   //end of render 
} //end of class
export async function getServerSideProps(context) {
    var token = await getToken()
    //console.log(context)
    //const params =context.params
    // console.log(`Context.params: ${title}`)
    // console.log(`Context.query: ${id}`)
    console.log('fetching props')
    const { id } = context.query // Step 2 check this is customer ID passed from Shopify,or pass newcustomerid prop to constructor
    console.log(id)
    const res = await fetch(`https://api.technologic.gq/shopifyUsers/?shopifyCustomerID=${id}`) //Attempts to fetch existing ID in Strapi
    const data = await res.json()
    if (!data) {// Next 11 catch no data
        return {
            notFound: true,
        }
    }
    // Conditional Returns for constructor see contstructor above next
    if (data[0] !== undefined) { //has account in Strapi allready
        console.log("not customer true in props")
        if (data[0].admin == true) { //administrator
            console.log("admin test true in props")
            //return all images if admin
            const res3 = await fetch(`https://api.technologic.gq/imageSubmissions/`)
            const data3 = await res3.json()
            if (data[0].imagesubmissions.length !== 0) { //customer with image submissions
                console.log("image submissions defined in props")
                const submissionIDs = data[0].imagesubmissions
                // log stuff Object.keys(submissionIDs[0]).forEach(e => console.log(`image ${e}  url=${submissionIDs[e]}`));
                var promises = Object.keys(submissionIDs).map(async function (n) {
                    const res2 = await fetch(`https://api.technologic.gq/imagesubmissions/${submissionIDs[n].id}`)
                    const data2 = await res2.json()
                    return data2
                })

                var data2 = await Promise.all(promises)

                return {
                    props:{
                        customer: data[0],
                        images: data2,
                        imagesAll: data3,
                        token: token
                    }
                    
                }


            }
            else {

                fisherYates(data3);
                replaceFolder(data3);
                return {
                    props:{
                        customer: data[0],
                        images: data2,
                        imagesAll: data3,
                        token: token
                    }
       
                }
            }


        }
        else {//regular customer
            if (data[0].imagesubmissions !== undefined) { //customer with image submissions
                const submissionIDs = data[0].imagesubmissions
                // log stuff Object.keys(submissionIDs[0]).forEach(e => console.log(`image ${e}  url=${submissionIDs[e]}`));
                var promises = Object.keys(submissionIDs).map(async function (n) {
                    const res2 = await fetch(`https://api.technologic.gq/imagesubmissions/${submissionIDs[n].id}`)
                    const data2 = await res2.json()
                    console.log(data2)
                    return data2
                })
                var data2 = await Promise.all(promises)

                return {
                    props:{
                        customer: data[0],
                        images: data2,
                        token: token
                    }
                }
            }
            else { //customer with no image submissions
                //must test custoemr with no image submissions
                return {
                    props:{
                        customer: data[0],
                        token: token
                    }                  
                }
            }
        }
    }
    else { // No account in strapi create new account. 
        return {
            props:{
                newcustomerid: id,
                token: token
            }
           
        }
    }
}

export default Post