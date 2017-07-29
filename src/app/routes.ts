import {RegisterComponent} from './Components/register/register.component';
import {LoginComponent} from './Components/login/login.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import {AddnoteComponent} from './Components/addnote/addnote.component';

export let allRoutes =[
    {
        name: 'login',
        url: '/login',
        component: LoginComponent
    },
    {
        name: 'register',
        url: '/register',
        component: RegisterComponent
    
    },
    {
        name: 'dashboard',
        url: '/dashboard/:id',
        component: DashboardComponent
    },
    {
        name: 'dashboard.add',
        url: '/add/:id',
        component: AddnoteComponent
    },
]
