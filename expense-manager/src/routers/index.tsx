import ErrorHandler from "@/components/error/ErrorHandler";
import AuthLayout from "@/components/layouts/auth.layout";
import MainLayout from "@/components/layouts/main.layout";
// import Layout from "@/components/layout";
import PersistentLogin from "@/components/routing/persistent-login";
import RequireAuth from "@/components/routing/require-auth";
import Login from "@/pages/Auth/Login";
import Attendance from "@/pages/Main-Page/Attendance";
import Expenses from "@/pages/Main-Page/Expenses";
import SavingPlan from "@/pages/Main-Page/Expenses/SavingPlan";
import Payments from "@/pages/Main-Page/Payments";
import Users from "@/pages/Main-Page/Users";
// import Articles from "@/pages/articles";
// import Login from "@/pages/auth/login";
// import LoginLayout from "@/pages/auth/login/layout";
// import MainPage from "@/pages/main page";
// import Resume from "@/pages/resume";
import Home from "@/pages/Main-Page/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Register from "@/pages/Auth/Register";
import Settings from "@/pages/Main-Page/settings/Settings";
import Profile from "@/pages/Main-Page/profile";
import Logs from "@/pages/Main-Page/Llogs";
import Wallets from "@/pages/Main-Page/Wallets";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<PersistentLogin />}
        errorElement={
          <ErrorHandler status={500} title="Something went wrong!" />
        }
      >
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route
            path="/unauthorized"
            element={<ErrorHandler status={403} title="Unauthorized!" />}
          />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route element={<RequireAuth />}>
            <Route path="/wallets" element={<Wallets />} />

            <Route
              path="/attendance"
              element={<Attendance />}
              errorElement={
                <ErrorHandler status={500} title="Something went wrong!" />
              }
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-logs" element={<Logs />} />
            <Route
              path="/payments"
              element={<Payments />}
              errorElement={
                <ErrorHandler status={500} title="Something went wrong!" />
              }
            />
            <Route
              path="/expenses"
              errorElement={
                <ErrorHandler status={500} title="Something went wrong!" />
              }
            >
              <Route index element={<Expenses />} />
              <Route path="plan" element={<SavingPlan />} />
            </Route>
            <Route path="/dashboard" element={<Home />} />
          </Route>
        </Route>
        <Route path="/users" element={<MainLayout />}>
          <Route
            element={<RequireAuth allowedRoles={["admin", "superadmin"]} />}
          >
            <Route
              index
              element={<Users />}
              errorElement={
                <ErrorHandler status={500} title="Something went wrong!" />
              }
            />
          </Route>
        </Route>

        {/* <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="resume" element={<Resume />} />
          <Route path="articles">
            <Route index element={<Articles />} />
          </Route>
        </Route> */}
      </Route>
      <Route element={<MainLayout />}>
        <Route
          path="*"
          element={<ErrorHandler status={404} title="Page Not Found!" />}
        />
      </Route>
    </>
  )
);

export default router;
