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
      title: 'Category',
      root: true,
      icon: 'flaticon-list-1',
      svg: './assets/media/svg/icons/Design/Adjust.svg',
      page: '/category',
      bullet: 'dot',
      show: true,
      submenu_show:true,
      submenu:[
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
      ]
    },
   
    {
      title: 'Sales',
      root: true,
      icon: 'flaticon-cart',
      svg: './assets/media/svg/icons/Design/Bucket.svg',
      page: '/sales',
      bullet: 'dot',
      show: true,

    },
    
  ]
};
