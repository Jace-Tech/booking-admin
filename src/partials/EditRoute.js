/* eslint-disable no-unused-vars */
import { handleUpdateRoute } from "apis/route.api";
import { handleCreateRoute } from "apis/route.api";
import { logMessage } from "config/functions";
import { useRouteContext } from "contexts/RouteContext";
import { useStatsContext } from "contexts/StatsContext";
import useBoolean from "hooks/useBoolean";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";

const EditRoute = ({ routeEdit, handleFinish }) => {
  const {bool, open, close} = useBoolean()
  const { terminals, fetchRoutes } = useStatsContext();
  const { handleCancel } = useRouteContext()
  const { control, handleSubmit, reset } = useForm({
    mode: "onTouched",
    defaultValues: {
      ...routeEdit,
      from: routeEdit.from._id,
      to: routeEdit.to._id,
    },
  });

  const handleAddRoute = async (data) => {
    open()

    // MAKE REQUEST
    const result = await handleUpdateRoute(routeEdit._id, data);

    logMessage(result)
    // CHECK FOR ERROR
    if(result && !result?.success) {
      toast(result?.message, { type: "error" })
      close()
      return
    }

    // UPDATE THE STATE
    fetchRoutes()

    // SHOW MESSAGE 
    toast(result?.message, { type: "success" })
    close()

    // RESET THE FORM
    reset()
    handleFinish()
  }

  console.table(routeEdit)
  return (
    <Col xl="12">
      <Card className="bg-white shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="12">
              <div className="d-flex align-items-center">
                <Button size="sm" onClick={handleCancel}>
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </Button>
                <h3 className="mb-0 ml-2">Edit Route</h3>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(handleAddRoute)}>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <Controller
                    name="from"
                    rules={{
                      required: "From is required",
                    }}
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            From
                          </label>

                          <select
                            className="form-control form-control-select"
                            {...field}
                          >
                            <option value="" selected disabled>
                              Choose from location
                            </option>
                            {terminals && terminals.length
                              ? terminals.map((terminal) => (
                                  <option
                                    key={terminal._id}
                                    value={terminal._id}
                                  >
                                    {terminal.name}
                                  </option>
                                ))
                              : null}
                          </select>
                          {errors?.from && (
                            <small className="d-flex mt-2 text-sm text-danger">
                              {errors?.from.message}
                            </small>
                          )}
                        </FormGroup>
                      </>
                    )}
                  />
                </Col>
                <Col lg="6">
                  <Controller
                    name="to"
                    rules={{
                      required: "To is required",
                    }}
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            To
                          </label>

                          <select
                            className="form-control form-control-select"
                            {...field}
                          >
                            <option value="" selected disabled>
                              Choose to location
                            </option>
                            {terminals && terminals.length
                              ? terminals.map((terminal) => (
                                  <option
                                    key={terminal._id}
                                    value={terminal._id}
                                  >
                                    {terminal.name}
                                  </option>
                                ))
                              : null}
                          </select>
                          {errors?.to && (
                            <small className="d-flex mt-2 text-sm text-danger">
                              {errors?.to.message}
                            </small>
                          )}
                        </FormGroup>
                      </>
                    )}
                  />
                </Col>
                <Col lg="12">
                  <Controller
                    name="type"
                    rules={{
                      required: "Type is required",
                    }}
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Type
                          </label>

                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="eg. Highway, SubHighway, Local ..."
                            type="text"
                            {...field}
                          />
                          {errors?.type && (
                            <small className="d-flex mt-2 text-sm text-danger">
                              {errors?.type.message}
                            </small>
                          )}
                        </FormGroup>
                      </>
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <Controller
                    name="acPrice"
                    rules={{
                      required: "Ac Price is required",
                    }}
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Ac Price
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Ac Price"
                            type="number"
                            {...field}
                          />
                          {errors?.acPrice && (
                            <small className="d-flex mt-2 text-sm text-danger">
                              {errors?.acPrice.message}
                            </small>
                          )}
                        </FormGroup>
                      </>
                    )}
                  />
                </Col>
                <Col lg="6">
                  <Controller
                    name="nonAcPrice"
                    rules={{
                      required: " Non Ac Price is required",
                    }}
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Non Ac Price
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Non Ac Price"
                            type="number"
                            {...field}
                          />
                          {errors?.nonAcPrice && (
                            <small className="d-flex mt-2 text-sm text-danger">
                              {errors?.nonAcPrice.message}
                            </small>
                          )}
                        </FormGroup>
                      </>
                    )}
                  />
                </Col>
                <Col>
                  <Button color="primary" disabled={bool}>
                    {bool ? "Updating..." : "Update Route"}
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default EditRoute;
