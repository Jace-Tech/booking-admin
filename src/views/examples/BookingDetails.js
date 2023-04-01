import React, { useEffect, useState } from 'react'
// react component that copies the given text inside your clipboard
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Table} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useStatsContext } from 'contexts/StatsContext';
import useBoolean from 'hooks/useBoolean';
import { logMessage } from 'config/functions';
import { toast } from 'react-toastify';
import { getMatch } from 'config/functions';
import { handleDeleteBooking } from 'apis/booking.api';
import { useHistory, useParams } from 'react-router-dom';

const BookingDetails = () => {
  const { bookings, fetchBooking, terminals } = useStatsContext()
  const [currentBooking, setCurrentBooking] = useState(null)
  const {open, close, bool} = useBoolean()
  const history = useHistory()

  const { id } = useParams()

  const getTerminal = (_id) => terminals?.find(term => term._id === _id)

  useEffect(() => {
    open()
    const booking = bookings?.find(book => book._id === id)
    logMessage({booking})
    if(!booking) {
      history.replace("/admin/bookings")
      close()
      return
    }
    setCurrentBooking(booking)
    close()
  }, [])


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
              <div className="d-flex align-items-center">
                <Button size="sm" onClick={() => history.goBack()}>
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </Button>
                <h3 className="mb-0">Bookings Details</h3>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className="shadow mt-4">
                      <CardHeader className="bg-transparent">
                        <h2 className='h4 mb-0 font-weight-700'>User's Information</h2>
                      </CardHeader>
                      <CardBody>
                        <ul className='list-unstyled'>
                       
                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>firstname:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.user?.firstname } </span>
                          </li>

                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>lastname:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.user?.lastname } </span>
                          </li>

                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>email:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.user?.email } </span>
                          </li>

                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>phone:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.user?.phone } </span>
                          </li>

                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>Next of kin name:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.user?.NOKname } </span>
                          </li>

                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>Next of kin phone:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.user?.NOKphone } </span>
                          </li>

                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>Address:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.user?.address } </span>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className="shadow mt-4">
                      <CardHeader className="bg-transparent">
                        <h2 className='h4 mb-0 font-weight-700'>Booking Information</h2>
                      </CardHeader>
                      <CardBody>
                        <ul className='list-unstyled'>
                       
                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>From:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ getTerminal(currentBooking?.route?.from)?.name } </span>
                          </li>
                       
                       
                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>Destination:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ getTerminal(currentBooking?.route?.to)?.name } </span>
                          </li>
                       
                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>Tickets:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.tickets } </span>
                          </li>

                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>Price:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>&#8358;{(+currentBooking?.price).toLocaleString() } </span>
                          </li>
                          
                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>Bus:</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'>{ currentBooking?.bus?.name } </span>
                          </li>

                          <li className="p-2 py-3 border-bottom d-flex align-items-center">
                            <span className='text-sm text-capitalize'>Seat(s):</span>
                            <span className='text-sm font-weight-600 d-inline-block ml-1'> { currentBooking?.seat.length} { currentBooking?.seat.length > 1 ? "Seats" : "Seat\t" } {` => `} [ {currentBooking?.seat?.map(s => `No. ${s.seatNo}`)?.join(", ") } ] </span>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default BookingDetails