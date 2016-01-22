/**
 * Created by socialist on 22.01.16.
 */
define(['app', 'tpl!assets/js/apps/sidebar/list/templates/list.tpl',
  'tpl!assets/js/apps/sidebar/list/templates/list_item.tpl'], function (ContactManager, listTpl, listItemTpl) {
  ContactManager.module('SidebarApp.List.View', function (View, ContactManager, Backbone, Marionette, $, _) {
    View.Sidebar = Marionette.ItemView.extend({
      template: listItemTpl,
      tagName: 'li',

      events: {
        'click a': 'navigate'
      },

      navigate: function (e) {
        e.preventDefault();
        this.trigger('navigate', this.model);
      },

      onRender: function () {
        if (this.model.selected) {
          this.$el.addClass('active');
        }
      }
    });

    View.SidebarItems = Marionette.CompositeView.extend({
      template: listTpl,
      className: 'list-group-item',
      childView: View.Sidebar,
      childViewContainer: '.list-group'
    });
  });

  return ContactManager.SidebarApp.List.View;
});