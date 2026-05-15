import CustomerLayout from "../layouts/customer/CustomerLayout";
import HomePage from "../pages/customer/homepage/HomePage";
import { menuLoader } from "../pages/customer/menu/menu.loader";
import MenuPage from "../pages/customer/menu/MenuPage";
import { orderHistoryLoader } from "../pages/customer/order/order.loader";
import OrderPage from "../pages/customer/order/OrderPage";
import {
  saveVoucherAction,
  voucherLoader,
} from "../pages/customer/voucher/voucher.loader";
import VoucherPage from "../pages/customer/voucher/VoucherPage";
import MyWalletPage from "../pages/customer/wallet/MyWalletPage";
import { walletLoader } from "../pages/customer/wallet/wallet.loader";

const customerRoute = {
  path: "customer",
  element: <CustomerLayout />,
  children: [
    {
      path: "homepage",
      element: <HomePage />,
    },
    {
      path: "menu",
      element: <MenuPage />,
      loader: menuLoader,
    },
    {
      path: "orders",
      element: <OrderPage />,
      loader: orderHistoryLoader,
    },
    {
      path: "wallets",
      element: <MyWalletPage />,
      loader: walletLoader,
    },
    {
      path: "vouchers",
      element: <VoucherPage />,
      loader: voucherLoader,
      action: saveVoucherAction,
    },
  ],
};

export default customerRoute;
