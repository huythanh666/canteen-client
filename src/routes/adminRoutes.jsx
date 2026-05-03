import AdminLayout from "../layouts/AdminLayout";
import InventoryPage from "../pages/admin/inventory/InventoryPage";
import OrderPage from "../pages/admin/order/OrderPage";
import ProductPage from "../pages/admin/product/ProductPage";
import ReportPage from "../pages/admin/report/ReportPage";
import StaffPage from "../pages/admin/staff/StaffPage";
import VoucherPage from "../pages/admin/voucher/VoucherPage";
import WalletPage from "../pages/admin/wallet/WalletPage";
import RoleBasedRoute from "./RoleBasedRoute";
import { BusinessComplexPermission } from "../constants/RolePermisson";
import {
  historyOrderList,
  orderList,
  updateOrderAction,
} from "../pages/admin/order/order.loader";
import { productList } from "../pages/admin/product/product.loader";
import {
  createTransactionAction,
  inventoryList,
} from "../pages/admin/inventory/inventory.loader";
import InventoryTransactionPage from "../pages/admin/inventoryTransaction/InventoryTransactionPage";
import { inventoryTransactionList } from "../pages/admin/inventoryTransaction/inventoryTransaction.loader";
import ManageProduct from "../pages/admin/manage-product/ManageProduct";
import { productAction } from "../pages/admin/manage-product/manage.loader";
import HistoryOrderPage from "../pages/admin/order/HistoryOrder";
import { staffAction, StaffList } from "../pages/admin/staff/staff.loader";

const adminRoutes = {
  path: "admin",
  element: <AdminLayout />,
  children: [
    { path: "products", element: <ProductPage />, loader: productList },
    {
      path: "orders",
      element: <OrderPage />,
      loader: orderList,
      action: updateOrderAction,
    },
    {
      path: "history-order",
      element: <HistoryOrderPage />,
      loader: historyOrderList,
    },
    {
      path: "staffs",
      element: <StaffPage />,
      loader: StaffList,
      action: staffAction,
    },
    {
      element: <RoleBasedRoute allowedRoles={BusinessComplexPermission} />,
      children: [
        { path: "vouchers", element: <VoucherPage /> },
        { path: "report", element: <ReportPage /> },
        {
          path: "inventory",
          element: <InventoryPage />,
          loader: inventoryList,
          action: createTransactionAction,
        },
        {
          path: "inventory-transaction",
          element: <InventoryTransactionPage />,
          loader: inventoryTransactionList,
        },
        {
          path: "manage-product",
          element: <ManageProduct />,
          loader: productList,
          action: productAction,
        },

        { path: "wallets", element: <WalletPage /> },
      ],
    },
  ],
};

export default adminRoutes;
