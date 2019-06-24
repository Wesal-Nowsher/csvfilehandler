import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Style from './style';
import CountUp from 'react-countup';
import { MDBDataTable } from 'mdbreact';
import Pagination from "react-js-pagination";
import ReactTable from 'react-table';
import Search from 'react-search';
import 'react-table/react-table.css';
import Table from "../customtable/TableComponent";

import { Progress } from 'reactstrap';

class control extends Component{
    state={
        data:[],
        loading: false,
        filechoosen: true,
        width:0,
        headers:[],
        activePage: 15,
        itemonpage:20
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }


    componentDidMount(){
        if(this.props.data.length > 0){
            this.setState({loading:true, filechoosen: false});
            let {data}= this.props;
            let self= this;

            setTimeout(function () {
                let newdata=[...data];

                let strc=[];
                let nw={};
                let headers=[...newdata[0]];
                self.setState({headers: headers})
                newdata.map((items,index)=>{
                    if(index >0){
                        items.map((item,inde)=>{
                            nw[headers[inde]]= item;
                        });
                        strc.push({...nw});

                    }
                })
                console.log("data", strc)
                    let onentwo=[];
                    let handicap=[];
                    let faceaface=[];
                    let handicapfaceaface=[];

                    let plusmoins=[];
                    strc.map((item, index)=>{
                        if(index >0){
                        if(item["Pari"].includes("1 N 2")  && !item["Pari"].includes("Handicap")){
                            item["inlist"]=true;
                            item["index"]=index;
                            item["group"]="1n2";
                            item["blue"]="ok";
                            item["fav"]=false;
                            onentwo.push(item);
                        }
                        else if(item["Pari"].includes("1 N 2") && item["Pari"].includes("Handicap")){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            handicap.push(item)
                        }
                        else if(item["Pari"].includes("Face à Face") && !item["Pari"].includes("Handicap") ){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            faceaface.push(item)
                        }
                        else if(item["Pari"].includes("Face à Face") && item["Pari"].includes("Handicap") ){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            handicapfaceaface.push(item)
                        }
                        else if(item["Pari"].includes("Plus/moins")){
                            item["group"]="handicap";
                            item["inlist"]=true;
                            item["index"]=index;
                            item["blue"]="ok";
                            item["fav"]=false;
                            plusmoins.push(item)
                        }
                        else{
                            item["inlist"]=false;
                            item["index"]=index;
                            item["group"]="ok";
                            item["blue"]="ok";
                            item["fav"]=false;
                        }
                        }
                    })

                    //onentwo
                    let ioneindex =0;
                    let winner="";
                    let aswholewinner="";
                    let minimumion;
                    while(ioneindex <= onentwo.length-4){

                        // minone


                        // console.log("  onentwo[ioneindex",  onentwo[ioneindex])
                        if(parseFloat(onentwo[ioneindex]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Première"].replace(",","."))
                            && parseFloat(onentwo[ioneindex]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Première"].replace(",","."))){
                            minimumion= ioneindex;
                        }
                        else if(parseFloat(onentwo[ioneindex+1]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Première"].replace(",","."))
                            && parseFloat(onentwo[ioneindex+1]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Première"].replace(",","."))){
                            minimumion= ioneindex+1;
                        }
                        else if( parseFloat(onentwo[ioneindex+2]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Première"].replace(",","."))
                            && parseFloat(onentwo[ioneindex+2]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Première"].replace(",","."))){
                            minimumion= ioneindex+2;
                        }
                        // minone

                        if(ioneindex <3){
                            aswholewinner=onentwo[minimumion]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");
                            onentwo[minimumion]["blue"]="green";
                        }

                        winner=onentwo[minimumion]["Paris/Pronostics"];
                        if(ioneindex >=3){
                            if(onentwo[ioneindex]["Evénement"] !== onentwo[ioneindex-1]["Evénement"]){
                                let newwinner;
                                // minone
                                if(parseFloat(onentwo[ioneindex]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Première"].replace(",","."))
                                    && parseFloat(onentwo[ioneindex]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Première"].replace(",","."))){
                                    newwinner= ioneindex;
                                }
                                else if(parseFloat(onentwo[ioneindex+1]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Première"].replace(",","."))
                                    && parseFloat(onentwo[ioneindex+1]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex+2]["Cotes Première"].replace(",","."))){
                                    newwinner= ioneindex+1;
                                }
                                else if( parseFloat(onentwo[ioneindex+2]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex]["Cotes Première"].replace(",","."))
                                    && parseFloat(onentwo[ioneindex+2]["Cotes Première"].replace(",",".")) <= parseFloat(onentwo[ioneindex+1]["Cotes Première"].replace(",","."))){
                                    newwinner= ioneindex+2;
                                }
                                // minone

                                onentwo[newwinner]["blue"]="green";
                                aswholewinner= onentwo[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-","").replace("+","");

                            }
                            else{
                                if(!aswholewinner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                        winner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                    )
                                ){
                                    onentwo[minimumion]["blue"]= "red";
                                }
                            }
                        }

                        ioneindex =ioneindex +3;
                    }



                    onentwo.map((item)=>{
                        strc[item["index"]]= item;
                    })
                    //onentwo
                    //faceaface
                    let ioneindexface =0;
                    let winnerface="";
                    let aswholewinnerface="";
                    let minimumface;
                    while(ioneindexface <= faceaface.length-3){

                        // min2
                        if(parseFloat(faceaface[ioneindexface]["Cotes Première"].replace(",",".")) <= parseFloat(faceaface[ioneindexface+1]["Cotes Première"].replace(",","."))){
                            minimumface= ioneindexface;
                        }
                        else if(parseFloat(faceaface[ioneindexface+1]["Cotes Première"].replace(",",".")) <= parseFloat(faceaface[ioneindexface]["Cotes Première"].replace(",","."))){
                            minimumface= ioneindexface+1;
                        }
                        // min2
                        if(ioneindexface <2){
                            aswholewinnerface=faceaface[minimumface]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");
                            faceaface[minimumface]["blue"]="green";
                        }
                            console.log("minimum",minimumface,faceaface[minimumface]);
                        winnerface=faceaface[minimumface]["Paris/Pronostics"];
                        let newwinner;
                        if(ioneindexface >=2){
                            if(faceaface[ioneindexface]["Evénement"] !== faceaface[ioneindexface-1]["Evénement"]){


                                // min2
                                if(parseFloat(faceaface[ioneindexface]["Cotes Première"].replace(",",".")) <= parseFloat(faceaface[ioneindexface+1]["Cotes Première"].replace(",","."))){
                                    newwinner= ioneindexface;
                                    console.log("newwinner in if",newwinner,ioneindexface)
                                }
                                else if(parseFloat(faceaface[ioneindexface+1]["Cotes Première"].replace(",",".")) <= parseFloat(faceaface[ioneindexface]["Cotes Première"].replace(",","."))){
                                    newwinner= ioneindexface+1;
                                    console.log("newwinner in else if",newwinner,ioneindexface);

                                }
                                // min2
                                console.log("newwinner", faceaface,ioneindexface,ioneindexface);
                                faceaface[newwinner]["blue"]="green";
                                aswholewinnerface= faceaface[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-","").replace("+","");

                            }
                            else{
                                if(!aswholewinnerface.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                        winnerface.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                    )
                                ){
                                    faceaface[minimumface]["blue"]= "red";
                                }
                            }
                        }

                        ioneindexface =ioneindexface +2;
                    }



                    faceaface.map((item)=>{
                      strc[item["index"]]= item;
                    })
                    //faceaface
                    //handicaps in 1 n2
                    let index=0;
                    let valuetocheck=0;
                    while(index  <= handicap.length -4){


                        if(index<3){
                            valuetocheck=   handicap[index]["Cotes Première"].replace(",",".");
                        }
                        if(index >=3){
                            if(handicap[index]["Evénement"] !== handicap[index-1]["Evénement"] ){
                                valuetocheck =handicap[index]["Cotes Première"].replace(",",".");
                            }
                            else{
                                if(parseFloat(valuetocheck) < parseFloat(handicap[index]["Cotes Première"].replace(",","."))){
                                    handicap[index]["blue"]= "red";
                                }
                                valuetocheck=   handicap[index]["Cotes Première"].replace(",",".");
                            }
                        }
                        index=index+3;
                    }
                    let indexi=0;
                    let valuetochecki=0;
                    while(indexi  <= handicap.length -4){


                        if(indexi<3){
                            valuetochecki=handicap[indexi+2]["Cotes Première"].replace(",",".");

                        }
                        if(indexi >=3){
                            if(handicap[indexi]["Evénement"] !== handicap[indexi-1]["Evénement"] ){
                                valuetochecki =handicap[indexi+2]["Cotes Première"].replace(",",".");

                            }
                            else{
                                if(parseFloat(valuetochecki) > parseFloat(handicap[indexi+2]["Cotes Première"].replace(",","."))){

                                    handicap[indexi+2]["blue"]= "red";
                                }

                                valuetochecki=handicap[indexi+2]["Cotes Première"].replace(",",".");
                            }
                        }
                        indexi=indexi+3;
                    }

                    handicap.map((item)=>{
                        if(item["blue"] === "red"){

                        }
                        else{

                        }
                        strc[item["index"]]= item;
                    })
                    //handicap
                    //handicapfaceaface
                    let indexhandface=0;
                    let valuetocheckhandface=0;
                    while(indexhandface  <= handicapfaceaface.length -4){
                        if(indexhandface<2){
                            valuetocheckhandface=   handicapfaceaface[indexhandface]["Cotes Première"].replace(",",".");
                        }
                        if(indexhandface >=2){
                            if(handicapfaceaface[indexhandface]["Evénement"] !== handicapfaceaface[indexhandface-1]["Evénement"] ){
                                valuetocheckhandface =handicapfaceaface[indexhandface]["Cotes Première"].replace(",",".");
                            }
                            else{
                                if(parseFloat(valuetocheckhandface) < parseFloat(handicapfaceaface[indexhandface]["Cotes Première"].replace(",","."))){
                                    handicapfaceaface[indexhandface]["blue"]= "red";                                }
                                valuetocheckhandface=   handicapfaceaface[indexhandface]["Cotes Première"].replace(",",".");
                            }
                        }
                        indexhandface=indexhandface+2;
                    }
                    let indexihandface=0;
                    let valuetocheckihandface=0;
                    while(indexihandface  <= handicapfaceaface.length -3){


                        if(indexihandface<2){
                            valuetocheckihandface=handicapfaceaface[indexihandface+2]["Cotes Première"].replace(",",".");

                        }
                        if(indexihandface >=2){
                            if(handicapfaceaface[indexihandface]["Evénement"] !== handicapfaceaface[indexihandface-1]["Evénement"] ){
                                valuetocheckihandface =handicapfaceaface[indexi+1]["Cotes Première"].replace(",",".");

                            }
                            else{
                                if(parseFloat(valuetocheckihandface) > parseFloat(handicapfaceaface[indexihandface+2]["Cotes Première"].replace(",","."))){

                                    handicapfaceaface[indexihandface+1]["blue"]= "red";
                                }

                                valuetocheckihandface=handicapfaceaface[indexihandface+1]["Cotes Première"].replace(",",".");
                            }
                        }
                        indexihandface=indexihandface+2;
                    }

                    handicapfaceaface.map((item)=>{
                        if(item["blue"] === "red"){

                        }
                        else{

                        }
                        strc[item["index"]]= item;
                    })
                    //handicapfaceaface
                    //plusmoins
                    let indexplus=0;
                    let valuetocheckplus=0;
                    while(indexplus  <= plusmoins.length -3){


                        if(indexplus <3){
                            valuetocheckplus=   plusmoins[indexplus]["Cotes Première"].replace(",",".");
                        }
                        if(indexplus >=3){
                            if(plusmoins[indexplus]["Evénement"] !== plusmoins[indexplus-1]["Evénement"] ){
                                valuetocheckplus =plusmoins[indexplus]["Cotes Première"].replace(",",".");
                            }
                            else{
                                if(parseFloat(valuetocheckplus) < parseFloat(plusmoins[indexplus]["Cotes Première"].replace(",","."))){
                                    plusmoins[indexplus]["blue"]= "red";

                                }

                                valuetocheckplus=   plusmoins[indexplus]["Cotes Première"].replace(",",".");
                            }
                        }
                        indexplus=indexplus+2;
                    }
                    let indexiplus=0;
                    let valuetocheckiplus=0;
                    while(indexiplus  <= plusmoins.length -3){


                        if(indexiplus<3){
                            valuetocheckiplus = plusmoins[indexiplus+1]["Cotes Première"].replace(",",".");

                        }
                        if(indexiplus >=3){
                            if(plusmoins[indexiplus]["Evénement"] !== plusmoins[indexiplus-1]["Evénement"] ){
                                valuetocheckiplus =plusmoins[indexiplus+1]["Cotes Première"].replace(",",".");

                            }
                            else{
                                if(parseFloat(valuetocheckiplus) > parseFloat(plusmoins[indexiplus+2]["Cotes Première"].replace(",","."))){

                                    plusmoins[indexiplus+2]["blue"]= "red";
                                }

                                valuetocheckiplus = plusmoins[indexiplus+2]["Cotes Première"].replace(",",".");
                            }
                        }
                        indexiplus=indexiplus+2;
                    }

                    plusmoins.map((item)=>{
                        if(item["blue"] === "red"){

                        }
                        else{

                        }
                        strc[item["index"]]= item;
                    })
                    //plusmoins


                console.log(
                    "pageinations",strc.length
                )

                self.setState({data: strc,loading:false });
            },1000);
        }

    }
    nitems(value){
        console.log("wesal",value);
        this.setState({itemonpage:value});
    }
    search(value){
        console.log("searchfield",value);
    }

     render(){


        let {data,headers}= this.state;

        console.log("headersdata",headers, data)


        return(
            <div>
                <div className="starter-head" >
                    <div className="container-inside">
                        <div className="header">
                            <span className="header-text" >Contrôle WEB</span>
                        </div>
                        <div className="empty-space"></div>
                        <Link to="/" className="link1 link">
                            <div className="link-text">Accueil</div>
                        </Link>
                        <Link to="/importation" className="link2 link">
                            <div className="">Importation</div>
                        </Link>
                        <Link to="/control" className="link3  link">
                            <div className="">Contrôles</div>
                        </Link>
                    </div>
                </div>
                <div className="accuil-content" id="">
                    <div className="accuil">
                        <div className="accuil-inside">
                            <div className="accuil-text">

                                {
                                    this.state.filechoosen &&  <h2>No file has been choosen!</h2>
                                }
                                {
                                    data.length>0 && this.state.loading===false && <div>
                                        <input type="text" placeholder="Search" onChange={(e)=> this.search(e.target.value)}/>

                                        <label>item per page</label><select onChange={(e)=> this.nitems(e.target.value)}>
                                            <option value="20">20</option>
                                            <option value="40">40</option>
                                        </select>
                                        <Table head={headers} data={data} pageSize={this.state.itemonpage} />
                                    </div>
                                }
                                {
                                  this.state.loading &&
                                  <div>
                                    <div className="loader">
                                    </div>

                                  </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <Style/>
            </div>
        )
    }
}
export default control;