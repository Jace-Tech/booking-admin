import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Table,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useStatsContext } from "contexts/StatsContext";
import useBoolean from "hooks/useBoolean";
import { logMessage } from "config/functions";
import { toast } from "react-toastify";
import EditTerminal from "../../partials/EditTerminal"
import { useBusContext } from "contexts/BusContext";
import { useHistory, useParams } from "react-router-dom";
import { handleGetRouteBuses } from "apis/bus.api";
import AddBus from "partials/AddBus";
import { handleDeleteBus } from "apis/bus.api";
import EditBus from "partials/EditBus";

const ManageBuses = () => {
  const { routes, fetchRoutes, fetchBuses, buses } = useStatsContext();
  const { open, close, bool } = useBoolean();
  const [index, setIndex] = useState(null);
  const { busEdit, setBusEdit } = useBusContext()
  const [ routeBuses, setRouteBuses] = useState([])
  const [ currentRoute, setCurrentRoute] = useState(null)
  const history = useHistory()

  const busTypeMap = {
    "acBus": "AC Bus",
    "nonAcBus": "Non AC Bus",
  }

  const {id} = useParams()

  useEffect(() => {
    if(!id) {
      history.push("/admin")
      return
    }
    const route = routes?.find(_route => _route._id === id)
    if(!route) {
      history.push("/admin")
      return
    }

    setCurrentRoute(route)
  }, [])

  useEffect(() => {
    if(!currentRoute) return

    const fetchBuses = async () => {
      const result = await handleGetRouteBuses(id)
      if(!result.success) return
      setRouteBuses(result.data)
    }
    fetchBuses()
  }, [currentRoute, id, buses, routes])


  const handleDelete = async (id, _index) => {
    setIndex(_index);
    open();

    // MAKE REQUEST
    const result = await handleDeleteBus(id);

    logMessage(result);
    // CHECK FOR ERROR
    if (result && !result?.success) {
      toast(result?.message, { type: "error" });
      close();
      setIndex(null);
      return;
    }

    // UPDATE THE STATE
    setRouteBuses(prev => prev.filter(bus => bus._id !== id))
    fetchBuses()
    fetchRoutes()

    // SHOW MESSAGE
    toast(result?.message, { type: "success" });
    close();
    setIndex(null);
  };

  const handleInitBusEdit = (_id) => {
    const bus = routeBuses?.find(_bus => _bus._id === _id)
    if(!bus) return
    setBusEdit(bus)
  }

  useEffect(() => {
   logMessage(routeBuses)
   logMessage(currentRoute)
  }, [routeBuses, currentRoute])

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
                  {busEdit && (
                    <Button
                      size="sm"
                      onClick={() => setBusEdit(null)}
                    >
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Button>
                  )}
                  <h3 className="mb-0 ml-2">Manage Buses</h3>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  {busEdit ? (
                    <EditBus 
                      routeId={id}
                      handleFinish={() => setBusEdit(null)}
                      busEdit={busEdit}
                    />
                  ) : (
                    <>
                      {/* Add Terminal */}
                      <AddBus routeId={id} handleFinish={() => {}} />

                      {/* Add Terminal */}
                      <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow mt-4">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">
                                  All Buses{" "}
                                  <span className="text-muted">
                                    [ {currentRoute?.from?.name} -{" "}
                                    {currentRoute?.from?.name} ]
                                  </span>
                                </h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Bus Type</th>
                                <th scope="col">Boarding Date</th>
                                <th scope="col">Available Seats</th>
                                <th scope="col">Total Seats</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {routeBuses && routeBuses.length ? (
                                routeBuses.map((bus, _index) => (
                                  <tr>
                                    <th>{bus.name}</th>
                                    <th>
                                      &#8358;{(+bus.price).toLocaleString()}
                                    </th>
                                    <th className="text-muted">
                                      {busTypeMap[bus.busType]}
                                    </th>
                                    <td>
                                      {new Date(bus.boardingDate).toUTCString()}
                                    </td>
                                    <th>{bus.availableSeats}</th>
                                    <th>{bus.seats.length}</th>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <Button
                                          disabled={bool}
                                          color="danger"
                                          size="sm"
                                          onClick={() =>
                                            handleDelete(bus._id, _index)
                                          }
                                        >
                                          {bool && index === _index
                                            ? "Deleting..."
                                            : "Delete Bus"}
                                        </Button>

                                        <Button
                                          disabled={bool}
                                          color="info"
                                          size="sm"
                                          onClick={() => handleInitBusEdit(bus._id)}
                                        >
                                          Edit Bus
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <th
                                    colSpan={7}
                                    className={"text-center text-muted"}
                                    scope="row"
                                  >
                                    No Bus Found
                                  </th>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </Card>
                      </Col>
                    </>
                  )}
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default ManageBuses