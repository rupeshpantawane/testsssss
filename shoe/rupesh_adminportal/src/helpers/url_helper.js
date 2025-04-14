// LOGIN
export const POST_ADMIN_LOGIN = "/api/admin/login";


// PROFILE
export const POST_CREATE_ROLE = "/api/admin/create-role";
export const POST_UPDATE_ROLE = "/api/admin/update-role";
export const POST_FETCH_ROLE = "/api/admin/fetch-role";
export const POST_FETCH_ALL_ROLES = "/api/admin/fetch-roles";

// Employee
export const POST_CREATE_EMP = "/api/admin/create-emp";
export const POST_UPDATE_EMP = "/api/admin/update-emp";
export const POST_FETCH_EMP = "/api/admin/fetch-emp";
export const POST_FETCH_ALL_EMPS = "/api/admin/fetch-emps";
export const POST_SOLD = "/api/admin/sold";

// Two Wheeler
export const POST_FETCH_ALL_TWO_WHEELERS = "/api/admin/fetch-two-wheelers";
export const POST_CREATE_TWO_WHEELER = "/api/admin/create-two-wheeler";
export const POST_CREATE_OR_UPDATE_BTW = "/api/admin/create-or-update-btw";
export const POST_GENERATE_OTP = "/api/admin/generate-otp";
export const POST_SHOW_BID_CONTACT = "/api/admin/show-bid-contact";
export const POST_TRAVEL_FROM = "/api/admin/show-travel-from";
export const POST_ACTIVATE_OTP = "/api/admin/activate-otp";
export const POST_TRAVEL_STATUS = "/api/admin/travel-status";

// Three Wheeler
export const POST_FETCH_ALL_THREE_WHEELERS = "/api/admin/fetch-three-wheelers";
export const POST_CREATE_THREE_WHEELER = "/api/admin/create-three-wheeler";
export const POST_CREATE_OR_UPDATE_BTHREEW = "/api/admin/create-or-update-bthreew";
export const POST_GENERATE_THREE_OTP = "/api/admin/generate-three-otp";
export const POST_SHOW_BID_THREE_CONTACT = "/api/admin/show-bid-three-contact";
export const POST_THREE_TRAVEL_FROM = "/api/admin/show-three-travel-from";
export const POST_ACTIVATE_THREE_OTP = "/api/admin/activate-three-otp";
export const POST_TRAVEL_THREE_STATUS = "/api/admin/travel-three-status";

// Four Wheeler
export const POST_FETCH_ALL_FOUR_WHEELERS = "/api/admin/fetch-four-wheelers";
export const POST_CREATE_FOUR_WHEELER = "/api/admin/create-four-wheeler";
export const POST_CREATE_OR_UPDATE_BFOURW = "/api/admin/create-or-update-bfourw";
export const POST_GENERATE_FOUR_OTP = "/api/admin/generate-four-otp";
export const POST_SHOW_BID_FOUR_CONTACT = "/api/admin/show-bid-four-contact";
export const POST_FOUR_TRAVEL_FROM = "/api/admin/show-four-travel-from";
export const POST_ACTIVATE_FOUR_OTP = "/api/admin/activate-four-otp";
export const POST_TRAVEL_FOUR_STATUS = "/api/admin/travel-four-status";

// Six Wheeler
export const POST_FETCH_ALL_SIX_WHEELERS = "/api/admin/fetch-six-wheelers";
export const POST_CREATE_SIX_WHEELER = "/api/admin/create-six-wheeler";
export const POST_CREATE_OR_UPDATE_BSIXW = "/api/admin/create-or-update-bsixw";
export const POST_GENERATE_SIX_OTP = "/api/admin/generate-six-otp";
export const POST_SHOW_BID_SIX_CONTACT = "/api/admin/show-bid-six-contact";
export const POST_SIX_TRAVEL_FROM = "/api/admin/show-six-travel-from";
export const POST_ACTIVATE_SIX_OTP = "/api/admin/activate-six-otp";
export const POST_TRAVEL_SIX_STATUS = "/api/admin/travel-six-status";

// Truck
export const POST_FETCH_ALL_TRUCK_WHEELERS = "/api/admin/fetch-truck-wheelers";
export const POST_CREATE_TRUCK_WHEELER = "/api/admin/create-truck-wheeler";
export const POST_CREATE_OR_UPDATE_BTRUCKW = "/api/admin/create-or-update-btruckw";
export const POST_GENERATE_TRUCK_OTP = "/api/admin/generate-truck-otp";
export const POST_SHOW_BID_TRUCK_CONTACT = "/api/admin/show-bid-truck-contact";
export const POST_TRUCK_TRAVEL_FROM = "/api/admin/show-truck-travel-from";
export const POST_ACTIVATE_TRUCK_OTP = "/api/admin/activate-truck-otp";
export const POST_TRAVEL_TRUCK_STATUS = "/api/admin/travel-truck-status";

