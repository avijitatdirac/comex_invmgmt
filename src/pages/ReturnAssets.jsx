import Moment from "react-moment"
import React, { Component } from "react";
import { Radio, Menu, Dimmer, Loader, Container, Image, Checkbox, Dropdown, Divider, Button, Form, Table, Modal, Input, Icon, Step, Header, Sidebar, Segment, FormGroup, Label, Grid, GridColumn, Card } from "semantic-ui-react";

/*TO DO
Manage Returned from Repair Assets
*/
  
var moment=require('moment')
class ReturnAssets extends Component
{

    constructor(props) {
        super(props);

        this.state = {
            damageComments:'',
            returnedAssetState:true,
            modifiedAssetState:false,
            damagedAssetState:false,
            customerList:[],
            customerDetails:[],
            selectedCustomerId: '',
            customerId:'',
            customerName:'',
            previousName:'',
            contactNumber:'',
            email:'',
            customerAddress:'',
            filterSerialNumber:'',
            challannumber:'',
            selectedcheckboxasset:[{
                id:"",
                status:"",
                comments:""
            }],
            selectedCategory:'',
            categoryOptions:[],
            damageButtonRender:true,
            modifiedButtonRender:true,
            damageId:'',
            damageSerialNumber:'',
            damageMake:'',
            damageStatus:'',
            configTableID:'',
            assetList:[],
            selectedAssetId:'',
            assetDetails:[],
            assetID:'',
            assetSerialNumber:'',
            assetChildSerialNumber:'',
            assetConfigDate:'',
            selectedDamageId:'',
            damageDetails:[],
            damageList:[],
            tableHeaders: ["Returned Proper","Returned Damaged","Name","Previous Name","Contact Number","Email","Address","Serial Number","Asset","Asset Id","Asset Type ","Order Date","Return Date","Unit Cost","Comments"],
            tableData:[{name:'',prevname:'',contactno:'',email:'',address:'',serialnumber:'',asset:'',assetid:'',assettype:'',orderdate:'',returndate:'',unitcost:'',comments:'',orderid:''}],
            tableDataInitial:[{name:'',prevname:'',contactno:'',email:'',address:'',serialnumber:'',asset:'',assetid:'',assettype:'',orderdate:'',returndate:'',unitcost:'',comments:'',orderid:''}],
            modifiedTableHeaders:["Asset ID","Serial Number","Config Date","Added To","Action"],
            damagedTableHeaders:["Asset ID","Serial Number","Make","Action"],
            // dimmer
            dimmerActive: false,
            customerAddressDetails:[],
            selectedorderids:[]
        }
    }

    componentWillMount() {
		// fetch all customer details from database
       		// fetch all customer details from database
               fetch(`/get_customer`,
               { method: 'GET' })
               .then(r => r.json())
               .then(data => {
                   //console.log(data)
                   var clist=[]
                   var cdetails=[]
                   var cadetails=[]
                       data.customerDetails.forEach(customer => {
                        if(customer.Previously_Known_As===null)
                        {
                        clist=clist.concat({	
                            key: customer.Customer_Id, 
                            value: customer.Customer_Id, 
                            text: customer.CName						
                        })
                    }
                    else{
                        clist=clist.concat({	
                            key: customer.Customer_Id, 
                            value: customer.Customer_Id, 
                            text: customer.CName+"(Previously known as "+customer.Previously_Known_As+")"						
                        })
                    }
                           cdetails=cdetails.concat(customer)
       
                       })
                       data.locationDetails.forEach(location => {
                           cadetails=cadetails.concat(location)
                       })
                   this.setState({
                       customerList:clist,
                       customerDetails:cdetails,
                       customerAddressDetails:cadetails
                   })
               })
               .catch(err => console.log(err))


        fetch(`/get_asset`,
            { method: 'GET' })
            .then(r => r.json())
            .then(data => {
                // parsing json data (need to verify later)
                var i;
                var s = JSON.stringify(data, null, 2);
                var r = JSON.parse(s);
                for (i = 0; i < r.results.length; i++) {
                    this.setState({
                        categoryOptions: this.state.categoryOptions.concat([{ key: r.results[i].id, id: r.results[i].id, text: r.results[i].type_name, value: r.results[i].type_name }])
                    });
                }
            })
            .catch(err => console.log(err))


    }

