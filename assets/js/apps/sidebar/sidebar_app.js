/**
 * Created by socialist on 22.01.16.
 */
define(['app', 'assets/js/apps/sidebar/list/list_controller'], function (ContactManager, ListController) {
  ContactManager.module('SidebarApp', function (Sidebar, ContactManager, Backbone, Marionette, $, _) {
    var API;

    API = {
      listSidebar: function () {
        ListController.listSidebar();
      }
    };

    ContactManager.commands.setHandler('set:active:sidebar', function (name) {
      console.log(name);
      ListController.setActiveSidebar(name);
    });

    Sidebar.on('start', function () {
      API.listSidebar();
    });
  });

  return ContactManager.SidebarApp;
});