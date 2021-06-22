export const ACTIONS = {
    ADD_COUNTERS: 'ADD_COUNTERS' 
}

export const addStepCounter = stepVal => ({ type: ACTIONS.ADD_COUNTERS, payload: stepVal });

import React from 'react';
import i18n from './i18n'

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const TranslateList = React.lazy(() => import('./views/translatesList/TranslateList'))
const WorkingTextList = React.lazy(() => import('./views/tasks/texts/textList'))
const SeparatedTextList = React.lazy(() => import('./views/tasks/texts/separatedTextList'))
const WorkingImageList = React.lazy(() => import('./views/tasks/images/imageList'))
const WorkingEditingImageList = React.lazy( () => import('./views/tasks/images/editImageList'))
const WorkingVideoList = React.lazy(() => import('./views/tasks/videos/videoList'))
const workingVideoEditingList = React.lazy( () => import('./views/tasks/videos/eidtVideoList'))
const TextItem = React.lazy(() => import('./views/tasks/texts/textItem'))
const ImageItemEdit = React.lazy(() => import('./views/tasks/images/imageItemEdit'))
const ImageItemTranslate = React.lazy(() => import('./views/tasks/images/imageItemTranslate'))
const VideoItem = React.lazy(() => import('./views/tasks/videos/VideoItem'))
const VideoItemEdit = React.lazy(() => import('./views/tasks/videos/editVideoItem'))
const Profile = React.lazy(() => import('./views/profile/profile/Profile'))
const ChangePass = React.lazy(() => import('./views/profile/changePassword/ChangePass'))
const EmailChange = React.lazy(() => import('./views/profile/changeEmail/ChangeEmail'))
const TranslateTextList = React.lazy(() => import('./views/translatesList/texts/TextList'))
const TableTranslateTextList = React.lazy(() => import('./views/translatesList/texts/TextTableList/TextTableList'))
const TranslateImageList = React.lazy(() => import('./views/translatesList/images/ImageList'))
const TableTranslateImageList = React.lazy(() => import('./views/translatesList/images/imageTableList/ImageTableList'))
const TranslateVideosList = React.lazy(() => import('./views/translatesList/videos/VideosList'))
const TableTranslateVideoList = React.lazy(() => import('./views/translatesList/videos/videoTableList/videoTableList'))
const BankAccount = React.lazy(() => import('./views/profile/bankAccount/BankAccount'))


//provider
const ProvidersList = React.lazy(() => import('./views/providers/Providers'))
const AddProvider = React.lazy(() => import('./views/providers/addProvider'))
const EditProvider = React.lazy(() => import('./views/providers/EditProvider'))
const ProvideTranslation = React.lazy(() => import('./views/provideTranslation/ProvideTranslation')) 
const ProvidersTranslationList = React.lazy(() => import('./views/provideTranslation/ProvidersTranslationList')) 
const TranslationDetails =  React.lazy(() => import('./views/provideTranslation/TranslationDetails'))

//verifier 
const VideoVerifyList = React.lazy(() => import('./views/verifier/edit/video/VideoList'))
const ImageVerifyList = React.lazy(() => import('./views/verifier/edit/image/ImageList'))
const TImageVerifyList = React.lazy(() => import('./views/verifier/translate/image/ImageList'))
const TVideoVerifyList = React.lazy(() => import('./views/verifier/translate/video/VideoList'))
const TTextVerifyList = React.lazy(() => import('./views/verifier/translate/text/TextList'))
const VerifyHistory = React.lazy(() => import('./views/verifier/history/VerifyHistory'))
const VerifyItem = React.lazy(() => import('./views/verifier/history/verifyItem'))

//admin 
const UsersList = React.lazy(() => import('./views/admin/users/usersList'))
const UsersDetails = React.lazy(() => import('./views/admin/users/UserItem'))
const AddUser = React.lazy(() => import('./views/admin/users/AddUser'))
const AddRole = React.lazy(() => import('./views/admin/users/addRoles'))

