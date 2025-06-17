import { use } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { router } from "./router/router";
import Loading from "./shared/Loading";
import { RouterProvider } from "react-router";

const App = () => {
    const { loading } = use(AuthContext);

    if (loading) return <Loading />;

    return <RouterProvider router={router} />;
};

export default App;
