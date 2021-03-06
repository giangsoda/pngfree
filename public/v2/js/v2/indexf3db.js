! function(e) {
    "object" == typeof module && "object" == typeof module.exports ? e(require("jquery")) : "function" == typeof define && define.amd ? define([], e(window.jQuery)) : e(window.jQuery)
}(function(o) {
    if (!o) return console.warn("Unslider needs jQuery");
    o.Unslider = function(e, t) {
        var i = this;
        return i._ = "unslider", i.defaults = {
            autoplay: !1,
            delay: 3e3,
            speed: 750,
            easing: "swing",
            keys: {
                prev: 37,
                next: 39
            },
            nav: !0,
            arrows: {
                prev: '<a class="' + i._ + '-arrow prev">Prev</a>',
                next: '<a class="' + i._ + '-arrow next">Next</a>'
            },
            animation: "horizontal",
            selectors: {
                container: "ul:first",
                slides: "li"
            },
            animateHeight: !1,
            activeClass: i._ + "-active",
            swipe: !0,
            swipeThreshold: .2
        }, i.$context = e, i.options = {}, i.$parent = null, i.$container = null, i.$slides = null, i.$nav = null, i.$arrows = [], i.total = 0, i.current = 0, i.prefix = i._ + "-", i.eventSuffix = "." + i.prefix + ~~(2e3 * Math.random()), i.interval = [], i.init = function(e) {
            return i.options = o.extend({}, i.defaults, e), i.$container = i.$context.find(i.options.selectors.container).addClass(i.prefix + "wrap"), i.$slides = i.$container.children(i.options.selectors.slides), i.setup(), o.each(["nav", "arrows", "keys", "infinite"], function(e, t) {
                i.options[t] && i["init" + o._ucfirst(t)]()
            }), jQuery.event.special.swipe && i.options.swipe && i.initSwipe(), i.options.autoplay && i.start(), i.calculateSlides(), i.$context.trigger(i._ + ".ready"), i.animate(i.options.index || i.current, "init")
        }, i.setup = function() {
            i.$context.addClass(i.prefix + i.options.animation).wrap('<div class="' + i._ + '" />'), i.$parent = i.$context.parent("." + i._), "static" === i.$context.css("position") && i.$context.css("position", "relative"), i.$context.css("overflow", "hidden")
        }, i.calculateSlides = function() {
            if (i.$slides = i.$container.children(i.options.selectors.slides), i.total = i.$slides.length, "fade" !== i.options.animation) {
                var e = "width";
                "vertical" === i.options.animation && (e = "height"), i.$container.css(e, 100 * i.total + "%").addClass(i.prefix + "carousel"), i.$slides.css(e, 100 / i.total + "%")
            }
        }, i.start = function() {
            return i.interval.push(setTimeout(function() {
                i.next()
            }, i.options.delay)), i
        }, i.stop = function() {
            for (var e; e = i.interval.pop();) clearTimeout(e);
            return i
        }, i.initNav = function() {
            var n = o('<nav class="' + i.prefix + 'nav"><ol /></nav>');
            i.$slides.each(function(e) {
                var t = this.getAttribute("data-nav") || e + 1;
                o.isFunction(i.options.nav) && (t = i.options.nav.call(i.$slides.eq(e), e, t)), n.children("ol").append('<li data-slide="' + e + '">' + t + "</li>")
            }), i.$nav = n.insertAfter(i.$context), i.$nav.find("li").on("click" + i.eventSuffix, function() {
                var e = o(this).addClass(i.options.activeClass);
                e.siblings().removeClass(i.options.activeClass), i.animate(e.attr("data-slide"))
            })
        }, i.initArrows = function() {
            !0 === i.options.arrows && (i.options.arrows = i.defaults.arrows), o.each(i.options.arrows, function(e, t) {
                i.$arrows.push(o(t).insertAfter(i.$context).on("click" + i.eventSuffix, i[e]))
            })
        }, i.initKeys = function() {
            !0 === i.options.keys && (i.options.keys = i.defaults.keys), o(document).on("keyup" + i.eventSuffix, function(n) {
                o.each(i.options.keys, function(e, t) {
                    n.which === t && o.isFunction(i[e]) && i[e].call(i)
                })
            })
        }, i.initSwipe = function() {
            var t = i.$slides.width();
            "fade" !== i.options.animation && i.$container.on({
                movestart: function(e) {
                    if (e.distX > e.distY && e.distX < -e.distY || e.distX < e.distY && e.distX > -e.distY) return !!e.preventDefault();
                    i.$container.css("position", "relative")
                },
                move: function(e) {
                    i.$container.css("left", -100 * i.current + 100 * e.distX / t + "%")
                },
                moveend: function(e) {
                    Math.abs(e.distX) / t > i.options.swipeThreshold ? i[e.distX < 0 ? "next" : "prev"]() : i.$container.animate({
                        left: -100 * i.current + "%"
                    }, i.options.speed / 2)
                }
            })
        }, i.initInfinite = function() {
            var n = ["first", "last"];
            o.each(n, function(e, t) {
                i.$slides.push.apply(i.$slides, i.$slides.filter(':not(".' + i._ + '-clone")')[t]().clone().addClass(i._ + "-clone")["insert" + (0 === e ? "After" : "Before")](i.$slides[n[~~!e]]()))
            })
        }, i.destroyArrows = function() {
            o.each(i.$arrows, function(e, t) {
                t.remove()
            })
        }, i.destroySwipe = function() {
            i.$container.off("movestart move moveend")
        }, i.destroyKeys = function() {
            o(document).off("keyup" + i.eventSuffix)
        }, i.setIndex = function(e) {
            return e < 0 && (e = i.total - 1), i.current = Math.min(Math.max(0, e), i.total - 1), i.options.nav && i.$nav.find('[data-slide="' + i.current + '"]')._active(i.options.activeClass), i.$slides.eq(i.current)._active(i.options.activeClass), i
        }, i.animate = function(e, t) {
            if ("first" === e && (e = 0), "last" === e && (e = i.total), isNaN(e)) return i;
            i.options.autoplay && i.stop().start(), i.setIndex(e), i.$context.trigger(i._ + ".change", [e, i.$slides.eq(e)]);
            var n = "animate" + o._ucfirst(i.options.animation);
            return o.isFunction(i[n]) && i[n](i.current, t), i
        }, i.next = function() {
            var e = i.current + 1;
            return e >= i.total && (e = i.options.noloop && !i.options.infinite ? i.total - 1 : 0), i.animate(e, "next")
        }, i.prev = function() {
            var e = i.current - 1;
            return e < 0 && (e = i.options.noloop && !i.options.infinite ? 0 : i.total - 1), i.animate(e, "prev")
        }, i.animateHorizontal = function(e) {
            var t = "left";
            return "rtl" === i.$context.attr("dir") && (t = "right"), i.options.infinite && i.$container.css("margin-" + t, "-100%"), i.slide(t, e)
        }, i.animateVertical = function(e) {
            return i.options.animateHeight = !0, i.options.infinite && i.$container.css("margin-top", -i.$slides.outerHeight()), i.slide("top", e)
        }, i.slide = function(e, t) {
            var n;
            (i.animateHeight(t), i.options.infinite) && (t === i.total - 1 && (n = i.total - 3, t = -1), t === i.total - 2 && (n = 0, t = i.total - 2), "number" == typeof n && (i.setIndex(n), i.$context.on(i._ + ".moved", function() {
                i.current === n && i.$container.css(e, -100 * n + "%").off(i._ + ".moved")
            })));
            var a = {};
            return a[e] = -100 * t + "%", i._move(i.$container, a)
        }, i.animateFade = function(e) {
            i.animateHeight(e);
            var t = i.$slides.eq(e).addClass(i.options.activeClass);
            i._move(t.siblings().removeClass(i.options.activeClass), {
                opacity: 0
            }), i._move(t, {
                opacity: 1
            }, !1)
        }, i.animateHeight = function(e) {
            i.options.animateHeight && i._move(i.$context, {
                height: i.$slides.eq(e).outerHeight()
            }, !1)
        }, i._move = function(e, t, n, a) {
            return !1 !== n && (n = function() {
                i.$context.trigger(i._ + ".moved")
            }), e._move(t, a || i.options.speed, i.options.easing, n)
        }, i.init(t)
    }, o.fn._active = function(e) {
        return this.addClass(e).siblings().removeClass(e)
    }, o._ucfirst = function(e) {
        return (e + "").toLowerCase().replace(/^./, function(e) {
            return e.toUpperCase()
        })
    }, o.fn._move = function() {
        return this.stop(!0, !0), o.fn[o.fn.velocity ? "velocity" : "animate"].apply(this, arguments)
    }, o.fn.unslider = function(i) {
        return this.each(function(e, t) {
            var n = o(t);
            if (!(o(t).data("unslider") instanceof o.Unslider)) {
                if ("string" == typeof i && n.data("unslider")) {
                    i = i.split(":");
                    var a = n.data("unslider")[i[0]];
                    if (o.isFunction(a)) return a.apply(n, i[1] ? i[1].split(",") : null)
                }
                return n.data("unslider", new o.Unslider(n, i))
            }
        })
    }
});
var slidey = $("#slider-wrap").unslider({
    speed: 500,
    delay: 3e3,
    complete: function() {},
    keys: !0,
    dots: !0,
    fluid: !1,
    autoplay: !0
});
try {
    var data = slidey.data("unslider");
    data.start()
} catch (e) {}
$(function() {
	return;
    var e = getInjectData();
    0 == uid && 1 == e.isAlert && Pngtree.BaseFun.IsLogin(), $(document).click(function() {
        $(".comment-search-dropdown-wrap").hide()
    }), $(".comment-search-keyword-box-input").on("focus", function() {
        var e = $(this).parents(".serach-box").find(".search-type a.on").data("type"),
            t = $.trim($(this).val());
        $.getJSON("/api/index/get-keywords", {
            type: e,
            keyword: t
        }, function(e) {
            200 == e.status && "" != e.data && ($(".comment-search-dropdown-wrap").children(".search-dropdown").html(e.data), $(".comment-search-dropdown-wrap").show())
        })
    }), $(".search-box-input").on("focus", function() {
        var e = $(this).parents(".serach-box").find(".search-type a.on").data("type"),
            t = $.trim($(this).val());
        $.getJSON("/api/index/get-keywords", {
            type: e,
            keyword: t
        }, function(e) {
            200 == e.status && "" != e.data && ($(".comment-search-dropdown-wrap").children(".search-dropdown").html(e.data), $(".comment-search-dropdown-wrap").show())
        })
    }), $(".comment-search-keyword-box-input").on("keyup", function() {
        var e = $.trim($(this).val()),
            t = $(this).parents(".serach-box").find(".search-type a.on").data("type");
        $.getJSON("/api/index/get-keywords", {
            type: t,
            keyword: e
        }, function(e) {
            200 == e.status && "" != e.data ? ($(".comment-search-dropdown-wrap").children(".search-dropdown").html(e.data), $(".comment-search-dropdown-wrap").show()) : $(".comment-search-dropdown-wrap").hide()
        })
    }), $(".search-dropdown").on("click", ".recent-search span", function() {
        if ("headen" == $(this).parents().parents().attr("data-type")) {
            var e = $(this).attr("data-val"),
                t = Number($(this).parents().parents().parents("").find(".serach-box a.on").attr("data-type"));
            Pngtree.BaseFun.SearchClick(t, e)
        } else {
            e = $(this).attr("data-val"), t = parseInt($(this).parents(".serach-box").find(".search-type a.on").data("type"));
            Pngtree.BaseFun.SearchClick(t, e)
        }
    }), $(".search-dropdown").on("click", "p", function() {
        if ("headen" == $(this).parents().attr("data-type")) {
            var e = $(this).attr("data-val"),
                t = Number($(this).parents().parents().parents("").find(".serach-box a.on").attr("data-type"));
            Pngtree.BaseFun.Ga_Deploy("Home", "Search_Drop_Down_bar", e), Pngtree.BaseFun.SearchClick(t, e)
        } else {
            e = $(this).attr("data-val"), t = parseInt($(this).parents(".serach-box").find(".search-type a.on").data("type"));
            Pngtree.BaseFun.Ga_Deploy("Home", "Search_Drop_Down_bar", e), Pngtree.BaseFun.SearchClick(t, e)
        }
    }), $(".search-box-input-index").on("click", function() {
        var e = $(this).parents(".serach-box").find(".search-type a.on").data("type"),
            t = $.trim($(this).siblings(".comment-search-keyword-box-input").val());
        Pngtree.BaseFun.Ga_Searh("IndexSearch", e);
        var n = 1;
        switch (e) {
            case 1:
                n = "Element";
                break;
            case 2:
                n = "Back";
                break;
            case 5:
                n = "Template";
                break;
            case 6:
                n = "PPT";
                break;
            case 7:
                n = "Font"
        }
        Pngtree.BaseFun.Ga_Deploy("Home", "Search_Bar", n), Pngtree.BaseFun.SearchClick(e, t)
    }), $(".rem-click").on("click", function() {
        var e = $(this).data("type");
        Pngtree.BaseFun.Ga_Deploy("Home", "Recommended_Words", e)
    }), $(".comment-search-keyword-box-input").on("keydown", function(e) {
        if (13 == e.keyCode) return $(this).siblings(".search-box-input-index").trigger("click"), !1
    }), addLoadEvent(function() {
        "en" == lang && 0 != uid && $.post("/api/async/banner-show", {
            _csrf: csrf,
            vip_type: vip_type,
            is_old: is_old
        }, function(e) {
            if (200 == e.rep) try {
                $("#base-new-version").html(e.data).fadeIn(200)
            } catch (e) {}
        }, "json")
    }), $(".click_banner").on("click", function() {
        var e = $(this).data("id");
        $.post("/api/statistics/banner-click", {
            sort: e,
            _csrf: csrf
        }, function(e) {})
    }), $("[data-index-click-type]").on("click", function() {
        var e = $(this).data("index-click-type");
        Pngtree.BaseFun.Ga_Deploy("Home", "Ranking_Bar", e), $.post("/api/statistics/new-index-click", {
            type: e,
            _csrf: csrf
        }, function(e) {})
    }), $("#base-new-version").on("click", ".close-span", function() {
        $("#base-new-version").hide(), $.post("/api/statistics/activity-banner", {
            type: 2,
            _csrf: csrf
        })
    }), $(".btn-go").on("click", function() {
        $("#ar-activity-relay").fadeOut(10)
    }), Pngtree.BaseFun.Ga_Deploy_Class(".topic-click", "Home", "Topic", "type"), Pngtree.BaseFun.Ga_Deploy_Class(".element-click", "Home", "Element", "ga"), Pngtree.BaseFun.Ga_Deploy_Class(".template-click", "Home", "Template", "ga"), Pngtree.BaseFun.Ga_Deploy_Class(".font-click", "Home", "Font", "ga"), Pngtree.BaseFun.Ga_Deploy_Class(".back-click", "Home", "Back", "ga"), Pngtree.BaseFun.Ga_Deploy_Class(".icon-click", "Home", "Icon", "ga"), Pngtree.BaseFun.Ga_Deploy_Class(".ppt-click", "Home", "PPT", "ga"), $(".photos-wall").on("click", function() {
        Pngtree.BaseFun.Ga_Deploy("Home", "LovePngtree", "click")
    })
});