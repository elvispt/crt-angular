app.controller("HackerNewsController", function ($scope, $filter, HackerNewsAPI) { 'use strict';
    var filter_order_by = $filter("orderBy");
    var list_news_id = [];
    $scope.hnews = [];

    // allows the end user to reorder the news stories.
    $scope.order = function (predicate, reverse) {
        $scope.hnews = filter_order_by($scope.hnews, predicate, reverse);
    };

    // get the hacker news stories to show on the page.
    HackerNewsAPI.get_stories( function (item) {
        if (item !== undefined) {
            // first checking if this news item already exists on the list.
            if (list_news_id.indexOf(item.id) === -1) {
                // angular black magic wasn't working so I had to wrap the callback in the apply function
                $scope.$apply( function () {
                    // everything seems ok. let's push a new story.
                    $scope.hnews.push(item);
                    list_news_id.push(item.id);
                });
            }
        }
    });
});