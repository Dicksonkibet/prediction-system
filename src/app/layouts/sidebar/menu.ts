import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    //  {
    //      id: 1,
    //      label: 'MENU',
    //      isTitle: true
    //  }, 

    {
        id: 26,
        label: 'DASHBOARD',
        link: '/default',
        icon: 'bx-home-circle',
        
        subItems: [
 
        ]
    },
  
    {
        id: 100,
        isLayout: true
    },
    // {
    //     id: 1,
    //     label: 'SETTINGS',
    //     isTitle: true
    // },
    {
        id: 12,
        label: 'Setup',
        icon: "bx bx-cog",
                subItems: [          
            {
                id: 19,
                label: 'Students',
                link: '/ecommerce/viewstulist',
                parentId: 12
            },
          
            {
                id: 20,
                label: 'VoteHead',
                link: '/ecommerce/ViewProductslist',
                parentId: 12
            },
            {
                id: 21,
                label: 'Charges',
                link: '/ecommerce/ViewChargeslist',
                parentId: 12
            },
            {
                id: 20,
                label: 'Pay Modes',
                link: '/ecommerce/AddPaymentList',
                parentId: 12
            },
            {
                id: 21,
                label: 'Banks',
                link: '/ecommerce/Bankslist',
                parentId: 12
            },

            {
                id: 21,
                label: 'Branches',
                link: '/ecommerce/BranchList',
                parentId: 12
            },
            {
                id: 22,
                label: 'Bank Accounts',
                link: '/ecommerce/accountslist',
                parentId: 12
            },          
            
        ]
    },
    // {
    //     id: 1,
    //     label: 'MODULES',
    //     isTitle: true
    // },
        {
        id: 21,
        
        label: 'Transactions',
        icon: 'bx-bitcoin',
        subItems: [

            {
                id: 22,
                label: 'Invoice',
                link: '/tblaccounts',
                parentId: 12
            },
            {
                id: 23,
                label: 'Payments',
                link: '/Transaction1',
                parentId: 12
            },
            {
                id: 24,
                label: 'Gl Accounts',
                link: '/gllist',
                parentId: 12
            },
            {
                id: 25,
                label: 'Journals',
                link: '/JournalsList',
                parentId: 12
            }
    
        ]
    },
    {
        id: 29,
        label: 'Reports',
        icon: 'bx-envelope',
        subItems: [
            {
                id: 30,
                label: 'Account Activity',
                link: '/ActivityReport',
                parentId: 29
            },
            {
                id: 30,
                label: 'Student Statement',
                link: '/StudentStatement',
                parentId: 29
            }
   
        ]
    },
  
];

