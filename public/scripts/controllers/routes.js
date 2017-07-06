'use strict';

page('/', app.homeController.init);
page('/home', app.homeController.init);

page('/login', app.loginController.init)
page('/about', app.aboutController.init);

page();
