/**
 * Created by 黄忠园 on 2017/12/19.
 */
angular.module('filter.num', [])

    .filter('numFilter', [function () {
        return function (num) {
            if (typeof num == 'number') {
                return num <= 99 ? function () {
                    return num;
                }() : function () {
                    return 99;
                }
            }
        }
    }])