    callDamagedData = () =>
    {
        fetch(`/damaged_assets`,
		{ method: 'GET' })
		.then(r => r.json())
		.then(data => {
			console.log('all damaged data')
            console.log(data)
            
            data.results.forEach(damage => {

				this.setState({
					damageList : this.state.damageList.concat({	
						key: damage.id, 
						value:damage.serial_no, 
						text: damage.serial_no						
                    }),
					damageDetails: this.state.damageDetails.concat({
                        id:damage.id,
                        serialnumber:damage.serial_no,
                        make:  damage.make,
                        status: damage.status
					})
                });
            })
		})
        .catch(err => console.log(err))
    }

    callModifiedData = () =>
    {
        fetch(`/get_asset_config`,
		{ method: 'GET' })
		.then(r => r.json())
		.then(data => {
			//console.log('all assets')
            //console.log(data)
            
            for(var i=0;i<data.asset_config_id.length;i++)
            {

				this.setState({
					assetList : this.state.assetList.concat({	
						key: data.asset_config_id[i].asset_id, 
						value: data.asset_config_id[i].serial_no, 
						text: data.asset_config_id[i].serial_no						
                    }),
					assetDetails: this.state.assetDetails.concat({
                        id:data.asset_config_id[i].id,
                        assetid: data.asset_config_id[i].asset_id,
                        asset:   data.asset_config_id[i].serial_no,
						childasset: data.asset_config_child[i].serial_no,
                        configdate: data.asset_config_id[i].update_timestamp,

					})
                })
            }
		})
        .catch(err => console.log(err)) 
    }

    
    populateCustomerData = () => {

        //console.log(this.state.customerDetails)
        var pname
        this.state.customerDetails.forEach(customer => {
			if(customer.Customer_Id === this.state.selectedCustomerId) {
                if(customer.Previously_Known_As===null)
                    pname=''
                    else
                    pname=customer.Previously_Known_As
				this.setState({
                    customerName:customer.CName,
                    previousName:pname,
                },this.getAllData)
                return
			}
		});
    }

    populateAssetData = (id) => {
		this.state.assetDetails.forEach(asset => {
			if(asset.asset === this.state.selectedAssetId) {
				this.setState({
                    configTableID:asset.id,
                    assetID:asset.assetid,
                    assetSerialNumber:asset.asset,
                    assetChildSerialNumber:asset.childasset,
                    assetConfigDate:moment(asset.configdate).format("YYYY-MM-DD HH:mm:ss"),
				},console.log(this.state.assetID+" "+this.state.assetSerialNumber))
			}
		});
    }

