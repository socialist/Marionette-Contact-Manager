/**
 * Created by socialist on 21.01.16.
 */
define(['app'], function (ContactManager) {
  ContactManager.module('Entities', function (Entities, ContactManager, Backbone, Marionette, $, _) {
    Entities.FilteredCollection = function (options) {
      var original, filtered, applyFilter;

      original = options.collection;
      filtered = new original.constructor();
      filtered.add(original.models);
      filtered.filterFunction = options.filterFunction;

      applyFilter = function (filterCriteria, filterStrategy, collection) {
        var criteria, items, filterFunction;

        collection = collection || original;

        if (filterStrategy === 'filter') {
          criteria = filterCriteria.trim();
        }
        else {
          criteria = filterCriteria;
        }

        items = [];
        if (criteria) {
          if (filterStrategy === 'filter') {
            if (!filtered.filterFunction) {
              throw('Attempted to use "filter" function, but none was defined');
            }

            filterFunction = filtered.filterFunction(criteria);
            items = collection.filter(filterFunction);
          }
          else {
            items = collection.where(criteria);
          }
        }
        else {
          items = collection.models;
        }

        filtered._currentCriterion = criteria;

        return items;
      };

      filtered.filter = function (filterCriteria) {
        var items;

        filtered._currentFilter = 'filter';
        items = applyFilter(filterCriteria, 'filter');

        filtered.reset(items);

        return filtered;
      };

      filtered.where = function (filterCriteria) {
        var items;

        filtered._currentFilter = 'where';
        items = applyFilter(filterCriteria, 'where');
        filtered.reset(items);

        return filtered;
      };

      original.on('reset', function () {
        var items = applyFilter(filtered._currentCriterion, filtered._currentFilter);

        filtered.reset(items);
      });

      original.on('add', function (models) {
        var coll, items;

        coll = new original.constructor();
        coll.add(models);
        items = applyFilter(filtered._currentCriterion, filtered._currentFilter);

        filtered.add(items);
      });

      return filtered;
    };
  });

  return ContactManager.Entities.FilteredCollection;
});