// http://stackoverflow.com/questions/818830/is-there-a-good-jquery-plugin-or-js-code-for-time-durations/818920#818920
jQuery.fn.time_from_seconds = function() {
    return this.each(function() {
        var t = parseInt($(this).text(), 10);
        $(this).data('original', t);
        var h = Math.floor(t / 3600);
        t %= 3600;
        var m = Math.floor(t / 60);
        var s = Math.floor(t % 60);
        $(this).text((h > 0 ? h + ' hr' + ((h > 1) ? 's ' : ' ') : '') +
                     (m > 0 ? m + ' min' + ((m > 1) ? 's ' : ' ') : '') +
                     s + ' sec' + ((s > 1) ? 's' : ''));
    });
};