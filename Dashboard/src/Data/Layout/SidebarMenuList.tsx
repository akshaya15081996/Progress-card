import { SidebarMenuItem } from "../../Types/Layout.type";

export const menuList: SidebarMenuItem[] = [
    {
        title: "General",
        lanClass: "lan-1",
        items: [
            
            {
                title: "Category",
                id: 2,
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/category/viewcategory`, title: "ViewCategory", type: "link" },
                     // { path: `${process.env.PUBLIC_URL}/category/editcategory`, title: "EditCategory", type: "link" },

                    //  { path: `${process.env.PUBLIC_URL}/category/addcategory`, title: "AddCategory", type: "link" },
                ],
            },
            {
                title: "SubCategory",
                id: 2,
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/subcategory/subcategoryview`, title: "View Subcategory", type: "link" },
                    
                ],
            },
            {
                title: "Questions",
                id: 2,
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/questions/viewquestions`, title: "View Questions", type: "link" },
                ],
            }
        ],
    },
    {
        title: "General Settings",
        lanClass: "lan-1",
        items: [
            
            {
                title: "SMS Settings",
                id: 2,
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/sms/viewsms`, title: "View Sms", type: "link" },

                     
                ],
            },

        ],
    },
    {
        title: "Users",
        lanClass: "lan-1",
        items: [
            
            {
                title: "Student",
                id: 2,      
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/student/viewstudent`, title: "View Student", type: "link" },
                    // { path: `${process.env.PUBLIC_URL}/student/addstudent`, title: "Add Student", type: "link" },


                     
                ],
            },

            {
                title: "School",
                id: 2,
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/school/viewschool`, title: "View School", type: "link" },

                     
                ],
            },



            
            // {
            //     title: "SubCategory",
            //     id: 2,
            //     icon: "Pie",
            //     type: "sub",
            //     lanClass: "lan-2",
            //     active: false,
            //     children: [
            //         { path: `${process.env.PUBLIC_URL}/subcategory/subcategoryview`, title: "View Subcategory", type: "link" },
            //         // { path: `${process.env.PUBLIC_URL}/subcategory/addsubcategory`, title: "Add Subcategory", type: "link" },
            //         // { path: `${process.env.PUBLIC_URL}/subcategory/editsubcategory`, title: "Edit Subcategory", type: "link" },
            //     ],
            // },
            // {
            //     title: "Questions",
            //     id: 2,
            //     icon: "Pie",
            //     type: "sub",
            //     lanClass: "lan-2",
            //     active: false,
            //     children: [
            //         { path: `${process.env.PUBLIC_URL}/questions/viewquestions`, title: "View Questions", type: "link" },
            //         // { path: `${process.env.PUBLIC_URL}/questions/addquestions`, title: "AddQuestions", type: "link" },
            //     ],
            // }
        ],
    },
    {
        title: "Roles and Permission",
        lanClass: "lan-1",
        items: [
            
            {
                title: "Roles",
                id: 2,      
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/roles/viewroles`, title: "View Roles", type: "link" },  
                    // { path: `${process.env.PUBLIC_URL}/roles/addroles`, title: "Add Roles", type: "link" },
                    // { path: `${process.env.PUBLIC_URL}/role/editrole`, title: "Edit Roles", type: "link" },  


                ],
            },

            {
                title: "Permission",
                id: 2,
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/permission/viewpermission`, title: "View Permission", type: "link" },  
                    // { path: `${process.env.PUBLIC_URL}/permission/addpermission`, title: "Add Permission", type: "link" },  


                ],
            },

            {
                title: "Roles and Permission",
                id: 2,
                icon: "Pie",
                type: "sub",
                lanClass: "lan-2",
                active: false,
                children: [
                    { path: `${process.env.PUBLIC_URL}/rolesandpermission/viewrolesandpermission`, title: "View Roles & Permission", type: "link" },
                    // { path: `${process.env.PUBLIC_URL}/rolesandpermission/addrolesandpermission`, title: "Add Roles & Permission", type: "link" },

                ],
            },
        ],
    },

    // {
    //     title: "Application",
    //     items: [
    //         {
    //             title: "Project",
    //             id: 3,
    //             icon: "Info-circle",
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/project/project_list`, type: "link", title: "Project list" },
    //                 { path: `${process.env.PUBLIC_URL}/project/create_new`, type: "link", title: "Project create" },
    //             ],
    //         },
    //         { path: `${process.env.PUBLIC_URL}/app/file_manager`, icon: "Paper", title: "File Manager", type: "link" },
    //         {
    //             title: "Ecommerce",
    //             id: 6,
    //             icon: "Bag",
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/add_product`, title: "Add Products", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/product`, title: "Product", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/product_page`, title: "Product Page", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/category_page`, title: "Category Page", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/product_list`, title: "Product List", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/payment_details`, title: "Payment Details", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/order_history`, title: "Order History", type: "link" },
    //                 {
    //                     title: "Invoices",
    //                     type: "sub",
    //                     children: [
    //                         { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice1`, title: "Invoice 1", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice2`, title: "Invoice 2", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice3`, title: "Invoice 3", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice4`, title: "Invoice 4", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice5`, title: "Invoice 5", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice6`, title: "Invoice 6", type: "link" },
    //                     ],
    //                 },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/cart`, title: "Cart", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/wishlist`, title: "Wishlist", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/checkout`, title: "Checkout", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ecommerce/pricing`, title: "Pricing", type: "link" },
    //             ],
    //         },
    //         { path: `${process.env.PUBLIC_URL}/email/letter_box`, icon: "Message", title: "Letter Box", type: "link", id: 7 },
    //         {
    //             title: "Chat",
    //             id: 8,
    //             icon: "Chat",
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/chat/private_chat`, type: "link", title: "Private Chat" },
    //                 { path: `${process.env.PUBLIC_URL}/chat/group_chat`, type: "link", title: "Group Chat" },
    //             ],
    //         },
    //         {
    //             title: "Users",
    //             icon: "Profile",
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/users/user_profile`, type: "link", title: "User Profile" },
    //                 { path: `${process.env.PUBLIC_URL}/users/user_edit`, type: "link", title: "User Edit" },
    //                 { path: `${process.env.PUBLIC_URL}/users/cards`, type: "link", title: "User Cards" },
    //             ],
    //         },
    //         { path: `${process.env.PUBLIC_URL}/app/bookmark`, icon: "Bookmark", type: "link", title: "Bookmarks", id: 10, bookmark: true, },
    //         { path: `${process.env.PUBLIC_URL}/app/contacts`, title: "Contacts", icon: "Contacts", type: "link", id: 11, active: false },
    //         { path: `${process.env.PUBLIC_URL}/app/task`, icon: "Tick-square", type: "link", title: "Tasks", id: 12 },
    //         { path: `${process.env.PUBLIC_URL}/app/calendar`, icon: "Calendar", type: "link", title: "Calendar", id: 13 },
    //         { path: `${process.env.PUBLIC_URL}/app/social_app`, icon: "Camera", type: "link", title: "Social App", id: 14, bookmark: true, },
    //         { path: `${process.env.PUBLIC_URL}/app/todo`, icon: "Edit", type: "link", title: "To-Do", id: 15, bookmark: true, },
    //         { path: `${process.env.PUBLIC_URL}/app/search_result`, icon: "Search-sidebar", type: "link", title: "Search Result", id: 16 },
    //     ],
    // },
    // {
    //     title: "Components",
    //     items: [
    //         { path: `${process.env.PUBLIC_URL}/buttons`, icon: "More-box", title: "Buttons", type: "link", id: 17 },
    //         {
    //             title: "Ui Kits",
    //             icon: "Folder",
    //             id: 18,
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/typography`, title: "Typography", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/avatars`, title: "Avatars", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/alert`, title: "Alert", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/helperclass`, title: "Helper Classes", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/grid`, title: "Grid", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/accordion`, title: "Accordion", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/tagpills`, title: "Tag & Pills", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/modal`, title: "Modal", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/popover`, title: "Popover", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/progress`, title: "Progress Bar", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/tabs`, title: "Tab Bootstrap", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/tooltip`, title: "Tooltip", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/dropdown`, title: "Dropdown", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/ui_kits/list`, title: "List", type: "link" },
    //             ],
    //         },
    //         {
    //             title: "Bonus Ui",
    //             icon: "Ticket-star",
    //             id: 19,
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/scrollable`, title: "Scrollable", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/tree_view`, title: "Tree View", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/toasts`, title: "Toasts", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/rating`, title: "Rating", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/dropzone`, title: "Dropzone", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/tour`, title: "Tour ", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/sweet_alert2`, title: "SweetAlert2", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/slider`, title: "Slider", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/ribbons`, title: "Ribbons", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/pagination`, title: "Pagination", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/breadcrumb`, title: "Breadcrumb", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/range_slider`, title: "Range Slider", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/image_cropper`, title: "Image Cropper", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/basic_cards`, title: "Basic Card", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/creative_cards`, title: "Creative Card", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/bonus_ui/timeline`, title: "Timeline", type: "link" },
    //             ],
    //         },
    //         {
    //             title: "Icons",
    //             icon: "Activity",
    //             id: 20,
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/icons/fontawesome_icon`, title: "Fontawesome Icon", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/icons/feather_icon`, title: "Feather Icon", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/icons/iconly_icon`, title: "Iconly Icon", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/icons/themify_icon`, title: "Themify Icon", type: "link" },
    //             ],
    //         },
    //         {
    //             title: "Charts",
    //             icon: "Chart",
    //             type: "sub",
    //             id: 21,
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/charts/apex_chart`, type: "link", title: "Apex Chart" },
    //                 { path: `${process.env.PUBLIC_URL}/charts/google_chart`, type: "link", title: "Google Chart" },
    //                 { path: `${process.env.PUBLIC_URL}/charts/chartjs_chart`, type: "link", title: "Chartjs Chart" },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     title: "Tables & Forms",
    //     items: [
    //         {
    //             title: "Forms",
    //             id: 22,
    //             icon: "Filter",
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 {
    //                     title: "Form Controls",
    //                     type: "sub",
    //                     children: [
    //                         { title: "Base Inputs", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/base_input` },
    //                         { title: "Form Validation", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/form_validation` },
    //                         { title: "Checkbox & Radio", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/radio_checkbox` },
    //                         { title: "Input Groups", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/input_groups` },
    //                         { title: "Input Mask", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/input_mask` },
    //                         { title: "Mega Option", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/mega_option` },
    //                     ],
    //                 },
    //                 {
    //                     title: "Form Widget",
    //                     type: "sub",
    //                     children: [
    //                         { title: "Datepicker", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/datepicker` },
    //                         { title: "Touchspin", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/touchspin` },
    //                         { title: "Switch", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/switch` },
    //                         { title: "Typeahead", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/typeahead` },
    //                         { title: "Clipboard", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/clipboard` },
    //                     ],
    //                 },
    //                 {
    //                     title: "Form Layout",
    //                     type: "sub",
    //                     children: [
    //                         { path: `${process.env.PUBLIC_URL}/forms/forms_layout/form_wizard_1`, title: "Form Wizard 1", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/forms/forms_layout/form_wizard_2`, title: "Form Wizard 2", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/forms/forms_layout/two_factor`, title: "Two factor", type: "link" },
    //                     ],
    //                 },
    //             ],
    //         },

    //         {
    //             title: "Tables",
    //             icon: "Edit-line",
    //             id: 23,
    //             type: "sub",
    //             children: [
    //                 {
    //                     title: "Reactsrap Tables",
    //                     type: "sub",
    //                     children: [
    //                         {
    //                             title: "Basic Tables",
    //                             type: "link",
    //                             path: `${process.env.PUBLIC_URL}/table/reactstrap_table/basic_table`,

    //                         },
    //                         {
    //                             title: "Table Components",
    //                             type: "link",
    //                             path: `${process.env.PUBLIC_URL}/table/reactstrap_table/table_component`,
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     title: "Data Tables",
    //                     type: "sub",
    //                     children: [
    //                         { path: `${process.env.PUBLIC_URL}/table/data_table/basic_init`, title: "Basic Init", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/table/data_table/advance_init`, title: "Advance Init", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/table/data_table/api`, title: "API", type: "link" },
    //                         { path: `${process.env.PUBLIC_URL}/table/data_table/data_sources`, title: "Data Source", type: "link" },
    //                     ],
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     title: "Pages",
    //     items: [
    //         {
    //             icon: "Paper-plus",
    //             id: 24,
    //             active: false,
    //             path: `${process.env.PUBLIC_URL}/pages/sample_page`,
    //             title: "Sample Page",
    //             type: "link",
    //         },
    //         {
    //             title: "Others",
    //             icon: "Password",
    //             id: 25,
    //             type: "sub",
    //             children: [
    //                 {
    //                     title: "Error Pages",
    //                     type: "sub",
    //                     children: [
    //                         { title: "Error page 1", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_400` },
    //                         { title: "Error page 2", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_401` },
    //                         { title: "Error page 3", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_403` },
    //                         { title: "Error page 4", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_404` },
    //                         { title: "Error page 5", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_500` },
    //                         { title: "Error page 6", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_503` },
    //                     ],
    //                 },
    //                 {
    //                     title: "Authentication",
    //                     type: "sub",
    //                     children: [
    //                         { title: "Login Simple", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_simple` },
    //                         { title: "Login with bg image", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_bg_image` },
    //                         { title: "Login with image two", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_with_image_two` },
    //                         { title: "Login with validation", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_validation` },
    //                         { title: "Login with tooltip", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_tooltip` },
    //                         { title: "Login with sweetalert", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_sweetalert` },
    //                         { title: "Register Simple", type: "link", path: `${process.env.PUBLIC_URL}/authentication/register_simple` },
    //                         { title: "Register with Bg Image", type: "link", path: `${process.env.PUBLIC_URL}/authentication/register_bg_image` },
    //                         { title: "Register with Bg Two", type: "link", path: `${process.env.PUBLIC_URL}/authentication/register_with_image_two` },
    //                         { title: "Register Wizard", type: "link", path: `${process.env.PUBLIC_URL}/authentication/register_wizard` },
    //                         { title: "Unlock User", type: "link", path: `${process.env.PUBLIC_URL}/authentication/unlock_user` },
    //                         { title: "Forget Password", type: "link", path: `${process.env.PUBLIC_URL}/authentication/forget_password` },
    //                         { title: "Reset Password", type: "link", path: `${process.env.PUBLIC_URL}/authentication/reset_password` },
    //                         { title: "Maintenance", type: "link", path: `${process.env.PUBLIC_URL}/authentication/maintenance` },
    //                     ],
    //                 },
    //                 {
    //                     title: "Coming Soon",
    //                     type: "sub",
    //                     children: [
    //                         { title: "Coming Simple", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/coming_soon_simple` },
    //                         { title: "Coming with Bg Video", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/coming_bg_video` },
    //                         { title: "Coming with bg Image", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/coming_bg_img` },
    //                     ],
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     title: "Miscellaneous",
    //     items: [
    //         {
    //             title: "Gallery",
    //             icon: "Gallery",
    //             id: 26,
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/gallery/gallery_grids`, title: "Gallery Grid", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/gallery/gallery_grid_desc`, title: "Gallery Grid Desc", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/gallery/masonry_gallery`, title: "Masonry Gallery", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/gallery/masonry_with_desc`, title: "Masonry With Desc", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/gallery/hover_effect`, title: "Hover Effects", type: "link" },
    //             ],
    //         },
    //         {
    //             title: "Blog",
    //             icon: "Game",
    //             id: 27,
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/blog/blog_details`, title: "Blog Details", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/blog/blog_single`, title: "Blog Single", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/blog/add_post`, title: "Add Post", type: "link" },
    //             ],
    //         },
    //         { path: `${process.env.PUBLIC_URL}/faq/faq`, icon: "Danger", type: "link", active: false, title: "FAQ" },
    //         {
    //             title: "Job Search",
    //             icon: "Filter-2",
    //             id: 28,
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/job_search/card_view`, title: "Card View", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/job_search/list_view`, title: "List View", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/job_search/job_detail`, title: "Job Details", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/job_search/apply`, title: "Apply", type: "link" },
    //             ],
    //         },
    //         {
    //             title: "Learning",
    //             icon: "Work",
    //             id: 29,
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/learning/learning_list`, title: "Learning List", type: "link" },
    //                 { path: `${process.env.PUBLIC_URL}/learning/learning_course`, title: "Learning Detailed", type: "link" },
    //             ],
    //         },
    //         {
    //             title: "Map",
    //             icon: "Discovery",
    //             type: "sub",
    //             id: 30,
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/map/google_map`, type: "link", title: "Google Map" },
    //                 { path: `${process.env.PUBLIC_URL}/map/leaflet_map`, type: "link", title: "Leaflet Map" },
    //             ],
    //         },
    //         {
    //             title: "Editors",
    //             id: 31,
    //             icon: "Shield",
    //             type: "sub",
    //             active: false,
    //             children: [
    //                 { path: `${process.env.PUBLIC_URL}/editor/quill_editor`, type: "link", title: "Quill editor" },
    //                 { path: `${process.env.PUBLIC_URL}/editor/ace_editor`, type: "link", title: "ACE Code Editor" },
    //             ],
    //         },
    //         { id: 32, path: `${process.env.PUBLIC_URL}/knowledgebase/knowledgebase`, icon: "Setting", type: "link", active: false, title: "Knowledgebase" },
    //         { id: 33, path: `${process.env.PUBLIC_URL}/support_ticket/support_ticket`, icon: "Ticket", type: "link", active: false, title: "Support Ticket" },
    //     ],
    // },
];