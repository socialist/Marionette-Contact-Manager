/**
 * Created by socialist on 20.01.16.
 */
define(['app',
        'tpl!assets/js/apps/contacts/list/templates/layout.tpl',
        'tpl!assets/js/apps/contacts/list/templates/panel.tpl',
        'tpl!assets/js/apps/contacts/list/templates/none.tpl',
        'tpl!assets/js/apps/contacts/list/templates/list.tpl',
        'tpl!assets/js/apps/contacts/list/templates/list_item.tpl'],
    function (ContactManager, layoutTpl, panelTpl, noneTpl, listTpl, listItemTpl) {
  ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {

    List.Layout = Marionette.LayoutView.extend({
      template: layoutTpl,

      regions: {
        panelRegion: '#PanelRegion',
        contactsRegion: '#ContactsRegion'
      }
    });

    List.Panel = Marionette.ItemView.extend({
      template: panelTpl,

      triggers: {
        'click button.js-new': 'contact:new'
      },

      events: {
        'click button.js-filter': 'filterClicked'
      },

      ui: {
        criteria: 'input.js-filter-criteria'
      },

      filterClicked: function () {
        var criteria = this.$('.js-filter-criteria').val();
        this.trigger('contacts:filter', criteria);
      }
    });

    List.Contact = Marionette.ItemView.extend({
      tagName: 'tr',
      template: listItemTpl,

      triggers: {
        'click td a.js-show': 'contact:show',
        'click td a.js-edit': 'contact:edit',
        'click button.js-delete': 'contact:delete'
      },

      events: {
        'click': 'highlightName'
      },

      flash: function (cssClass) {
        var $view = this.$el;
        $view.hide().toggleClass(cssClass).fadeIn(800, function () {
          setTimeout(function () {
            $view.toggleClass(cssClass);
          }, 500);
        });
      },

      highlightName: function (e) {
        this.$el.toggleClass('warning');
      },

      remove: function () {
        this.$el.fadeOut(function () {
          $(this).remove();
        });
      }
    });

    var NoContactsView = Marionette.ItemView.extend({
      template: noneTpl,
      tagName: 'tr',
      className: 'alert'
    });

    List.Contacts = Marionette.CompositeView.extend({
      tagName: 'table',
      className: 'table table-hover',
      template: listTpl,
      emptyView: NoContactsView,
      childView: List.Contact,
      childViewContainer: 'tbody',

      onAttach: function () {
        this.attachHtml = function (collectionView, itemView, index) {
          collectionView.$el.prepend(itemView.el);
        };
      }
    });
  });

  return ContactManager.ContactsApp.List;
});