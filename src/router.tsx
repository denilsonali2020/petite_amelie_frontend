import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewTokenView from "./views/auth/RequestNewTokenView";
import NewPasswordView from "./views/auth/NewPasswordView";

import AdminLayout from "./layouts/AdminLayout";
import RootCategoryListView from "./views/admin/category/views/RootCategoryListView";
import EditRootCategoryView from "./views/admin/category/views/EditRootCategoryView";
import SubCategoryListview from "./views/admin/category/views/SubCategoryListview";
import SubCategoryEditView from "./views/admin/category/views/SubCategoryEditView";
import ProductListView from "./views/admin/product/views/ProductListView";
import EditProductDataView from "./views/admin/product/views/EditProductDataView";
import ProductEditLayout from "./layouts/views/ProductEditLayout";
import EditProductMediaView from "./views/admin/product/views/EditProductMediaView";
import UserListView from "./views/admin/user/views/UserListView";
import EditUserView from "./views/admin/user/views/EditUserView";
import AuthAdminLayout from "./layouts/AuthAdminLayout";
import AdminLoginView from "./views/admin/admin-login/views/AdminLoginView";
import ProtectedRoute from "./components/guards/ProtectedRoute";
import PageNotFound from "./views/admin/PageNotFound";
import BillingConfigListView from "./views/admin/settings/billingConfig/views/BillingConfigListView";
import EditBillingConfigView from "./views/admin/settings/billingConfig/views/EditBillingConfigView";
import OrderListView from "./views/admin/orders/views/OrderListView";
import CreateOrderView from "./views/admin/orders/views/CreateOrderView";
import DetailOrderView from "./views/admin/orders/views/DetailOrderView";
import DashboardEnterpriseView from "./views/admin/dashboard/views/DashboardEnterpriseView";
import ProfileView from "./views/admin/profile-settings/profile/views/ProfileView";
import ReportsDashboard from "./views/admin/reports/views/ReportsDashboard";
import FinanceReportView from "./views/admin/reports/views/FinanceReportView";
import InventoryReportView from "./views/admin/reports/views/InventoryReportView";
import EmployeeReportView from "./views/admin/reports/views/EmployeeReportView";
import LoyaltyReportView from "./views/admin/reports/views/LoyaltyReportView";

//============================
import RequireRole from "./components/guards/RequireRole";
import PublicLayout from "./layouts/public/PublicLayout";
import HomeView from "./views/public/home/views/HomeView";
import NewArrivalsView from "./views/public/home/views/NewArrivalsView";

const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  CASHIER: "CASHIER",
};
//============================

export default function Router() {
  return (
    <BrowserRouter>
      {/* RUTAS PUBLICAS */}
      <Routes>
        {/* LOGIN DE ADMINS PUBLICO*/}
        <Route element={<AuthAdminLayout />}>
          <Route path="/auth-admin/login" element={<AdminLoginView />} index />
        </Route>

        {/* LOGIN DE CLIENTES PUBLICA */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} index />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route
            path="/auth/request-new-token"
            element={<RequestNewTokenView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>

        {/* ==========================================================
          RUTAS PUBLICAS (CUSTOMERS)
        ========================================================== */}
        <Route element={<PublicLayout />}>
          <Route path="/petite-amelie" element={<HomeView />} index />
          <Route path="/novedades" element={<NewArrivalsView />} />
        </Route>

        {/* ==========================================================
          RUTAS PRIVADOS (ADMIN)
        ========================================================== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {/* ==========================================
                NIVEL 1: ACCESO OPERATIVO (OWNER, ADMIN, CASHIER)
            ========================================== */}
            <Route
              element={
                <RequireRole
                  allowedRoles={[ROLES.OWNER, ROLES.ADMIN, ROLES.CASHIER]}
                />
              }
            >
              {/* VENTAS */}
              <Route path="/admin/orders">
                <Route index element={<OrderListView />} />
                <Route path="new" element={<CreateOrderView />} />
                <Route path=":orderId" element={<DetailOrderView />} />
              </Route>

              {/* PERFIL (Self-service) */}
              <Route path="/admin/profile">
                <Route index element={<ProfileView />} />
              </Route>

              {/* INVENTARIO - SOLO LECTURA */}
              <Route
                path="/admin/category"
                element={<RootCategoryListView />}
              />
              <Route
                path="/admin/category/:rootCategoryId/sub-categories"
                element={<SubCategoryListview />}
              />
              <Route
                path="/admin/category/:rootCategoryId/category/:subCategoryId/products"
                element={<ProductListView />}
              />
            </Route>

            {/* ==========================================
                NIVEL 2: ADMINISTRACIÓN (OWNER, ADMIN)
            ========================================== */}
            <Route
              element={
                <RequireRole allowedRoles={[ROLES.OWNER, ROLES.ADMIN]} />
              }
            >
              {/* FACTURACION */}
              <Route path="/admin/settings/billing">
                <Route index element={<BillingConfigListView />} />
                <Route
                  path=":configId/edit"
                  element={<EditBillingConfigView />}
                />
              </Route>

              {/* INVENTARIO - EDICIÓN */}
              <Route
                path="/admin/category/:rootCategoryId/edit"
                element={<EditRootCategoryView />}
              />
              <Route
                path="/admin/category/:rootCategoryId/sub-categories/:subCategoryId/edit"
                element={<SubCategoryEditView />}
              />
              <Route
                path="/admin/category/:rootCategoryId/category/:subCategoryId/sub-category/:productId/edit"
                element={<ProductEditLayout />}
              >
                <Route index element={<EditProductDataView />} />
                <Route path="media" element={<EditProductMediaView />} />
              </Route>
            </Route>

            {/* ==========================================
                NIVEL 3: ACCESO TOTAL (SOLO OWNER)
            ========================================== */}
            <Route element={<RequireRole allowedRoles={[ROLES.OWNER]} />}>
              {/* DASHBOARD */}
              <Route path="/admin/dashboard">
                <Route index element={<DashboardEnterpriseView />} />
              </Route>

              {/* EMPLEADOS */}
              <Route path="/admin/users">
                <Route index element={<UserListView />} />
                <Route path=":userId/edit" element={<EditUserView />} />
              </Route>

              {/* REPORTES */}
              <Route path="/admin/reports">
                <Route index element={<ReportsDashboard />} />
                <Route path="finance" element={<FinanceReportView />} />
                <Route path="inventory" element={<InventoryReportView />} />
                <Route path="employees" element={<EmployeeReportView />} />
                <Route path="loyalty" element={<LoyaltyReportView />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* RUTA ADMIN 404 PAGE NOT FOUND */}
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