    populateDamageData = (id) => {
      
                this.state.damageDetails.forEach(damage => {
                    if(damage.serialnumber === this.state.selectedDamageId) {
                        this.setState({
                            damageId:damage.id,
                            damageSerialNumber:damage.serialnumber,
                            damageMake:damage.make,
                            damageStatus:damage.status
                        },console.log(this.state.damageId+" "+this.state.damageSerialNumber+" "+this.state.damageStatus))
                    }
                });
            }

    
    getAllData = () =>
    {
        this.setState({dimmerActive:true})
        console.log(this.state.selectedCustomerId + " " +this.state.customerName)
        fetch(`/get_customer_order_details?customer_id=${this.state.selectedCustomerId}`,
            { method: 'GET' })
            .then(r => r.json())
            .then(data => {
                // parsing json data
                //console.log(data)
                this.setState({
                    tableData:[],
                    tableDataInitial:[],
                    dimmerActive: false
                })
                var dynadata=data.results
               // console.log(dynadata)
               for(var i=0;i<dynadata.length;i++)
               {
                if(dynadata[i].order_date==='0000-00-00 00:00:00' || dynadata[i].rental_end_date==='0000-00-00 00:00:00')
                {
                    if(dynadata[i].order_date==='0000-00-00 00:00:00')
                    var madate=''
                    if(dynadata[i].rental_end_date==='0000-00-00 00:00:00')
                    var purdate=''
                }
                else
                {
                var madate=moment(dynadata[i].order_date).format("YYYY-MM-DD HH:mm:ss")
                var purdate=moment(dynadata[i].rental_end_date).format("YYYY-MM-DD HH:mm:ss")
                }
                
                this.setState({
                    tableData:this.state.tableData.concat([{
                        contactno:dynadata[i].Contact_Number_1,
                        email:dynadata[i].Email_1,
                        address:dynadata[i].Address,
                        serialnumber:dynadata[i].serial_no,
                        asset:dynadata[i].make,
                        assetid:dynadata[i].asset_id,
                        assettype:dynadata[i].type_name,
                        orderdate:madate,
                        returndate:purdate,
                        unitcost:dynadata[i].total_unit_price,
                        orderid:dynadata[i].oid

                    }]),
                    tableDataInitial:this.state.tableDataInitial.concat([{        
                        contactno:dynadata[i].Contact_Number_1,
                        email:dynadata[i].Email_1,
                        address:dynadata[i].Address,
                        serialnumber:dynadata[i].serial_no,
                        asset:dynadata[i].make,
                        assetid:dynadata[i].asset_id,
                        assettype:dynadata[i].type_name,
                        orderdate:madate,
                        returndate:purdate,
                        unitcost:dynadata[i].total_unit_price,
                        orderid:dynadata[i].oid
                    }]),
                    // selectedcheckboxasset:this.state.selectedcheckboxasset.concat([{
                    //     id:dynadata[i].asset_id,
                    //     status:'1'
                    // }])
                })
               }
            })
            .catch(err =>  {
                this.setState({dimmerActive:false})
                console.log(err) 
            })
    }

    removeConfigState = () =>
    {
        //console.log(this.state.configTableID)
        fetch(`/change_config_status?id=${this.state.configTableID}`,
            { method: 'GET' })
            .then(r => r.json())
            .then(data => {

                this.setState({
                    modifiedButtonRender:false,
                    assetList:[],
                    assetDetails:[]
                },this.callModifiedData)
            })
            .catch(err => console.log(err))
    }

    sendForRepair = () =>
    {
       // console.log(this.state.damageId)
        fetch(`/send_for_repair?id=${this.state.damageId}&comments=${this.state.damageComments}`,
            { method: 'GET' })
            .then(r => r.json())
            .then(data => {
                this.setState({
                    damageButtonRender:false,
                    damageList:[],
                    damageDetails:[],
                    damageComments:''
                },this.callDamagedData)
            })
            .catch(err => console.log(err))
    }

    returnFromRepair = () =>
    {
       // console.log(this.state.damageId)
        fetch(`/return_from_repair?id=${this.state.damageId}`,
            { method: 'GET' })
            .then(r => r.json())
            .then(data => {
                this.setState({
                    damageButtonRender:false,
                    damageList:[],
                    damageDetails:[]
                },this.callDamagedData)
            })
            .catch(err => console.log(err))
    }

    renderAssetTable()
    {
        return (
            <div>
                 <Label as='a' color='violet' ><Icon name="pin"/>Asset Modification Details</Label>
                <Table color="teal" striped>
					<Table.Header>
						<Table.Row>
							{this.state.modifiedTableHeaders.map(label => (
								<Table.HeaderCell key={label}>{label}</Table.HeaderCell>
							))}
						</Table.Row>
					</Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{this.state.assetID}</Table.Cell>
                            <Table.Cell>{this.state.assetSerialNumber}</Table.Cell>
                            <Table.Cell>{this.state.assetConfigDate}</Table.Cell>
                            <Table.Cell>{this.state.assetChildSerialNumber}</Table.Cell>
                            <Table.Cell>
                            {this.state.modifiedButtonRender
                            ?
                            <Button width="100px" color="red"  label="Remove" onClick={this.removeConfigState} ><Icon name='remove circle'/></Button>
                            :
                            undefined
                            }
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    </Table>
                    </div>
                    )
    }

