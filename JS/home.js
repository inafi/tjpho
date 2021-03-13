setInterval(() => {
    if ($(".info .row.short").height() < $(".info .row.short div").height() * 2) {
        var width = $(".info .row.short div").width() * 2 + $(".info .row.short").width() * 0.06;
        $(".info .row.long div").width(width)
    } else {
        var width = $(".info .row.short div").width();
    }
    $(".info .row.long div").width(width)
}, 100);