// Other
export const POST_FETCH_ALL_OTHER_WHEELERS = "/api/admin/fetch-other-wheelers";
export const POST_CREATE_OTHER_WHEELER = "/api/admin/create-other-wheeler";
export const POST_CREATE_OR_UPDATE_BOTHERW = "/api/admin/create-or-update-botherw";
export const POST_GENERATE_OTHER_OTP = "/api/admin/generate-other-otp";
export const POST_SHOW_BID_OTHER_CONTACT = "/api/admin/show-bid-other-contact";
export const POST_OTHER_TRAVEL_FROM = "/api/admin/show-other-travel-from";
export const POST_ACTIVATE_OTHER_OTP = "/api/admin/activate-other-otp";
export const POST_TRAVEL_OTHER_STATUS = "/api/admin/travel-other-status";


// PROFILE
export const fetchSimpleCrudsWithPeginate = "/api/admin/fetch-simple-cruds";
export const createSimpleCrud = "/api/admin/create-simple-crud";
export const fetchSimpleCrud = "/api/admin/fetch-simple-crud";
export const updateSimpleCrud = "/api/admin/update-simple-crud";


// System Setting
export const POST_FETCH_SYSTEM_SETTINGS = "/api/admin/fetch-system-setting";
export const POST_UPDATE_SYSTEM_SETTINGS = "/api/admin/update-system-setting";
export const POST_FETCH_SYSTEM_SETTINGS_COMMON = "/api/admin/fetch-system-settings";



//profile
export const POST_UPDATE_USER_LANGUAGE = "/api/admin/update-user-language";
export const POST_UPDATE_USER_PROFILE = "/api/admin/update-profile";
export const POST_UPDATE_USER_PASSWORD = "/api/admin/change-password";




//Role
export const POST_FETCH_MODULES = "/api/admin/fetch-all-modules";
export const POST_FETCH_MODULES_BY_ROLE = "/api/admin/fetchAllModulesByRole";

//Permission
export const SAVE_UPDATE_PERMISSION = "/api/admin/addUpdatePermissions";


//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//PRODUCTS
export const GET_PRODUCTS = "/products";
export const GET_PRODUCTS_DETAIL = "/product";

//Mails
export const GET_INBOX_MAILS = "/inboxmails";
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail";
export const DELETE_INBOX_MAIL = "/delete/inboxmail";

//starred mail
export const GET_STARRED_MAILS = "/starredmails";

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails";

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails";

//Send mail
export const GET_SENT_MAILS = "/sentmails";

//Trash mail
export const GET_TRASH_MAILS = "/trashmails";

//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";

//CHATS
export const GET_CHATS = "/chats";
export const GET_GROUPS = "/groups";
export const GET_CONTACTS = "/contacts";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "/add/messages";

//ORDERS
export const GET_ORDERS = "/orders";
export const ADD_NEW_ORDER = "/add/order";
export const UPDATE_ORDER = "/update/order";
export const DELETE_ORDER = "/delete/order";

//CART DATA
export const GET_CART_DATA = "/cart";
 
//CUSTOMERS
export const GET_CUSTOMERS = "/customers";
export const ADD_NEW_CUSTOMER = "/add/customer";
export const UPDATE_CUSTOMER = "/update/customer";
export const DELETE_CUSTOMER = "/delete/customer";

//SHOPS
export const GET_SHOPS = "/shops";

//CRYPTO
export const GET_WALLET = "/wallet";
export const GET_CRYPTO_ORDERS = "/crypto/orders";

//INVOICES
export const GET_INVOICES = "/invoices";
export const GET_INVOICE_DETAIL = "/invoice";

//PROJECTS
export const GET_PROJECTS = "/projects";
export const GET_PROJECT_DETAIL = "/project";
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

//TASKS
export const GET_TASKS = "/tasks";

//CONTACTS
export const GET_USERS = "/users";
export const GET_USER_PROFILE = "/user";
export const ADD_NEW_USER = "/add/user";
export const UPDATE_USER = "/update/user";
export const DELETE_USER = "/delete/user";

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data";
export const GET_YEARLY_DATA = "/yearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

export const TOP_SELLING_DATA = "/top-selling-data";

export const GET_EARNING_DATA = "/earning-charts-data";

export const GET_PRODUCT_COMMENTS = "/comments-product";

export const ON_LIKNE_COMMENT = "/comments-product-action";

export const ON_ADD_REPLY = "/comments-product-add-reply";

export const ON_ADD_COMMENT = "/comments-product-add-comment";