//userProvider
const UserProviderAddTranslation = React.lazy(() => import('./views/userProvider/AddTranslation'))
const UserProviderTranslationList = React.lazy(() => import('./views/userProvider/TranslationList'))

//         "ROLE_SUPER_ADMIN",
//         "ROLE_TRANSLATOR",
//         "ROLE_EDITOR",
//         "ROLE_VERIFIER"

// dashboards 

const TrasnlatorDashboard = React.lazy(() => import('./views/dashboard/TranslatorDashboard'))

const routes = [
  { path: '/', exact: true, name: 'خانه' ,access:['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER', 'ROLE_PROVIDER']},
  // { path: '/dashboard', name: 'داشبورد', component: Dashboard , access:['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER', 'ROLE_PROVIDER']},
  { path: '/translator/dashboard', name: 'داشبورد مترجم', component: TrasnlatorDashboard, access:['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR']},
  // { path: '/theme', name: 'Theme', component: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  // { path: '/base', name: 'Base', component: Cards, exact: true },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/forms', name: 'Forms', component: BasicForms },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/brands', name: 'Brands', component: Brands },
  // { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/tasklist/', exact: true, name: "ترجمه های من", access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/tasklist/translates/texts', exact: true, name: "ترجمه متن", component: SeparatedTextList, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER']}, //changed from workingtextList to SeparatedTextList
  { path: '/tasklist/translates/images', exact: true, name: "ترجمه عکس", component: WorkingImageList, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/tasklist/translates/videos', exact: true, name: "ترجمه ویدیو", component: WorkingVideoList, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/tasklist/translates/texts/:id', exact: true, name: "جزئیات متن", component: TextItem, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/tasklist/translates/images/:id', exact: true, name: "جزئیات عکس", component: ImageItemEdit, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']}, // ImageItemTranslate => ImageItemEdit
  { path: '/tasklist/translates/videos/:id', exact: true, name: "جزئیات ویدیو", component: VideoItemEdit, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']}, // VideoItem => VideoItemEdit 

  { path: '/tasklist/edits/images/', exact: true, name: "ویرایش عکس", component: WorkingEditingImageList, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/tasklist/edits/images/:id', exact: true, name: "جزئیات عکس", component: ImageItemEdit, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/tasklist/edits/videos/', exact: true, name: "ویرایش ویدیو", component: workingVideoEditingList, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/tasklist/edits/Videos/:id', exact: true, name: "جزئیات ویدیو", component: VideoItemEdit, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']},

  { path: '/profile', exact: true, name: "پروفایل", component: Profile, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER', 'ROLE_PROVIDER']},
  { path: '/profile/changepassword', exact: true, name: "تغییر رمز عبور", component: ChangePass, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER', 'ROLE_PROVIDER']},
  { path: '/profile/emailchange', exact: true, name: "تغییر ایمیل", component: EmailChange, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER', 'ROLE_PROVIDER']},

  { path: '/translates/', exact: true, name: "لیست ترجمه ها", access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  // { path: '/translates/texts', exact: true, name: "Texts", component: TranslateTextList, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/translates/texts', exact: true, name: "متن ها", component: TableTranslateTextList, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  
  // { path: '/translates/images', exact: true, name: "Images", component: TranslateImageList, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/translates/images', exact: true, name: "عکس ها", component: TableTranslateImageList, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']},

  // { path: '/translates/videos', exact: true, name: "Videos", component: TranslateVideosList, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER']},
  { path: '/translates/videos', exact: true, name: "ویدیو ها", component: TableTranslateVideoList, access: ['ROLE_SUPER_ADMIN', 'ROLE_EDITOR', 'ROLE_VERIFIER']},

  //verifier 
  { path: '/verify/', exact: true, name: "تایید ترجمه", access: ['ROLE_SUPER_ADMIN', 'ROLE_VERIFIER']},
  { path: '/verify/edits/videos', exact: true, name: "ویدیو ها", component: VideoVerifyList, access: ['ROLE_SUPER_ADMIN', 'ROLE_VERIFIER']},
  { path: '/verify/edits/images', exact: true, name: "عکس ها", component: ImageVerifyList, access: ['ROLE_SUPER_ADMIN',  'ROLE_VERIFIER']},
  { path: '/verify/translate/images', exact: true, name: "عکس ها", component: ImageVerifyList, access: ['ROLE_SUPER_ADMIN', 'ROLE_VERIFIER']}, // TImageVerifyList => 
  { path: '/verify/translate/videos', exact: true, name: "ویدیو ها", component: VideoVerifyList, access: ['ROLE_SUPER_ADMIN', 'ROLE_VERIFIER']}, //TVideoVerifyList => VideoVerifyList
  { path: '/verify/translate/texts', exact: true, name: "متن ها", component: TTextVerifyList, access: ['ROLE_SUPER_ADMIN', 'ROLE_VERIFIER']},
  { path: '/verify/history', exact: true, name: "تاریخچه ترجمه", component: VerifyHistory, access: ['ROLE_SUPER_ADMIN', 'ROLE_VERIFIER']},
  { path: '/verify/history/texts/:id', exact: true, name: "جزئیات متن", component: VerifyItem, access: ['ROLE_SUPER_ADMIN', 'ROLE_VERIFIER']},
  

  //bank account
  { path: '/profile/bankaccount', exact: true, name: "حساب بانکی", component: BankAccount, access: ['ROLE_SUPER_ADMIN', 'ROLE_TRANSLATOR', 'ROLE_EDITOR', 'ROLE_VERIFIER', 'ROLE_PROVIDER']},


  //providers
  { path: '/providers/', exact: true, name: "لیست پروایدرها", component: ProvidersList, access: ['ROLE_SUPER_ADMIN' ]},
  { path: '/providers/add', exact: true, name: "افزودن پروایدر", component: AddProvider, access: ['ROLE_SUPER_ADMIN' ]},
  { path: '/providers/edit/:id', exact: true, name: "ویرایش پروایدر", component: EditProvider, access: ['ROLE_SUPER_ADMIN' ]},
  { path: '/providers/translation/add', exact: true, name: "افزودن ترجمه", component: ProvideTranslation, access: ['ROLE_SUPER_ADMIN']},
  { path: '/providers/translation', exact: true, name: "ترجمه های پروایدر", component: ProvidersTranslationList, access: ['ROLE_SUPER_ADMIN']},
  { path: '/providers/translation/view/:provider_token/:translation_id', exact: true, name: "جزئیات ترجمه", component: TranslationDetails, access: ['ROLE_SUPER_ADMIN']},

  //admin
  { path: '/admin/users', exact: true, name: "لیست کاربران", component: UsersList, access: ['ROLE_SUPER_ADMIN']},
  { path: '/admin/users/:id', exact: true, name: "جزئیات کاربر", component: UsersDetails, access: ["ROLE_SUPER_ADMIN"]},
  { path: '/admin/adduser', exact: true, name: "افزودن کاربر", component: AddUser, access: ['ROLE_SUPER_ADMIN']},
  { path: '/admin/users/roles/addrole', name: 'افزودن نقش', component: AddRole, access: ['ROLE_SUPER_ADMIN']},
  
  //user provider
  { path: '/user/provider/addtranslate', exact: true, name: "افزودن ترجمه", component: UserProviderAddTranslation, access: ['ROLE_SUPER_ADMIN', 'ROLE_PROVIDER']},
  { path: '/user/provider/translates', exact: true, name: "لیست ترجمه ها", component: UserProviderTranslationList, access: ['ROLE_SUPER_ADMIN', 'ROLE_PROVIDER']}
];

export default routes;
