/**
 * Created by socialist on 20.01.16.
 */
define(['marionette', 'backbone', 'bootstrap'], function (Marionette, Backbone) {
  Marionette.Region.Dialog = Marionette.Region.extend({
    onShow: function (view) {
      this.listenTo(view, 'dialog:close', this.closeDialog);

      this.$el.parent().modal('show');
    },

    closeDialog: function () {
      console.log('Close');
      this.stopListening();
      this.$el.parent().modal('hide');
      this.reset();
    }
  });

  return Marionette.Region.Dialog;
});