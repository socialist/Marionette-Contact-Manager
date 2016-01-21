/**
 * Created by socialist on 20.01.16.
 */
define(['app', 'localstorage'], function (ContactManager) {
  ContactManager.module('Entities', function (Entities, ContactManager, Backbone, Marionette, $, _) {
    var findStorageKey, storageCache, getStorage, StorageMixin;

    findStorageKey = function (entity) {
      if (entity.urlRoot) {
        return _.result(entity, 'urlRoot');
      }

      if (entity.url) {
        return _.result(entity, 'url');
      }

      throw new Error('Unable to determine storage key');
    };

    storageCache = {};

    getStorage = function (key) {
      var storage, newStorage;

      storage = storageCache[key];
      if (storage) {
        return storage;
      }

      newStorage = new Backbone.LocalStorage(key);
      storageCache[key] = newStorage;

      return newStorage;
    };

    StorageMixin = function (entityPrototype) {
      var storageKey = findStorageKey(entityPrototype);

      return {
        localStorage: getStorage(storageKey)
      };
    };

    Entities.configureStorage = function (entity) {
      _.extend(entity.prototype, new StorageMixin(entity.prototype));
    };
  });

  return ContactManager.Entities.configureStorage;
});