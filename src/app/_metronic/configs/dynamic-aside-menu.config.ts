export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      icon: 'flaticon-home',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/dashboard',
      bullet: 'dot',
      show: true,

    },
    {
      title: 'Setup',
      root: true,
      icon: 'flaticon-list-1',
      svg: './assets/media/svg/icons/Design/Adjust.svg',
      page: '/category',
      bullet: 'dot',
      show: true,
      submenu_show:true,
      submenu:[
        {
          title: 'Category',   
          page: '/category/category',
          show:true
        },
        {
          title: 'Brand',   
          page: '/category/brand',
          show:true
        },
        {
          title: 'Sub-Brand',
          page: '/category/sub-brand',
          show:true
        },
        {
          title: 'Supplier',
          page: '/category/supplier',
          show:true
        },
      ]
    },
   
    {
      title: 'Purchase',
      root: true,
      icon: 'flaticon2-shopping-cart-1',
      svg: './assets/media/svg/icons/Shopping/Wallet.svg',
      page: '/purchase-list',
      bullet: 'dot',
      show: true,

    },
    {
      title: 'Sales',
      root: true,
      icon: 'flaticon-cart',
      svg: './assets/media/svg/icons/Shopping/Sale1.svg',
      page: '/sales',
      bullet: 'dot',
      show: true,

    },
    
  ]
};
