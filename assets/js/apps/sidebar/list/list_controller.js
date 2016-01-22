/**
 * Created by socialist on 22.01.16.
 */
define(['app', 'assets/js/apps/sidebar/list/list_view'], function (ContactManager, View) {
  ContactManager.module('SidebarApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
      listSidebar: function () {
        require(['assets/js/entities/sidebar'], function () {
          var links, sidebar;

          links = ContactManager.request('sidebar:entities');
          sidebar = new View.SidebarItems({
            collection: links
          });

          sidebar.on('brand:clicked', function () {
            ContactManager.trigger('contacts:list');
          });

          sidebar.on('childview:navigate', function (childView, model) {
            var trigger;

            trigger = model.get('navigationTrigger');
            ContactManager.trigger(trigger);
          });

          ContactManager.sidebarRegion.show(sidebar);
        });
      },

      setActiveSidebar: function (sidebarUrl) {
        var links, sidebarToSelect;

        links = ContactManager.request('sidebar:entities');
        sidebarToSelect = links.find(function (sidebar) {
          return sidebar.get('url') === sidebarUrl;
        });

        sidebarToSelect.select();
        links.trigger('reset');
      }
    };
  });
  
  return ContactManager.SidebarApp.List.Controller;
});