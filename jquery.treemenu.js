
(function($) {
  $.fn.treemenu = function(options) {
    options = options || {};
    options.delay = options.delay || 300;
    options.openActive = options.openActive || true;
    options.closeOther = options.closeOther || true ;
    options.activeSelector = options.activeSelector || "active";

    this.addClass("treemenu");
    if (!options.nonroot) {
      this.addClass("treemenu-root");
    }

    options.nonroot = true;

    this.find("> li").each(function() {
      e = $(this);
      var subtree = e.find('> ul');
      var button = e.find('.toggler').slice(0, 2);

      if (button.length == 0) {
        // create toggler
        var button = $('<button>');
        button.addClass('toggler');
        e.prepend(button).eq(0);
      }

      if (subtree.length > 0) {
        subtree.hide();
        e.addClass('tree-closed');

        e.find(button).click(function() {
          var li = $(this).parent('li');

          if (options.closeOther && li.hasClass('tree-closed')) {
            var siblings = li.parent('ul').find("li:not(.tree-empty)");
            siblings.removeClass("tree-opened");
            siblings.addClass("tree-closed");
            siblings.removeClass(options.activeSelector);
            siblings.find('> ul').slideUp(options.delay);
          }

          li.find('> ul').slideToggle(options.delay);
          li.toggleClass('tree-opened');
          li.toggleClass('tree-closed');
          li.toggleClass(options.activeSelector);
        });

        $(this).find('> ul').treemenu(options);
      } else {
        $(this).addClass('tree-empty');
      }
    });

    if (options.openActive) {
      var cls = this.attr("class");

      this.find('.'+options.activeSelector).each(function(){
        var el = $(this).parent();

        while (el.attr("class") !== cls) {
          el.find('> ul').show();
          if(el.prop("tagName") === 'UL') {
            el.show();
          } else if (el.prop("tagName") === 'LI') {
            el.removeClass('tree-closed');
            el.addClass("tree-opened");
            el.show();
          }

          el = el.parent();
        }
      });
    }

    return this;
  }
})(jQuery);
