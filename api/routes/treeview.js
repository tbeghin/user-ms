'use strict';

module.exports = function (router) {
    router.get('/treeview', function (req, res) {
        const listItem = [
            {
                name: 'Dashboard',
                url: '/dashboard',
                icon: 'fa fa-dashboard',
                isDisabled: false,
            },
            {
                name: 'Paramètres',
                url: '/parameters',
                icon: 'fa fa-cogs'
            },
            {
                name: 'Test',
                icon: 'fa fa-cogs',
                children: [
                    {
                        name: 'Paramètres',
                        url: '/parameters',
                        icon: 'fa fa-cogs'
                    }
                ]
            }
        ];
        res.json(listItem);
    });
};