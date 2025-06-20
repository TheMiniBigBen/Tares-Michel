import dasboard from "../modules/dasboard/Dasboard";
import UserForm from "../modules/user/User_Form";

export interface appRoutes {
    path: string:
    element: JSX.element;
    label?: string;
    icon? : string;
    roleIds? : string[];
    hidden?: boolean;
}

const routes: appRoutes[] = [
    {
        path: '/',
        element: <UserForm />
        label:'Inicio',
        icon: 'HomeOutLine',
    },

    {
        path: '/users',
        element: <UserForm />
        label:'Usuarios',
        icon: 'UserOutLine',
    },

    {
        path: '/dashboard',
        element: <UserForm />
        label:'Usuarios',
        icon: 'UserOutLine',
    },

    {
        path: '/users',
        element: <UserForm />
        label:'Usuarios',
        icon: 'UserOutLine',
    },

    