    renderDamageTable()
    {
        return (
            <div>
                 <Label as='a' color='violet'><Icon name="pin"/>Send For Repair</Label>
                <Table color="teal" striped>
					<Table.Header>
						<Table.Row>
							{this.state.damagedTableHeaders.map(label => (
								<Table.HeaderCell key={label}>{label}</Table.HeaderCell>
							))}
						</Table.Row>
					</Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{this.state.damageId}</Table.Cell>
                            <Table.Cell>{this.state.damageSerialNumber}</Table.Cell>
                            <Table.Cell>{this.state.damageMake}</Table.Cell>
                            <Table.Cell>
                            {this.state.damageButtonRender
                            ?
                            
                                this.state.damageStatus!=='3'
                                ?
                            <Button width="100px" color="green"  label="Mark as Damaged" onClick={this.sendForRepair} ><Icon name='send'/></Button>
                            :
                            <Button width="100px" color="green"  label="Return from Repair" onClick={this.returnFromRepair} ><Icon name='send'/></Button>
                            
                            :
                            undefined}
                            </Table.Cell>
                            <Table.Cell>
                            {this.state.damageStatus!=='3'
                            ?
                            <Form.Input label="Comments" value={this.state.damageComments}  onChange={this.commentsChange}/>     
                            :
                            undefined
                            }
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    </Table>
                    </div>
                    )
    }

    commentsChange = (event)          => this.setState({ damageComments: event.target.value });

    renderTable()
    {
        var {dimmerActive} = this.state
        return (
            <div>

                <Dimmer.Dimmable as={Segment} dimmed={dimmerActive}>
		        <Dimmer active={dimmerActive} inverted>
		        <Loader>Loading</Loader>
		        </Dimmer>
                 <Label as='a' color='violet' ><Icon name="pin"/>Ordered Items</Label>
                <Table color="teal" striped>
					<Table.Header>
						<Table.Row>
							{this.state.tableHeaders.map(label => (
								<Table.HeaderCell key={label}>{label}</Table.HeaderCell>
							))}
						</Table.Row>
					</Table.Header>
                    <Table.Body>
						{this.state.tableData.map((obj,idx) => (
                    <Table.Row
                    key={obj.assetid}
                    style={{ cursor: "pointer" }}
                    >
                    <Table.Cell>{<Checkbox style={{backgroundColor:'green'}}
					onClick={this.checkedAssetsProper.bind(this,obj.assetid,obj)}/>}
					</Table.Cell>
                    <Table.Cell>{<Checkbox style={{backgroundColor:'green'}}
					onClick={this.checkedAssetsDamaged.bind(this,obj.assetid,obj)}/>}
					</Table.Cell>
                    <Table.Cell>{this.state.customerName}</Table.Cell>
                    <Table.Cell>{this.state.previousName}</Table.Cell>
                    <Table.Cell>{obj.contactno}</Table.Cell>
                    <Table.Cell>{obj.email}</Table.Cell>
                    <Table.Cell>{obj.address}</Table.Cell>
                    <Table.Cell>{obj.serialnumber}</Table.Cell>
                    <Table.Cell>{obj.asset}</Table.Cell>
                    <Table.Cell>{obj.assetid}</Table.Cell>
                    <Table.Cell>{obj.assettype}</Table.Cell>
                    <Table.Cell>{obj.orderdate}</Table.Cell>
                    <Table.Cell>{obj.returndate}</Table.Cell>
                    <Table.Cell>{obj.unitcost}</Table.Cell>
                    <Table.Cell>
                    <Form.Input  value={obj.comments} onChange={this.changeComments.bind(this,obj.assetid,obj)}/> 
                    </Table.Cell>
                    </Table.Row>
                         ))}
					</Table.Body>
				</Table>
                <div>
					<center><Button width="100px" color="blue" onClick={this.spliceNullCheck} label="Return" ><Icon name='add circle'/></Button></center>
				</div>
                </Dimmer.Dimmable>
            </div>
        )
    }

