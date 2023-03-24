const menu = [
  {
    text: "Dashboards",
    subMenu: [
      {
        text: "Default Dashboard",
        link: "/",
      },
      {
        text: "Sales Dashboard",
        link: "/sales",
      },
      {
        text: "Crypto Dashboard",
        link: "/crypto",
      },
      {
        text: "Analytics Dashboard",
        link: "/analytics",
      },
      {
        header: "Use-Case Concept",
      },
      {
        text: "Investment Panel",
        link: "/invest/index",
        newTab: true,
        subPanel: [
          {
            text: "Overview",
            link: "/invest/index",
          },
          {
            text: "My Plan",
            link: "/invest/schemes",
          },
          {
            text: "Invest",
            link: "/invest/invest",
          },
          {
            text: "Profile",
            link: "/invest/profile",
          },
          {
            text: "Pages",
            subMenu: [
              {
                text: "Welcome / Intro",
                link: "/invest/welcome",
              },
              {
                text: "Investment Process",
                link: "/invest/invest-form/plan-iv-1",
              },
              {
                text: "Investment Detail",
                link: "/invest/scheme-details/plan-iv-2",
              },
              {
                text: "KYC - Get Started",
                link: "/invest/kyc-application",
              },
              {
                text: "KYC - Application Form",
                link: "/invest/kyc-form",
              },
              {
                text: "Main Dashboard",
                link: "/",
                newTab: true,
                icon: "external",
              },
              {
                text: "All Components",
                link: "/components",
                icon: "external",
                newTab: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: "Applications",
    subMenu: [
      {
        text: "Messages",
        link: "/app-messages",
      },
      {
        text: "Chats / Messenger",
        link: "/app-chat",
      },
      {
        text: "Mailbox",
        link: "/app-inbox",
        badge: "new"
      },
      {
        text: "Calendar",
        link: "/app-calender",
      },
      {
        text: "Kanban",
        link: "/app-kanban",
        badge: "new"
      },
    ],
  },
  {
    text: "Pages",
    subMenu: [
      {
        text: "Projects",
        active: false,
        subMenu: [
          {
            text: "Project Cards",
            link: "/project-card",
          },
          {
            text: "Project List",
            link: "/project-list",
          },
        ],
      },
      {
        text: "User Manage",
        active: false,
        subMenu: [
          {
            text: "User List - Regular",
            link: "/user-list-regular",
          },
          {
            text: "User List - Compact",
            link: "/user-list-compact",
          },
          {
            text: "User Details - Regular",
            link: "/user-details-regular/1",
          },
          {
            text: "User Profile - Regular",
            link: "/user-profile-regular",
          },
          {
            text: "User Contact - Card",
            link: "/user-contact-card",
          },
        ],
      },
      {
        text: "AML / KYCs",
        active: false,
        subMenu: [
          {
            text: "KYC List - Regular",
            link: "/kyc-list-regular",
          },
          {
            text: "KYC Details - Regular",
            link: "/kyc-details-regular/UD01544",
          },
        ],
      },
      {
        text: "Transaction",
        active: false,
        subMenu: [
          {
            text: "Trans List - Basic",
            link: "/transaction-basic",
          },
          {
            text: "Trans List - Crypto",
            link: "/transaction-crypto",
          },
        ],
      },
      {
        text: "Products",
        active: false,
        subMenu: [
          {
            text: "Product List",
            link: "/product-list",
          },
          {
            text: "Product Card",
            link: "/product-card",
          },
          {
            text: "Product Details",
            link: "/product-details/0",
          },
        ],
      },
      {
        text: "Invoice",
        active: false,
        subMenu: [
          {
            text: "Invoice List",
            link: "/invoice-list",
          },
          {
            text: "Invoice Details",
            link: "/invoice-details/1",
          },
        ],
      },
      {
        text: "Pricing Table",
        link: "/pricing-table",
      },
      {
        text: "Image Gallery",
        link: "/image-gallery",
      },
      {
        text: "Regular Page - v1",
        link: "/pages/regular-v1",
      },
      {
        text: "Regular Page - v2",
        link: "/pages/regular-v2",
      },
      {
        text: "Faqs / Help",
        link: "/pages/faq",
      },
    ],
  },
  {
    text: "Misc",
    subMenu: [
      {
        text: "Auth Pages",
        active: false,
        subMenu: [
          {
            text: "Login / Signin",
            link: "/auth-login",
            newTab: true,
          },
          {
            text: "Register / Signup",
            link: "/auth-register",
            newTab: true,
          },
          {
            text: "Forgot Password",
            link: "/auth-reset",
            newTab: true,
          },
          {
            text: "Success / Confirm",
            link: "/auth-success",
            newTab: true,
          },
        ],
      },
      {
        text: "Error Pages",
        active: false,
        subMenu: [
          {
            text: "404 Classic",
            link: "/errors/404-classic",
            newTab: true,
          },
          {
            text: "504 Classic",
            link: "/errors/504-classic",
            newTab: true,
          },
          {
            text: "404 Modern",
            link: "/errors/404-modern",
            newTab: true,
          },
          {
            text: "504 Modern",
            link: "/errors/504-modern",
            newTab: true,
          },
        ],
      },

      {
        text: "Blank / Startup",
        link: "/_blank",
      },
      {
        text: "Terms / Policy",
        link: "/pages/terms-policy",
      },
    ],
  },
  {
    text: "Components",
    subMenu: [
      {
        text: "Ui Elements",
        active: false,
        subMenu: [
          {
            text: "Alerts",
            link: "/components/alerts",
          },
          {
            text: "Accordions",
            link: "/components/accordions",
          },
          {
            text: "Avatar",
            link: "/components/avatar",
            badge: "new",
          },
          {
            text: "Badges",
            link: "/components/badges",
          },
          {
            text: "Buttons",
            link: "/components/buttons",
          },
          {
            text: "Button Group",
            link: "/components/button-group",
          },
          {
            text: "Breadcrumbs",
            link: "/components/breadcrumbs",
          },
          {
            text: "Cards",
            link: "/components/cards",
          },
          {
            text: "Carousel",
            link: "/components/carousel",
          },
          {
            text: "Dropdowns",
            link: "/components/dropdowns",
          },
          {
            text: "Modals",
            link: "/components/modals",
          },
          {
            text: "Pagination",
            link: "/components/pagination",
          },
          {
            text: "Popovers",
            link: "/components/popovers",
          },
          {
            text: "Progress",
            link: "/components/progress",
          },
          {
            text: "Spinner",
            link: "/components/spinner",
          },
          {
            text: "Tabs",
            link: "/components/tabs",
          },
          {
            text: "Toast",
            link: "/components/toast",
          },
          {
            text: "Typography",
            link: "/components/typography",
            badge: "new",
          },
          {
            text: "Tooltips",
            link: "/components/tooltips",
          },
        ],
      },
      {
        text: "Utilities",
        active: false,
        subMenu: [
          {
            text: "Borders",
            link: "/components/util-border",
          },
          {
            text: "Colors",
            link: "/components/util-colors",
          },
          {
            text: "Display",
            link: "/components/util-display",
          },
          {
            text: "Embeded",
            link: "/components/util-embeded",
          },
          {
            text: "Flex",
            link: "/components/util-flex",
          },
          {
            text: "Text",
            link: "/components/util-text",
          },
          {
            text: "Sizing",
            link: "/components/util-sizing",
          },
          {
            text: "Spacing",
            link: "/components/util-spacing",
          },
          {
            text: "Others",
            link: "/components/util-others",
          },
        ],
      },
      {
        text: "Crafted icons",
        active: false,
        subMenu: [
          {
            text: "SVG Icon - Exclusive",
            link: "/svg-icons",
          },
          {
            text: "Nioicon - HandCrafted",
            link: "/nioicon",
          },
        ],
      },
      {
        text: "Tables",
        active: false,
        subMenu: [
          {
            text: "Basic Tables",
            link: "/table-basic",
          },
          {
            text: "Special Tables",
            link: "/table-special",
          },
          {
            text: "DataTables",
            link: "/table-datatable",
            badge: "new",
          },
        ],
      },
      {
        text: "Forms",
        active: false,
        subMenu: [
          {
            text: "Form Elements",
            link: "/components/form-elements",
          },
          {
            text: "Checkbox Radio",
            link: "/components/checkbox-radio",
          },
          {
            text: "Advanced Controls",
            link: "/components/advanced-control",
            badge: "new",
          },
          {
            text: "Input Group",
            link: "/components/input-group",
            badge: "new",
          },
          {
            text: "Form Upload",
            link: "/components/form-upload",
            badge: "new",
          },
          {
            text: "Date Time Picker",
            link: "/components/datetime-picker",
          },
          {
            text: "Number Spinner",
            link: "/components/number-spinner",
            badge: "new",
          },
          {
            text: "noUiSlider",
            link: "/components/nouislider",
            badge: "new",
          },
          {
            text: "Form Layouts",
            link: "/components/form-layouts",
          },
          {
            text: "Form Validation",
            link: "/components/form-validation",
          },
          {
            text: "Wizard Basic",
            link: "/components/wizard-basic",
            badge: "new",
          },
          {
            text: "Rich Editor",
            active: false,
            subMenu: [
              {
                text: "Quill",
                link: "/components/quill",
                badge: "new",
              },
              {
                text: "Tinymce",
                link: "/components/tinymce",
                badge: "new",
              },
            ],
          },
        ],
      },
      {
        text: "Charts",
        active: false,
        subMenu: [
          {
            text: "Chart Js",
            link: "/charts/chartjs",
          },
          {
            text: "Knobs",
            link: "/charts/knobs",
            badge: "new",
          },
        ],
      },
      {
        text: "Widgets",
        active: false,
        subMenu: [
          {
            text: "Card Widgets",
            link: "/components/widgets/cards",
            badge: "new",
          },
          {
            text: "Chart Widgets",
            link: "/components/widgets/charts",
            badge: "new",
          },
          {
            text: "Rating Widgets",
            link: "/components/widgets/rating",
            badge: "new",
          },
        ],
      },
      {
        text: "Miscellaneous",
        active: false,
        subMenu: [
          {
            text: "Slick Sliders",
            link: "/components/misc/slick-slider",
          },
          {
            text: "JsTree",
            link: "/components/misc/jsTree",
            badge: "new",
          },
          {
            text: "React Toastify",
            link: "/components/misc/toastify",
            badge: "new",
          },
          {
            text: "Sweet Alert",
            link: "/components/misc/sweet-alert",
            badge: "new",
          },
          {
            text: "React DualListBox",
            link: "/components/misc/dual-list",
            badge: "new",
          },
          {
            text: "React Beautiful Dnd",
            link: "/components/misc/beautiful-dnd",
            badge: "new",
          },
          {
            text: "Google Map",
            link: "/components/misc/map",
            badge: "new",
          },
        ],
      },
      {
        text: "Email Template",
        link: "/email-template",
        active: "false",
      },
    ],
  },
];
export default menu;
