Selectize.define('custom_data', function(options) {
    options = $.extend({
        dataFields: null
    }, options);

    var self = this;

    /* Render the items with the requested data attributes */
    this.setup = (function() {
        var original = self.setup;
        return function() {
            var render_option = self.settings.render.option;
            self.settings.render.option = function (item, escape) {
                result = '';

                if (typeof render_option === 'function')
                    result = render_option.apply(this, arguments);

                if ((typeof result) == 'string') {
                    result = $.parseHTML(result);
                }

                if (result == null) {
                    result = $.parseHTML('<div>' + item[self.settings.valueField] + '</div>')
                }

                $.each(options.dataFields, function (key, value) {
                    if (eval('item.' + key) != null) {
                        dataValue = eval('item.' + key);
                    } else {
                        dataValue = null;
                    }
                    $(result).attr('data-' + value, dataValue);
                });

                return $(result).prop('outerHTML');
            };
            original.apply(this, arguments);
        }
    })();

    /* Render the items with the requested data attributes */
    this.setup = (function() {
        var original = self.setup;
        return function() {
            var render_item = self.settings.render.item;
            self.settings.render.item = function (data) {
                var result = '';

                if (typeof render_item === 'function')
                    result = render_item.apply(this, arguments);

                if ((typeof result) == 'string') {
                    result = $.parseHTML(result);
                }

                if (result == null) {
                    result = $.parseHTML('<div>' + data[self.settings.valueField] + '</div>')
                }

                $.each(options.dataFields, function (key, value) {
                    if (eval('data.' + key) != null) {
                        dataValue = eval('data.' + key);
                    } else {
                        dataValue = null;
                    }
                    $(result).attr('data-' + value, dataValue);
                });

                return $(result).prop('outerHTML');
            };
            original.apply(this, arguments);
        }
    })();

});