import { Injectable } from '@angular/core';
import { User } from 'src/app/user';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    target?: boolean;
    name: string;
    type?: string;
    children?: ChildrenItems[];
}

export interface MainMenuItems {
    state: string;
    short_label?: string;
    main_state?: string;
    target?: boolean;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

export interface Menu {
    label: string;
    main: MainMenuItems[];
}

const OWNERMENU = [
    {
        state: 'dashboard',
        short_label: 'S',
        name: 'Inicio',
        type: 'link',
        icon: 'fa fa-tachometer'
    },

    /////////////////////////////////

    {
        state: 'companies',
        short_label: 'S',
        name: 'Empresas',
        type: 'link',
        icon: 'fa fa-building-o'
    },

    {
        state: 'users',
        short_label: 'S',
        name: 'Usuarios',
        type: 'link',
        icon: 'feather icon-user'
    },
    {
        state: 'config',
        short_label: 'S',
        name: 'Ajustes',
        type: 'link',
        icon: 'feather icon-settings'
    },
    {
        state: 'reports',
        short_label: 'S',
        name: 'Informes',
        type: 'link',
        icon: 'feather icon-files'
    },
    

    ///////////////////////////
   /*
    {
        state: 'denouncement',
        short_label: 'S',
        name: 'Denuncias',
        type: 'link',
        icon: 'feather icon-file',
        
    },
    */
    ////////////////////////////////
    /*
    {
        state: 'simple-page',
        short_label: 'S',
        name: 'Sample Page',
        type: 'link',
        icon: 'feather icon-file'
    },
    {
        state: 'coming-soon',
        short_label: 'CS',
        name: 'Coming Soon',
        type: 'link',
        icon: 'feather icon-watch',
        target: true
    }
    */
]

const COMPANYMENU = [
    {
        state: 'company-dashboard',
        short_label: 'S',
        name: 'Inicio',
        type: 'link',
        icon: 'fa fa-tachometer',
        level: [User.ROL_ADMIN, User.ROL_ADMIN_PERISHABLE, User.ROL_AUDITOR, User.ROL_INVESTIGATOR]
    },
    {
        state: 'company-details',
        short_label: 'S',
        name: 'Información Básica',
        type: 'link',
        icon: 'feather icon-pencil',
        level: [User.ROL_ADMIN, User.ROL_ADMIN_PERISHABLE, User.ROL_AUDITOR]
    },
    {
        state: 'company-settings',
        short_label: 'S',
        name: 'Configuración',
        type: 'link',
        icon: 'feather icon-settings',
        level: [User.ROL_ADMIN, User.ROL_ADMIN_PERISHABLE, User.ROL_AUDITOR]
    },
    {
        state: 'company-users',
        short_label: 'S',
        name: 'Usuarios',
        type: 'link',
        icon: 'feather icon-user',
        level: [User.ROL_ADMIN, User.ROL_ADMIN_PERISHABLE, User.ROL_AUDITOR]
    },
    {
        state: 'company-denouncement',
        short_label: 'S',
        name: 'Denuncias',
        type: 'link',
        icon: 'feather icon-comments',
        other_state: '/denouncement',
        level: [User.ROL_ADMIN, User.ROL_ADMIN_PERISHABLE, User.ROL_AUDITOR, User.ROL_INVESTIGATOR]
    },
    {
        state: 'company-reports',
        short_label: 'S',
        name: 'Reportes',
        type: 'link',
        icon: 'fa fa-filter',
        level: [User.ROL_ADMIN, User.ROL_ADMIN_PERISHABLE, User.ROL_AUDITOR]
    },
]


@Injectable()
export class MenuItems {
    getAll(): Menu[] {
        
        const rol = JSON.parse( localStorage.getItem("user") ).rol
        let mainMenu = []
        
        console.log("rolñ", rol)


        if (rol == -1) {
            mainMenu = OWNERMENU
        } else {
            mainMenu = COMPANYMENU.filter( m => m.level.some(i => i == rol) )
        }

        return [
            {
                label: 'Menu',
                main: mainMenu
            }
        ];
    }
}
