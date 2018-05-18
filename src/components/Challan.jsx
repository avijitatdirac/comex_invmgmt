import React from "react";
import Tab, { Container, Grid, Label, Segment, Header, Divider, Table, Button, Icon } from "semantic-ui-react";

import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
var moment = require('moment');



class ComponentToPrint extends React.Component {


	constructor(props) {
		super(props);
        // this.state = {
        //     cartItems: this.props.cartItems,
        //     customer: this.props.customer
        // }
        console.log("props are: ", this.props)
    }

    // get the main location isMain = 1
    getMainLocation = () => {
        console.log('finding main...')
        var ans = ''
        this.props.locations.forEach(location => {
            // console.log('addr', location.address, 'main', location.isMain, 'cid', location.customerId, 'sel', this.props.customerId)
            if (location.isMain === 1 && location.customerId === this.props.customerId) {
                // console.log('main: ',location.address, location.isMain)
                ans = location.address +', '+location.city+', '+location.state+', '+location.pincode
            }
        });
        return `${ans}`
    }
    render() {
        return (
            <div name="page">
                <Container textAlign='center'>
                    <Header as="h5">DELIVERY CHALLAN</Header>

                <Grid columns={2} celled>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h3">COMPUTER EXCHANGE PVT.LTD</Header>
                        <Container textAlign='left'>#102, First Floor, May Fair Court, Nachiket Park, Dr. Pai Marg, Baner, Pune 411 045</Container>
                    </Grid.Column>
                    <Grid.Column>
                        <Container>
                            <strong>www.computerexchangeindia.com</strong>
                            <p>Dial: +91-20-65200269/ 09830951013</p>
                            <p>CIN: {this.props.cin}</p>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <strong>M/S</strong>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Container textAlign='left'><strong>{this.props.customer.cName}</strong></Container>
                                    <Container textAlign='left'>{this.getMainLocation()}</Container>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <strong>Delivery at</strong>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Container textAlign='left'>{this.props.customer.address}, {this.props.customer.city}, {this.props.customer.state}, {this.props.customer.pincode}</Container>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Table basic>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><strong>No.</strong></Table.Cell>
                                    <Table.Cell>372</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><strong>Date</strong></Table.Cell>
                                    <Table.Cell>{this.props.currentDate}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><strong>Order PO#</strong></Table.Cell>
                                    <Table.Cell>{this.props.orderPo}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><strong>Contacts</strong></Table.Cell>
                                    <Table.Cell>{this.props.contactPerson}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><strong>Messenger</strong></Table.Cell>
                                    <Table.Cell>{this.props.messenger}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Container textAlign='center'>Please receive the goods in good condition and return the challans duly signed</Container>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {this.assetListTable()}
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <strong>Remarks</strong>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Container textAlign='left'>Sending on rental basis</Container>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Grid>
                            <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='left'>We Have received the goods in good condition.</Container>
                            </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={10}>
                                    <Container textAlign='left'>Customer Signature</Container>
                                </Grid.Column>

                                <Grid.Column width={6}>
                                    <Container textAlign='center'>Date</Container>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid>
                            <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>for COMPUTER EXCHANGE PVT.LTD.</Container>
                            </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                            <Grid.Column>
                                <Container textAlign='center'>Authorised Signature</Container>
                            </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                </Container>
            </div>
        );
    }
    // renders the list of assets
    assetListTable = () => (
            <Table basic celled>
            <Table.Header>
                <Table.HeaderCell>Qty</Table.HeaderCell>
                <Table.HeaderCell>Serial No</Table.HeaderCell>
                <Table.HeaderCell>Description of goods</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
            {this.props.cartItems.map(item =>(
                <Table.Row>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>{item.serialNo}
                {item.dynaData.map(detail =>(
                    `${'/'+ detail.value}`
                ))}
                </Table.Cell>
                <Table.Cell>{item.make}</Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
            <Table.Footer>
                <Table.HeaderCell>{this.props.cartItems.length}</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Footer>
        </Table>
    )
}

class Challan extends React.Component {
    render() {
        return (
        <div className="page">
        <ComponentToPrint ref={el => (this.componentRef = el)}
            
            customer = {this.props.customer}
            currentDate = {this.props.currentDate}
            orderPo = {this.props.orderPo}
            messenger = {this.props.messenger}
            locations = {this.props.locations}
            locationId = {this.props.locationId}
            cartItems = {this.props.cartItems}
            customerId = {this.props.customerId}
			contactPerson = {this.props.contactPerson}
            cin = {this.props.cin}
        />
            <ReactToPrint
            
            trigger={() => <Button><Icon name="print"/>Print</Button>}
            content={() => this.componentRef}
            />
        </div>
        );
    }
}

export default Challan;
