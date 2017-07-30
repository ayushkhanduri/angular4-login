import {RegisterComponent} from './Components/register/register.component';
import {LoginComponent} from './Components/login/login.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import {AddnoteComponent} from './Components/addnote/addnote.component';
import {AuthGuardGuard} from './auth-guard.guard';
export const allRoutes =[
    {
        path: '',
        component: LoginComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: 'dashboard/:id',
        canActivate: [AuthGuardGuard],
        component: DashboardComponent,
        children: [
            {
                path:'addnote/:id',
                component: AddnoteComponent
            }
        ]
    },
    // {
    //     name: 'dashboard.add',
    //     url: '/add/:id',
    //     component: AddnoteComponent
    // },
]
