import React, { useState } from 'react'
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
import { Link } from 'react-router-dom';

const Booking = () => {
  const { bookings, fetchBooking, terminals } = useStatsContext()
  const {open, close, bool} = useBoolean()
  const [index, setIndex] = useState(null)

  const handleDelete = async (id, _index) => {
    setIndex(_index)
    open()

    // MAKE REQUEST
    const result = await handleDeleteBooking(id);

    logMessage(result)
    // CHECK FOR ERROR
    if(result && !result?.success) {
      toast(result?.message, { type: "error" })
      close()
      setIndex(null)
      return
    }

    // UPDATE THE STATE
    fetchBooking()

    // SHOW MESSAGE 
    toast(result?.message, { type: "success" })
    close()
    setIndex(null)
  }
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
                <h3 className="mb-0">Bookings</h3>
              </CardHeader>
              <CardBody>
                <Row>

                  {/* Add Terminal */}
                  <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className="shadow mt-4">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <div className="col">
                            <h3 className="mb-0">All Bookings</h3>
                          </div>
                        </Row>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Ticket ID</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Seat No</th>
                            <th scope="col">Bus</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings && bookings.length ? (
                            bookings.map((booking, _index) => (
                              <tr>
                                <th>
                                  <Link to={`/admin/booking-details/${booking?._id}`} className='text-primary'>
                                    {booking?.ticketId}
                                  </Link>
                                </th>
                                <th>
                                  {getMatch(terminals ?? [], "_id", booking?.route?.from)
                                    ? getMatch(terminals ?? [], "_id", booking?.route?.from )["name"]
                                    : `null`}
                                </th>
                                <th>
                                  {getMatch( terminals ?? [], "_id", booking?.route?.to)
                                    ? getMatch( terminals ?? [], "_id", booking?.route?.to )["name"]
                                    : `null`}
                                </th>
                                <th>
                                  {
                                    booking?.seat?.length > 0 
                                    ? booking?.seat?.map((seat, index) => (
                                      <span key={seat?._id} className="d-inline-block p-1">
                                        {seat.seatNo}
                                      </span>
                                    )) : `null`
                                  }
                                </th>
                                <td> { booking?.bus?.name } </td>
                                <td>
                                  {
                                    booking?.createdAt 
                                      ? new Date(booking?.createdAt).toDateString() 
                                      : "null"
                                  }
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Button
                                      disabled={bool}
                                      color="danger"
                                      size="sm"
                                      onClick={() =>
                                        handleDelete(booking?._id, _index)
                                      }
                                    >
                                      {bool && index === _index
                                        ? "Deleting..."
                                        : "Delete Booking"}
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <th
                                colSpan={6}
                                className={"text-center text-muted"}
                                scope="row"
                              >
                                No Booking Found
                              </th>
                            </tr>
                          )}
                        </tbody>
                      </Table>
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

export default Booking