    changeComments = (id,obj,event) => {
    
        var arr=this.state.tableDataInitial
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i].assetid===id)
            {
                arr[i].comments=event.target.value
            }
        }
        this.setState({tableDataInitial:arr})
      }

    spliceNullCheck = () =>
    {
        var arr=[]
        var count=0
        for(var i=1;i<this.state.selectedcheckboxasset.length;i++)
        {
            arr[count]=this.state.selectedcheckboxasset[i]
            count=count+1;
        }
        this.setState({selectedcheckboxasset:arr},this.commentsSet)
    }

    commentsSet = () =>
    {
        // console.log(this.state.selectedcheckboxasset)
        // console.log(this.state.tableDataInitial)
        var arrchk=this.state.selectedcheckboxasset
        var arrtbl=this.state.tableDataInitial
        var arrod=[]
        var count=0
        for(var i=0;i<arrtbl.length;i++)
        {
            for(var j=0;j<arrchk.length;j++)
            {
                if(arrtbl[i].assetid===arrchk[j].id)
                {
                    arrod[count]=arrtbl[i].orderid
                    count=count+1
                    if(arrtbl[i].comments)
                    arrchk[j].comments=arrtbl[i].comments
                    else
                    arrchk[j].comments=''
                }
            }
        }
        this.setState({selectedcheckboxasset:arrchk,
        selectedorderids:arrod
        },this.submitData)
    }


    submitData = () =>
    {
        console.log(JSON.stringify(this.state.selectedcheckboxasset))
        console.log(JSON.stringify(this.state.selectedorderids))
        fetch(`/change_status_on_return?data=${JSON.stringify(this.state.selectedcheckboxasset)}&oid=${JSON.stringify(this.state.selectedorderids)}`,
		{ method: 'GET' })
		.then(r => r.json())
		.then(data => {
            alert('Data Submitted')
		})
		.catch(err => console.log(err))
    }



    checkedAssetsProper = (id,obj)  => {
		var counter=0;
		var arr=this.state.selectedcheckboxasset
		for(var i=0;i<arr.length;i++)
		{
			if(arr[i].id===id)
			{
				   counter=1; 
				   arr.splice(i,1)
				   break;
			}
		}
		if(counter===0)
		{
			this.setState({
				selectedcheckboxasset:this.state.selectedcheckboxasset.concat([{
					id:id,
                    status:'1',
				}])  
			})
		}else
		{
			this.setState({selectedcheckboxasset:arr})
		}
    }
    
    checkedAssetsDamaged = (id,obj)  => {
        var counter=0;
		var arr=this.state.selectedcheckboxasset
		for(var i=0;i<arr.length;i++)
		{
			if(arr[i].id===id)
			{
				   counter=1; 
				   arr.splice(i,1)
				   break;
			}
		}
		if(counter===0)
		{
			this.setState({
				selectedcheckboxasset:this.state.selectedcheckboxasset.concat([{
					id:id,
                    status:'2',
				}])  
			})
		}else
		{
			this.setState({selectedcheckboxasset:arr})
		}
		
	}


    showReturnedAssetPage()
    {
        //console.log(this.state.customerId)
        return(
            <Segment>
				<div style={{ }}>
                    <label>Select Customer:</label>
					<Dropdown
						icon='search'
						fluid 
						search
						selection
						value={this.state.selectedCustomerId}
						onChange={(e, data) =>
                            this.setState({ selectedCustomerId: data.value },
                            this.populateCustomerData
                            )
						}
						placeholder="Select a Customer"
						options={this.state.customerList}
					/>
				</div>
                {this.SerialFilterForm()}
                <div style={{width: "100%",overflowX: "auto",overflowY:"hidden"}} >
                {this.state.selectedCustomerId !==''
                ?
                this.renderTable()
                :
                undefined
                }
                </div>
                </Segment>
        )
    }

    showModifiedAssetPage()
    {
        return(
            <Segment>
            <div style={{ }}>
                <label>Select Asset Serial Number:</label>
                <Dropdown
                    icon='search'
                    fluid 
                    search
                    selection
                    value={this.state.selectedAssetId}
                    onChange={(e, data) =>
                        this.setState({ selectedAssetId: data.value,modifiedButtonRender:true },
                        this.populateAssetData
                        )
                    }
                    placeholder="Enter Serial Number"
                    options={this.state.assetList}
                />
                <Divider/>
                <div style={{width: "100%",overflowX: "auto",overflowY:"hidden"}} >
                {this.state.assetID 
                ?
                this.renderAssetTable()
                :
                undefined
                }
                </div>
            </div>
            </Segment>
        )
    }

    showDamagedAssetPage()
    {
        return(
            <Segment>
            <div style={{ }}>
                <label>Select Asset Serial Number:</label>
                <Dropdown
                    icon='search'
                    fluid 
                    search
                    selection
                    value={this.state.selectedDamageId}
                    onChange={(e, data) =>
                        this.setState({ selectedDamageId: data.value,damageButtonRender:true },
                        this.populateDamageData
                        )
                    }
                    placeholder="Enter Serial Number"
                    options={this.state.damageList}
                />
                <Divider/>
                <div style={{width: "100%",overflowX: "auto",overflowY:"hidden"}} >
                {this.state.damageId
                ?
                this.renderDamageTable()
                :
                undefined
                }
                </div>
            </div>
            </Segment>
        
        )
    }

    selectedAssetType = (event, d) =>
    {
        //console.log(this.state.selectedCategory)
        var value = d.value
        let data = this.state.tableDataInitial.slice();
        let tableData = data.filter(
            obj => obj.assettype.toLowerCase().indexOf(value.toLowerCase()) !== -1

        );
        this.setState({ tableData })

    }

    renderCategoryDropdown() {
		return (
			<div className="field">
				<label>Category:</label>
				<Form>
				<Form.Group widths="equal">
				<Form.Select
                onChange={(e, data) =>
                    this.setState({ selectedCategory: data.value },
                    this.selectedAssetType(e,data)
                    )
                }
                value={this.state.selectedCategory}
                size="small"
                style={{ maxWidth: "400px" }}
                placeholder="Select Category"
                options={this.state.categoryOptions} />
				</Form.Group>
				</Form>
			</div>
		);
	}

    SerialFilterForm = () => (
        <Segment>
            <Header as="h5">
                <Icon name="filter" />
                <Header.Content>Filter By Serial Number:</Header.Content>
            </Header>
            <Form>
                <Form.Input width={4}
                    label='Serial Number'
                    type="text"
                    placeholder="Filter by Serial Number"
                    onChange={this.onChangeSerialFilter}
                />
                <Divider/>
                {this.renderCategoryDropdown()}
                <div>
                {this.state.selectedCategory ===''
                ?
                <Label basic color='red' pointing>Please enter a valid Asset Type</Label>
                :
                undefined
                }
                </div>
            </Form>
        </Segment>
    )
    onChangeChallanNumber = (event) => this.setState({ challannumber: event.target.value },this.getAllData);
    onChangeSerialFilter = (event) => this.setState({ filterSerialNumber: event.target.value }, this.filterResult);
 
    filterResult = () => {
        //console.log(this.state.tableData)
        var value = this.state.filterSerialNumber
        let data = this.state.tableDataInitial.slice();
        let tableData = data.filter(
            obj => obj.serialnumber.toLowerCase().indexOf(value.toLowerCase()) !== -1

        );
        this.setState({ tableData })
    }

    render()
    {
        //console.log(this.state)
        return(
            <div>
            <Button.Group attached='top'>
                <Button color='green' onClick={()=>{this.setState({returnedAssetState:true,modifiedAssetState:false,damagedAssetState:false})}}><Icon name='configure'/>Manage Returned Assets</Button>
                <Button color='blue'  onClick={()=>{this.setState({modifiedAssetState:true,returnedAssetState:false,damagedAssetState:false,assetList:[],assetDetails:[]},this.callModifiedData)}}><Icon name='plug'/>Manage Modified Components </Button>
                <Button color='teal'  onClick={()=>{this.setState({damagedAssetState:true,modifiedAssetState:false,returnedAssetState:false,damageList:[],damageDetails:[]},this.callDamagedData)}}><Icon name='broken chain'/>Manage Damaged Components </Button>
            </Button.Group>
            <Segment attached>
                <div>
                {
                this.state.returnedAssetState
                ?
                this.showReturnedAssetPage()
                :
                 (this.state.modifiedAssetState
                    ?
                    this.showModifiedAssetPage()
                    :
                    this.showDamagedAssetPage())
                
                }
                </div>
            </Segment>
            </div>
        )
    }

}
export default ReturnAssets;