
import Index from "views/Index.js";
import Route from "views/examples/Route";
import Login from "views/examples/Login";
import Register from "views/examples/Register";
import Terminal from "views/examples/Terminal";
import Booking from "views/examples/Booking";
import ManageBuses from "views/examples/ManageBuses";
import BookingDetails from "views/examples/BookingDetails";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];



export const dashRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/route",
    name: "Route",
    icon: "ni ni-delivery-fast text-blue",
    component: Route,
    layout: "/admin",
  },
  {
    path: "/terminal",
    name: "Terminal",
    icon: "ni ni-pin-3 text-orange",
    component: Terminal,
    layout: "/admin",
  },
  {
    path: "/bookings",
    name: "Booking",
    icon: "ni ni-collection text-purple",
    component: Booking,
    layout: "/admin",
  },
  {
    path: "/manage-buses/:id",
    name: "ManageBuses",
    icon: "ni ni-pin-3 text-orange",
    component: ManageBuses,
    layout: "/admin",
    isNotAmong: true
  },
  {
    path: "/booking-details/:id",
    name: "ManageBuses",
    icon: "ni ni-pin-3 text-orange",
    component: BookingDetails,
    layout: "/admin",
    isNotAmong: true
  },
];
export default routes;
