export const categories = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/products/electronics',
        label: 'Electronics',
    },
    {
        href: '/products/sports',
        label: 'Sports',
    },
    {
        href: '/products/fashion',
        label: 'Fashion',
    },
    {
        href: '/products/home%20&%20garden',
        label: 'Home & Garden',
    },
    {
        href: '/products/cars%20&%20motorbikes',
        label: 'Cars & Motorbikes',
    },
    {
        href: '/products/other',
        label: 'Other',
    }
] 

export const sortBy = [
    { 
        label: 'lowest price', 
        query: 'price_low' 
    },
    { 
        label: 'the highest price', 
        query: 'price_high' 
    },
    { 
        label: 'newly added', 
        query: 'newly_added' 
    },
    { 
        label: 'top liked', 
        query: 'top_liked' 
    },
]

export const conditions = [
    { 
      label: 'new', 
      query: 'new',
      description: 'Brand new, in perfect condition'
    },
    { 
      label: 'used', 
      query: 'used',
      description: 'Previously owned but still in good condition'
    },
    { 
      label: 'damaged', 
      query: 'damaged',
      description: 'Shows signs of wear or damage'
    }
]

export const shipping_products = [
    {
      label: "standard delivery",
      description: "Convenient shipping to your house address"
    },
    {
      label: "local delivery",
      description: "Shipping to your house address within a 10 km radius"
    },
    {
      label: "pickup delivery",
      description: "You pick up the product yourself at our location"
    }
]
  
export const return_item = [
    {
        available: true,
        description: "Returns are accepted within 30 days for eligible products"
    },
    {
        available: false,
        description: "Returns are not available for this product"
    }
]

export const dashboard_links = [
    {
        label: "Orders",
        href: "/dashboard/orders",
    },
    {
        label: "My products",
        href: "/dashboard/my-products",
    },
]
  