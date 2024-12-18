
import Home from "../home/Home";
import Login from "../login/Login";

type typeRoutesConfig = {
    path: string;
    component: React.ElementType;
};

export const routes: typeRoutesConfig[] = [
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/auth/login",
        component: Login,
    },
];
