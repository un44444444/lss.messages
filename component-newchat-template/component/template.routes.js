/**
 * Created by dywu on 2015/9/24.
 */

angular.module('module.template', [
])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        for(var part in sidebars_list) {
            var views_config = {
                '': {
                    template: '<div ui-view="topbar"></div>'
                },
            };
            views_config['topbar@'+part] = {
                templateUrl: template_viewurl + "/topbar.html",
                controller: 'TemplateTopbarController',
                controllerAs: 'vm'
            }
            views_config['main@'+part] = {
                templateUrl: template_viewurl + "/siderbar.html",
                /*以下不适用于配置化，保留仅提供思路
                resolve: {
                    sidebars: function(){
                        return sidebars_list[part]}
                },*/
                controller: 'TemplateSidebarController',
                controllerAs: 'vm'
            }
            //
            $stateProvider
                .state(part, {
                    'abstract': true,
                    url: "/"+part,
                    views: views_config
                })
            ;
        }
    }])

;
