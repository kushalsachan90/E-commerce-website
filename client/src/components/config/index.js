

export const registerFormControls=[
    {
        name:"userName",
        label:"UserName",
        placeholder:"Enter your user name",
        componentType:'input',
        type:'text',
        
    },
      {
        name:"email",
        label:"Email",
        placeholder:"Enter your email",
        componentType:'input',
        type:'text'
        
    },
    {
        name:"password",
        label:"Password",
        placeholder:"Enter your password",
        componentType:'input',
        type:'password'
    }
]

export const LoginFormControls=[
   
      {
        name:"email",
        label:"Email",
        placeholder:"Enter your email",
        componentType:'input',
        type:'text'
        
    },
    {
        name:"password",
        label:"Password",
        placeholder:"Enter your password",
        componentType:'input',
        type:'password'
    }
]


export const addProductFormElements=[
    {
        label:"Title",
        name:'title',
        componentType:'input',
        type:'text',
        placeholder:'Enter product title'
    },
    {
        label:'Description',
        name:'description',
        componentType:'textarea',
        placeholder:'Enter product Description'
    },
    {
        label:'Category',
        name:"category",
        componentType:'select',
        options:[
            {id:"men",label:"Men"},
            {id:"women",label:"women"},
            {id:"kids",label:"kids"},
            {id:"accessories",label:"Accessories"},
            {id:"footwear",label:"Footwear"}
        ]
    },
    {
        label:"Brand",
        name:"brand",
        componentType:"select",
        options:[
            {id:"nike",label:"Nike"},
            {id:"adidas",label:"Adidas"},
            {id:"puma",label:"Puma"},
            {id:"levi",label:"Levi's"},
            {id:"zara",label:"Zara"}
        ]
    },
    {
        label:"Price",
        name:"price",
        componentType:"input",
        type:"number",
        placeholder:"Enter product price",
    },
    {
        label:"SalePrice",
        name:"salePrice",
        componentType:"input",
        type:"number",
        placeholder:"Enter Sale Price"
    },
      {
        label:"TotalStock",
        name:"totalStock",
        componentType:"input",
        type:"number",
        placeholder:"Enter TotalStock"
    }

]

export const shoppingViewHeaderMenuItems=[
    {
        id:'home',
        label:'Home',
        path:'/shop/home'
    },
     {
        id:'men',
        label:'Men',
        path:'/shop/listing'
    },
    {
        id:'women',
        label:'Women',
        path:'/shop/listing'
    },
    {
        id:'kids',
        label:'Kids',
        path:'/shop/listing'
    },
    {
        id:'accessories',
        label:'Accessories',
        path:'/shop/listing'
    },
    {
        id:'footwear',
        label:'Footwear',
        path:'/shop/listing'
    }
]
    

export const sortOptions=[
    {id:"price-low-to-high",label:"Price:Low to High"},
    {id:"price-high-to-low",label:"Price:High to Low"},
    {id:"title-a-to-z",label:"Title:Z to A"},
    {id:"title-a-to-a",label:"Title:Z to A"}
]




export const categoryOptionsMap={
    'men':'Men',
    'women':'Women',
    'kids':'Kids',
    'accessories':'Accessories',
    'footwear':'Footwear'
}
export const brandOptionsMap={
   'nike':'Nike',
   'adidas':'Adidas',
   'puma':'Puma',
   'zara':'Zara',
   'h&m':'H&M',
       
}

export const filterOptions={
    category:[
        {id:"men",label:"Men"},
        {id:"women",label:"Women"},
        {id:"kids",label:"Kids"},
        {id:"accessories",label:"Accessories"},
        {id:"footwear",label:"Footwear"}
    ],
    brand:[
        {id:"nike",label:"Nike"},
        {id:"adidas",label:"Adidas"},
        {id:"puma",label:"Levi's"},
        {id:"zara",label:"zara"},
        {id:"h&m",label:"H&M"}
    ]

    
}

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];