var appRoutes = angular.module('appRoutes', []);

appRoutes.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',function($routeProvider, $locationProvider, $sceDelegateProvider){
  $routeProvider
    .when('/', {
        templateUrl: './views/home.client.view.html',
        requireAuth: false
    })
    .when('/admin01234-meanmap/tutorials', {
        templateUrl: './views/admin/create-user.client.view.html',
        controller: 'AuthController',
        requireAuth: false
    })
    .when('/user/create', {
        templateUrl: './views/create-user.client.view.html',
        controller: 'AuthController',
        requireAuth: false
    })
    .when('/auth/login', {
        templateUrl: './views/login.client.view.html',
        controller: 'AuthController',
        requireAuth: false
    })
    .when('/auth/new_password', {
        templateUrl: './views/reset-password.client.view.html',
        requireAuth: false
    })
    .when('/mean-developers', {
        templateUrl: './views/developers.client.view.html',
        requireAuth: false
    })
    .when('/mean-developers/:username', {
        templateUrl: './views/account.client.view.html',
        controller: 'ProfileController',
        requireAuth: false
    })
    .when('/page/contact', {
        templateUrl: './views/contact.client.view.html',
        requireAuth: false
    })
    .when('/account', {
        templateUrl: './views/account.client.view.html',
        controller: 'UserController',
        requireAuth: true,
    })
    .when('/account/edit', {
        templateUrl: './views/edit-account.client.view.html',
        controller: 'UserController',
        requireAuth: true,
    })
    .when('/page/about', {
        templateUrl: './views/about.client.view.html',
        requireAuth: false
    })
    .when('/page/help', {
        templateUrl: './views/help.client.view.html',
        requireAuth: false
    })
    .when('/post-a-job', {
        templateUrl: './views/post-job.client.view.html',
        requireAuth: false
    })
    .when('/tutorials', {
        templateUrl: './views/tutorials/tutorial-list.client.view.html',
        requireAuth: false
    })
    .when('/tutorials/:slug', {
        templateUrl: './views/tutorials/tutorial-detail.client.view.html',
        requireAuth: false
    })
    .when('/tutorial/create', {
        templateUrl: './views/tutorials/tutorial-create.client.view.html',
        controller: 'TutsController',
        requireAuth: true
    })
    .when('/reset-password', {
        templateUrl: './views/reset-password.view.html',
        requireAuth: false
    })
    .when('/jobs', {
        templateUrl: './views/jobs.client.view.html',
        requireAuth: false
    })
    .when('/projects', {
        templateUrl: './views/projects/projects.client.view.html',
        requireAuth: false
    })
    .when('/projects/featured/:projectSlug', {
        templateUrl: './views/projects/project-detail.client.view.html',
        requireAuth: false
    })
    .when('/elysium', {
        templateUrl: './views/elysium.client.view.html',
        requireAuth: false
    })

    .otherwise({ redirectTo: '/' });

    //eliminate the hashbang
    $locationProvider.html5Mode(true);

    //whitelist youtube url to be trusted by AngularJs
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        "http://www.youtube.com/embed/**"
    ]);
}]);

