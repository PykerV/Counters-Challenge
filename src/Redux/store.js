import { cilCheckAlt, cilChevronBottom, cilChevronLeft, cilClipboard, cilClock, cilXCircle } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { 
    CBadge,
    CRow,
    CToast, 
    CToastBody, 
    CToastHeader, 
    CToaster, 
    CCol,
    CButton,
    CCard,
    CCardBody,
    CCollapse,
    CLabel,
    CFormGroup,
    CSelect,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import axios from 'axios';
import React, {Component} from 'react'
import { withTranslation } from 'react-i18next'
import i18n from 'i18next'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LoadingOverlay from 'react-loading-overlay';
import MultiSelect from 'react-multiselect-checkboxes';
import ClipLoader from 'react-spinners/ClipLoader'
import { getCookie, setCookie } from 'src/utils/cookies';
import { shuffleArray } from 'src/utils/shuffleArray';
import SlidesItem from './SlidesItem';
import LocalStorage from '../../utils/localStorage'

class TrasnlatorDashboard extends Component {
    constructor(props) {
        super(props)

        this.scrollToTexts = React.createRef()  
        this.slider = React.createRef()

        this.state = {
            spinner: false,
            showModal: false,
            toast: {
                show: false,
                message: "",
                type: ""
            },
            checkValidation: false,

            sliderIndex: 0,
            selectedTextId: '',
            widgetsData: {
                assignedCount: 0,
                doneCount: 0,
                verifedCount: 0
            },
            collapseTranslator: true,
            collapseTexts: true,
            collapseFilters: true,
            source_language: {value: "All", isValid: true, invalidMessage: "This field is required"},
            destination_language: {value: "All", isValid: true, invalidMessage: "This field is required"},
            selectedFilters: [],
            selectedFromFilters: [],
            selectedToFilters: [],
            filterResult: [],
            filtersCount: [],
            filterOptions: [
                {value: "EN", label: i18n.t("EN")},
                {value: "CN", label: i18n.t("CN")},
                {value: "TR", label: i18n.t("TR")},
                {value: "AR", label: i18n.t("AR")},
                {value: "ES", label: i18n.t("ES")},
                {value: "FA", label: i18n.t("FA")}
            ]
        }
    }

    sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => this.setState({ sliderIndex: next })
      };


    //handler functions

    showModalHandler = () => {
        this.setState({...this.state, showModal: !this.state.showModal})
    }

    spinnerHandler = (show) => {
        this.setState({...this.state, spinner: show})
    }

    toastHandler = (show, message, type) => {
        this.setState({...this.state, toast: {show: show, message: message, type: type}})

        setTimeout(() => {
            this.setState({...this.state, toast: {show: false, message: "", type: ""}})
        }, 3000);
    }

    collapseTranslatorHandler = () => {
        this.setState({...this.state, collapseTranslator: !this.state.collapseTranslator})
    }

    collapseTextsHandler = () => {
        this.setState({...this.state, collapseTexts: !this.state.collapseTexts})
    }
    
    collapsefiltersHandler = () => {
        this.setState({...this.state, collapseFilters: !this.state.collapseFilters})
    }

    sourceLangHandler = (event) => {
        const data = event.target.value
        this.setState({...this.state, source_language: {isValid: false, value: data, invalidMessage: "This field is required"}})
    }

    desLangHandler = (event) => {
        const data = event.target.value
        this.setState({...this.state, destination_language: {isValid: false, value: data, invalidMessage: "This field is required"}})
    }

    onFiltersChangeHandler = (selectedItems) => {
        this.setState({...this.state, selectedFilters: selectedItems})
    }

    onFromFiltersChangeHandler = (selectedItems) => {
        const filters = this.generateFilters(selectedItems, this.state.selectedToFilters)
        this.setState({...this.state, selectedFromFilters: selectedItems, selectedFilters: filters})
    }

    onToFiltersChangeHandler = (selectedItems) => {
        const filters = this.generateFilters(this.state.selectedFromFilters, selectedItems)
        this.setState({...this.state, selectedToFilters: selectedItems, selectedFilters: filters})
    }

    buttonLabelHandler = ({ placeholderButtonLabel, value }) => {
        var label = ""
        if(value.length > 0) {
            value.forEach(item => {
                label += item.label + " "
            })
        } else {
            label = i18n.t("All")
        }
        return  label
    }

    ignoreText = async (id, type="ignore") => {
        // this.slider.slickGoTo(1)
        var texts = this.state.filterResult
        
        if(type === "ignore") {
            var ingnoredTexts = LocalStorage.loadState("ignoredTexts")
            
            if(ingnoredTexts && ingnoredTexts.ignore) {
                ingnoredTexts = ingnoredTexts.ignore
                ingnoredTexts.push(id)
                LocalStorage.saveState("ignoredTexts", {ignore: ingnoredTexts})
            } else {
                LocalStorage.saveState("ignoredTexts", {ignore: [id]})
            }

            if(this.state.sliderIndex === 0 && this.state.filterResult.length === 1) {
                this.removeText(texts, id)
            } else {
                this.slider.slickGoTo(this.state.sliderIndex + 1)
            }
            
        } else {
            this.setState({...this.state, filterResult: [], widgetsData: {...this.state.widgetsData, assignedCount: this.state.widgetsData.assignedCount + 1}, showModal: false}, () => {
                this.removeText(texts, id)  
            })
        }
        
    }

    removeText = (texts, id) => {
        
        var textIndex = texts.map(text => text.text_id).indexOf(id)
        console.log("remove index", textIndex, this.state.sliderIndex)
        texts.splice(textIndex, 1)

        this.setState({...this.state, filterResult: texts, spinner: false}, () => {
            this.scrollToTexts.current.scrollIntoView({behavior: 'smooth'})
            this.slider.slickGoTo(this.state.sliderIndex)
        })
        // if(this.state.sliderIndex !== 0) {
        //     // if(this.state.sliderIndex < texts.length) {
        //     //     this.slider.slickGoTo(this.state.sliderIndex)
        //     // } else {
                
        //     // }
            
            
        // }
        
        
        
    }
    countRestul = (texts) => {
        var filtersCount = {}
        texts.map(text => {
          const filterid = text.source_language.toUpperCase() + text.destination_language.toUpperCase()
        //   filtersCount.push({
        //       count: filtersCount[filterid] ? filtersCount[filterid].value + 1 : 1, 
        //       value: filterid, 
        //       label: i18n.t(text.source_language) + " " + i18n.t("to") + " " + i18n.t(text.destination_language),
        //       from: text.source_language,
        //       to: text.destination_language
        //     })
              
          var filter = {}
          
          filter[filterid] = {value: 0, label: "", from: "", to: ""}
          filter[filterid].value = filtersCount[filterid] ? filtersCount[filterid].value + 1 : 1
          filter[filterid].label = i18n.t(text.source_language) + " " + i18n.t("to") + " " + i18n.t(text.destination_language)
          filter[filterid].from = text.source_language
          filter[filterid].to = text.destination_language
          filtersCount = {...filtersCount, ...filter}
        })

        var resultCount = []
        Object.keys(filtersCount).forEach(key => {
            resultCount.push({
                count: filtersCount[key].value,
                value: key, 
                label: filtersCount[key].label,
                from: filtersCount[key].from,
                to: filtersCount[key].to
              })
          })
          return resultCount
        //   this.setState({...this.state, filtersCount: resultCount, selectedFilters: resultCount})
    }
      
      
    checkFilters = (filters, item) => {
        console.log("check fil", filters)
        var check = false
        filters.some(filter => {
            if ( (filter.from.toUpperCase() === "ALL" || (filter.from === item.source_language)) && (filter.to === "ALL" || (filter.to === item.destination_language)) ) {
                 check = true
            }
        })

        console.log("check fil 1", check)
        return check
    }


    addTaskHandler = (id) => {

        if(this.state.widgetsData.assignedCount < 100) {
          this.setState({...this.state, selectedTextId: id, showModal: !this.state.showModal}) // set id and show modal
        } else {
          this.toastHandler(true, i18n.t("you can't add more than 5 translate"), "danger")
        }
      }

    assignFilter = async () => {
        const filters = this.generateFilters(this.state.selectedFromFilters, this.state.selectedToFilters)
        await this.getTranslates(filters)
    }

    removeFilter = async (from, to) => {
        console.log("removing", from, to)
        var filters = this.state.selectedFilters
        var index = filters.map(item => item.value).indexOf(from+to)
        if (index > -1) {
            filters.splice(index, 1)
        }
        console.log("remo", index, filters)
        this.setState({...this.state, selectedFilters: filters})
        await this.getTranslates()
    }

    generateFilters = (from, to) => {
        
        var filters = []

        var fromFilters = []
        if (from.length > 0) {
            fromFilters = from
        } else {
            fromFilters = this.state.filterOptions
        }
        
        var toFilters = []

        if (to.length > 0) {
            toFilters = to
        } else {
            toFilters = this.state.filterOptions
        }

        for( var i = 0; i < fromFilters.length; i++ ) {
            for( var j = 0; j < toFilters.length; j++ ) {
                filters.push({from: fromFilters[i].value, to: toFilters[j].value})
            }
        }
        
        return filters
    }

    filterIgnored = (text, ignores) => {
        console.log("ignores", ignores)
        
        return ignores.some(ignore => {
            if (text.text_id === ignore) {
                 return true
            }
        })
    }
    //api requests 

    getUserTextList = async () => {

        this.spinnerHandler(true)
    
        // const params = {
        //     status: status
        // }
        const headers = {'Authorization': `Bearer ${getCookie("token")}`};
    
        const assigned = axios.get( process.env.REACT_APP_SERVER_URL + '/v1/translation/list/assigned' , { headers: headers }) 
        const verify = axios.get( process.env.REACT_APP_SERVER_URL + '/v1/translation/list/verify' , { headers: headers }) 
        const done = axios.get( process.env.REACT_APP_SERVER_URL + '/v1/translation/list/done' , { headers: headers }) 
        const finalized = axios.get( process.env.REACT_APP_SERVER_URL + '/v1/translation/list/finalized' , { headers: headers }) 
        
        await Promise.all([assigned, verify, done, finalized])
        .then(response => {
    
            this.spinnerHandler(false)
            this.setState({
                ...this.state, 
                widgetsData: {
                    ...this.state.widgetsData, 
                    assignedCount: response[0].data.data.texts ? response[0].data.data.texts.length : 0,
                    verifedCount: response[1].data.data.texts ? response[1].data.data.texts.length : 0,
                    doneCount: response[2].data.data.texts ? response[2].data.data.texts.length : 0 + response[3].data.data.texts ? response[3].data.data.texts.length : 0  // verified + finalized transalates
                 }
            })
            this.scrollToTexts.current.scrollIntoView({behavior: 'smooth'})
        })
        .catch(error => {
            console.log(error)
            this.spinnerHandler(false)
            if(error.response) {
              this.toastHandler(true, error.response.data.message, "danger")
            }
            else {
              this.toastHandler(true, "Something went wrong", "danger")
            }
        })
        
    }

    addTask = () => {
  
        this.spinnerHandler(true)
      
        const headers = {
            'Authorization': `Bearer ${getCookie("token")}`,
            'Content-Type': 'multipart/form-data'
        };
        var formData = new FormData()
      
        formData.append("text_id", this.state.selectedTextId)
      
        axios.post( process.env.REACT_APP_SERVER_URL + "/v1/translation/pickup", formData, {
            headers: headers
        })
        .then(response => {
            // setassignedCount(assignedCount + 1)
            // this.setState({
            //     ...this.state,
            //     widgetsData: {...this.state.widgetsData, assignedCount: this.state.widgetsData.assignedCount + 1}
            // })
            this.ignoreText(this.state.selectedTextId, "addTask")
            this.toastHandler(true, response.data.message, 'success')
            // this.spinnerHandler(false)
            // this.showModalHandler()
            // this.toastHandler(true, response.data.message, "success")
        })
        .catch(error => {
            this.spinnerHandler(false)
            if(error.response) {
                this.showModalHandler()    
                this.toastHandler(true, error.response.data.message, "danger")
            } else {
                this.showModalHandler()    
                this.toastHandler(true, "Semething went wrong", "danger")
            }
        })
      }


    getTranslates = async (filters=[]) => {
        filters = filters.length > 0 ? filters : this.state.selectedFilters
        this.setState({...this.state, filterResult: [], filtersCount: [], spinner: true})
        // this.spinnerHandler(true)
        const headers = {'Authorization': `Bearer ${getCookie("token")}`};

        await axios.get( process.env.REACT_APP_SERVER_URL + '​/v1/translation/list/pending', { headers: headers })
        .then(response => {
            
            var textsList = response.data.data.texts || [] 
            
            // filtering user ignored texts
            const ignoreList = LocalStorage.loadState("ignoredTexts")

            if(ignoreList && ignoreList.ignore.length > 0) {
                textsList = textsList.filter(text => !(this.filterIgnored(text, ignoreList.ignore)))
            }

            // filtering user filters
            if(filters.length > 0 ) {
                textsList = textsList.filter(text => this.checkFilters(filters, text))
                var resultCount = this.countRestul(textsList)
            }
            

            textsList = shuffleArray(textsList)
            textsList = textsList.sort((a, b) => {return b.priority - a.priority})

            this.setState({...this.state, filterResult: textsList, filtersCount: resultCount || [], selectedFilters: resultCount, spinner: false})
            this.scrollToTexts.current.scrollIntoView({behavior: 'smooth'})
        })
        .catch(error => {
            console.log(error)
            this.spinnerHandler(false)
            if(error.response) {
                this.toastHandler(true, error.response.data.message, "danger")
            }
            else {
                console.log("error in ",error)
                this.toastHandler(true, "Something went wrong", "danger")
            }

            // return false
        })
    }

    //render

    componentWillMount() {
        this.getUserTextList()
        this.getTranslates()
    }

    render() {
        console.log("rendered")
        const {t} = this.props
        return (
            <>
                {this.state.spinner && (
                    <LoadingOverlay
                        active={this.state.spinner}
                        spinner={<ClipLoader/>}
                    />
                )}

                {this.state.showModal ? (
                    <CModal current
                    show={this.state.showModal} 
                    onClose={() => this.showModalHandler()}
                    color="warning"
                    style={{fontFamily: 'iranyekan'}}
                    >
                    <CModalHeader closeButton>
                        <CModalTitle>{t("Add to my translations list")}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>{t("Add to works list message")}</CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => this.showModalHandler()}>{t("Cancel")}</CButton>{' '}
                        <CButton color="warning" onClick={() => this.addTask()}>{t("Add")}</CButton>
                    </CModalFooter>
                    </CModal>                    
                ) : null}

                <CToaster
                    position="top-left"
                    key={'toaster'}
                    style={{fontFamily: "iranyekan"}}
                    >
                    <CToast
                        color={this.state.toast.type}
                        show={this.state.toast.show}
                        autohide={3000}
                        fade={true}
                        >
                            <CToastHeader closeButton>
                            </CToastHeader>
                            <CToastBody>
                                {t(this.state.toast.message)}
                            </CToastBody>
                    </CToast>
                </CToaster>

                <CCard style={{fontFamily: 'iranyekan'}}>
                    <CCardBody>
                        {(this.state.widgetsData.assignedCount > 0 || this.state.widgetsData.verifedCount > 0 || this.state.widgetsData.doneCount > 0) && (
                            <>
                                <CRow onClick={() => this.collapseTranslatorHandler()}>
                                    <CCol md="6">
                                        <CLabel style={{color: 'gray'}}>فعالیت های مترجمی</CLabel>
                                    </CCol>

                                    <CCol md="6" style={{textAlign: 'end'}}>
                                        <CButton onClick={() => this.collapseTranslatorHandler()}><CIcon name={this.state.collapseTranslator ? "cil-chevron-bottom" : "cil-chevron-left"}/></CButton>
                                    </CCol>
                                </CRow>
                                <div style={{border: '1px solid lightgray', marginBottom: '20px'}} />
                                <CCollapse show={this.state.collapseTranslator}>
                                    <CRow style={{fontFamily: "iranyekan"}}>
                                        <CCol md="4">
                                            <CCard borderColor="info" style={{background: "var(--info)", color: 'white'}}>
                                                <CCardBody>
                                                    <CRow>
                                                        <CCol md="8">
                                                        <h3>{this.state.widgetsData.assignedCount}</h3> 
                                                            {t("ترجمه در دست اقدام")} 
                                                        </CCol>
                                                        <CCol md="4" style={{textAlign: "end"}}>
                                                            <CIcon size="4xl" content={cilClipboard} on/>
                                                        </CCol>
                                                    </CRow>

                                                    <CRow>
                                                        <CCol>
                                                        <CButton 
                                                            color="link" 
                                                            className="px-0" 
                                                            style={{fontFamily: "iranyekan"}}
                                                            onClick={() => {this.props.history.push("/translates/texts")}}
                                                        >
                                                            {/* {t("یک متن ترجمه کنید !")} */}
                                                        </CButton>
                                                        </CCol>
                                                    </CRow>
                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                        
                                        <CCol md="4">
                                        <CCard borderColor="warning" style={{background: "var(--warning)", color: 'white'}}>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol md="8">
                                                        <h3>{this.state.widgetsData.verifedCount}</h3> 
                                                        {t("ترجمه منتظر تایید")} 
                                                    </CCol>
                                                    <CCol md="4" style={{textAlign: "end"}}>
                                                        <CIcon size="4xl" content={cilClock} on/>
                                                    </CCol>
                                                </CRow>

                                                <CRow>
                                                    <CCol>
                                                        <CButton 
                                                            color="link" 
                                                            className="px-0" 
                                                            style={{fontFamily: "iranyekan"}}
                                                            onClick={() => {this.props.history.push("/translates/texts")}}
                                                            >
                                                            {/* {t("مشاهده متن های موجود برای ترجمه !")} */}
                                                        </CButton>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                        </CCol>

                                        <CCol md="4">
                                        <CCard borderColor="success" style={{background: "var(--success)", color: 'white'}}>
                                            <CCardBody>
                                                <CRow>
                                                <CCol md="8">
                                                    <h3>{this.state.widgetsData.doneCount}</h3> 
                                                    {("ترجمه تایید شده")}
                                                </CCol>
                                                <CCol md="4" style={{textAlign: "end"}}>
                                                    <CIcon size="4xl" content={cilCheckAlt} on/>
                                                </CCol>
                                                </CRow>

                                                <CRow>
                                                <CCol>
                                                <CButton 
                                                            color="link" 
                                                            className="px-0" 
                                                            style={{fontFamily: "iranyekan"}}
                                                            onClick={() => {this.props.history.push("/translates/texts")}}
                                                            >
                                                            {/* {t("مشاهده متن های منتظر تایید !")} */}
                                                        </CButton>
                                                </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                        </CCol>
                                        
                                    </CRow>
                                </CCollapse>
                            </>
                        )}

                        <CRow>
                            <CCol md="6">
                                <CLabel style={{color: 'gray'}}>{t("Texts for translate")}</CLabel>
                            </CCol>

                            {/* <CCol md="6" style={{textAlign: 'end'}}>
                                <CButton onClick={() => this.collapseTextsHandler()}><CIcon name={this.state.collapseTexts ? "cil-chevron-bottom" : "cil-chevron-left"}/></CButton>
                            </CCol> */}
                        </CRow>
                        <div style={{border: '1px solid lightgray', marginBottom: '20px'}} />
                        
                        <CCollapse show={this.state.collapseTexts}>

                            <CCol style={{backgroundColor: 'var(--secondary)', padding: "20px"}}>
                                <CRow>
                                    <CCol md="6">
                                        <CLabel onClick={() => this.collapsefiltersHandler()} style={{color: 'gray'}}>{t("Filter")}</CLabel>    <CIcon onClick={() => this.collapsefiltersHandler()} name={this.state.collapseFilters ? "cil-chevron-bottom" : "cil-chevron-left"}/>
                                    </CCol>

                                    <CCol md="6" style={{textAlign: 'end'}}>
                                        
                                    </CCol>
                                </CRow>

                                <CCollapse show={this.state.collapseFilters}>
                                    <CRow>
                                        <CCol md="5">
                                            <CLabel>زبان مبدا</CLabel>
                                            <MultiSelect 
                                                style={{width: '100%'}}
                                                isMulti={true} 
                                                options={this.state.filterOptions} 
                                                closeMenuOnSelect={false} 
                                                value={this.state.selectedFromFilters}
                                                placeholderButtonLabel={t("Select")}
                                                onChange={(event) => this.onFromFiltersChangeHandler(event)}
                                                getDropdownButtonLabel={this.buttonLabelHandler}
                                            />
                                        </CCol>

                                        <CCol md="5">
                                            <CLabel>زبان مقصد</CLabel>
                                            <MultiSelect 
                                                isMulti={true} 
                                                options={this.state.filterOptions} 
                                                closeMenuOnSelect={false} 
                                                value={this.state.selectedToFilters}
                                                placeholderButtonLabel={t("Select")}
                                                onChange={(event) => this.onToFiltersChangeHandler(event)}
                                                getDropdownButtonLabel={this.buttonLabelHandler}
                                            />
                                        </CCol>
                                        {/* <CCol md="9">
                                            <MultiSelect 
                                                isMulti={true} 
                                                options={this.state.filterOptions} 
                                                closeMenuOnSelect={false} 
                                                value={this.state.selectedFilters}
                                                placeholder={t("Select")}
                                                onChange={(event) => this.onFiltersChangeHandler(event)}
                                                rtl
                                            />
                                        </CCol> */}
                                        <CCol md="2" style={{textAlign: "center", marginTop: '28px'}}>
                                            <CButton color="warning" onClick={() => this.assignFilter()}>{t("Assing filters")}</CButton>
                                        </CCol>
                                    </CRow>
                                    
                                </CCollapse>
                                
                                <div style={{border: '1px solid white', marginBottom: '20px', marginTop: '10px'}} />

                                <CRow>
                                    <CCol>
                                        {/* {this.renderFilterResultCount()} */}
                                        <div style={{marginTop: '10px'}}/>
                                        {this.state.filtersCount.length > 0 && this.state.filtersCount.map(item => {
                                            return(
                                                <CBadge key={item.from + item.to} color="info" shape="pill" style={{margin: "4px", minHeight: "20px", padding: "6px"}}>
                                                {`${item.count} ترجمه از ${item.label}`} 
                                                <CButton style={{width: '5px', height: '5px', borderRadius: '5rem'}} onClick={() => this.removeFilter(item.from, item.to)}>
                                                    <CIcon style={{color: 'white', position: 'relative', left: '8px', top: '-12px'}} content={cilXCircle}/>
                                                    </CButton>
                                                </CBadge>
                                            )
                                        })} 
                                    </CCol>
                                </CRow>

                                <div ref={this.scrollToTexts}>
                                    {this.state.filterResult.length > 0 ? (
                                        <CCol>
                                            <Slider ref={slider => (this.slider = slider)} {...this.sliderSettings}>
                                                {this.state.filterResult.map(item => {
                                                    return <SlidesItem text={item} next={this.ignoreText} showModalHandler={this.addTaskHandler}/>
                                                })}
                                            </Slider>
                                        </CCol>
                                    ) : (
                                        <CCol style={{textAlign: 'center'}}>
                                            <CBadge color="warning" style={{fontSize: '20px'}}>{t("No items")}</CBadge>
                                        </CCol>
                                    )}    
                                </div>
                                
                                
                            </CCol>
                        </CCollapse>

                        
                    </CCardBody>
                </CCard>
            </>
        )
    }
}


export default withTranslation()(TrasnlatorDashboard)
