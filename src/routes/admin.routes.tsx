import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateProperty from "../pages/admin/PropertyManagement/CreateProperty";
import Properties from "../pages/admin/PropertyManagement/Properties";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Property Management",
    children: [
      {
        name: "Create A. Property",
        path: "create-property",
        element: <CreateProperty />,
      },
      {
        name: "Properties",
        path: "properties",
        element: <Properties />,
      },
    ],
  },
];
