(function() {
    function t(e, t) {
        return (new Date(t, e + 1, 0)).getDate();
    }
    function n(e, t, n) {
        return function(r, i, s) {
            var o = e(r), u = [];
            o < r && t(o);
            if (s > 1) while (o < i) {
                var a = new Date(+o);
                n(a) % s === 0 && u.push(a);
                t(o);
            } else while (o < i) {
                u.push(new Date(+o));
                t(o);
            }
            return u;
        };
    }
    var e = window.nv || {};
    e.version = "1.1.10b";
    e.dev = !0;
    window.nv = e;
    e.tooltip = {};
    e.utils = {};
    e.models = {};
    e.charts = {};
    e.graphs = [];
    e.logs = {};
    e.dispatch = d3.dispatch("render_start", "render_end");
    if (e.dev) {
        e.dispatch.on("render_start", function(t) {
            e.logs.startTime = +(new Date);
        });
        e.dispatch.on("render_end", function(t) {
            e.logs.endTime = +(new Date);
            e.logs.totalTime = e.logs.endTime - e.logs.startTime;
            e.log("total", e.logs.totalTime);
        });
    }
    e.log = function() {
        if (e.dev && console.log && console.log.apply) console.log.apply(console, arguments); else if (e.dev && typeof console.log == "function" && Function.prototype.bind) {
            var t = Function.prototype.bind.call(console.log, console);
            t.apply(console, arguments);
        }
        return arguments[arguments.length - 1];
    };
    e.render = function(n) {
        n = n || 1;
        e.render.active = !0;
        e.dispatch.render_start();
        setTimeout(function() {
            var t, r;
            for (var i = 0; i < n && (r = e.render.queue[i]); i++) {
                t = r.generate();
                typeof r.callback == typeof Function && r.callback(t);
                e.graphs.push(t);
            }
            e.render.queue.splice(0, i);
            if (e.render.queue.length) setTimeout(arguments.callee, 0); else {
                e.render.active = !1;
                e.dispatch.render_end();
            }
        }, 0);
    };
    e.render.active = !1;
    e.render.queue = [];
    e.addGraph = function(t) {
        typeof arguments[0] == typeof Function && (t = {
            generate: arguments[0],
            callback: arguments[1]
        });
        e.render.queue.push(t);
        e.render.active || e.render();
    };
    e.identity = function(e) {
        return e;
    };
    e.strip = function(e) {
        return e.replace(/(\s|&)/g, "");
    };
    d3.time.monthEnd = function(e) {
        return new Date(e.getFullYear(), e.getMonth(), 0);
    };
    d3.time.monthEnds = n(d3.time.monthEnd, function(e) {
        e.setUTCDate(e.getUTCDate() + 1);
        e.setDate(t(e.getMonth() + 1, e.getFullYear()));
    }, function(e) {
        return e.getMonth();
    });
    e.interactiveGuideline = function() {
        "use strict";
        function c(o) {
            o.each(function(o) {
                function g() {
                    var e = d3.mouse(this), n = e[0], r = e[1], o = !0, a = !1;
                    if (l) {
                        n = d3.event.offsetX;
                        r = d3.event.offsetY;
                        d3.event.target.tagName !== "svg" && (o = !1);
                        d3.event.target.className.baseVal.match("nv-legend") && (a = !0);
                    }
                    if (o) {
                        n -= i.left;
                        r -= i.top;
                    }
                    if (n < 0 || r < 0 || n > p || r > d || d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined || a) {
                        if (l && d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined && d3.event.relatedTarget.className.match(t.nvPointerEventsClass)) return;
                        u.elementMouseout({
                            mouseX: n,
                            mouseY: r
                        });
                        c.renderGuideLine(null);
                        return;
                    }
                    var f = s.invert(n);
                    u.elementMousemove({
                        mouseX: n,
                        mouseY: r,
                        pointXValue: f
                    });
                }
                var h = d3.select(this), p = n || 960, d = r || 400, v = h.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([ o ]), m = v.enter().append("g").attr("class", " nv-wrap nv-interactiveLineLayer");
                m.append("g").attr("class", "nv-interactiveGuideLine");
                if (!f) return;
                f.on("mousemove", g, !0).on("mouseout", g, !0);
                c.renderGuideLine = function(t) {
                    if (!a) return;
                    var n = v.select(".nv-interactiveGuideLine").selectAll("line").data(t != null ? [ e.utils.NaNtoZero(t) ] : [], String);
                    n.enter().append("line").attr("class", "nv-guideline").attr("x1", function(e) {
                        return e;
                    }).attr("x2", function(e) {
                        return e;
                    }).attr("y1", d).attr("y2", 0);
                    n.exit().remove();
                };
            });
        }
        var t = e.models.tooltip(), n = null, r = null, i = {
            left: 0,
            top: 0
        }, s = d3.scale.linear(), o = d3.scale.linear(), u = d3.dispatch("elementMousemove", "elementMouseout"), a = !0, f = null, l = navigator.userAgent.indexOf("MSIE") !== -1;
        c.dispatch = u;
        c.tooltip = t;
        c.margin = function(e) {
            if (!arguments.length) return i;
            i.top = typeof e.top != "undefined" ? e.top : i.top;
            i.left = typeof e.left != "undefined" ? e.left : i.left;
            return c;
        };
        c.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return c;
        };
        c.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return c;
        };
        c.xScale = function(e) {
            if (!arguments.length) return s;
            s = e;
            return c;
        };
        c.showGuideLine = function(e) {
            if (!arguments.length) return a;
            a = e;
            return c;
        };
        c.svgContainer = function(e) {
            if (!arguments.length) return f;
            f = e;
            return c;
        };
        return c;
    };
    e.interactiveBisect = function(e, t, n) {
        "use strict";
        if (!e instanceof Array) return null;
        typeof n != "function" && (n = function(e, t) {
            return e.x;
        });
        var r = d3.bisector(n).left, i = d3.max([ 0, r(e, t) - 1 ]), s = n(e[i], i);
        typeof s == "undefined" && (s = i);
        if (s === t) return i;
        var o = d3.min([ i + 1, e.length - 1 ]), u = n(e[o], o);
        typeof u == "undefined" && (u = o);
        return Math.abs(u - t) >= Math.abs(s - t) ? i : o;
    };
    (function() {
        "use strict";
        window.nv.tooltip = {};
        window.nv.models.tooltip = function() {
            function g() {
                if (a) {
                    var e = d3.select(a);
                    e.node().tagName !== "svg" && (e = e.select("svg"));
                    var t = e.node() ? e.attr("viewBox") : null;
                    if (t) {
                        t = t.split(" ");
                        var n = parseInt(e.style("width")) / t[2];
                        f.left = f.left * n;
                        f.top = f.top * n;
                    }
                }
            }
            function y(e) {
                var t;
                a ? t = d3.select(a) : t = d3.select("body");
                var n = t.select(".nvtooltip");
                n.node() === null && (n = t.append("div").attr("class", "nvtooltip " + (u ? u : "xy-tooltip")).attr("id", c));
                n.node().innerHTML = e;
                n.style("top", 0).style("left", 0).style("opacity", 0);
                n.selectAll("div, table, td, tr").classed(h, !0);
                n.classed(h, !0);
                return n.node();
            }
            function b() {
                if (!l) return;
                if (!m(n)) return;
                g();
                var t = f.left, u = o != null ? o : f.top, c = y(v(n));
                if (a) {
                    var h = a.getElementsByTagName("svg")[0], p = h ? h.getBoundingClientRect() : a.getBoundingClientRect(), d = {
                        left: 0,
                        top: 0
                    };
                    if (h) {
                        var w = h.getBoundingClientRect(), E = a.getBoundingClientRect();
                        d.top = Math.abs(w.top - E.top);
                        d.left = Math.abs(w.left - E.left);
                    }
                    t += a.offsetLeft + d.left - 2 * a.scrollLeft;
                    u += a.offsetTop + d.top - 2 * a.scrollTop;
                }
                s && s > 0 && (u = Math.floor(u / s) * s);
                e.tooltip.calcTooltipPosition([ t, u ], r, i, c);
                return b;
            }
            var t = null, n = null, r = "w", i = 50, s = 25, o = null, u = null, a = null, f = {
                left: null,
                top: null
            }, l = !0, c = "nvtooltip-" + Math.floor(Math.random() * 1e5), h = "nv-pointer-events-none", p = function(e, t) {
                return e;
            }, d = function(e) {
                return e;
            }, v = function(e) {
                if (t != null) return t;
                if (e == null) return "";
                var n = "<table><thead><tr><td colspan='3'><strong class='x-value'>" + d(e.value) + "</strong></td></tr></thead><tbody>";
                e.series instanceof Array && e.series.forEach(function(e, t) {
                    n += "<tr>";
                    n += "<td class='legend-color-guide'><div style='background-color: " + e.color + ";'></div></td>";
                    n += "<td class='key'>" + e.key + ":</td>";
                    n += "<td class='value'>" + p(e.value, t) + "</td></tr>";
                });
                n += "</tbody></table>";
                return n;
            }, m = function(e) {
                return e && e.series && e.series.length > 0 ? !0 : !1;
            };
            b.nvPointerEventsClass = h;
            b.content = function(e) {
                if (!arguments.length) return t;
                t = e;
                return b;
            };
            b.contentGenerator = function(e) {
                if (!arguments.length) return v;
                typeof e == "function" && (v = e);
                return b;
            };
            b.data = function(e) {
                if (!arguments.length) return n;
                n = e;
                return b;
            };
            b.gravity = function(e) {
                if (!arguments.length) return r;
                r = e;
                return b;
            };
            b.distance = function(e) {
                if (!arguments.length) return i;
                i = e;
                return b;
            };
            b.snapDistance = function(e) {
                if (!arguments.length) return s;
                s = e;
                return b;
            };
            b.classes = function(e) {
                if (!arguments.length) return u;
                u = e;
                return b;
            };
            b.chartContainer = function(e) {
                if (!arguments.length) return a;
                a = e;
                return b;
            };
            b.position = function(e) {
                if (!arguments.length) return f;
                f.left = typeof e.left != "undefined" ? e.left : f.left;
                f.top = typeof e.top != "undefined" ? e.top : f.top;
                return b;
            };
            b.fixedTop = function(e) {
                if (!arguments.length) return o;
                o = e;
                return b;
            };
            b.enabled = function(e) {
                if (!arguments.length) return l;
                l = e;
                return b;
            };
            b.valueFormatter = function(e) {
                if (!arguments.length) return p;
                typeof e == "function" && (p = e);
                return b;
            };
            b.headerFormatter = function(e) {
                if (!arguments.length) return d;
                typeof e == "function" && (d = e);
                return b;
            };
            b.id = function() {
                return c;
            };
            return b;
        };
        e.tooltip.show = function(t, n, r, i, s, o) {
            var u = document.createElement("div");
            u.className = "nvtooltip " + (o ? o : "xy-tooltip");
            var a = s;
            if (!s || s.tagName.match(/g|svg/i)) a = document.getElementsByTagName("body")[0];
            u.style.left = 0;
            u.style.top = 0;
            u.style.opacity = 0;
            u.innerHTML = n;
            a.appendChild(u);
            if (s) {
                t[0] = t[0] - s.scrollLeft;
                t[1] = t[1] - s.scrollTop;
            }
            e.tooltip.calcTooltipPosition(t, r, i, u);
        };
        e.tooltip.findFirstNonSVGParent = function(e) {
            while (e.tagName.match(/^g|svg$/i) !== null) e = e.parentNode;
            return e;
        };
        e.tooltip.findTotalOffsetTop = function(e, t) {
            var n = t;
            do isNaN(e.offsetTop) || (n += e.offsetTop); while (e = e.offsetParent);
            return n;
        };
        e.tooltip.findTotalOffsetLeft = function(e, t) {
            var n = t;
            do isNaN(e.offsetLeft) || (n += e.offsetLeft); while (e = e.offsetParent);
            return n;
        };
        e.tooltip.calcTooltipPosition = function(t, n, r, i) {
            var s = parseInt(i.offsetHeight), o = parseInt(i.offsetWidth), u = e.utils.windowSize().width, a = e.utils.windowSize().height, f = window.pageYOffset, l = window.pageXOffset, c, h;
            a = window.innerWidth >= document.body.scrollWidth ? a : a - 16;
            u = window.innerHeight >= document.body.scrollHeight ? u : u - 16;
            n = n || "s";
            r = r || 20;
            var p = function(t) {
                return e.tooltip.findTotalOffsetTop(t, h);
            }, d = function(t) {
                return e.tooltip.findTotalOffsetLeft(t, c);
            };
            switch (n) {
              case "e":
                c = t[0] - o - r;
                h = t[1] - s / 2;
                var v = d(i), m = p(i);
                v < l && (c = t[0] + r > l ? t[0] + r : l - v + c);
                m < f && (h = f - m + h);
                m + s > f + a && (h = f + a - m + h - s);
                break;
              case "w":
                c = t[0] + r;
                h = t[1] - s / 2;
                var v = d(i), m = p(i);
                v + o > u && (c = t[0] - o - r);
                m < f && (h = f + 5);
                m + s > f + a && (h = f + a - m + h - s);
                break;
              case "n":
                c = t[0] - o / 2 - 5;
                h = t[1] + r;
                var v = d(i), m = p(i);
                v < l && (c = l + 5);
                v + o > u && (c = c - o / 2 + 5);
                m + s > f + a && (h = f + a - m + h - s);
                break;
              case "s":
                c = t[0] - o / 2;
                h = t[1] - s - r;
                var v = d(i), m = p(i);
                v < l && (c = l + 5);
                v + o > u && (c = c - o / 2 + 5);
                f > m && (h = f);
                break;
              case "none":
                c = t[0];
                h = t[1] - r;
                var v = d(i), m = p(i);
            }
            i.style.left = c + "px";
            i.style.top = h + "px";
            i.style.opacity = 1;
            i.style.position = "absolute";
            return i;
        };
        e.tooltip.cleanup = function() {
            var e = document.getElementsByClassName("nvtooltip"), t = [];
            while (e.length) {
                t.push(e[0]);
                e[0].style.transitionDelay = "0 !important";
                e[0].style.opacity = 0;
                e[0].className = "nvtooltip-pending-removal";
            }
            setTimeout(function() {
                while (t.length) {
                    var e = t.pop();
                    e.parentNode.removeChild(e);
                }
            }, 500);
        };
    })();
    e.utils.windowSize = function() {
        var e = {
            width: 640,
            height: 480
        };
        if (document.body && document.body.offsetWidth) {
            e.width = document.body.offsetWidth;
            e.height = document.body.offsetHeight;
        }
        if (document.compatMode == "CSS1Compat" && document.documentElement && document.documentElement.offsetWidth) {
            e.width = document.documentElement.offsetWidth;
            e.height = document.documentElement.offsetHeight;
        }
        if (window.innerWidth && window.innerHeight) {
            e.width = window.innerWidth;
            e.height = window.innerHeight;
        }
        return e;
    };
    e.utils.windowResize = function(e) {
        if (e === undefined) return;
        var t = window.onresize;
        window.onresize = function(n) {
            typeof t == "function" && t(n);
            e(n);
        };
    };
    e.utils.getColor = function(t) {
        return arguments.length ? Object.prototype.toString.call(t) === "[object Array]" ? function(e, n) {
            return e.color || t[n % t.length];
        } : t : e.utils.defaultColor();
    };
    e.utils.defaultColor = function() {
        var e = d3.scale.category20().range();
        return function(t, n) {
            return t.color || e[n % e.length];
        };
    };
    e.utils.customTheme = function(e, t, n) {
        t = t || function(e) {
            return e.key;
        };
        n = n || d3.scale.category20().range();
        var r = n.length;
        return function(i, s) {
            var o = t(i);
            r || (r = n.length);
            return typeof e[o] != "undefined" ? typeof e[o] == "function" ? e[o]() : e[o] : n[--r];
        };
    };
    e.utils.pjax = function(t, n) {
        function r(r) {
            d3.html(r, function(r) {
                var i = d3.select(n).node();
                i.parentNode.replaceChild(d3.select(r).select(n).node(), i);
                e.utils.pjax(t, n);
            });
        }
        d3.selectAll(t).on("click", function() {
            history.pushState(this.href, this.textContent, this.href);
            r(this.href);
            d3.event.preventDefault();
        });
        d3.select(window).on("popstate", function() {
            d3.event.state && r(d3.event.state);
        });
    };
    e.utils.calcApproxTextWidth = function(e) {
        if (e instanceof d3.selection) {
            var t = parseInt(e.style("font-size").replace("px", "")), n = e.text().length;
            return n * t * .5;
        }
        return 0;
    };
    e.utils.NaNtoZero = function(e) {
        return typeof e != "number" || isNaN(e) || e === null || e === Infinity ? 0 : e;
    };
    e.utils.optionsFunc = function(e) {
        e && d3.map(e).forEach(function(e, t) {
            typeof this[e] == "function" && this[e](t);
        }.bind(this));
        return this;
    };
    e.models.axis = function() {
        "use strict";
        function v(e) {
            e.each(function(e) {
                var i = d3.select(this), v = i.selectAll("g.nv-wrap.nv-axis").data([ e ]), m = v.enter().append("g").attr("class", "nvd3 nv-wrap nv-axis"), g = m.append("g"), y = v.select("g");
                p !== null ? t.ticks(p) : (t.orient() == "top" || t.orient() == "bottom") && t.ticks(Math.abs(s.range()[1] - s.range()[0]) / 100);
                y.transition().call(t);
                d = d || t.scale();
                var b = t.tickFormat();
                b == null && (b = d.tickFormat());
                var w = y.selectAll("text.nv-axislabel").data([ o || null ]);
                w.exit().remove();
                switch (t.orient()) {
                  case "top":
                    w.enter().append("text").attr("class", "nv-axislabel");
                    var E = s.range().length == 2 ? s.range()[1] : s.range()[s.range().length - 1] + (s.range()[1] - s.range()[0]);
                    w.attr("text-anchor", "middle").attr("y", 0).attr("x", E / 2);
                    if (u) {
                        var S = v.selectAll("g.nv-axisMaxMin").data(s.domain());
                        S.enter().append("g").attr("class", "nv-axisMaxMin").append("text");
                        S.exit().remove();
                        S.attr("transform", function(e, t) {
                            return "translate(" + s(e) + ",0)";
                        }).select("text").attr("dy", "0em").attr("y", -t.tickPadding()).attr("text-anchor", "middle").text(function(e, t) {
                            var n = b(e);
                            return ("" + n).match("NaN") ? "" : n;
                        });
                        S.transition().attr("transform", function(e, t) {
                            return "translate(" + s.range()[t] + ",0)";
                        });
                    }
                    break;
                  case "bottom":
                    var x = 36, T = 30, N = y.selectAll("g").select("text");
                    if (f % 360) {
                        N.each(function(e, t) {
                            var n = this.getBBox().width;
                            n > T && (T = n);
                        });
                        var C = Math.abs(Math.sin(f * Math.PI / 180)), x = (C ? C * T : T) + 30;
                        N.attr("transform", function(e, t, n) {
                            return "rotate(" + f + " 0,0)";
                        }).style("text-anchor", f % 360 > 0 ? "start" : "end");
                    }
                    w.enter().append("text").attr("class", "nv-axislabel");
                    var E = s.range().length == 2 ? s.range()[1] : s.range()[s.range().length - 1] + (s.range()[1] - s.range()[0]);
                    w.attr("text-anchor", "middle").attr("y", x).attr("x", E / 2);
                    if (u) {
                        var S = v.selectAll("g.nv-axisMaxMin").data([ s.domain()[0], s.domain()[s.domain().length - 1] ]);
                        S.enter().append("g").attr("class", "nv-axisMaxMin").append("text");
                        S.exit().remove();
                        S.attr("transform", function(e, t) {
                            return "translate(" + (s(e) + (h ? s.rangeBand() / 2 : 0)) + ",0)";
                        }).select("text").attr("dy", ".71em").attr("y", t.tickPadding()).attr("transform", function(e, t, n) {
                            return "rotate(" + f + " 0,0)";
                        }).style("text-anchor", f ? f % 360 > 0 ? "start" : "end" : "middle").text(function(e, t) {
                            var n = b(e);
                            return ("" + n).match("NaN") ? "" : n;
                        });
                        S.transition().attr("transform", function(e, t) {
                            return "translate(" + (s(e) + (h ? s.rangeBand() / 2 : 0)) + ",0)";
                        });
                    }
                    c && N.attr("transform", function(e, t) {
                        return "translate(0," + (t % 2 == 0 ? "0" : "12") + ")";
                    });
                    break;
                  case "right":
                    w.enter().append("text").attr("class", "nv-axislabel");
                    w.style("text-anchor", l ? "middle" : "begin").attr("transform", l ? "rotate(90)" : "").attr("y", l ? -Math.max(n.right, r) + 12 : -10).attr("x", l ? s.range()[0] / 2 : t.tickPadding());
                    if (u) {
                        var S = v.selectAll("g.nv-axisMaxMin").data(s.domain());
                        S.enter().append("g").attr("class", "nv-axisMaxMin").append("text").style("opacity", 0);
                        S.exit().remove();
                        S.attr("transform", function(e, t) {
                            return "translate(0," + s(e) + ")";
                        }).select("text").attr("dy", ".32em").attr("y", 0).attr("x", t.tickPadding()).style("text-anchor", "start").text(function(e, t) {
                            var n = b(e);
                            return ("" + n).match("NaN") ? "" : n;
                        });
                        S.transition().attr("transform", function(e, t) {
                            return "translate(0," + s.range()[t] + ")";
                        }).select("text").style("opacity", 1);
                    }
                    break;
                  case "left":
                    w.enter().append("text").attr("class", "nv-axislabel");
                    w.style("text-anchor", l ? "middle" : "end").attr("transform", l ? "rotate(-90)" : "").attr("y", l ? -Math.max(n.left, r) + 12 : -10).attr("x", l ? -s.range()[0] / 2 : -t.tickPadding());
                    if (u) {
                        var S = v.selectAll("g.nv-axisMaxMin").data(s.domain());
                        S.enter().append("g").attr("class", "nv-axisMaxMin").append("text").style("opacity", 0);
                        S.exit().remove();
                        S.attr("transform", function(e, t) {
                            return "translate(0," + d(e) + ")";
                        }).select("text").attr("dy", ".32em").attr("y", 0).attr("x", -t.tickPadding()).attr("text-anchor", "end").text(function(e, t) {
                            var n = b(e);
                            return ("" + n).match("NaN") ? "" : n;
                        });
                        S.transition().attr("transform", function(e, t) {
                            return "translate(0," + s.range()[t] + ")";
                        }).select("text").style("opacity", 1);
                    }
                }
                w.text(function(e) {
                    return e;
                });
                if (u && (t.orient() === "left" || t.orient() === "right")) {
                    y.selectAll("g").each(function(e, t) {
                        d3.select(this).select("text").attr("opacity", 1);
                        if (s(e) < s.range()[1] + 10 || s(e) > s.range()[0] - 10) {
                            (e > 1e-10 || e < -1e-10) && d3.select(this).attr("opacity", 0);
                            d3.select(this).select("text").attr("opacity", 0);
                        }
                    });
                    s.domain()[0] == s.domain()[1] && s.domain()[0] == 0 && v.selectAll("g.nv-axisMaxMin").style("opacity", function(e, t) {
                        return t ? 0 : 1;
                    });
                }
                if (u && (t.orient() === "top" || t.orient() === "bottom")) {
                    var k = [];
                    v.selectAll("g.nv-axisMaxMin").each(function(e, t) {
                        try {
                            t ? k.push(s(e) - this.getBBox().width - 4) : k.push(s(e) + this.getBBox().width + 4);
                        } catch (n) {
                            t ? k.push(s(e) - 4) : k.push(s(e) + 4);
                        }
                    });
                    y.selectAll("g").each(function(e, t) {
                        if (s(e) < k[0] || s(e) > k[1]) e > 1e-10 || e < -1e-10 ? d3.select(this).remove() : d3.select(this).select("text").remove();
                    });
                }
                a && y.selectAll(".tick").filter(function(e) {
                    return !parseFloat(Math.round(e.__data__ * 1e5) / 1e6) && e.__data__ !== undefined;
                }).classed("zero", !0);
                d = s.copy();
            });
            return v;
        }
        var t = d3.svg.axis(), n = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, r = 75, i = 60, s = d3.scale.linear(), o = null, u = !0, a = !0, f = 0, l = !0, c = !1, h = !1, p = null;
        t.scale(s).orient("bottom").tickFormat(function(e) {
            return e;
        });
        var d;
        v.axis = t;
        d3.rebind(v, t, "orient", "tickValues", "tickSubdivide", "tickSize", "tickPadding", "tickFormat");
        d3.rebind(v, s, "domain", "range", "rangeBand", "rangeBands");
        v.options = e.utils.optionsFunc.bind(v);
        v.margin = function(e) {
            if (!arguments.length) return n;
            n.top = typeof e.top != "undefined" ? e.top : n.top;
            n.right = typeof e.right != "undefined" ? e.right : n.right;
            n.bottom = typeof e.bottom != "undefined" ? e.bottom : n.bottom;
            n.left = typeof e.left != "undefined" ? e.left : n.left;
            return v;
        };
        v.width = function(e) {
            if (!arguments.length) return r;
            r = e;
            return v;
        };
        v.ticks = function(e) {
            if (!arguments.length) return p;
            p = e;
            return v;
        };
        v.height = function(e) {
            if (!arguments.length) return i;
            i = e;
            return v;
        };
        v.axisLabel = function(e) {
            if (!arguments.length) return o;
            o = e;
            return v;
        };
        v.showMaxMin = function(e) {
            if (!arguments.length) return u;
            u = e;
            return v;
        };
        v.highlightZero = function(e) {
            if (!arguments.length) return a;
            a = e;
            return v;
        };
        v.scale = function(e) {
            if (!arguments.length) return s;
            s = e;
            t.scale(s);
            h = typeof s.rangeBands == "function";
            d3.rebind(v, s, "domain", "range", "rangeBand", "rangeBands");
            return v;
        };
        v.rotateYLabel = function(e) {
            if (!arguments.length) return l;
            l = e;
            return v;
        };
        v.rotateLabels = function(e) {
            if (!arguments.length) return f;
            f = e;
            return v;
        };
        v.staggerLabels = function(e) {
            if (!arguments.length) return c;
            c = e;
            return v;
        };
        return v;
    };
    e.models.bullet = function() {
        "use strict";
        function m(e) {
            e.each(function(e, n) {
                var p = c - t.left - t.right, m = h - t.top - t.bottom, g = d3.select(this), y = i.call(this, e, n).slice().sort(d3.descending), b = s.call(this, e, n).slice().sort(d3.descending), w = o.call(this, e, n).slice().sort(d3.descending), E = u.call(this, e, n).slice(), S = a.call(this, e, n).slice(), x = f.call(this, e, n).slice(), T = d3.scale.linear().domain(d3.extent(d3.merge([ l, y ]))).range(r ? [ p, 0 ] : [ 0, p ]), N = this.__chart__ || d3.scale.linear().domain([ 0, Infinity ]).range(T.range());
                this.__chart__ = T;
                var C = d3.min(y), k = d3.max(y), L = y[1], A = g.selectAll("g.nv-wrap.nv-bullet").data([ e ]), O = A.enter().append("g").attr("class", "nvd3 nv-wrap nv-bullet"), M = O.append("g"), _ = A.select("g");
                M.append("rect").attr("class", "nv-range nv-rangeMax");
                M.append("rect").attr("class", "nv-range nv-rangeAvg");
                M.append("rect").attr("class", "nv-range nv-rangeMin");
                M.append("rect").attr("class", "nv-measure");
                M.append("path").attr("class", "nv-markerTriangle");
                A.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var D = function(e) {
                    return Math.abs(N(e) - N(0));
                }, P = function(e) {
                    return Math.abs(T(e) - T(0));
                }, H = function(e) {
                    return e < 0 ? N(e) : N(0);
                }, B = function(e) {
                    return e < 0 ? T(e) : T(0);
                };
                _.select("rect.nv-rangeMax").attr("height", m).attr("width", P(k > 0 ? k : C)).attr("x", B(k > 0 ? k : C)).datum(k > 0 ? k : C);
                _.select("rect.nv-rangeAvg").attr("height", m).attr("width", P(L)).attr("x", B(L)).datum(L);
                _.select("rect.nv-rangeMin").attr("height", m).attr("width", P(k)).attr("x", B(k)).attr("width", P(k > 0 ? C : k)).attr("x", B(k > 0 ? C : k)).datum(k > 0 ? C : k);
                _.select("rect.nv-measure").style("fill", d).attr("height", m / 3).attr("y", m / 3).attr("width", w < 0 ? T(0) - T(w[0]) : T(w[0]) - T(0)).attr("x", B(w)).on("mouseover", function() {
                    v.elementMouseover({
                        value: w[0],
                        label: x[0] || "Current",
                        pos: [ T(w[0]), m / 2 ]
                    });
                }).on("mouseout", function() {
                    v.elementMouseout({
                        value: w[0],
                        label: x[0] || "Current"
                    });
                });
                var j = m / 6;
                b[0] ? _.selectAll("path.nv-markerTriangle").attr("transform", function(e) {
                    return "translate(" + T(b[0]) + "," + m / 2 + ")";
                }).attr("d", "M0," + j + "L" + j + "," + -j + " " + -j + "," + -j + "Z").on("mouseover", function() {
                    v.elementMouseover({
                        value: b[0],
                        label: S[0] || "Previous",
                        pos: [ T(b[0]), m / 2 ]
                    });
                }).on("mouseout", function() {
                    v.elementMouseout({
                        value: b[0],
                        label: S[0] || "Previous"
                    });
                }) : _.selectAll("path.nv-markerTriangle").remove();
                A.selectAll(".nv-range").on("mouseover", function(e, t) {
                    var n = E[t] || (t ? t == 1 ? "Mean" : "Minimum" : "Maximum");
                    v.elementMouseover({
                        value: e,
                        label: n,
                        pos: [ T(e), m / 2 ]
                    });
                }).on("mouseout", function(e, t) {
                    var n = E[t] || (t ? t == 1 ? "Mean" : "Minimum" : "Maximum");
                    v.elementMouseout({
                        value: e,
                        label: n
                    });
                });
            });
            return m;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = "left", r = !1, i = function(e) {
            return e.ranges;
        }, s = function(e) {
            return e.markers;
        }, o = function(e) {
            return e.measures;
        }, u = function(e) {
            return e.rangeLabels ? e.rangeLabels : [];
        }, a = function(e) {
            return e.markerLabels ? e.markerLabels : [];
        }, f = function(e) {
            return e.measureLabels ? e.measureLabels : [];
        }, l = [ 0 ], c = 380, h = 30, p = null, d = e.utils.getColor([ "#1f77b4" ]), v = d3.dispatch("elementMouseover", "elementMouseout");
        m.dispatch = v;
        m.options = e.utils.optionsFunc.bind(m);
        m.orient = function(e) {
            if (!arguments.length) return n;
            n = e;
            r = n == "right" || n == "bottom";
            return m;
        };
        m.ranges = function(e) {
            if (!arguments.length) return i;
            i = e;
            return m;
        };
        m.markers = function(e) {
            if (!arguments.length) return s;
            s = e;
            return m;
        };
        m.measures = function(e) {
            if (!arguments.length) return o;
            o = e;
            return m;
        };
        m.forceX = function(e) {
            if (!arguments.length) return l;
            l = e;
            return m;
        };
        m.width = function(e) {
            if (!arguments.length) return c;
            c = e;
            return m;
        };
        m.height = function(e) {
            if (!arguments.length) return h;
            h = e;
            return m;
        };
        m.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return m;
        };
        m.tickFormat = function(e) {
            if (!arguments.length) return p;
            p = e;
            return m;
        };
        m.color = function(t) {
            if (!arguments.length) return d;
            d = e.utils.getColor(t);
            return m;
        };
        return m;
    };
    e.models.bulletChart = function() {
        "use strict";
        function m(e) {
            e.each(function(n, h) {
                var g = d3.select(this), y = (a || parseInt(g.style("width")) || 960) - i.left - i.right, b = f - i.top - i.bottom, w = this;
                m.update = function() {
                    m(e);
                };
                m.container = this;
                if (!n || !s.call(this, n, h)) {
                    var E = g.selectAll(".nv-noData").data([ p ]);
                    E.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    E.attr("x", i.left + y / 2).attr("y", 18 + i.top + b / 2).text(function(e) {
                        return e;
                    });
                    return m;
                }
                g.selectAll(".nv-noData").remove();
                var S = s.call(this, n, h).slice().sort(d3.descending), x = o.call(this, n, h).slice().sort(d3.descending), T = u.call(this, n, h).slice().sort(d3.descending), N = g.selectAll("g.nv-wrap.nv-bulletChart").data([ n ]), C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-bulletChart"), k = C.append("g"), L = N.select("g");
                k.append("g").attr("class", "nv-bulletWrap");
                k.append("g").attr("class", "nv-titles");
                N.attr("transform", "translate(" + i.left + "," + i.top + ")");
                var A = d3.scale.linear().domain([ 0, Math.max(S[0], x[0], T[0]) ]).range(r ? [ y, 0 ] : [ 0, y ]), O = this.__chart__ || d3.scale.linear().domain([ 0, Infinity ]).range(A.range());
                this.__chart__ = A;
                var M = function(e) {
                    return Math.abs(O(e) - O(0));
                }, _ = function(e) {
                    return Math.abs(A(e) - A(0));
                }, D = k.select(".nv-titles").append("g").attr("text-anchor", "end").attr("transform", "translate(-6," + (f - i.top - i.bottom) / 2 + ")");
                D.append("text").attr("class", "nv-title").text(function(e) {
                    return e.title;
                });
                D.append("text").attr("class", "nv-subtitle").attr("dy", "1em").text(function(e) {
                    return e.subtitle;
                });
                t.width(y).height(b);
                var P = L.select(".nv-bulletWrap");
                d3.transition(P).call(t);
                var H = l || A.tickFormat(y / 100), B = L.selectAll("g.nv-tick").data(A.ticks(y / 50), function(e) {
                    return this.textContent || H(e);
                }), j = B.enter().append("g").attr("class", "nv-tick").attr("transform", function(e) {
                    return "translate(" + O(e) + ",0)";
                }).style("opacity", 1e-6);
                j.append("line").attr("y1", b).attr("y2", b * 7 / 6);
                j.append("text").attr("text-anchor", "middle").attr("dy", "1em").attr("y", b * 7 / 6).text(H);
                var F = d3.transition(B).attr("transform", function(e) {
                    return "translate(" + A(e) + ",0)";
                }).style("opacity", 1);
                F.select("line").attr("y1", b).attr("y2", b * 7 / 6);
                F.select("text").attr("y", b * 7 / 6);
                d3.transition(B.exit()).attr("transform", function(e) {
                    return "translate(" + A(e) + ",0)";
                }).style("opacity", 1e-6).remove();
                d.on("tooltipShow", function(e) {
                    e.key = n.title;
                    c && v(e, w.parentNode);
                });
            });
            d3.timer.flush();
            return m;
        }
        var t = e.models.bullet(), n = "left", r = !1, i = {
            top: 5,
            right: 40,
            bottom: 20,
            left: 120
        }, s = function(e) {
            return e.ranges;
        }, o = function(e) {
            return e.markers;
        }, u = function(e) {
            return e.measures;
        }, a = null, f = 55, l = null, c = !0, h = function(e, t, n, r, i) {
            return "<h3>" + t + "</h3>" + "<p>" + n + "</p>";
        }, p = "No Data Available.", d = d3.dispatch("tooltipShow", "tooltipHide"), v = function(t, n) {
            var r = t.pos[0] + (n.offsetLeft || 0) + i.left, s = t.pos[1] + (n.offsetTop || 0) + i.top, o = h(t.key, t.label, t.value, t, m);
            e.tooltip.show([ r, s ], o, t.value < 0 ? "e" : "w", null, n);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            d.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            d.tooltipHide(e);
        });
        d.on("tooltipHide", function() {
            c && e.tooltip.cleanup();
        });
        m.dispatch = d;
        m.bullet = t;
        d3.rebind(m, t, "color");
        m.options = e.utils.optionsFunc.bind(m);
        m.orient = function(e) {
            if (!arguments.length) return n;
            n = e;
            r = n == "right" || n == "bottom";
            return m;
        };
        m.ranges = function(e) {
            if (!arguments.length) return s;
            s = e;
            return m;
        };
        m.markers = function(e) {
            if (!arguments.length) return o;
            o = e;
            return m;
        };
        m.measures = function(e) {
            if (!arguments.length) return u;
            u = e;
            return m;
        };
        m.width = function(e) {
            if (!arguments.length) return a;
            a = e;
            return m;
        };
        m.height = function(e) {
            if (!arguments.length) return f;
            f = e;
            return m;
        };
        m.margin = function(e) {
            if (!arguments.length) return i;
            i.top = typeof e.top != "undefined" ? e.top : i.top;
            i.right = typeof e.right != "undefined" ? e.right : i.right;
            i.bottom = typeof e.bottom != "undefined" ? e.bottom : i.bottom;
            i.left = typeof e.left != "undefined" ? e.left : i.left;
            return m;
        };
        m.tickFormat = function(e) {
            if (!arguments.length) return l;
            l = e;
            return m;
        };
        m.tooltips = function(e) {
            if (!arguments.length) return c;
            c = e;
            return m;
        };
        m.tooltipContent = function(e) {
            if (!arguments.length) return h;
            h = e;
            return m;
        };
        m.noData = function(e) {
            if (!arguments.length) return p;
            p = e;
            return m;
        };
        return m;
    };
    e.models.cumulativeLineChart = function() {
        "use strict";
        function _(b) {
            b.each(function(b) {
                function q(e, t) {
                    d3.select(_.container).style("cursor", "ew-resize");
                }
                function R(e, t) {
                    O.x = d3.event.x;
                    O.i = Math.round(A.invert(O.x));
                    rt();
                }
                function U(e, t) {
                    d3.select(_.container).style("cursor", "auto");
                    x.index = O.i;
                    k.stateChange(x);
                }
                function rt() {
                    nt.data([ O ]);
                    var e = _.transitionDuration();
                    _.transitionDuration(0);
                    _.update();
                    _.transitionDuration(e);
                }
                var P = d3.select(this).classed("nv-chart-" + S, !0), H = this, B = (f || parseInt(P.style("width")) || 960) - u.left - u.right, j = (l || parseInt(P.style("height")) || 400) - u.top - u.bottom;
                _.update = function() {
                    P.transition().duration(L).call(_);
                };
                _.container = this;
                x.disabled = b.map(function(e) {
                    return !!e.disabled;
                });
                if (!T) {
                    var F;
                    T = {};
                    for (F in x) x[F] instanceof Array ? T[F] = x[F].slice(0) : T[F] = x[F];
                }
                var I = d3.behavior.drag().on("dragstart", q).on("drag", R).on("dragend", U);
                if (!b || !b.length || !b.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var z = P.selectAll(".nv-noData").data([ N ]);
                    z.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    z.attr("x", u.left + B / 2).attr("y", u.top + j / 2).text(function(e) {
                        return e;
                    });
                    return _;
                }
                P.selectAll(".nv-noData").remove();
                w = t.xScale();
                E = t.yScale();
                if (!y) {
                    var W = b.filter(function(e) {
                        return !e.disabled;
                    }).map(function(e, n) {
                        var r = d3.extent(e.values, t.y());
                        r[0] < -0.95 && (r[0] = -0.95);
                        return [ (r[0] - r[1]) / (1 + r[1]), (r[1] - r[0]) / (1 + r[0]) ];
                    }), X = [ d3.min(W, function(e) {
                        return e[0];
                    }), d3.max(W, function(e) {
                        return e[1];
                    }) ];
                    t.yDomain(X);
                } else t.yDomain(null);
                A.domain([ 0, b[0].values.length - 1 ]).range([ 0, B ]).clamp(!0);
                var b = D(O.i, b), V = g ? "none" : "all", $ = P.selectAll("g.nv-wrap.nv-cumulativeLine").data([ b ]), J = $.enter().append("g").attr("class", "nvd3 nv-wrap nv-cumulativeLine").append("g"), K = $.select("g");
                J.append("g").attr("class", "nv-interactive");
                J.append("g").attr("class", "nv-x nv-axis").style("pointer-events", "none");
                J.append("g").attr("class", "nv-y nv-axis");
                J.append("g").attr("class", "nv-background");
                J.append("g").attr("class", "nv-linesWrap").style("pointer-events", V);
                J.append("g").attr("class", "nv-avgLinesWrap").style("pointer-events", "none");
                J.append("g").attr("class", "nv-legendWrap");
                J.append("g").attr("class", "nv-controlsWrap");
                if (c) {
                    i.width(B);
                    K.select(".nv-legendWrap").datum(b).call(i);
                    if (u.top != i.height()) {
                        u.top = i.height();
                        j = (l || parseInt(P.style("height")) || 400) - u.top - u.bottom;
                    }
                    K.select(".nv-legendWrap").attr("transform", "translate(0," + -u.top + ")");
                }
                if (m) {
                    var Q = [ {
                        key: "Re-scale y-axis",
                        disabled: !y
                    } ];
                    s.width(140).color([ "#444", "#444", "#444" ]);
                    K.select(".nv-controlsWrap").datum(Q).attr("transform", "translate(0," + -u.top + ")").call(s);
                }
                $.attr("transform", "translate(" + u.left + "," + u.top + ")");
                d && K.select(".nv-y.nv-axis").attr("transform", "translate(" + B + ",0)");
                var G = b.filter(function(e) {
                    return e.tempDisabled;
                });
                $.select(".tempDisabled").remove();
                G.length && $.append("text").attr("class", "tempDisabled").attr("x", B / 2).attr("y", "-.71em").style("text-anchor", "end").text(G.map(function(e) {
                    return e.key;
                }).join(", ") + " values cannot be calculated for this time period.");
                if (g) {
                    o.width(B).height(j).margin({
                        left: u.left,
                        top: u.top
                    }).svgContainer(P).xScale(w);
                    $.select(".nv-interactive").call(o);
                }
                J.select(".nv-background").append("rect");
                K.select(".nv-background rect").attr("width", B).attr("height", j);
                t.y(function(e) {
                    return e.display.y;
                }).width(B).height(j).color(b.map(function(e, t) {
                    return e.color || a(e, t);
                }).filter(function(e, t) {
                    return !b[t].disabled && !b[t].tempDisabled;
                }));
                var Y = K.select(".nv-linesWrap").datum(b.filter(function(e) {
                    return !e.disabled && !e.tempDisabled;
                }));
                Y.call(t);
                b.forEach(function(e, t) {
                    e.seriesIndex = t;
                });
                var Z = b.filter(function(e) {
                    return !e.disabled && !!C(e);
                }), et = K.select(".nv-avgLinesWrap").selectAll("line").data(Z, function(e) {
                    return e.key;
                }), tt = function(e) {
                    var t = E(C(e));
                    return t < 0 ? 0 : t > j ? j : t;
                };
                et.enter().append("line").style("stroke-width", 2).style("stroke-dasharray", "10,10").style("stroke", function(e, n) {
                    return t.color()(e, e.seriesIndex);
                }).attr("x1", 0).attr("x2", B).attr("y1", tt).attr("y2", tt);
                et.style("stroke-opacity", function(e) {
                    var t = E(C(e));
                    return t < 0 || t > j ? 0 : 1;
                }).attr("x1", 0).attr("x2", B).attr("y1", tt).attr("y2", tt);
                et.exit().remove();
                var nt = Y.selectAll(".nv-indexLine").data([ O ]);
                nt.enter().append("rect").attr("class", "nv-indexLine").attr("width", 3).attr("x", -2).attr("fill", "red").attr("fill-opacity", .5).style("pointer-events", "all").call(I);
                nt.attr("transform", function(e) {
                    return "translate(" + A(e.i) + ",0)";
                }).attr("height", j);
                if (h) {
                    n.scale(w).ticks(Math.min(b[0].values.length, B / 70)).tickSize(-j, 0);
                    K.select(".nv-x.nv-axis").attr("transform", "translate(0," + E.range()[0] + ")");
                    d3.transition(K.select(".nv-x.nv-axis")).call(n);
                }
                if (p) {
                    r.scale(E).ticks(j / 36).tickSize(-B, 0);
                    d3.transition(K.select(".nv-y.nv-axis")).call(r);
                }
                K.select(".nv-background rect").on("click", function() {
                    O.x = d3.mouse(this)[0];
                    O.i = Math.round(A.invert(O.x));
                    x.index = O.i;
                    k.stateChange(x);
                    rt();
                });
                t.dispatch.on("elementClick", function(e) {
                    O.i = e.pointIndex;
                    O.x = A(O.i);
                    x.index = O.i;
                    k.stateChange(x);
                    rt();
                });
                s.dispatch.on("legendClick", function(e, t) {
                    e.disabled = !e.disabled;
                    y = !e.disabled;
                    x.rescaleY = y;
                    k.stateChange(x);
                    _.update();
                });
                i.dispatch.on("stateChange", function(e) {
                    x.disabled = e.disabled;
                    k.stateChange(x);
                    _.update();
                });
                o.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var s, f, l, c = [];
                    b.filter(function(e, t) {
                        e.seriesIndex = t;
                        return !e.disabled;
                    }).forEach(function(n, r) {
                        f = e.interactiveBisect(n.values, i.pointXValue, _.x());
                        t.highlightPoint(r, f, !0);
                        var o = n.values[f];
                        if (typeof o == "undefined") return;
                        typeof s == "undefined" && (s = o);
                        typeof l == "undefined" && (l = _.xScale()(_.x()(o, f)));
                        c.push({
                            key: n.key,
                            value: _.y()(o, f),
                            color: a(n, n.seriesIndex)
                        });
                    });
                    var h = n.tickFormat()(_.x()(s, f));
                    o.tooltip.position({
                        left: l + u.left,
                        top: i.mouseY + u.top
                    }).chartContainer(H.parentNode).enabled(v).valueFormatter(function(e, t) {
                        return r.tickFormat()(e);
                    }).data({
                        value: h,
                        series: c
                    })();
                    o.renderGuideLine(l);
                });
                o.dispatch.on("elementMouseout", function(e) {
                    k.tooltipHide();
                    t.clearHighlights();
                });
                k.on("tooltipShow", function(e) {
                    v && M(e, H.parentNode);
                });
                k.on("changeState", function(e) {
                    if (typeof e.disabled != "undefined") {
                        b.forEach(function(t, n) {
                            t.disabled = e.disabled[n];
                        });
                        x.disabled = e.disabled;
                    }
                    if (typeof e.index != "undefined") {
                        O.i = e.index;
                        O.x = A(O.i);
                        x.index = e.index;
                        nt.data([ O ]);
                    }
                    typeof e.rescaleY != "undefined" && (y = e.rescaleY);
                    _.update();
                });
            });
            return _;
        }
        function D(e, n) {
            return n.map(function(n, r) {
                if (!n.values) return n;
                var i = t.y()(n.values[e], e);
                if (i < -0.95) {
                    n.tempDisabled = !0;
                    return n;
                }
                n.tempDisabled = !1;
                n.values = n.values.map(function(e, n) {
                    e.display = {
                        y: (t.y()(e, n) - i) / (1 + i)
                    };
                    return e;
                });
                return n;
            });
        }
        var t = e.models.line(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.models.legend(), o = e.interactiveGuideline(), u = {
            top: 30,
            right: 30,
            bottom: 50,
            left: 60
        }, a = e.utils.defaultColor(), f = null, l = null, c = !0, h = !0, p = !0, d = !1, v = !0, m = !0, g = !1, y = !0, b = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>";
        }, w, E, S = t.id(), x = {
            index: 0,
            rescaleY: y
        }, T = null, N = "No Data Available.", C = function(e) {
            return e.average;
        }, k = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), L = 250;
        n.orient("bottom").tickPadding(7);
        r.orient(d ? "right" : "left");
        s.updateState(!1);
        var A = d3.scale.linear(), O = {
            i: 0,
            x: 0
        }, M = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0), u = i.pos[1] + (s.offsetTop || 0), a = n.tickFormat()(t.x()(i.point, i.pointIndex)), f = r.tickFormat()(t.y()(i.point, i.pointIndex)), l = b(i.series.key, a, f, i, _);
            e.tooltip.show([ o, u ], l, null, null, s);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + u.left, e.pos[1] + u.top ];
            k.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            k.tooltipHide(e);
        });
        k.on("tooltipHide", function() {
            v && e.tooltip.cleanup();
        });
        _.dispatch = k;
        _.lines = t;
        _.legend = i;
        _.xAxis = n;
        _.yAxis = r;
        _.interactiveLayer = o;
        d3.rebind(_, t, "defined", "isArea", "x", "y", "xScale", "yScale", "size", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "interactive", "clipEdge", "clipVoronoi", "useVoronoi", "id");
        _.options = e.utils.optionsFunc.bind(_);
        _.margin = function(e) {
            if (!arguments.length) return u;
            u.top = typeof e.top != "undefined" ? e.top : u.top;
            u.right = typeof e.right != "undefined" ? e.right : u.right;
            u.bottom = typeof e.bottom != "undefined" ? e.bottom : u.bottom;
            u.left = typeof e.left != "undefined" ? e.left : u.left;
            return _;
        };
        _.width = function(e) {
            if (!arguments.length) return f;
            f = e;
            return _;
        };
        _.height = function(e) {
            if (!arguments.length) return l;
            l = e;
            return _;
        };
        _.color = function(t) {
            if (!arguments.length) return a;
            a = e.utils.getColor(t);
            i.color(a);
            return _;
        };
        _.rescaleY = function(e) {
            if (!arguments.length) return y;
            y = e;
            return y;
        };
        _.showControls = function(e) {
            if (!arguments.length) return m;
            m = e;
            return _;
        };
        _.useInteractiveGuideline = function(e) {
            if (!arguments.length) return g;
            g = e;
            if (e === !0) {
                _.interactive(!1);
                _.useVoronoi(!1);
            }
            return _;
        };
        _.showLegend = function(e) {
            if (!arguments.length) return c;
            c = e;
            return _;
        };
        _.showXAxis = function(e) {
            if (!arguments.length) return h;
            h = e;
            return _;
        };
        _.showYAxis = function(e) {
            if (!arguments.length) return p;
            p = e;
            return _;
        };
        _.rightAlignYAxis = function(e) {
            if (!arguments.length) return d;
            d = e;
            r.orient(e ? "right" : "left");
            return _;
        };
        _.tooltips = function(e) {
            if (!arguments.length) return v;
            v = e;
            return _;
        };
        _.tooltipContent = function(e) {
            if (!arguments.length) return b;
            b = e;
            return _;
        };
        _.state = function(e) {
            if (!arguments.length) return x;
            x = e;
            return _;
        };
        _.defaultState = function(e) {
            if (!arguments.length) return T;
            T = e;
            return _;
        };
        _.noData = function(e) {
            if (!arguments.length) return N;
            N = e;
            return _;
        };
        _.average = function(e) {
            if (!arguments.length) return C;
            C = e;
            return _;
        };
        _.transitionDuration = function(e) {
            if (!arguments.length) return L;
            L = e;
            return _;
        };
        return _;
    };
    e.models.discreteBar = function() {
        "use strict";
        function E(e) {
            e.each(function(e) {
                var i = n - t.left - t.right, E = r - t.top - t.bottom, S = d3.select(this);
                e = e.map(function(e, t) {
                    e.values = e.values.map(function(e) {
                        e.series = t;
                        return e;
                    });
                    return e;
                });
                var T = p && d ? [] : e.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0
                        };
                    });
                });
                s.domain(p || d3.merge(T).map(function(e) {
                    return e.x;
                })).rangeBands(v || [ 0, i ], .1);
                o.domain(d || d3.extent(d3.merge(T).map(function(e) {
                    return e.y;
                }).concat(f)));
                c ? o.range(m || [ E - (o.domain()[0] < 0 ? 12 : 0), o.domain()[1] > 0 ? 12 : 0 ]) : o.range(m || [ E, 0 ]);
                b = b || s;
                w = w || o.copy().range([ o(0), o(0) ]);
                var N = S.selectAll("g.nv-wrap.nv-discretebar").data([ e ]), C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-discretebar"), k = C.append("g"), L = N.select("g");
                k.append("g").attr("class", "nv-groups");
                N.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var A = N.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e;
                }, function(e) {
                    return e.key;
                });
                A.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6);
                A.exit().transition().style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6).remove();
                A.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t;
                }).classed("hover", function(e) {
                    return e.hover;
                });
                A.transition().style("stroke-opacity", 1).style("fill-opacity", .75);
                var O = A.selectAll("g.nv-bar").data(function(e) {
                    return e.values;
                });
                O.exit().remove();
                var M = O.enter().append("g").attr("transform", function(e, t, n) {
                    return "translate(" + (s(u(e, t)) + s.rangeBand() * .05) + ", " + o(0) + ")";
                }).on("mouseover", function(t, n) {
                    d3.select(this).classed("hover", !0);
                    g.elementMouseover({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ s(u(t, n)) + s.rangeBand() * (t.series + .5) / e.length, o(a(t, n)) ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                }).on("mouseout", function(t, n) {
                    d3.select(this).classed("hover", !1);
                    g.elementMouseout({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                }).on("click", function(t, n) {
                    g.elementClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ s(u(t, n)) + s.rangeBand() * (t.series + .5) / e.length, o(a(t, n)) ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                    d3.event.stopPropagation();
                }).on("dblclick", function(t, n) {
                    g.elementDblClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ s(u(t, n)) + s.rangeBand() * (t.series + .5) / e.length, o(a(t, n)) ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                    d3.event.stopPropagation();
                });
                M.append("rect").attr("height", 0).attr("width", s.rangeBand() * .9 / e.length);
                if (c) {
                    M.append("text").attr("text-anchor", "middle");
                    O.select("text").text(function(e, t) {
                        return h(a(e, t));
                    }).transition().attr("x", s.rangeBand() * .9 / 2).attr("y", function(e, t) {
                        return a(e, t) < 0 ? o(a(e, t)) - o(0) + 12 : -4;
                    });
                } else O.selectAll("text").remove();
                O.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive";
                }).style("fill", function(e, t) {
                    return e.color || l(e, t);
                }).style("stroke", function(e, t) {
                    return e.color || l(e, t);
                }).select("rect").attr("class", y).transition().attr("width", s.rangeBand() * .9 / e.length);
                O.transition().attr("transform", function(e, t) {
                    var n = s(u(e, t)) + s.rangeBand() * .05, r = a(e, t) < 0 ? o(0) : o(0) - o(a(e, t)) < 1 ? o(0) - 1 : o(a(e, t));
                    return "translate(" + n + ", " + r + ")";
                }).select("rect").attr("height", function(e, t) {
                    return Math.max(Math.abs(o(a(e, t)) - o(d && d[0] || 0)) || 1);
                });
                b = s.copy();
                w = o.copy();
            });
            return E;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = Math.floor(Math.random() * 1e4), s = d3.scale.ordinal(), o = d3.scale.linear(), u = function(e) {
            return e.x;
        }, a = function(e) {
            return e.y;
        }, f = [ 0 ], l = e.utils.defaultColor(), c = !1, h = d3.format(",.2f"), p, d, v, m, g = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"), y = "discreteBar", b, w;
        E.dispatch = g;
        E.options = e.utils.optionsFunc.bind(E);
        E.x = function(e) {
            if (!arguments.length) return u;
            u = e;
            return E;
        };
        E.y = function(e) {
            if (!arguments.length) return a;
            a = e;
            return E;
        };
        E.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return E;
        };
        E.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return E;
        };
        E.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return E;
        };
        E.xScale = function(e) {
            if (!arguments.length) return s;
            s = e;
            return E;
        };
        E.yScale = function(e) {
            if (!arguments.length) return o;
            o = e;
            return E;
        };
        E.xDomain = function(e) {
            if (!arguments.length) return p;
            p = e;
            return E;
        };
        E.yDomain = function(e) {
            if (!arguments.length) return d;
            d = e;
            return E;
        };
        E.xRange = function(e) {
            if (!arguments.length) return v;
            v = e;
            return E;
        };
        E.yRange = function(e) {
            if (!arguments.length) return m;
            m = e;
            return E;
        };
        E.forceY = function(e) {
            if (!arguments.length) return f;
            f = e;
            return E;
        };
        E.color = function(t) {
            if (!arguments.length) return l;
            l = e.utils.getColor(t);
            return E;
        };
        E.id = function(e) {
            if (!arguments.length) return i;
            i = e;
            return E;
        };
        E.showValues = function(e) {
            if (!arguments.length) return c;
            c = e;
            return E;
        };
        E.valueFormat = function(e) {
            if (!arguments.length) return h;
            h = e;
            return E;
        };
        E.rectClass = function(e) {
            if (!arguments.length) return y;
            y = e;
            return E;
        };
        return E;
    };
    e.models.discreteBarChart = function() {
        "use strict";
        function w(e) {
            e.each(function(e) {
                var u = d3.select(this), p = this, E = (s || parseInt(u.style("width")) || 960) - i.left - i.right, S = (o || parseInt(u.style("height")) || 400) - i.top - i.bottom;
                w.update = function() {
                    g.beforeUpdate();
                    u.transition().duration(y).call(w);
                };
                w.container = this;
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var T = u.selectAll(".nv-noData").data([ m ]);
                    T.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    T.attr("x", i.left + E / 2).attr("y", i.top + S / 2).text(function(e) {
                        return e;
                    });
                    return w;
                }
                u.selectAll(".nv-noData").remove();
                d = t.xScale();
                v = t.yScale().clamp(!0);
                var N = u.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([ e ]), C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-discreteBarWithAxes").append("g"), k = C.append("defs"), L = N.select("g");
                C.append("g").attr("class", "nv-x nv-axis");
                C.append("g").attr("class", "nv-y nv-axis");
                C.append("g").attr("class", "nv-barsWrap");
                L.attr("transform", "translate(" + i.left + "," + i.top + ")");
                l && L.select(".nv-y.nv-axis").attr("transform", "translate(" + E + ",0)");
                t.width(E).height(S);
                var A = L.select(".nv-barsWrap").datum(e.filter(function(e) {
                    return !e.disabled;
                }));
                A.transition().call(t);
                k.append("clipPath").attr("id", "nv-x-label-clip-" + t.id()).append("rect");
                L.select("#nv-x-label-clip-" + t.id() + " rect").attr("width", d.rangeBand() * (c ? 2 : 1)).attr("height", 16).attr("x", -d.rangeBand() / (c ? 1 : 2));
                if (a) {
                    n.scale(d).ticks(E / 100).tickSize(-S, 0);
                    L.select(".nv-x.nv-axis").attr("transform", "translate(0," + (v.range()[0] + (t.showValues() && v.domain()[0] < 0 ? 16 : 0)) + ")");
                    L.select(".nv-x.nv-axis").transition().call(n);
                    var O = L.select(".nv-x.nv-axis").selectAll("g");
                    c && O.selectAll("text").attr("transform", function(e, t, n) {
                        return "translate(0," + (n % 2 == 0 ? "5" : "17") + ")";
                    });
                }
                if (f) {
                    r.scale(v).ticks(S / 36).tickSize(-E, 0);
                    L.select(".nv-y.nv-axis").transition().call(r);
                }
                g.on("tooltipShow", function(e) {
                    h && b(e, p.parentNode);
                });
            });
            return w;
        }
        var t = e.models.discreteBar(), n = e.models.axis(), r = e.models.axis(), i = {
            top: 15,
            right: 10,
            bottom: 50,
            left: 60
        }, s = null, o = null, u = e.utils.getColor(), a = !0, f = !0, l = !1, c = !1, h = !0, p = function(e, t, n, r, i) {
            return "<h3>" + t + "</h3>" + "<p>" + n + "</p>";
        }, d, v, m = "No Data Available.", g = d3.dispatch("tooltipShow", "tooltipHide", "beforeUpdate"), y = 250;
        n.orient("bottom").highlightZero(!1).showMaxMin(!1).tickFormat(function(e) {
            return e;
        });
        r.orient(l ? "right" : "left").tickFormat(d3.format(",.1f"));
        var b = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0), u = i.pos[1] + (s.offsetTop || 0), a = n.tickFormat()(t.x()(i.point, i.pointIndex)), f = r.tickFormat()(t.y()(i.point, i.pointIndex)), l = p(i.series.key, a, f, i, w);
            e.tooltip.show([ o, u ], l, i.value < 0 ? "n" : "s", null, s);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + i.left, e.pos[1] + i.top ];
            g.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            g.tooltipHide(e);
        });
        g.on("tooltipHide", function() {
            h && e.tooltip.cleanup();
        });
        w.dispatch = g;
        w.discretebar = t;
        w.xAxis = n;
        w.yAxis = r;
        d3.rebind(w, t, "x", "y", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "id", "showValues", "valueFormat");
        w.options = e.utils.optionsFunc.bind(w);
        w.margin = function(e) {
            if (!arguments.length) return i;
            i.top = typeof e.top != "undefined" ? e.top : i.top;
            i.right = typeof e.right != "undefined" ? e.right : i.right;
            i.bottom = typeof e.bottom != "undefined" ? e.bottom : i.bottom;
            i.left = typeof e.left != "undefined" ? e.left : i.left;
            return w;
        };
        w.width = function(e) {
            if (!arguments.length) return s;
            s = e;
            return w;
        };
        w.height = function(e) {
            if (!arguments.length) return o;
            o = e;
            return w;
        };
        w.color = function(n) {
            if (!arguments.length) return u;
            u = e.utils.getColor(n);
            t.color(u);
            return w;
        };
        w.showXAxis = function(e) {
            if (!arguments.length) return a;
            a = e;
            return w;
        };
        w.showYAxis = function(e) {
            if (!arguments.length) return f;
            f = e;
            return w;
        };
        w.rightAlignYAxis = function(e) {
            if (!arguments.length) return l;
            l = e;
            r.orient(e ? "right" : "left");
            return w;
        };
        w.staggerLabels = function(e) {
            if (!arguments.length) return c;
            c = e;
            return w;
        };
        w.tooltips = function(e) {
            if (!arguments.length) return h;
            h = e;
            return w;
        };
        w.tooltipContent = function(e) {
            if (!arguments.length) return p;
            p = e;
            return w;
        };
        w.noData = function(e) {
            if (!arguments.length) return m;
            m = e;
            return w;
        };
        w.transitionDuration = function(e) {
            if (!arguments.length) return y;
            y = e;
            return w;
        };
        return w;
    };
    e.models.distribution = function() {
        "use strict";
        function l(e) {
            e.each(function(e) {
                var a = n - (i === "x" ? t.left + t.right : t.top + t.bottom), l = i == "x" ? "y" : "x", c = d3.select(this);
                f = f || u;
                var h = c.selectAll("g.nv-distribution").data([ e ]), p = h.enter().append("g").attr("class", "nvd3 nv-distribution"), d = p.append("g"), v = h.select("g");
                h.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var m = v.selectAll("g.nv-dist").data(function(e) {
                    return e;
                }, function(e) {
                    return e.key;
                });
                m.enter().append("g");
                m.attr("class", function(e, t) {
                    return "nv-dist nv-series-" + t;
                }).style("stroke", function(e, t) {
                    return o(e, t);
                });
                var g = m.selectAll("line.nv-dist" + i).data(function(e) {
                    return e.values;
                });
                g.enter().append("line").attr(i + "1", function(e, t) {
                    return f(s(e, t));
                }).attr(i + "2", function(e, t) {
                    return f(s(e, t));
                });
                m.exit().selectAll("line.nv-dist" + i).transition().attr(i + "1", function(e, t) {
                    return u(s(e, t));
                }).attr(i + "2", function(e, t) {
                    return u(s(e, t));
                }).style("stroke-opacity", 0).remove();
                g.attr("class", function(e, t) {
                    return "nv-dist" + i + " nv-dist" + i + "-" + t;
                }).attr(l + "1", 0).attr(l + "2", r);
                g.transition().attr(i + "1", function(e, t) {
                    return u(s(e, t));
                }).attr(i + "2", function(e, t) {
                    return u(s(e, t));
                });
                f = u.copy();
            });
            return l;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 400, r = 8, i = "x", s = function(e) {
            return e[i];
        }, o = e.utils.defaultColor(), u = d3.scale.linear(), a, f;
        l.options = e.utils.optionsFunc.bind(l);
        l.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return l;
        };
        l.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return l;
        };
        l.axis = function(e) {
            if (!arguments.length) return i;
            i = e;
            return l;
        };
        l.size = function(e) {
            if (!arguments.length) return r;
            r = e;
            return l;
        };
        l.getData = function(e) {
            if (!arguments.length) return s;
            s = d3.functor(e);
            return l;
        };
        l.scale = function(e) {
            if (!arguments.length) return u;
            u = e;
            return l;
        };
        l.color = function(t) {
            if (!arguments.length) return o;
            o = e.utils.getColor(t);
            return l;
        };
        return l;
    };
    e.models.historicalBar = function() {
        "use strict";
        function w(E) {
            E.each(function(w) {
                var E = n - t.left - t.right, S = r - t.top - t.bottom, T = d3.select(this);
                s.domain(d || d3.extent(w[0].values.map(u).concat(f)));
                c ? s.range(m || [ E * .5 / w[0].values.length, E * (w[0].values.length - .5) / w[0].values.length ]) : s.range(m || [ 0, E ]);
                o.domain(v || d3.extent(w[0].values.map(a).concat(l))).range(g || [ S, 0 ]);
                s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([ s.domain()[0] - s.domain()[0] * .01, s.domain()[1] + s.domain()[1] * .01 ]) : s.domain([ -1, 1 ]));
                o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([ o.domain()[0] + o.domain()[0] * .01, o.domain()[1] - o.domain()[1] * .01 ]) : o.domain([ -1, 1 ]));
                var N = T.selectAll("g.nv-wrap.nv-historicalBar-" + i).data([ w[0].values ]), C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-historicalBar-" + i), k = C.append("defs"), L = C.append("g"), A = N.select("g");
                L.append("g").attr("class", "nv-bars");
                N.attr("transform", "translate(" + t.left + "," + t.top + ")");
                T.on("click", function(e, t) {
                    y.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: i
                    });
                });
                k.append("clipPath").attr("id", "nv-chart-clip-path-" + i).append("rect");
                N.select("#nv-chart-clip-path-" + i + " rect").attr("width", E).attr("height", S);
                A.attr("clip-path", h ? "url(#nv-chart-clip-path-" + i + ")" : "");
                var O = N.select(".nv-bars").selectAll(".nv-bar").data(function(e) {
                    return e;
                }, function(e, t) {
                    return u(e, t);
                });
                O.exit().remove();
                var M = O.enter().append("rect").attr("x", 0).attr("y", function(t, n) {
                    return e.utils.NaNtoZero(o(Math.max(0, a(t, n))));
                }).attr("height", function(t, n) {
                    return e.utils.NaNtoZero(Math.abs(o(a(t, n)) - o(0)));
                }).attr("transform", function(e, t) {
                    return "translate(" + (s(u(e, t)) - E / w[0].values.length * .45) + ",0)";
                }).on("mouseover", function(e, t) {
                    if (!b) return;
                    d3.select(this).classed("hover", !0);
                    y.elementMouseover({
                        point: e,
                        series: w[0],
                        pos: [ s(u(e, t)), o(a(e, t)) ],
                        pointIndex: t,
                        seriesIndex: 0,
                        e: d3.event
                    });
                }).on("mouseout", function(e, t) {
                    if (!b) return;
                    d3.select(this).classed("hover", !1);
                    y.elementMouseout({
                        point: e,
                        series: w[0],
                        pointIndex: t,
                        seriesIndex: 0,
                        e: d3.event
                    });
                }).on("click", function(e, t) {
                    if (!b) return;
                    y.elementClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [ s(u(e, t)), o(a(e, t)) ],
                        e: d3.event,
                        id: i
                    });
                    d3.event.stopPropagation();
                }).on("dblclick", function(e, t) {
                    if (!b) return;
                    y.elementDblClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [ s(u(e, t)), o(a(e, t)) ],
                        e: d3.event,
                        id: i
                    });
                    d3.event.stopPropagation();
                });
                O.attr("fill", function(e, t) {
                    return p(e, t);
                }).attr("class", function(e, t, n) {
                    return (a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive") + " nv-bar-" + n + "-" + t;
                }).transition().attr("transform", function(e, t) {
                    return "translate(" + (s(u(e, t)) - E / w[0].values.length * .45) + ",0)";
                }).attr("width", E / w[0].values.length * .9);
                O.transition().attr("y", function(t, n) {
                    var r = a(t, n) < 0 ? o(0) : o(0) - o(a(t, n)) < 1 ? o(0) - 1 : o(a(t, n));
                    return e.utils.NaNtoZero(r);
                }).attr("height", function(t, n) {
                    return e.utils.NaNtoZero(Math.max(Math.abs(o(a(t, n)) - o(0)), 1));
                });
            });
            return w;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = Math.floor(Math.random() * 1e4), s = d3.scale.linear(), o = d3.scale.linear(), u = function(e) {
            return e.x;
        }, a = function(e) {
            return e.y;
        }, f = [], l = [ 0 ], c = !1, h = !0, p = e.utils.defaultColor(), d, v, m, g, y = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"), b = !0;
        w.highlightPoint = function(e, t) {
            d3.select(".nv-historicalBar-" + i).select(".nv-bars .nv-bar-0-" + e).classed("hover", t);
        };
        w.clearHighlights = function() {
            d3.select(".nv-historicalBar-" + i).select(".nv-bars .nv-bar.hover").classed("hover", !1);
        };
        w.dispatch = y;
        w.options = e.utils.optionsFunc.bind(w);
        w.x = function(e) {
            if (!arguments.length) return u;
            u = e;
            return w;
        };
        w.y = function(e) {
            if (!arguments.length) return a;
            a = e;
            return w;
        };
        w.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return w;
        };
        w.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return w;
        };
        w.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return w;
        };
        w.xScale = function(e) {
            if (!arguments.length) return s;
            s = e;
            return w;
        };
        w.yScale = function(e) {
            if (!arguments.length) return o;
            o = e;
            return w;
        };
        w.xDomain = function(e) {
            if (!arguments.length) return d;
            d = e;
            return w;
        };
        w.yDomain = function(e) {
            if (!arguments.length) return v;
            v = e;
            return w;
        };
        w.xRange = function(e) {
            if (!arguments.length) return m;
            m = e;
            return w;
        };
        w.yRange = function(e) {
            if (!arguments.length) return g;
            g = e;
            return w;
        };
        w.forceX = function(e) {
            if (!arguments.length) return f;
            f = e;
            return w;
        };
        w.forceY = function(e) {
            if (!arguments.length) return l;
            l = e;
            return w;
        };
        w.padData = function(e) {
            if (!arguments.length) return c;
            c = e;
            return w;
        };
        w.clipEdge = function(e) {
            if (!arguments.length) return h;
            h = e;
            return w;
        };
        w.color = function(t) {
            if (!arguments.length) return p;
            p = e.utils.getColor(t);
            return w;
        };
        w.id = function(e) {
            if (!arguments.length) return i;
            i = e;
            return w;
        };
        w.interactive = function(e) {
            if (!arguments.length) return b;
            b = !1;
            return w;
        };
        return w;
    };
    e.models.historicalBarChart = function() {
        "use strict";
        function x(e) {
            e.each(function(d) {
                var T = d3.select(this), N = this, C = (u || parseInt(T.style("width")) || 960) - s.left - s.right, k = (a || parseInt(T.style("height")) || 400) - s.top - s.bottom;
                x.update = function() {
                    T.transition().duration(E).call(x);
                };
                x.container = this;
                g.disabled = d.map(function(e) {
                    return !!e.disabled;
                });
                if (!y) {
                    var L;
                    y = {};
                    for (L in g) g[L] instanceof Array ? y[L] = g[L].slice(0) : y[L] = g[L];
                }
                if (!d || !d.length || !d.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var A = T.selectAll(".nv-noData").data([ b ]);
                    A.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    A.attr("x", s.left + C / 2).attr("y", s.top + k / 2).text(function(e) {
                        return e;
                    });
                    return x;
                }
                T.selectAll(".nv-noData").remove();
                v = t.xScale();
                m = t.yScale();
                var O = T.selectAll("g.nv-wrap.nv-historicalBarChart").data([ d ]), M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-historicalBarChart").append("g"), _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis");
                M.append("g").attr("class", "nv-y nv-axis");
                M.append("g").attr("class", "nv-barsWrap");
                M.append("g").attr("class", "nv-legendWrap");
                if (f) {
                    i.width(C);
                    _.select(".nv-legendWrap").datum(d).call(i);
                    if (s.top != i.height()) {
                        s.top = i.height();
                        k = (a || parseInt(T.style("height")) || 400) - s.top - s.bottom;
                    }
                    O.select(".nv-legendWrap").attr("transform", "translate(0," + -s.top + ")");
                }
                O.attr("transform", "translate(" + s.left + "," + s.top + ")");
                h && _.select(".nv-y.nv-axis").attr("transform", "translate(" + C + ",0)");
                t.width(C).height(k).color(d.map(function(e, t) {
                    return e.color || o(e, t);
                }).filter(function(e, t) {
                    return !d[t].disabled;
                }));
                var D = _.select(".nv-barsWrap").datum(d.filter(function(e) {
                    return !e.disabled;
                }));
                D.transition().call(t);
                if (l) {
                    n.scale(v).tickSize(-k, 0);
                    _.select(".nv-x.nv-axis").attr("transform", "translate(0," + m.range()[0] + ")");
                    _.select(".nv-x.nv-axis").transition().call(n);
                }
                if (c) {
                    r.scale(m).ticks(k / 36).tickSize(-C, 0);
                    _.select(".nv-y.nv-axis").transition().call(r);
                }
                i.dispatch.on("legendClick", function(t, n) {
                    t.disabled = !t.disabled;
                    d.filter(function(e) {
                        return !e.disabled;
                    }).length || d.map(function(e) {
                        e.disabled = !1;
                        O.selectAll(".nv-series").classed("disabled", !1);
                        return e;
                    });
                    g.disabled = d.map(function(e) {
                        return !!e.disabled;
                    });
                    w.stateChange(g);
                    e.transition().call(x);
                });
                i.dispatch.on("legendDblclick", function(e) {
                    d.forEach(function(e) {
                        e.disabled = !0;
                    });
                    e.disabled = !1;
                    g.disabled = d.map(function(e) {
                        return !!e.disabled;
                    });
                    w.stateChange(g);
                    x.update();
                });
                w.on("tooltipShow", function(e) {
                    p && S(e, N.parentNode);
                });
                w.on("changeState", function(t) {
                    if (typeof t.disabled != "undefined") {
                        d.forEach(function(e, n) {
                            e.disabled = t.disabled[n];
                        });
                        g.disabled = t.disabled;
                    }
                    e.call(x);
                });
            });
            return x;
        }
        var t = e.models.historicalBar(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = {
            top: 30,
            right: 90,
            bottom: 50,
            left: 90
        }, o = e.utils.defaultColor(), u = null, a = null, f = !1, l = !0, c = !0, h = !1, p = !0, d = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>";
        }, v, m, g = {}, y = null, b = "No Data Available.", w = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), E = 250;
        n.orient("bottom").tickPadding(7);
        r.orient(h ? "right" : "left");
        var S = function(i, s) {
            if (s) {
                var o = d3.select(s).select("svg"), u = o.node() ? o.attr("viewBox") : null;
                if (u) {
                    u = u.split(" ");
                    var a = parseInt(o.style("width")) / u[2];
                    i.pos[0] = i.pos[0] * a;
                    i.pos[1] = i.pos[1] * a;
                }
            }
            var f = i.pos[0] + (s.offsetLeft || 0), l = i.pos[1] + (s.offsetTop || 0), c = n.tickFormat()(t.x()(i.point, i.pointIndex)), h = r.tickFormat()(t.y()(i.point, i.pointIndex)), p = d(i.series.key, c, h, i, x);
            e.tooltip.show([ f, l ], p, null, null, s);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + s.left, e.pos[1] + s.top ];
            w.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            w.tooltipHide(e);
        });
        w.on("tooltipHide", function() {
            p && e.tooltip.cleanup();
        });
        x.dispatch = w;
        x.bars = t;
        x.legend = i;
        x.xAxis = n;
        x.yAxis = r;
        d3.rebind(x, t, "defined", "isArea", "x", "y", "size", "xScale", "yScale", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "interactive", "clipEdge", "clipVoronoi", "id", "interpolate", "highlightPoint", "clearHighlights", "interactive");
        x.options = e.utils.optionsFunc.bind(x);
        x.margin = function(e) {
            if (!arguments.length) return s;
            s.top = typeof e.top != "undefined" ? e.top : s.top;
            s.right = typeof e.right != "undefined" ? e.right : s.right;
            s.bottom = typeof e.bottom != "undefined" ? e.bottom : s.bottom;
            s.left = typeof e.left != "undefined" ? e.left : s.left;
            return x;
        };
        x.width = function(e) {
            if (!arguments.length) return u;
            u = e;
            return x;
        };
        x.height = function(e) {
            if (!arguments.length) return a;
            a = e;
            return x;
        };
        x.color = function(t) {
            if (!arguments.length) return o;
            o = e.utils.getColor(t);
            i.color(o);
            return x;
        };
        x.showLegend = function(e) {
            if (!arguments.length) return f;
            f = e;
            return x;
        };
        x.showXAxis = function(e) {
            if (!arguments.length) return l;
            l = e;
            return x;
        };
        x.showYAxis = function(e) {
            if (!arguments.length) return c;
            c = e;
            return x;
        };
        x.rightAlignYAxis = function(e) {
            if (!arguments.length) return h;
            h = e;
            r.orient(e ? "right" : "left");
            return x;
        };
        x.tooltips = function(e) {
            if (!arguments.length) return p;
            p = e;
            return x;
        };
        x.tooltipContent = function(e) {
            if (!arguments.length) return d;
            d = e;
            return x;
        };
        x.state = function(e) {
            if (!arguments.length) return g;
            g = e;
            return x;
        };
        x.defaultState = function(e) {
            if (!arguments.length) return y;
            y = e;
            return x;
        };
        x.noData = function(e) {
            if (!arguments.length) return b;
            b = e;
            return x;
        };
        x.transitionDuration = function(e) {
            if (!arguments.length) return E;
            E = e;
            return x;
        };
        return x;
    };
    e.models.indentedTree = function() {
        "use strict";
        function g(e) {
            e.each(function(e) {
                function k(e, t, n) {
                    d3.event.stopPropagation();
                    if (d3.event.shiftKey && !n) {
                        d3.event.shiftKey = !1;
                        e.values && e.values.forEach(function(e) {
                            (e.values || e._values) && k(e, 0, !0);
                        });
                        return !0;
                    }
                    if (!O(e)) return !0;
                    if (e.values) {
                        e._values = e.values;
                        e.values = null;
                    } else {
                        e.values = e._values;
                        e._values = null;
                    }
                    g.update();
                }
                function L(e) {
                    return e._values && e._values.length ? h : e.values && e.values.length ? p : "";
                }
                function A(e) {
                    return e._values && e._values.length;
                }
                function O(e) {
                    var t = e.values || e._values;
                    return t && t.length;
                }
                var t = 1, n = d3.select(this), i = d3.layout.tree().children(function(e) {
                    return e.values;
                }).size([ r, f ]);
                g.update = function() {
                    n.transition().duration(600).call(g);
                };
                e[0] || (e[0] = {
                    key: a
                });
                var s = i.nodes(e[0]), y = d3.select(this).selectAll("div").data([ [ s ] ]), b = y.enter().append("div").attr("class", "nvd3 nv-wrap nv-indentedtree"), w = b.append("table"), E = y.select("table").attr("width", "100%").attr("class", c);
                if (o) {
                    var S = w.append("thead"), x = S.append("tr");
                    l.forEach(function(e) {
                        x.append("th").attr("width", e.width ? e.width : "10%").style("text-align", e.type == "numeric" ? "right" : "left").append("span").text(e.label);
                    });
                }
                var T = E.selectAll("tbody").data(function(e) {
                    return e;
                });
                T.enter().append("tbody");
                t = d3.max(s, function(e) {
                    return e.depth;
                });
                i.size([ r, t * f ]);
                var N = T.selectAll("tr").data(function(e) {
                    return e.filter(function(e) {
                        return u && !e.children ? u(e) : !0;
                    });
                }, function(e, t) {
                    return e.id || e.id || ++m;
                });
                N.exit().remove();
                N.select("img.nv-treeicon").attr("src", L).classed("folded", A);
                var C = N.enter().append("tr");
                l.forEach(function(e, t) {
                    var n = C.append("td").style("padding-left", function(e) {
                        return (t ? 0 : e.depth * f + 12 + (L(e) ? 0 : 16)) + "px";
                    }, "important").style("text-align", e.type == "numeric" ? "right" : "left");
                    t == 0 && n.append("img").classed("nv-treeicon", !0).classed("nv-folded", A).attr("src", L).style("width", "14px").style("height", "14px").style("padding", "0 1px").style("display", function(e) {
                        return L(e) ? "inline-block" : "none";
                    }).on("click", k);
                    n.each(function(n) {
                        !t && v(n) ? d3.select(this).append("a").attr("href", v).attr("class", d3.functor(e.classes)).append("span") : d3.select(this).append("span");
                        d3.select(this).select("span").attr("class", d3.functor(e.classes)).text(function(t) {
                            return e.format ? e.format(t) : t[e.key] || "-";
                        });
                    });
                    if (e.showCount) {
                        n.append("span").attr("class", "nv-childrenCount");
                        N.selectAll("span.nv-childrenCount").text(function(e) {
                            return e.values && e.values.length || e._values && e._values.length ? "(" + (e.values && e.values.filter(function(e) {
                                return u ? u(e) : !0;
                            }).length || e._values && e._values.filter(function(e) {
                                return u ? u(e) : !0;
                            }).length || 0) + ")" : "";
                        });
                    }
                });
                N.order().on("click", function(e) {
                    d.elementClick({
                        row: this,
                        data: e,
                        pos: [ e.x, e.y ]
                    });
                }).on("dblclick", function(e) {
                    d.elementDblclick({
                        row: this,
                        data: e,
                        pos: [ e.x, e.y ]
                    });
                }).on("mouseover", function(e) {
                    d.elementMouseover({
                        row: this,
                        data: e,
                        pos: [ e.x, e.y ]
                    });
                }).on("mouseout", function(e) {
                    d.elementMouseout({
                        row: this,
                        data: e,
                        pos: [ e.x, e.y ]
                    });
                });
            });
            return g;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = e.utils.defaultColor(), s = Math.floor(Math.random() * 1e4), o = !0, u = !1, a = "No Data Available.", f = 20, l = [ {
            key: "key",
            label: "Name",
            type: "text"
        } ], c = null, h = "images/grey-plus.png", p = "images/grey-minus.png", d = d3.dispatch("elementClick", "elementDblclick", "elementMouseover", "elementMouseout"), v = function(e) {
            return e.url;
        }, m = 0;
        g.options = e.utils.optionsFunc.bind(g);
        g.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return g;
        };
        g.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return g;
        };
        g.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return g;
        };
        g.color = function(t) {
            if (!arguments.length) return i;
            i = e.utils.getColor(t);
            scatter.color(i);
            return g;
        };
        g.id = function(e) {
            if (!arguments.length) return s;
            s = e;
            return g;
        };
        g.header = function(e) {
            if (!arguments.length) return o;
            o = e;
            return g;
        };
        g.noData = function(e) {
            if (!arguments.length) return a;
            a = e;
            return g;
        };
        g.filterZero = function(e) {
            if (!arguments.length) return u;
            u = e;
            return g;
        };
        g.columns = function(e) {
            if (!arguments.length) return l;
            l = e;
            return g;
        };
        g.tableClass = function(e) {
            if (!arguments.length) return c;
            c = e;
            return g;
        };
        g.iconOpen = function(e) {
            if (!arguments.length) return h;
            h = e;
            return g;
        };
        g.iconClose = function(e) {
            if (!arguments.length) return p;
            p = e;
            return g;
        };
        g.getUrl = function(e) {
            if (!arguments.length) return v;
            v = e;
            return g;
        };
        return g;
    };
    e.models.legend = function() {
        "use strict";
        function c(h) {
            h.each(function(c) {
                var h = n - t.left - t.right, p = d3.select(this), d = p.selectAll("g.nv-legend").data([ c ]), v = d.enter().append("g").attr("class", "nvd3 nv-legend").append("g"), m = d.select("g");
                d.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var g = m.selectAll(".nv-series").data(function(e) {
                    return e;
                }), y = g.enter().append("g").attr("class", "nv-series").on("mouseover", function(e, t) {
                    l.legendMouseover(e, t);
                }).on("mouseout", function(e, t) {
                    l.legendMouseout(e, t);
                }).on("click", function(e, t) {
                    l.legendClick(e, t);
                    if (a) {
                        if (f) {
                            c.forEach(function(e) {
                                e.disabled = !0;
                            });
                            e.disabled = !1;
                        } else {
                            e.disabled = !e.disabled;
                            c.every(function(e) {
                                return e.disabled;
                            }) && c.forEach(function(e) {
                                e.disabled = !1;
                            });
                        }
                        l.stateChange({
                            disabled: c.map(function(e) {
                                return !!e.disabled;
                            })
                        });
                    }
                }).on("dblclick", function(e, t) {
                    l.legendDblclick(e, t);
                    if (a) {
                        c.forEach(function(e) {
                            e.disabled = !0;
                        });
                        e.disabled = !1;
                        l.stateChange({
                            disabled: c.map(function(e) {
                                return !!e.disabled;
                            })
                        });
                    }
                });
                y.append("circle").style("stroke-width", 2).attr("class", "nv-legend-symbol").attr("r", 5);
                y.append("text").attr("text-anchor", "start").attr("class", "nv-legend-text").attr("dy", ".32em").attr("dx", "8");
                g.classed("disabled", function(e) {
                    return e.disabled;
                });
                g.exit().remove();
                g.select("circle").style("fill", function(e, t) {
                    return e.color || s(e, t);
                }).style("stroke", function(e, t) {
                    return e.color || s(e, t);
                });
                g.select("text").text(i);
                if (o) {
                    var b = [];
                    g.each(function(t, n) {
                        var r = d3.select(this).select("text"), i;
                        try {
                            i = r.node().getComputedTextLength();
                        } catch (s) {
                            i = e.utils.calcApproxTextWidth(r);
                        }
                        b.push(i + 28);
                    });
                    var w = 0, E = 0, S = [];
                    while (E < h && w < b.length) {
                        S[w] = b[w];
                        E += b[w++];
                    }
                    w === 0 && (w = 1);
                    while (E > h && w > 1) {
                        S = [];
                        w--;
                        for (var x = 0; x < b.length; x++) b[x] > (S[x % w] || 0) && (S[x % w] = b[x]);
                        E = S.reduce(function(e, t, n, r) {
                            return e + t;
                        });
                    }
                    var T = [];
                    for (var N = 0, C = 0; N < w; N++) {
                        T[N] = C;
                        C += S[N];
                    }
                    g.attr("transform", function(e, t) {
                        return "translate(" + T[t % w] + "," + (5 + Math.floor(t / w) * 20) + ")";
                    });
                    u ? m.attr("transform", "translate(" + (n - t.right - E) + "," + t.top + ")") : m.attr("transform", "translate(0," + t.top + ")");
                    r = t.top + t.bottom + Math.ceil(b.length / w) * 20;
                } else {
                    var k = 5, L = 5, A = 0, O;
                    g.attr("transform", function(e, r) {
                        var i = d3.select(this).select("text").node().getComputedTextLength() + 28;
                        O = L;
                        if (n < t.left + t.right + O + i) {
                            L = O = 5;
                            k += 20;
                        }
                        L += i;
                        L > A && (A = L);
                        return "translate(" + O + "," + k + ")";
                    });
                    m.attr("transform", "translate(" + (n - t.right - A) + "," + t.top + ")");
                    r = t.top + t.bottom + k + 15;
                }
            });
            return c;
        }
        var t = {
            top: 5,
            right: 0,
            bottom: 5,
            left: 0
        }, n = 400, r = 20, i = function(e) {
            return e.key;
        }, s = e.utils.defaultColor(), o = !0, u = !0, a = !0, f = !1, l = d3.dispatch("legendClick", "legendDblclick", "legendMouseover", "legendMouseout", "stateChange");
        c.dispatch = l;
        c.options = e.utils.optionsFunc.bind(c);
        c.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return c;
        };
        c.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return c;
        };
        c.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return c;
        };
        c.key = function(e) {
            if (!arguments.length) return i;
            i = e;
            return c;
        };
        c.color = function(t) {
            if (!arguments.length) return s;
            s = e.utils.getColor(t);
            return c;
        };
        c.align = function(e) {
            if (!arguments.length) return o;
            o = e;
            return c;
        };
        c.rightAlign = function(e) {
            if (!arguments.length) return u;
            u = e;
            return c;
        };
        c.updateState = function(e) {
            if (!arguments.length) return a;
            a = e;
            return c;
        };
        c.radioButtonMode = function(e) {
            if (!arguments.length) return f;
            f = e;
            return c;
        };
        return c;
    };
    e.models.line = function() {
        "use strict";
        function m(g) {
            g.each(function(m) {
                var g = r - n.left - n.right, b = i - n.top - n.bottom, w = d3.select(this);
                c = t.xScale();
                h = t.yScale();
                d = d || c;
                v = v || h;
                var E = w.selectAll("g.nv-wrap.nv-line").data([ m ]), S = E.enter().append("g").attr("class", "nvd3 nv-wrap nv-line"), T = S.append("defs"), N = S.append("g"), C = E.select("g");
                N.append("g").attr("class", "nv-groups");
                N.append("g").attr("class", "nv-scatterWrap");
                E.attr("transform", "translate(" + n.left + "," + n.top + ")");
                t.width(g).height(b);
                var k = E.select(".nv-scatterWrap");
                k.transition().call(t);
                T.append("clipPath").attr("id", "nv-edge-clip-" + t.id()).append("rect");
                E.select("#nv-edge-clip-" + t.id() + " rect").attr("width", g).attr("height", b);
                C.attr("clip-path", l ? "url(#nv-edge-clip-" + t.id() + ")" : "");
                k.attr("clip-path", l ? "url(#nv-edge-clip-" + t.id() + ")" : "");
                var L = E.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e;
                }, function(e) {
                    return e.key;
                });
                L.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6);
                L.exit().transition().style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6).remove();
                L.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t;
                }).classed("hover", function(e) {
                    return e.hover;
                }).style("fill", function(e, t) {
                    return s(e, t);
                }).style("stroke", function(e, t) {
                    return s(e, t);
                });
                L.transition().style("stroke-opacity", 1).style("fill-opacity", .5);
                var A = L.selectAll("path.nv-area").data(function(e) {
                    return f(e) ? [ e ] : [];
                });
                A.enter().append("path").attr("class", "nv-area").attr("d", function(t) {
                    return d3.svg.area().interpolate(p).defined(a).x(function(t, n) {
                        return e.utils.NaNtoZero(d(o(t, n)));
                    }).y0(function(t, n) {
                        return e.utils.NaNtoZero(v(u(t, n)));
                    }).y1(function(e, t) {
                        return v(h.domain()[0] <= 0 ? h.domain()[1] >= 0 ? 0 : h.domain()[1] : h.domain()[0]);
                    }).apply(this, [ t.values ]);
                });
                L.exit().selectAll("path.nv-area").remove();
                A.transition().attr("d", function(t) {
                    return d3.svg.area().interpolate(p).defined(a).x(function(t, n) {
                        return e.utils.NaNtoZero(c(o(t, n)));
                    }).y0(function(t, n) {
                        return e.utils.NaNtoZero(h(u(t, n)));
                    }).y1(function(e, t) {
                        return h(h.domain()[0] <= 0 ? h.domain()[1] >= 0 ? 0 : h.domain()[1] : h.domain()[0]);
                    }).apply(this, [ t.values ]);
                });
                var O = L.selectAll("path.nv-line").data(function(e) {
                    return [ e.values ];
                });
                O.enter().append("path").attr("class", "nv-line").attr("d", d3.svg.line().interpolate(p).defined(a).x(function(t, n) {
                    return e.utils.NaNtoZero(d(o(t, n)));
                }).y(function(t, n) {
                    return e.utils.NaNtoZero(v(u(t, n)));
                }));
                L.exit().selectAll("path.nv-line").transition().attr("d", d3.svg.line().interpolate(p).defined(a).x(function(t, n) {
                    return e.utils.NaNtoZero(c(o(t, n)));
                }).y(function(t, n) {
                    return e.utils.NaNtoZero(h(u(t, n)));
                }));
                O.transition().attr("d", d3.svg.line().interpolate(p).defined(a).x(function(t, n) {
                    return e.utils.NaNtoZero(c(o(t, n)));
                }).y(function(t, n) {
                    return e.utils.NaNtoZero(h(u(t, n)));
                }));
                d = c.copy();
                v = h.copy();
            });
            return m;
        }
        var t = e.models.scatter(), n = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, r = 960, i = 500, s = e.utils.defaultColor(), o = function(e) {
            return e.x;
        }, u = function(e) {
            return e.y;
        }, a = function(e, t) {
            return !isNaN(u(e, t)) && u(e, t) !== null;
        }, f = function(e) {
            return e.area;
        }, l = !1, c, h, p = "linear";
        t.size(16).sizeDomain([ 16, 256 ]);
        var d, v;
        m.dispatch = t.dispatch;
        m.scatter = t;
        d3.rebind(m, t, "id", "interactive", "size", "xScale", "yScale", "zScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "forceX", "forceY", "forceSize", "clipVoronoi", "useVoronoi", "clipRadius", "padData", "highlightPoint", "clearHighlights");
        m.options = e.utils.optionsFunc.bind(m);
        m.margin = function(e) {
            if (!arguments.length) return n;
            n.top = typeof e.top != "undefined" ? e.top : n.top;
            n.right = typeof e.right != "undefined" ? e.right : n.right;
            n.bottom = typeof e.bottom != "undefined" ? e.bottom : n.bottom;
            n.left = typeof e.left != "undefined" ? e.left : n.left;
            return m;
        };
        m.width = function(e) {
            if (!arguments.length) return r;
            r = e;
            return m;
        };
        m.height = function(e) {
            if (!arguments.length) return i;
            i = e;
            return m;
        };
        m.x = function(e) {
            if (!arguments.length) return o;
            o = e;
            t.x(e);
            return m;
        };
        m.y = function(e) {
            if (!arguments.length) return u;
            u = e;
            t.y(e);
            return m;
        };
        m.clipEdge = function(e) {
            if (!arguments.length) return l;
            l = e;
            return m;
        };
        m.color = function(n) {
            if (!arguments.length) return s;
            s = e.utils.getColor(n);
            t.color(s);
            return m;
        };
        m.interpolate = function(e) {
            if (!arguments.length) return p;
            p = e;
            return m;
        };
        m.defined = function(e) {
            if (!arguments.length) return a;
            a = e;
            return m;
        };
        m.isArea = function(e) {
            if (!arguments.length) return f;
            f = d3.functor(e);
            return m;
        };
        return m;
    };
    e.models.lineChart = function() {
        "use strict";
        function N(m) {
            m.each(function(m) {
                var C = d3.select(this), k = this, L = (a || parseInt(C.style("width")) || 960) - o.left - o.right, A = (f || parseInt(C.style("height")) || 400) - o.top - o.bottom;
                N.update = function() {
                    C.transition().duration(x).call(N);
                };
                N.container = this;
                b.disabled = m.map(function(e) {
                    return !!e.disabled;
                });
                if (!w) {
                    var O;
                    w = {};
                    for (O in b) b[O] instanceof Array ? w[O] = b[O].slice(0) : w[O] = b[O];
                }
                if (!m || !m.length || !m.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var M = C.selectAll(".nv-noData").data([ E ]);
                    M.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    M.attr("x", o.left + L / 2).attr("y", o.top + A / 2).text(function(e) {
                        return e;
                    });
                    return N;
                }
                C.selectAll(".nv-noData").remove();
                g = t.xScale();
                y = t.yScale();
                var _ = C.selectAll("g.nv-wrap.nv-lineChart").data([ m ]), D = _.enter().append("g").attr("class", "nvd3 nv-wrap nv-lineChart").append("g"), P = _.select("g");
                D.append("rect").style("opacity", 0);
                D.append("g").attr("class", "nv-x nv-axis");
                D.append("g").attr("class", "nv-y nv-axis");
                D.append("g").attr("class", "nv-linesWrap");
                D.append("g").attr("class", "nv-legendWrap");
                D.append("g").attr("class", "nv-interactive");
                P.select("rect").attr("width", L).attr("height", A);
                if (l) {
                    i.width(L);
                    P.select(".nv-legendWrap").datum(m).call(i);
                    if (o.top != i.height()) {
                        o.top = i.height();
                        A = (f || parseInt(C.style("height")) || 400) - o.top - o.bottom;
                    }
                    _.select(".nv-legendWrap").attr("transform", "translate(0," + -o.top + ")");
                }
                _.attr("transform", "translate(" + o.left + "," + o.top + ")");
                p && P.select(".nv-y.nv-axis").attr("transform", "translate(" + L + ",0)");
                if (d) {
                    s.width(L).height(A).margin({
                        left: o.left,
                        top: o.top
                    }).svgContainer(C).xScale(g);
                    _.select(".nv-interactive").call(s);
                }
                t.width(L).height(A).color(m.map(function(e, t) {
                    return e.color || u(e, t);
                }).filter(function(e, t) {
                    return !m[t].disabled;
                }));
                var H = P.select(".nv-linesWrap").datum(m.filter(function(e) {
                    return !e.disabled;
                }));
                H.transition().call(t);
                if (c) {
                    n.scale(g).ticks(L / 100).tickSize(-A, 0);
                    P.select(".nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")");
                    P.select(".nv-x.nv-axis").transition().call(n);
                }
                if (h) {
                    r.scale(y).ticks(A / 36).tickSize(-L, 0);
                    P.select(".nv-y.nv-axis").transition().call(r);
                }
                i.dispatch.on("stateChange", function(e) {
                    b = e;
                    S.stateChange(b);
                    N.update();
                });
                s.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var a, f, l, c = [];
                    m.filter(function(e, t) {
                        e.seriesIndex = t;
                        return !e.disabled;
                    }).forEach(function(n, r) {
                        f = e.interactiveBisect(n.values, i.pointXValue, N.x());
                        t.highlightPoint(r, f, !0);
                        var s = n.values[f];
                        if (typeof s == "undefined") return;
                        typeof a == "undefined" && (a = s);
                        typeof l == "undefined" && (l = N.xScale()(N.x()(s, f)));
                        c.push({
                            key: n.key,
                            value: N.y()(s, f),
                            color: u(n, n.seriesIndex)
                        });
                    });
                    var h = n.tickFormat()(N.x()(a, f));
                    s.tooltip.position({
                        left: l + o.left,
                        top: i.mouseY + o.top
                    }).chartContainer(k.parentNode).enabled(v).valueFormatter(function(e, t) {
                        return r.tickFormat()(e);
                    }).data({
                        value: h,
                        series: c
                    })();
                    s.renderGuideLine(l);
                });
                s.dispatch.on("elementMouseout", function(e) {
                    S.tooltipHide();
                    t.clearHighlights();
                });
                S.on("tooltipShow", function(e) {
                    v && T(e, k.parentNode);
                });
                S.on("changeState", function(e) {
                    if (typeof e.disabled != "undefined") {
                        m.forEach(function(t, n) {
                            t.disabled = e.disabled[n];
                        });
                        b.disabled = e.disabled;
                    }
                    N.update();
                });
            });
            return N;
        }
        var t = e.models.line(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.interactiveGuideline(), o = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, u = e.utils.defaultColor(), a = null, f = null, l = !0, c = !0, h = !0, p = !1, d = !1, v = !0, m = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>";
        }, g, y, b = {}, w = null, E = "No Data Available.", S = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), x = 250;
        n.orient("bottom").tickPadding(7);
        r.orient(p ? "right" : "left");
        var T = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0), u = i.pos[1] + (s.offsetTop || 0), a = n.tickFormat()(t.x()(i.point, i.pointIndex)), f = r.tickFormat()(t.y()(i.point, i.pointIndex)), l = m(i.series.key, a, f, i, N);
            e.tooltip.show([ o, u ], l, null, null, s);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + o.left, e.pos[1] + o.top ];
            S.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            S.tooltipHide(e);
        });
        S.on("tooltipHide", function() {
            v && e.tooltip.cleanup();
        });
        N.dispatch = S;
        N.lines = t;
        N.legend = i;
        N.xAxis = n;
        N.yAxis = r;
        N.interactiveLayer = s;
        d3.rebind(N, t, "defined", "isArea", "x", "y", "size", "xScale", "yScale", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "interactive", "clipEdge", "clipVoronoi", "useVoronoi", "id", "interpolate");
        N.options = e.utils.optionsFunc.bind(N);
        N.margin = function(e) {
            if (!arguments.length) return o;
            o.top = typeof e.top != "undefined" ? e.top : o.top;
            o.right = typeof e.right != "undefined" ? e.right : o.right;
            o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom;
            o.left = typeof e.left != "undefined" ? e.left : o.left;
            return N;
        };
        N.width = function(e) {
            if (!arguments.length) return a;
            a = e;
            return N;
        };
        N.height = function(e) {
            if (!arguments.length) return f;
            f = e;
            return N;
        };
        N.color = function(t) {
            if (!arguments.length) return u;
            u = e.utils.getColor(t);
            i.color(u);
            return N;
        };
        N.showLegend = function(e) {
            if (!arguments.length) return l;
            l = e;
            return N;
        };
        N.showXAxis = function(e) {
            if (!arguments.length) return c;
            c = e;
            return N;
        };
        N.showYAxis = function(e) {
            if (!arguments.length) return h;
            h = e;
            return N;
        };
        N.rightAlignYAxis = function(e) {
            if (!arguments.length) return p;
            p = e;
            r.orient(e ? "right" : "left");
            return N;
        };
        N.useInteractiveGuideline = function(e) {
            if (!arguments.length) return d;
            d = e;
            if (e === !0) {
                N.interactive(!1);
                N.useVoronoi(!1);
            }
            return N;
        };
        N.tooltips = function(e) {
            if (!arguments.length) return v;
            v = e;
            return N;
        };
        N.tooltipContent = function(e) {
            if (!arguments.length) return m;
            m = e;
            return N;
        };
        N.state = function(e) {
            if (!arguments.length) return b;
            b = e;
            return N;
        };
        N.defaultState = function(e) {
            if (!arguments.length) return w;
            w = e;
            return N;
        };
        N.noData = function(e) {
            if (!arguments.length) return E;
            E = e;
            return N;
        };
        N.transitionDuration = function(e) {
            if (!arguments.length) return x;
            x = e;
            return N;
        };
        return N;
    };
    e.models.linePlusBarChart = function() {
        "use strict";
        function T(e) {
            e.each(function(e) {
                var l = d3.select(this), c = this, v = (a || parseInt(l.style("width")) || 960) - u.left - u.right, N = (f || parseInt(l.style("height")) || 400) - u.top - u.bottom;
                T.update = function() {
                    l.transition().call(T);
                };
                b.disabled = e.map(function(e) {
                    return !!e.disabled;
                });
                if (!w) {
                    var C;
                    w = {};
                    for (C in b) b[C] instanceof Array ? w[C] = b[C].slice(0) : w[C] = b[C];
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var k = l.selectAll(".nv-noData").data([ E ]);
                    k.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    k.attr("x", u.left + v / 2).attr("y", u.top + N / 2).text(function(e) {
                        return e;
                    });
                    return T;
                }
                l.selectAll(".nv-noData").remove();
                var L = e.filter(function(e) {
                    return !e.disabled && e.bar;
                }), A = e.filter(function(e) {
                    return !e.bar;
                });
                m = A.filter(function(e) {
                    return !e.disabled;
                }).length && A.filter(function(e) {
                    return !e.disabled;
                })[0].values.length ? t.xScale() : n.xScale();
                g = n.yScale();
                y = t.yScale();
                var O = d3.select(this).selectAll("g.nv-wrap.nv-linePlusBar").data([ e ]), M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-linePlusBar").append("g"), _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis");
                M.append("g").attr("class", "nv-y1 nv-axis");
                M.append("g").attr("class", "nv-y2 nv-axis");
                M.append("g").attr("class", "nv-barsWrap");
                M.append("g").attr("class", "nv-linesWrap");
                M.append("g").attr("class", "nv-legendWrap");
                if (p) {
                    o.width(v / 2);
                    _.select(".nv-legendWrap").datum(e.map(function(e) {
                        e.originalKey = e.originalKey === undefined ? e.key : e.originalKey;
                        e.key = e.originalKey + (e.bar ? " (left axis)" : " (right axis)");
                        return e;
                    })).call(o);
                    if (u.top != o.height()) {
                        u.top = o.height();
                        N = (f || parseInt(l.style("height")) || 400) - u.top - u.bottom;
                    }
                    _.select(".nv-legendWrap").attr("transform", "translate(" + v / 2 + "," + -u.top + ")");
                }
                O.attr("transform", "translate(" + u.left + "," + u.top + ")");
                t.width(v).height(N).color(e.map(function(e, t) {
                    return e.color || h(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled && !e[n].bar;
                }));
                n.width(v).height(N).color(e.map(function(e, t) {
                    return e.color || h(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].bar;
                }));
                var D = _.select(".nv-barsWrap").datum(L.length ? L : [ {
                    values: []
                } ]), P = _.select(".nv-linesWrap").datum(A[0] && !A[0].disabled ? A : [ {
                    values: []
                } ]);
                d3.transition(D).call(n);
                d3.transition(P).call(t);
                r.scale(m).ticks(v / 100).tickSize(-N, 0);
                _.select(".nv-x.nv-axis").attr("transform", "translate(0," + g.range()[0] + ")");
                d3.transition(_.select(".nv-x.nv-axis")).call(r);
                i.scale(g).ticks(N / 36).tickSize(-v, 0);
                d3.transition(_.select(".nv-y1.nv-axis")).style("opacity", L.length ? 1 : 0).call(i);
                s.scale(y).ticks(N / 36).tickSize(L.length ? 0 : -v, 0);
                _.select(".nv-y2.nv-axis").style("opacity", A.length ? 1 : 0).attr("transform", "translate(" + v + ",0)");
                d3.transition(_.select(".nv-y2.nv-axis")).call(s);
                o.dispatch.on("stateChange", function(e) {
                    b = e;
                    S.stateChange(b);
                    T.update();
                });
                S.on("tooltipShow", function(e) {
                    d && x(e, c.parentNode);
                });
                S.on("changeState", function(t) {
                    if (typeof t.disabled != "undefined") {
                        e.forEach(function(e, n) {
                            e.disabled = t.disabled[n];
                        });
                        b.disabled = t.disabled;
                    }
                    T.update();
                });
            });
            return T;
        }
        var t = e.models.line(), n = e.models.historicalBar(), r = e.models.axis(), i = e.models.axis(), s = e.models.axis(), o = e.models.legend(), u = {
            top: 30,
            right: 60,
            bottom: 50,
            left: 60
        }, a = null, f = null, l = function(e) {
            return e.x;
        }, c = function(e) {
            return e.y;
        }, h = e.utils.defaultColor(), p = !0, d = !0, v = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>";
        }, m, g, y, b = {}, w = null, E = "No Data Available.", S = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState");
        n.padData(!0);
        t.clipEdge(!1).padData(!0);
        r.orient("bottom").tickPadding(7).highlightZero(!1);
        i.orient("left");
        s.orient("right");
        var x = function(n, o) {
            var u = n.pos[0] + (o.offsetLeft || 0), a = n.pos[1] + (o.offsetTop || 0), f = r.tickFormat()(t.x()(n.point, n.pointIndex)), l = (n.series.bar ? i : s).tickFormat()(t.y()(n.point, n.pointIndex)), c = v(n.series.key, f, l, n, T);
            e.tooltip.show([ u, a ], c, n.value < 0 ? "n" : "s", null, o);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + u.left, e.pos[1] + u.top ];
            S.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            S.tooltipHide(e);
        });
        n.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + u.left, e.pos[1] + u.top ];
            S.tooltipShow(e);
        });
        n.dispatch.on("elementMouseout.tooltip", function(e) {
            S.tooltipHide(e);
        });
        S.on("tooltipHide", function() {
            d && e.tooltip.cleanup();
        });
        T.dispatch = S;
        T.legend = o;
        T.lines = t;
        T.bars = n;
        T.xAxis = r;
        T.y1Axis = i;
        T.y2Axis = s;
        d3.rebind(T, t, "defined", "size", "clipVoronoi", "interpolate");
        T.options = e.utils.optionsFunc.bind(T);
        T.x = function(e) {
            if (!arguments.length) return l;
            l = e;
            t.x(e);
            n.x(e);
            return T;
        };
        T.y = function(e) {
            if (!arguments.length) return c;
            c = e;
            t.y(e);
            n.y(e);
            return T;
        };
        T.margin = function(e) {
            if (!arguments.length) return u;
            u.top = typeof e.top != "undefined" ? e.top : u.top;
            u.right = typeof e.right != "undefined" ? e.right : u.right;
            u.bottom = typeof e.bottom != "undefined" ? e.bottom : u.bottom;
            u.left = typeof e.left != "undefined" ? e.left : u.left;
            return T;
        };
        T.width = function(e) {
            if (!arguments.length) return a;
            a = e;
            return T;
        };
        T.height = function(e) {
            if (!arguments.length) return f;
            f = e;
            return T;
        };
        T.color = function(t) {
            if (!arguments.length) return h;
            h = e.utils.getColor(t);
            o.color(h);
            return T;
        };
        T.showLegend = function(e) {
            if (!arguments.length) return p;
            p = e;
            return T;
        };
        T.tooltips = function(e) {
            if (!arguments.length) return d;
            d = e;
            return T;
        };
        T.tooltipContent = function(e) {
            if (!arguments.length) return v;
            v = e;
            return T;
        };
        T.state = function(e) {
            if (!arguments.length) return b;
            b = e;
            return T;
        };
        T.defaultState = function(e) {
            if (!arguments.length) return w;
            w = e;
            return T;
        };
        T.noData = function(e) {
            if (!arguments.length) return E;
            E = e;
            return T;
        };
        return T;
    };
    e.models.lineWithFocusChart = function() {
        "use strict";
        function k(e) {
            e.each(function(e) {
                function U(e) {
                    var t = +(e == "e"), n = t ? 1 : -1, r = M / 3;
                    return "M" + .5 * n + "," + r + "A6,6 0 0 " + t + " " + 6.5 * n + "," + (r + 6) + "V" + (2 * r - 6) + "A6,6 0 0 " + t + " " + .5 * n + "," + 2 * r + "Z" + "M" + 2.5 * n + "," + (r + 8) + "V" + (2 * r - 8) + "M" + 4.5 * n + "," + (r + 8) + "V" + (2 * r - 8);
                }
                function z() {
                    a.empty() || a.extent(w);
                    I.data([ a.empty() ? g.domain() : w ]).each(function(e, t) {
                        var n = g(e[0]) - v.range()[0], r = v.range()[1] - g(e[1]);
                        d3.select(this).select(".left").attr("width", n < 0 ? 0 : n);
                        d3.select(this).select(".right").attr("x", g(e[1])).attr("width", r < 0 ? 0 : r);
                    });
                }
                function W() {
                    w = a.empty() ? null : a.extent();
                    var n = a.empty() ? g.domain() : a.extent();
                    if (Math.abs(n[0] - n[1]) <= 1) return;
                    T.brush({
                        extent: n,
                        brush: a
                    });
                    z();
                    var s = H.select(".nv-focus .nv-linesWrap").datum(e.filter(function(e) {
                        return !e.disabled;
                    }).map(function(e, r) {
                        return {
                            key: e.key,
                            values: e.values.filter(function(e, r) {
                                return t.x()(e, r) >= n[0] && t.x()(e, r) <= n[1];
                            })
                        };
                    }));
                    s.transition().duration(N).call(t);
                    H.select(".nv-focus .nv-x.nv-axis").transition().duration(N).call(r);
                    H.select(".nv-focus .nv-y.nv-axis").transition().duration(N).call(i);
                }
                var S = d3.select(this), L = this, A = (h || parseInt(S.style("width")) || 960) - f.left - f.right, O = (p || parseInt(S.style("height")) || 400) - f.top - f.bottom - d, M = d - l.top - l.bottom;
                k.update = function() {
                    S.transition().duration(N).call(k);
                };
                k.container = this;
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var _ = S.selectAll(".nv-noData").data([ x ]);
                    _.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    _.attr("x", f.left + A / 2).attr("y", f.top + O / 2).text(function(e) {
                        return e;
                    });
                    return k;
                }
                S.selectAll(".nv-noData").remove();
                v = t.xScale();
                m = t.yScale();
                g = n.xScale();
                y = n.yScale();
                var D = S.selectAll("g.nv-wrap.nv-lineWithFocusChart").data([ e ]), P = D.enter().append("g").attr("class", "nvd3 nv-wrap nv-lineWithFocusChart").append("g"), H = D.select("g");
                P.append("g").attr("class", "nv-legendWrap");
                var B = P.append("g").attr("class", "nv-focus");
                B.append("g").attr("class", "nv-x nv-axis");
                B.append("g").attr("class", "nv-y nv-axis");
                B.append("g").attr("class", "nv-linesWrap");
                var j = P.append("g").attr("class", "nv-context");
                j.append("g").attr("class", "nv-x nv-axis");
                j.append("g").attr("class", "nv-y nv-axis");
                j.append("g").attr("class", "nv-linesWrap");
                j.append("g").attr("class", "nv-brushBackground");
                j.append("g").attr("class", "nv-x nv-brush");
                if (b) {
                    u.width(A);
                    H.select(".nv-legendWrap").datum(e).call(u);
                    if (f.top != u.height()) {
                        f.top = u.height();
                        O = (p || parseInt(S.style("height")) || 400) - f.top - f.bottom - d;
                    }
                    H.select(".nv-legendWrap").attr("transform", "translate(0," + -f.top + ")");
                }
                D.attr("transform", "translate(" + f.left + "," + f.top + ")");
                t.width(A).height(O).color(e.map(function(e, t) {
                    return e.color || c(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled;
                }));
                n.defined(t.defined()).width(A).height(M).color(e.map(function(e, t) {
                    return e.color || c(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled;
                }));
                H.select(".nv-context").attr("transform", "translate(0," + (O + f.bottom + l.top) + ")");
                var F = H.select(".nv-context .nv-linesWrap").datum(e.filter(function(e) {
                    return !e.disabled;
                }));
                d3.transition(F).call(n);
                r.scale(v).ticks(A / 100).tickSize(-O, 0);
                i.scale(m).ticks(O / 36).tickSize(-A, 0);
                H.select(".nv-focus .nv-x.nv-axis").attr("transform", "translate(0," + O + ")");
                a.x(g).on("brush", function() {
                    var e = k.transitionDuration();
                    k.transitionDuration(0);
                    W();
                    k.transitionDuration(e);
                });
                w && a.extent(w);
                var I = H.select(".nv-brushBackground").selectAll("g").data([ w || a.extent() ]), q = I.enter().append("g");
                q.append("rect").attr("class", "left").attr("x", 0).attr("y", 0).attr("height", M);
                q.append("rect").attr("class", "right").attr("x", 0).attr("y", 0).attr("height", M);
                var R = H.select(".nv-x.nv-brush").call(a);
                R.selectAll("rect").attr("height", M);
                R.selectAll(".resize").append("path").attr("d", U);
                W();
                s.scale(g).ticks(A / 100).tickSize(-M, 0);
                H.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")");
                d3.transition(H.select(".nv-context .nv-x.nv-axis")).call(s);
                o.scale(y).ticks(M / 36).tickSize(-A, 0);
                d3.transition(H.select(".nv-context .nv-y.nv-axis")).call(o);
                H.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")");
                u.dispatch.on("stateChange", function(e) {
                    k.update();
                });
                T.on("tooltipShow", function(e) {
                    E && C(e, L.parentNode);
                });
            });
            return k;
        }
        var t = e.models.line(), n = e.models.line(), r = e.models.axis(), i = e.models.axis(), s = e.models.axis(), o = e.models.axis(), u = e.models.legend(), a = d3.svg.brush(), f = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 60
        }, l = {
            top: 0,
            right: 30,
            bottom: 20,
            left: 60
        }, c = e.utils.defaultColor(), h = null, p = null, d = 100, v, m, g, y, b = !0, w = null, E = !0, S = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>";
        }, x = "No Data Available.", T = d3.dispatch("tooltipShow", "tooltipHide", "brush"), N = 250;
        t.clipEdge(!0);
        n.interactive(!1);
        r.orient("bottom").tickPadding(5);
        i.orient("left");
        s.orient("bottom").tickPadding(5);
        o.orient("left");
        var C = function(n, s) {
            var o = n.pos[0] + (s.offsetLeft || 0), u = n.pos[1] + (s.offsetTop || 0), a = r.tickFormat()(t.x()(n.point, n.pointIndex)), f = i.tickFormat()(t.y()(n.point, n.pointIndex)), l = S(n.series.key, a, f, n, k);
            e.tooltip.show([ o, u ], l, null, null, s);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + f.left, e.pos[1] + f.top ];
            T.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e);
        });
        T.on("tooltipHide", function() {
            E && e.tooltip.cleanup();
        });
        k.dispatch = T;
        k.legend = u;
        k.lines = t;
        k.lines2 = n;
        k.xAxis = r;
        k.yAxis = i;
        k.x2Axis = s;
        k.y2Axis = o;
        d3.rebind(k, t, "defined", "isArea", "size", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "interactive", "clipEdge", "clipVoronoi", "id");
        k.options = e.utils.optionsFunc.bind(k);
        k.x = function(e) {
            if (!arguments.length) return t.x;
            t.x(e);
            n.x(e);
            return k;
        };
        k.y = function(e) {
            if (!arguments.length) return t.y;
            t.y(e);
            n.y(e);
            return k;
        };
        k.margin = function(e) {
            if (!arguments.length) return f;
            f.top = typeof e.top != "undefined" ? e.top : f.top;
            f.right = typeof e.right != "undefined" ? e.right : f.right;
            f.bottom = typeof e.bottom != "undefined" ? e.bottom : f.bottom;
            f.left = typeof e.left != "undefined" ? e.left : f.left;
            return k;
        };
        k.margin2 = function(e) {
            if (!arguments.length) return l;
            l = e;
            return k;
        };
        k.width = function(e) {
            if (!arguments.length) return h;
            h = e;
            return k;
        };
        k.height = function(e) {
            if (!arguments.length) return p;
            p = e;
            return k;
        };
        k.height2 = function(e) {
            if (!arguments.length) return d;
            d = e;
            return k;
        };
        k.color = function(t) {
            if (!arguments.length) return c;
            c = e.utils.getColor(t);
            u.color(c);
            return k;
        };
        k.showLegend = function(e) {
            if (!arguments.length) return b;
            b = e;
            return k;
        };
        k.tooltips = function(e) {
            if (!arguments.length) return E;
            E = e;
            return k;
        };
        k.tooltipContent = function(e) {
            if (!arguments.length) return S;
            S = e;
            return k;
        };
        k.interpolate = function(e) {
            if (!arguments.length) return t.interpolate();
            t.interpolate(e);
            n.interpolate(e);
            return k;
        };
        k.noData = function(e) {
            if (!arguments.length) return x;
            x = e;
            return k;
        };
        k.xTickFormat = function(e) {
            if (!arguments.length) return r.tickFormat();
            r.tickFormat(e);
            s.tickFormat(e);
            return k;
        };
        k.yTickFormat = function(e) {
            if (!arguments.length) return i.tickFormat();
            i.tickFormat(e);
            o.tickFormat(e);
            return k;
        };
        k.brushExtent = function(e) {
            if (!arguments.length) return w;
            w = e;
            return k;
        };
        k.transitionDuration = function(e) {
            if (!arguments.length) return N;
            N = e;
            return k;
        };
        return k;
    };
    e.models.linePlusBarWithFocusChart = function() {
        "use strict";
        function B(e) {
            e.each(function(e) {
                function nt(e) {
                    var t = +(e == "e"), n = t ? 1 : -1, r = q / 3;
                    return "M" + .5 * n + "," + r + "A6,6 0 0 " + t + " " + 6.5 * n + "," + (r + 6) + "V" + (2 * r - 6) + "A6,6 0 0 " + t + " " + .5 * n + "," + 2 * r + "Z" + "M" + 2.5 * n + "," + (r + 8) + "V" + (2 * r - 8) + "M" + 4.5 * n + "," + (r + 8) + "V" + (2 * r - 8);
                }
                function rt() {
                    h.empty() || h.extent(x);
                    Z.data([ h.empty() ? k.domain() : x ]).each(function(e, t) {
                        var n = k(e[0]) - k.range()[0], r = k.range()[1] - k(e[1]);
                        d3.select(this).select(".left").attr("width", n < 0 ? 0 : n);
                        d3.select(this).select(".right").attr("x", k(e[1])).attr("width", r < 0 ? 0 : r);
                    });
                }
                function it() {
                    x = h.empty() ? null : h.extent();
                    S = h.empty() ? k.domain() : h.extent();
                    D.brush({
                        extent: S,
                        brush: h
                    });
                    rt();
                    r.width(F).height(I).color(e.map(function(e, t) {
                        return e.color || w(e, t);
                    }).filter(function(t, n) {
                        return !e[n].disabled && e[n].bar;
                    }));
                    t.width(F).height(I).color(e.map(function(e, t) {
                        return e.color || w(e, t);
                    }).filter(function(t, n) {
                        return !e[n].disabled && !e[n].bar;
                    }));
                    var n = J.select(".nv-focus .nv-barsWrap").datum(U.length ? U.map(function(e, t) {
                        return {
                            key: e.key,
                            values: e.values.filter(function(e, t) {
                                return r.x()(e, t) >= S[0] && r.x()(e, t) <= S[1];
                            })
                        };
                    }) : [ {
                        values: []
                    } ]), i = J.select(".nv-focus .nv-linesWrap").datum(z[0].disabled ? [ {
                        values: []
                    } ] : z.map(function(e, n) {
                        return {
                            key: e.key,
                            values: e.values.filter(function(e, n) {
                                return t.x()(e, n) >= S[0] && t.x()(e, n) <= S[1];
                            })
                        };
                    }));
                    U.length ? C = r.xScale() : C = t.xScale();
                    s.scale(C).ticks(F / 100).tickSize(-I, 0);
                    s.domain([ Math.ceil(S[0]), Math.floor(S[1]) ]);
                    J.select(".nv-x.nv-axis").transition().duration(P).call(s);
                    n.transition().duration(P).call(r);
                    i.transition().duration(P).call(t);
                    J.select(".nv-focus .nv-x.nv-axis").attr("transform", "translate(0," + L.range()[0] + ")");
                    u.scale(L).ticks(I / 36).tickSize(-F, 0);
                    J.select(".nv-focus .nv-y1.nv-axis").style("opacity", U.length ? 1 : 0);
                    a.scale(A).ticks(I / 36).tickSize(U.length ? 0 : -F, 0);
                    J.select(".nv-focus .nv-y2.nv-axis").style("opacity", z.length ? 1 : 0).attr("transform", "translate(" + C.range()[1] + ",0)");
                    J.select(".nv-focus .nv-y1.nv-axis").transition().duration(P).call(u);
                    J.select(".nv-focus .nv-y2.nv-axis").transition().duration(P).call(a);
                }
                var N = d3.select(this), j = this, F = (v || parseInt(N.style("width")) || 960) - p.left - p.right, I = (m || parseInt(N.style("height")) || 400) - p.top - p.bottom - g, q = g - d.top - d.bottom;
                B.update = function() {
                    N.transition().duration(P).call(B);
                };
                B.container = this;
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var R = N.selectAll(".nv-noData").data([ _ ]);
                    R.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    R.attr("x", p.left + F / 2).attr("y", p.top + I / 2).text(function(e) {
                        return e;
                    });
                    return B;
                }
                N.selectAll(".nv-noData").remove();
                var U = e.filter(function(e) {
                    return !e.disabled && e.bar;
                }), z = e.filter(function(e) {
                    return !e.bar;
                });
                C = r.xScale();
                k = o.scale();
                L = r.yScale();
                A = t.yScale();
                O = i.yScale();
                M = n.yScale();
                var W = e.filter(function(e) {
                    return !e.disabled && e.bar;
                }).map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: y(e, t),
                            y: b(e, t)
                        };
                    });
                }), X = e.filter(function(e) {
                    return !e.disabled && !e.bar;
                }).map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: y(e, t),
                            y: b(e, t)
                        };
                    });
                });
                C.range([ 0, F ]);
                k.domain(d3.extent(d3.merge(W.concat(X)), function(e) {
                    return e.x;
                })).range([ 0, F ]);
                var V = N.selectAll("g.nv-wrap.nv-linePlusBar").data([ e ]), $ = V.enter().append("g").attr("class", "nvd3 nv-wrap nv-linePlusBar").append("g"), J = V.select("g");
                $.append("g").attr("class", "nv-legendWrap");
                var K = $.append("g").attr("class", "nv-focus");
                K.append("g").attr("class", "nv-x nv-axis");
                K.append("g").attr("class", "nv-y1 nv-axis");
                K.append("g").attr("class", "nv-y2 nv-axis");
                K.append("g").attr("class", "nv-barsWrap");
                K.append("g").attr("class", "nv-linesWrap");
                var Q = $.append("g").attr("class", "nv-context");
                Q.append("g").attr("class", "nv-x nv-axis");
                Q.append("g").attr("class", "nv-y1 nv-axis");
                Q.append("g").attr("class", "nv-y2 nv-axis");
                Q.append("g").attr("class", "nv-barsWrap");
                Q.append("g").attr("class", "nv-linesWrap");
                Q.append("g").attr("class", "nv-brushBackground");
                Q.append("g").attr("class", "nv-x nv-brush");
                if (E) {
                    c.width(F / 2);
                    J.select(".nv-legendWrap").datum(e.map(function(e) {
                        e.originalKey = e.originalKey === undefined ? e.key : e.originalKey;
                        e.key = e.originalKey + (e.bar ? " (left axis)" : " (right axis)");
                        return e;
                    })).call(c);
                    if (p.top != c.height()) {
                        p.top = c.height();
                        I = (m || parseInt(N.style("height")) || 400) - p.top - p.bottom - g;
                    }
                    J.select(".nv-legendWrap").attr("transform", "translate(" + F / 2 + "," + -p.top + ")");
                }
                V.attr("transform", "translate(" + p.left + "," + p.top + ")");
                i.width(F).height(q).color(e.map(function(e, t) {
                    return e.color || w(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].bar;
                }));
                n.width(F).height(q).color(e.map(function(e, t) {
                    return e.color || w(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled && !e[n].bar;
                }));
                var G = J.select(".nv-context .nv-barsWrap").datum(U.length ? U : [ {
                    values: []
                } ]), Y = J.select(".nv-context .nv-linesWrap").datum(z[0].disabled ? [ {
                    values: []
                } ] : z);
                J.select(".nv-context").attr("transform", "translate(0," + (I + p.bottom + d.top) + ")");
                G.transition().call(i);
                Y.transition().call(n);
                h.x(k).on("brush", it);
                x && h.extent(x);
                var Z = J.select(".nv-brushBackground").selectAll("g").data([ x || h.extent() ]), et = Z.enter().append("g");
                et.append("rect").attr("class", "left").attr("x", 0).attr("y", 0).attr("height", q);
                et.append("rect").attr("class", "right").attr("x", 0).attr("y", 0).attr("height", q);
                var tt = J.select(".nv-x.nv-brush").call(h);
                tt.selectAll("rect").attr("height", q);
                tt.selectAll(".resize").append("path").attr("d", nt);
                o.ticks(F / 100).tickSize(-q, 0);
                J.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + O.range()[0] + ")");
                J.select(".nv-context .nv-x.nv-axis").transition().call(o);
                f.scale(O).ticks(q / 36).tickSize(-F, 0);
                J.select(".nv-context .nv-y1.nv-axis").style("opacity", U.length ? 1 : 0).attr("transform", "translate(0," + k.range()[0] + ")");
                J.select(".nv-context .nv-y1.nv-axis").transition().call(f);
                l.scale(M).ticks(q / 36).tickSize(U.length ? 0 : -F, 0);
                J.select(".nv-context .nv-y2.nv-axis").style("opacity", z.length ? 1 : 0).attr("transform", "translate(" + k.range()[1] + ",0)");
                J.select(".nv-context .nv-y2.nv-axis").transition().call(l);
                c.dispatch.on("stateChange", function(e) {
                    B.update();
                });
                D.on("tooltipShow", function(e) {
                    T && H(e, j.parentNode);
                });
                it();
            });
            return B;
        }
        var t = e.models.line(), n = e.models.line(), r = e.models.historicalBar(), i = e.models.historicalBar(), s = e.models.axis(), o = e.models.axis(), u = e.models.axis(), a = e.models.axis(), f = e.models.axis(), l = e.models.axis(), c = e.models.legend(), h = d3.svg.brush(), p = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 60
        }, d = {
            top: 0,
            right: 30,
            bottom: 20,
            left: 60
        }, v = null, m = null, g = 100, y = function(e) {
            return e.x;
        }, b = function(e) {
            return e.y;
        }, w = e.utils.defaultColor(), E = !0, S, x = null, T = !0, N = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>";
        }, C, k, L, A, O, M, _ = "No Data Available.", D = d3.dispatch("tooltipShow", "tooltipHide", "brush"), P = 0;
        t.clipEdge(!0);
        n.interactive(!1);
        s.orient("bottom").tickPadding(5);
        u.orient("left");
        a.orient("right");
        o.orient("bottom").tickPadding(5);
        f.orient("left");
        l.orient("right");
        var H = function(n, r) {
            S && (n.pointIndex += Math.ceil(S[0]));
            var i = n.pos[0] + (r.offsetLeft || 0), o = n.pos[1] + (r.offsetTop || 0), f = s.tickFormat()(t.x()(n.point, n.pointIndex)), l = (n.series.bar ? u : a).tickFormat()(t.y()(n.point, n.pointIndex)), c = N(n.series.key, f, l, n, B);
            e.tooltip.show([ i, o ], c, n.value < 0 ? "n" : "s", null, r);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + p.left, e.pos[1] + p.top ];
            D.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            D.tooltipHide(e);
        });
        r.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + p.left, e.pos[1] + p.top ];
            D.tooltipShow(e);
        });
        r.dispatch.on("elementMouseout.tooltip", function(e) {
            D.tooltipHide(e);
        });
        D.on("tooltipHide", function() {
            T && e.tooltip.cleanup();
        });
        B.dispatch = D;
        B.legend = c;
        B.lines = t;
        B.lines2 = n;
        B.bars = r;
        B.bars2 = i;
        B.xAxis = s;
        B.x2Axis = o;
        B.y1Axis = u;
        B.y2Axis = a;
        B.y3Axis = f;
        B.y4Axis = l;
        d3.rebind(B, t, "defined", "size", "clipVoronoi", "interpolate");
        B.options = e.utils.optionsFunc.bind(B);
        B.x = function(e) {
            if (!arguments.length) return y;
            y = e;
            t.x(e);
            r.x(e);
            return B;
        };
        B.y = function(e) {
            if (!arguments.length) return b;
            b = e;
            t.y(e);
            r.y(e);
            return B;
        };
        B.margin = function(e) {
            if (!arguments.length) return p;
            p.top = typeof e.top != "undefined" ? e.top : p.top;
            p.right = typeof e.right != "undefined" ? e.right : p.right;
            p.bottom = typeof e.bottom != "undefined" ? e.bottom : p.bottom;
            p.left = typeof e.left != "undefined" ? e.left : p.left;
            return B;
        };
        B.width = function(e) {
            if (!arguments.length) return v;
            v = e;
            return B;
        };
        B.height = function(e) {
            if (!arguments.length) return m;
            m = e;
            return B;
        };
        B.color = function(t) {
            if (!arguments.length) return w;
            w = e.utils.getColor(t);
            c.color(w);
            return B;
        };
        B.showLegend = function(e) {
            if (!arguments.length) return E;
            E = e;
            return B;
        };
        B.tooltips = function(e) {
            if (!arguments.length) return T;
            T = e;
            return B;
        };
        B.tooltipContent = function(e) {
            if (!arguments.length) return N;
            N = e;
            return B;
        };
        B.noData = function(e) {
            if (!arguments.length) return _;
            _ = e;
            return B;
        };
        B.brushExtent = function(e) {
            if (!arguments.length) return x;
            x = e;
            return B;
        };
        return B;
    };
    e.models.multiBar = function() {
        "use strict";
        function N(e) {
            e.each(function(e) {
                var N = n - t.left - t.right, C = r - t.top - t.bottom, k = d3.select(this);
                p && e.length && (p = [ {
                    values: e[0].values.map(function(e) {
                        return {
                            x: e.x,
                            y: 0,
                            series: e.series,
                            size: .01
                        };
                    })
                } ]);
                c && (e = d3.layout.stack().offset("zero").values(function(e) {
                    return e.values;
                }).y(a)(!e.length && p ? p : e));
                e = e.map(function(e, t) {
                    e.values = e.values.map(function(e) {
                        e.series = t;
                        return e;
                    });
                    return e;
                });
                c && e[0].values.map(function(t, n) {
                    var r = 0, i = 0;
                    e.map(function(e) {
                        var t = e.values[n];
                        t.size = Math.abs(t.y);
                        if (t.y < 0) {
                            t.y1 = i;
                            i -= t.size;
                        } else {
                            t.y1 = t.size + r;
                            r += t.size;
                        }
                    });
                });
                var L = g && y ? [] : e.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0,
                            y1: e.y1
                        };
                    });
                });
                i.domain(g || d3.merge(L).map(function(e) {
                    return e.x;
                })).rangeBands(b || [ 0, N ], E);
                s.domain(y || d3.extent(d3.merge(L).map(function(e) {
                    return c ? e.y > 0 ? e.y1 : e.y1 + e.y : e.y;
                }).concat(f))).range(w || [ C, 0 ]);
                i.domain()[0] === i.domain()[1] && (i.domain()[0] ? i.domain([ i.domain()[0] - i.domain()[0] * .01, i.domain()[1] + i.domain()[1] * .01 ]) : i.domain([ -1, 1 ]));
                s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([ s.domain()[0] + s.domain()[0] * .01, s.domain()[1] - s.domain()[1] * .01 ]) : s.domain([ -1, 1 ]));
                x = x || i;
                T = T || s;
                var A = k.selectAll("g.nv-wrap.nv-multibar").data([ e ]), O = A.enter().append("g").attr("class", "nvd3 nv-wrap nv-multibar"), M = O.append("defs"), _ = O.append("g"), D = A.select("g");
                _.append("g").attr("class", "nv-groups");
                A.attr("transform", "translate(" + t.left + "," + t.top + ")");
                M.append("clipPath").attr("id", "nv-edge-clip-" + o).append("rect");
                A.select("#nv-edge-clip-" + o + " rect").attr("width", N).attr("height", C);
                D.attr("clip-path", l ? "url(#nv-edge-clip-" + o + ")" : "");
                var P = A.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e;
                }, function(e, t) {
                    return t;
                });
                P.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6);
                P.exit().transition().selectAll("rect.nv-bar").delay(function(t, n) {
                    return n * m / e[0].values.length;
                }).attr("y", function(e) {
                    return c ? T(e.y0) : T(0);
                }).attr("height", 0).remove();
                P.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t;
                }).classed("hover", function(e) {
                    return e.hover;
                }).style("fill", function(e, t) {
                    return h(e, t);
                }).style("stroke", function(e, t) {
                    return h(e, t);
                });
                P.transition().style("stroke-opacity", 1).style("fill-opacity", .75);
                var H = P.selectAll("rect.nv-bar").data(function(t) {
                    return p && !e.length ? p.values : t.values;
                });
                H.exit().remove();
                var B = H.enter().append("rect").attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive";
                }).attr("x", function(t, n, r) {
                    return c ? 0 : r * i.rangeBand() / e.length;
                }).attr("y", function(e) {
                    return T(c ? e.y0 : 0);
                }).attr("height", 0).attr("width", i.rangeBand() / (c ? 1 : e.length)).attr("transform", function(e, t) {
                    return "translate(" + i(u(e, t)) + ",0)";
                });
                H.style("fill", function(e, t, n) {
                    return h(e, n, t);
                }).style("stroke", function(e, t, n) {
                    return h(e, n, t);
                }).on("mouseover", function(t, n) {
                    d3.select(this).classed("hover", !0);
                    S.elementMouseover({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ i(u(t, n)) + i.rangeBand() * (c ? e.length / 2 : t.series + .5) / e.length, s(a(t, n) + (c ? t.y0 : 0)) ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                }).on("mouseout", function(t, n) {
                    d3.select(this).classed("hover", !1);
                    S.elementMouseout({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                }).on("click", function(t, n) {
                    S.elementClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ i(u(t, n)) + i.rangeBand() * (c ? e.length / 2 : t.series + .5) / e.length, s(a(t, n) + (c ? t.y0 : 0)) ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                    d3.event.stopPropagation();
                }).on("dblclick", function(t, n) {
                    S.elementDblClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ i(u(t, n)) + i.rangeBand() * (c ? e.length / 2 : t.series + .5) / e.length, s(a(t, n) + (c ? t.y0 : 0)) ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                    d3.event.stopPropagation();
                });
                H.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive";
                }).transition().attr("transform", function(e, t) {
                    return "translate(" + i(u(e, t)) + ",0)";
                });
                if (d) {
                    v || (v = e.map(function() {
                        return !0;
                    }));
                    H.style("fill", function(e, t, n) {
                        return d3.rgb(d(e, t)).darker(v.map(function(e, t) {
                            return t;
                        }).filter(function(e, t) {
                            return !v[t];
                        })[n]).toString();
                    }).style("stroke", function(e, t, n) {
                        return d3.rgb(d(e, t)).darker(v.map(function(e, t) {
                            return t;
                        }).filter(function(e, t) {
                            return !v[t];
                        })[n]).toString();
                    });
                }
                c ? H.transition().delay(function(t, n) {
                    return n * m / e[0].values.length;
                }).attr("y", function(e, t) {
                    return s(c ? e.y1 : 0);
                }).attr("height", function(e, t) {
                    return Math.max(Math.abs(s(e.y + (c ? e.y0 : 0)) - s(c ? e.y0 : 0)), 1);
                }).attr("x", function(t, n) {
                    return c ? 0 : t.series * i.rangeBand() / e.length;
                }).attr("width", i.rangeBand() / (c ? 1 : e.length)) : H.transition().delay(function(t, n) {
                    return n * m / e[0].values.length;
                }).attr("x", function(t, n) {
                    return t.series * i.rangeBand() / e.length;
                }).attr("width", i.rangeBand() / e.length).attr("y", function(e, t) {
                    return a(e, t) < 0 ? s(0) : s(0) - s(a(e, t)) < 1 ? s(0) - 1 : s(a(e, t)) || 0;
                }).attr("height", function(e, t) {
                    return Math.max(Math.abs(s(a(e, t)) - s(0)), 1) || 0;
                });
                x = i.copy();
                T = s.copy();
            });
            return N;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = d3.scale.ordinal(), s = d3.scale.linear(), o = Math.floor(Math.random() * 1e4), u = function(e) {
            return e.x;
        }, a = function(e) {
            return e.y;
        }, f = [ 0 ], l = !0, c = !1, h = e.utils.defaultColor(), p = !1, d = null, v, m = 1200, g, y, b, w, E = .1, S = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"), x, T;
        N.dispatch = S;
        N.options = e.utils.optionsFunc.bind(N);
        N.x = function(e) {
            if (!arguments.length) return u;
            u = e;
            return N;
        };
        N.y = function(e) {
            if (!arguments.length) return a;
            a = e;
            return N;
        };
        N.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return N;
        };
        N.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return N;
        };
        N.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return N;
        };
        N.xScale = function(e) {
            if (!arguments.length) return i;
            i = e;
            return N;
        };
        N.yScale = function(e) {
            if (!arguments.length) return s;
            s = e;
            return N;
        };
        N.xDomain = function(e) {
            if (!arguments.length) return g;
            g = e;
            return N;
        };
        N.yDomain = function(e) {
            if (!arguments.length) return y;
            y = e;
            return N;
        };
        N.xRange = function(e) {
            if (!arguments.length) return b;
            b = e;
            return N;
        };
        N.yRange = function(e) {
            if (!arguments.length) return w;
            w = e;
            return N;
        };
        N.forceY = function(e) {
            if (!arguments.length) return f;
            f = e;
            return N;
        };
        N.stacked = function(e) {
            if (!arguments.length) return c;
            c = e;
            return N;
        };
        N.clipEdge = function(e) {
            if (!arguments.length) return l;
            l = e;
            return N;
        };
        N.color = function(t) {
            if (!arguments.length) return h;
            h = e.utils.getColor(t);
            return N;
        };
        N.barColor = function(t) {
            if (!arguments.length) return d;
            d = e.utils.getColor(t);
            return N;
        };
        N.disabled = function(e) {
            if (!arguments.length) return v;
            v = e;
            return N;
        };
        N.id = function(e) {
            if (!arguments.length) return o;
            o = e;
            return N;
        };
        N.hideable = function(e) {
            if (!arguments.length) return p;
            p = e;
            return N;
        };
        N.delay = function(e) {
            if (!arguments.length) return m;
            m = e;
            return N;
        };
        N.groupSpacing = function(e) {
            if (!arguments.length) return E;
            E = e;
            return N;
        };
        return N;
    };
    e.models.multiBarChart = function() {
        "use strict";
        function A(e) {
            e.each(function(e) {
                var b = d3.select(this), O = this, M = (u || parseInt(b.style("width")) || 960) - o.left - o.right, _ = (a || parseInt(b.style("height")) || 400) - o.top - o.bottom;
                A.update = function() {
                    b.transition().duration(k).call(A);
                };
                A.container = this;
                S.disabled = e.map(function(e) {
                    return !!e.disabled;
                });
                if (!x) {
                    var D;
                    x = {};
                    for (D in S) S[D] instanceof Array ? x[D] = S[D].slice(0) : x[D] = S[D];
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var P = b.selectAll(".nv-noData").data([ T ]);
                    P.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    P.attr("x", o.left + M / 2).attr("y", o.top + _ / 2).text(function(e) {
                        return e;
                    });
                    return A;
                }
                b.selectAll(".nv-noData").remove();
                w = t.xScale();
                E = t.yScale();
                var H = b.selectAll("g.nv-wrap.nv-multiBarWithLegend").data([ e ]), B = H.enter().append("g").attr("class", "nvd3 nv-wrap nv-multiBarWithLegend").append("g"), j = H.select("g");
                B.append("g").attr("class", "nv-x nv-axis");
                B.append("g").attr("class", "nv-y nv-axis");
                B.append("g").attr("class", "nv-barsWrap");
                B.append("g").attr("class", "nv-legendWrap");
                B.append("g").attr("class", "nv-controlsWrap");
                if (c) {
                    i.width(M - C());
                    t.barColor() && e.forEach(function(e, t) {
                        e.color = d3.rgb("#ccc").darker(t * 1.5).toString();
                    });
                    j.select(".nv-legendWrap").datum(e).call(i);
                    if (o.top != i.height()) {
                        o.top = i.height();
                        _ = (a || parseInt(b.style("height")) || 400) - o.top - o.bottom;
                    }
                    j.select(".nv-legendWrap").attr("transform", "translate(" + C() + "," + -o.top + ")");
                }
                if (l) {
                    var F = [ {
                        key: "Grouped",
                        disabled: t.stacked()
                    }, {
                        key: "Stacked",
                        disabled: !t.stacked()
                    } ];
                    s.width(C()).color([ "#444", "#444", "#444" ]);
                    j.select(".nv-controlsWrap").datum(F).attr("transform", "translate(0," + -o.top + ")").call(s);
                }
                H.attr("transform", "translate(" + o.left + "," + o.top + ")");
                d && j.select(".nv-y.nv-axis").attr("transform", "translate(" + M + ",0)");
                t.disabled(e.map(function(e) {
                    return e.disabled;
                })).width(M).height(_).color(e.map(function(e, t) {
                    return e.color || f(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled;
                }));
                var I = j.select(".nv-barsWrap").datum(e.filter(function(e) {
                    return !e.disabled;
                }));
                I.transition().call(t);
                if (h) {
                    n.scale(w).ticks(M / 100).tickSize(-_, 0);
                    j.select(".nv-x.nv-axis").attr("transform", "translate(0," + E.range()[0] + ")");
                    j.select(".nv-x.nv-axis").transition().call(n);
                    var q = j.select(".nv-x.nv-axis > g").selectAll("g");
                    q.selectAll("line, text").style("opacity", 1);
                    if (m) {
                        var R = function(e, t) {
                            return "translate(" + e + "," + t + ")";
                        }, U = 5, z = 17;
                        q.selectAll("text").attr("transform", function(e, t, n) {
                            return R(0, n % 2 == 0 ? U : z);
                        });
                        var W = d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;
                        j.selectAll(".nv-x.nv-axis .nv-axisMaxMin text").attr("transform", function(e, t) {
                            return R(0, t === 0 || W % 2 !== 0 ? z : U);
                        });
                    }
                    v && q.filter(function(t, n) {
                        return n % Math.ceil(e[0].values.length / (M / 100)) !== 0;
                    }).selectAll("text, line").style("opacity", 0);
                    g && q.selectAll(".tick text").attr("transform", "rotate(" + g + " 0,0)").style("text-anchor", g > 0 ? "start" : "end");
                    j.select(".nv-x.nv-axis").selectAll("g.nv-axisMaxMin text").style("opacity", 1);
                }
                if (p) {
                    r.scale(E).ticks(_ / 36).tickSize(-M, 0);
                    j.select(".nv-y.nv-axis").transition().call(r);
                }
                i.dispatch.on("stateChange", function(e) {
                    S = e;
                    N.stateChange(S);
                    A.update();
                });
                s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled) return;
                    F = F.map(function(e) {
                        e.disabled = !0;
                        return e;
                    });
                    e.disabled = !1;
                    switch (e.key) {
                      case "Grouped":
                        t.stacked(!1);
                        break;
                      case "Stacked":
                        t.stacked(!0);
                    }
                    S.stacked = t.stacked();
                    N.stateChange(S);
                    A.update();
                });
                N.on("tooltipShow", function(e) {
                    y && L(e, O.parentNode);
                });
                N.on("changeState", function(n) {
                    if (typeof n.disabled != "undefined") {
                        e.forEach(function(e, t) {
                            e.disabled = n.disabled[t];
                        });
                        S.disabled = n.disabled;
                    }
                    if (typeof n.stacked != "undefined") {
                        t.stacked(n.stacked);
                        S.stacked = n.stacked;
                    }
                    A.update();
                });
            });
            return A;
        }
        var t = e.models.multiBar(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.models.legend(), o = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, u = null, a = null, f = e.utils.defaultColor(), l = !0, c = !0, h = !0, p = !0, d = !1, v = !0, m = !1, g = 0, y = !0, b = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " on " + t + "</p>";
        }, w, E, S = {
            stacked: !1
        }, x = null, T = "No Data Available.", N = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), C = function() {
            return l ? 180 : 0;
        }, k = 250;
        t.stacked(!1);
        n.orient("bottom").tickPadding(7).highlightZero(!0).showMaxMin(!1).tickFormat(function(e) {
            return e;
        });
        r.orient(d ? "right" : "left").tickFormat(d3.format(",.1f"));
        s.updateState(!1);
        var L = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0), u = i.pos[1] + (s.offsetTop || 0), a = n.tickFormat()(t.x()(i.point, i.pointIndex)), f = r.tickFormat()(t.y()(i.point, i.pointIndex)), l = b(i.series.key, a, f, i, A);
            e.tooltip.show([ o, u ], l, i.value < 0 ? "n" : "s", null, s);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + o.left, e.pos[1] + o.top ];
            N.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            N.tooltipHide(e);
        });
        N.on("tooltipHide", function() {
            y && e.tooltip.cleanup();
        });
        A.dispatch = N;
        A.multibar = t;
        A.legend = i;
        A.xAxis = n;
        A.yAxis = r;
        d3.rebind(A, t, "x", "y", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "clipEdge", "id", "stacked", "delay", "barColor", "groupSpacing");
        A.options = e.utils.optionsFunc.bind(A);
        A.margin = function(e) {
            if (!arguments.length) return o;
            o.top = typeof e.top != "undefined" ? e.top : o.top;
            o.right = typeof e.right != "undefined" ? e.right : o.right;
            o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom;
            o.left = typeof e.left != "undefined" ? e.left : o.left;
            return A;
        };
        A.width = function(e) {
            if (!arguments.length) return u;
            u = e;
            return A;
        };
        A.height = function(e) {
            if (!arguments.length) return a;
            a = e;
            return A;
        };
        A.color = function(t) {
            if (!arguments.length) return f;
            f = e.utils.getColor(t);
            i.color(f);
            return A;
        };
        A.showControls = function(e) {
            if (!arguments.length) return l;
            l = e;
            return A;
        };
        A.showLegend = function(e) {
            if (!arguments.length) return c;
            c = e;
            return A;
        };
        A.showXAxis = function(e) {
            if (!arguments.length) return h;
            h = e;
            return A;
        };
        A.showYAxis = function(e) {
            if (!arguments.length) return p;
            p = e;
            return A;
        };
        A.rightAlignYAxis = function(e) {
            if (!arguments.length) return d;
            d = e;
            r.orient(e ? "right" : "left");
            return A;
        };
        A.reduceXTicks = function(e) {
            if (!arguments.length) return v;
            v = e;
            return A;
        };
        A.rotateLabels = function(e) {
            if (!arguments.length) return g;
            g = e;
            return A;
        };
        A.staggerLabels = function(e) {
            if (!arguments.length) return m;
            m = e;
            return A;
        };
        A.tooltip = function(e) {
            if (!arguments.length) return b;
            b = e;
            return A;
        };
        A.tooltips = function(e) {
            if (!arguments.length) return y;
            y = e;
            return A;
        };
        A.tooltipContent = function(e) {
            if (!arguments.length) return b;
            b = e;
            return A;
        };
        A.state = function(e) {
            if (!arguments.length) return S;
            S = e;
            return A;
        };
        A.defaultState = function(e) {
            if (!arguments.length) return x;
            x = e;
            return A;
        };
        A.noData = function(e) {
            if (!arguments.length) return T;
            T = e;
            return A;
        };
        A.transitionDuration = function(e) {
            if (!arguments.length) return k;
            k = e;
            return A;
        };
        return A;
    };
    e.models.multiBarHorizontal = function() {
        "use strict";
        function N(e) {
            e.each(function(e) {
                var i = n - t.left - t.right, g = r - t.top - t.bottom, N = d3.select(this);
                p && (e = d3.layout.stack().offset("zero").values(function(e) {
                    return e.values;
                }).y(a)(e));
                e = e.map(function(e, t) {
                    e.values = e.values.map(function(e) {
                        e.series = t;
                        return e;
                    });
                    return e;
                });
                p && e[0].values.map(function(t, n) {
                    var r = 0, i = 0;
                    e.map(function(e) {
                        var t = e.values[n];
                        t.size = Math.abs(t.y);
                        if (t.y < 0) {
                            t.y1 = i - t.size;
                            i -= t.size;
                        } else {
                            t.y1 = r;
                            r += t.size;
                        }
                    });
                });
                var C = y && b ? [] : e.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0,
                            y1: e.y1
                        };
                    });
                });
                s.domain(y || d3.merge(C).map(function(e) {
                    return e.x;
                })).rangeBands(w || [ 0, g ], .1);
                o.domain(b || d3.extent(d3.merge(C).map(function(e) {
                    return p ? e.y > 0 ? e.y1 + e.y : e.y1 : e.y;
                }).concat(f)));
                d && !p ? o.range(E || [ o.domain()[0] < 0 ? v : 0, i - (o.domain()[1] > 0 ? v : 0) ]) : o.range(E || [ 0, i ]);
                x = x || s;
                T = T || d3.scale.linear().domain(o.domain()).range([ o(0), o(0) ]);
                var k = d3.select(this).selectAll("g.nv-wrap.nv-multibarHorizontal").data([ e ]), L = k.enter().append("g").attr("class", "nvd3 nv-wrap nv-multibarHorizontal"), A = L.append("defs"), O = L.append("g"), M = k.select("g");
                O.append("g").attr("class", "nv-groups");
                k.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var _ = k.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e;
                }, function(e, t) {
                    return t;
                });
                _.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6);
                _.exit().transition().style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6).remove();
                _.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t;
                }).classed("hover", function(e) {
                    return e.hover;
                }).style("fill", function(e, t) {
                    return l(e, t);
                }).style("stroke", function(e, t) {
                    return l(e, t);
                });
                _.transition().style("stroke-opacity", 1).style("fill-opacity", .75);
                var D = _.selectAll("g.nv-bar").data(function(e) {
                    return e.values;
                });
                D.exit().remove();
                var P = D.enter().append("g").attr("transform", function(t, n, r) {
                    return "translate(" + T(p ? t.y0 : 0) + "," + (p ? 0 : r * s.rangeBand() / e.length + s(u(t, n))) + ")";
                });
                P.append("rect").attr("width", 0).attr("height", s.rangeBand() / (p ? 1 : e.length));
                D.on("mouseover", function(t, n) {
                    d3.select(this).classed("hover", !0);
                    S.elementMouseover({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ o(a(t, n) + (p ? t.y0 : 0)), s(u(t, n)) + s.rangeBand() * (p ? e.length / 2 : t.series + .5) / e.length ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                }).on("mouseout", function(t, n) {
                    d3.select(this).classed("hover", !1);
                    S.elementMouseout({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                }).on("click", function(t, n) {
                    S.elementClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ s(u(t, n)) + s.rangeBand() * (p ? e.length / 2 : t.series + .5) / e.length, o(a(t, n) + (p ? t.y0 : 0)) ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                    d3.event.stopPropagation();
                }).on("dblclick", function(t, n) {
                    S.elementDblClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [ s(u(t, n)) + s.rangeBand() * (p ? e.length / 2 : t.series + .5) / e.length, o(a(t, n) + (p ? t.y0 : 0)) ],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    });
                    d3.event.stopPropagation();
                });
                P.append("text");
                if (d && !p) {
                    D.select("text").attr("text-anchor", function(e, t) {
                        return a(e, t) < 0 ? "end" : "start";
                    }).attr("y", s.rangeBand() / (e.length * 2)).attr("dy", ".32em").text(function(e, t) {
                        return m(a(e, t));
                    });
                    D.transition().select("text").attr("x", function(e, t) {
                        return a(e, t) < 0 ? -4 : o(a(e, t)) - o(0) + 4;
                    });
                } else D.selectAll("text").text("");
                D.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive";
                });
                if (c) {
                    h || (h = e.map(function() {
                        return !0;
                    }));
                    D.style("fill", function(e, t, n) {
                        return d3.rgb(c(e, t)).darker(h.map(function(e, t) {
                            return t;
                        }).filter(function(e, t) {
                            return !h[t];
                        })[n]).toString();
                    }).style("stroke", function(e, t, n) {
                        return d3.rgb(c(e, t)).darker(h.map(function(e, t) {
                            return t;
                        }).filter(function(e, t) {
                            return !h[t];
                        })[n]).toString();
                    });
                }
                p ? D.transition().attr("transform", function(e, t) {
                    return "translate(" + o(e.y1) + "," + s(u(e, t)) + ")";
                }).select("rect").attr("width", function(e, t) {
                    return Math.abs(o(a(e, t) + e.y0) - o(e.y0));
                }).attr("height", s.rangeBand()) : D.transition().attr("transform", function(t, n) {
                    return "translate(" + (a(t, n) < 0 ? o(a(t, n)) : o(0)) + "," + (t.series * s.rangeBand() / e.length + s(u(t, n))) + ")";
                }).select("rect").attr("height", s.rangeBand() / e.length).attr("width", function(e, t) {
                    return Math.max(Math.abs(o(a(e, t)) - o(0)), 1);
                });
                x = s.copy();
                T = o.copy();
            });
            return N;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = Math.floor(Math.random() * 1e4), s = d3.scale.ordinal(), o = d3.scale.linear(), u = function(e) {
            return e.x;
        }, a = function(e) {
            return e.y;
        }, f = [ 0 ], l = e.utils.defaultColor(), c = null, h, p = !1, d = !1, v = 60, m = d3.format(",.2f"), g = 1200, y, b, w, E, S = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"), x, T;
        N.dispatch = S;
        N.options = e.utils.optionsFunc.bind(N);
        N.x = function(e) {
            if (!arguments.length) return u;
            u = e;
            return N;
        };
        N.y = function(e) {
            if (!arguments.length) return a;
            a = e;
            return N;
        };
        N.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return N;
        };
        N.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return N;
        };
        N.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return N;
        };
        N.xScale = function(e) {
            if (!arguments.length) return s;
            s = e;
            return N;
        };
        N.yScale = function(e) {
            if (!arguments.length) return o;
            o = e;
            return N;
        };
        N.xDomain = function(e) {
            if (!arguments.length) return y;
            y = e;
            return N;
        };
        N.yDomain = function(e) {
            if (!arguments.length) return b;
            b = e;
            return N;
        };
        N.xRange = function(e) {
            if (!arguments.length) return w;
            w = e;
            return N;
        };
        N.yRange = function(e) {
            if (!arguments.length) return E;
            E = e;
            return N;
        };
        N.forceY = function(e) {
            if (!arguments.length) return f;
            f = e;
            return N;
        };
        N.stacked = function(e) {
            if (!arguments.length) return p;
            p = e;
            return N;
        };
        N.color = function(t) {
            if (!arguments.length) return l;
            l = e.utils.getColor(t);
            return N;
        };
        N.barColor = function(t) {
            if (!arguments.length) return c;
            c = e.utils.getColor(t);
            return N;
        };
        N.disabled = function(e) {
            if (!arguments.length) return h;
            h = e;
            return N;
        };
        N.id = function(e) {
            if (!arguments.length) return i;
            i = e;
            return N;
        };
        N.delay = function(e) {
            if (!arguments.length) return g;
            g = e;
            return N;
        };
        N.showValues = function(e) {
            if (!arguments.length) return d;
            d = e;
            return N;
        };
        N.valueFormat = function(e) {
            if (!arguments.length) return m;
            m = e;
            return N;
        };
        N.valuePadding = function(e) {
            if (!arguments.length) return v;
            v = e;
            return N;
        };
        return N;
    };
    e.models.multiBarHorizontalChart = function() {
        "use strict";
        function T(e) {
            e.each(function(h) {
                var d = d3.select(this), N = this, C = (u || parseInt(d.style("width")) || 960) - o.left - o.right, k = (a || parseInt(d.style("height")) || 400) - o.top - o.bottom;
                T.update = function() {
                    d.transition().duration(S).call(T);
                };
                T.container = this;
                g.disabled = h.map(function(e) {
                    return !!e.disabled;
                });
                if (!y) {
                    var L;
                    y = {};
                    for (L in g) g[L] instanceof Array ? y[L] = g[L].slice(0) : y[L] = g[L];
                }
                if (!h || !h.length || !h.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var A = d.selectAll(".nv-noData").data([ b ]);
                    A.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    A.attr("x", o.left + C / 2).attr("y", o.top + k / 2).text(function(e) {
                        return e;
                    });
                    return T;
                }
                d.selectAll(".nv-noData").remove();
                v = t.xScale();
                m = t.yScale();
                var O = d.selectAll("g.nv-wrap.nv-multiBarHorizontalChart").data([ h ]), M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-multiBarHorizontalChart").append("g"), _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis");
                M.append("g").attr("class", "nv-y nv-axis");
                M.append("g").attr("class", "nv-barsWrap");
                M.append("g").attr("class", "nv-legendWrap");
                M.append("g").attr("class", "nv-controlsWrap");
                if (c) {
                    i.width(C - E());
                    t.barColor() && h.forEach(function(e, t) {
                        e.color = d3.rgb("#ccc").darker(t * 1.5).toString();
                    });
                    _.select(".nv-legendWrap").datum(h).call(i);
                    if (o.top != i.height()) {
                        o.top = i.height();
                        k = (a || parseInt(d.style("height")) || 400) - o.top - o.bottom;
                    }
                    _.select(".nv-legendWrap").attr("transform", "translate(" + E() + "," + -o.top + ")");
                }
                if (l) {
                    var D = [ {
                        key: "Grouped",
                        disabled: t.stacked()
                    }, {
                        key: "Stacked",
                        disabled: !t.stacked()
                    } ];
                    s.width(E()).color([ "#444", "#444", "#444" ]);
                    _.select(".nv-controlsWrap").datum(D).attr("transform", "translate(0," + -o.top + ")").call(s);
                }
                O.attr("transform", "translate(" + o.left + "," + o.top + ")");
                t.disabled(h.map(function(e) {
                    return e.disabled;
                })).width(C).height(k).color(h.map(function(e, t) {
                    return e.color || f(e, t);
                }).filter(function(e, t) {
                    return !h[t].disabled;
                }));
                var P = _.select(".nv-barsWrap").datum(h.filter(function(e) {
                    return !e.disabled;
                }));
                P.transition().call(t);
                n.scale(v).ticks(k / 24).tickSize(-C, 0);
                _.select(".nv-x.nv-axis").transition().call(n);
                var H = _.select(".nv-x.nv-axis").selectAll("g");
                H.selectAll("line, text").style("opacity", 1);
                r.scale(m).ticks(C / 100).tickSize(-k, 0);
                _.select(".nv-y.nv-axis").attr("transform", "translate(0," + k + ")");
                _.select(".nv-y.nv-axis").transition().call(r);
                i.dispatch.on("stateChange", function(e) {
                    g = e;
                    w.stateChange(g);
                    T.update();
                });
                s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled) return;
                    D = D.map(function(e) {
                        e.disabled = !0;
                        return e;
                    });
                    e.disabled = !1;
                    switch (e.key) {
                      case "Grouped":
                        t.stacked(!1);
                        break;
                      case "Stacked":
                        t.stacked(!0);
                    }
                    g.stacked = t.stacked();
                    w.stateChange(g);
                    T.update();
                });
                w.on("tooltipShow", function(e) {
                    p && x(e, N.parentNode);
                });
                w.on("changeState", function(n) {
                    if (typeof n.disabled != "undefined") {
                        h.forEach(function(e, t) {
                            e.disabled = n.disabled[t];
                        });
                        g.disabled = n.disabled;
                    }
                    if (typeof n.stacked != "undefined") {
                        t.stacked(n.stacked);
                        g.stacked = n.stacked;
                    }
                    e.call(T);
                });
            });
            return T;
        }
        var t = e.models.multiBarHorizontal(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend().height(30), s = e.models.legend().height(30), o = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, u = null, a = null, f = e.utils.defaultColor(), l = !0, c = !0, h = !1, p = !0, d = function(e, t, n, r, i) {
            return "<h3>" + e + " - " + t + "</h3>" + "<p>" + n + "</p>";
        }, v, m, g = {
            stacked: h
        }, y = null, b = "No Data Available.", w = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), E = function() {
            return l ? 180 : 0;
        }, S = 250;
        t.stacked(h);
        n.orient("left").tickPadding(5).highlightZero(!1).showMaxMin(!1).tickFormat(function(e) {
            return e;
        });
        r.orient("bottom").tickFormat(d3.format(",.1f"));
        s.updateState(!1);
        var x = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0), u = i.pos[1] + (s.offsetTop || 0), a = n.tickFormat()(t.x()(i.point, i.pointIndex)), f = r.tickFormat()(t.y()(i.point, i.pointIndex)), l = d(i.series.key, a, f, i, T);
            e.tooltip.show([ o, u ], l, i.value < 0 ? "e" : "w", null, s);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + o.left, e.pos[1] + o.top ];
            w.tooltipShow(e);
        });
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            w.tooltipHide(e);
        });
        w.on("tooltipHide", function() {
            p && e.tooltip.cleanup();
        });
        T.dispatch = w;
        T.multibar = t;
        T.legend = i;
        T.xAxis = n;
        T.yAxis = r;
        d3.rebind(T, t, "x", "y", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "clipEdge", "id", "delay", "showValues", "valueFormat", "stacked", "barColor");
        T.options = e.utils.optionsFunc.bind(T);
        T.margin = function(e) {
            if (!arguments.length) return o;
            o.top = typeof e.top != "undefined" ? e.top : o.top;
            o.right = typeof e.right != "undefined" ? e.right : o.right;
            o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom;
            o.left = typeof e.left != "undefined" ? e.left : o.left;
            return T;
        };
        T.width = function(e) {
            if (!arguments.length) return u;
            u = e;
            return T;
        };
        T.height = function(e) {
            if (!arguments.length) return a;
            a = e;
            return T;
        };
        T.color = function(t) {
            if (!arguments.length) return f;
            f = e.utils.getColor(t);
            i.color(f);
            return T;
        };
        T.showControls = function(e) {
            if (!arguments.length) return l;
            l = e;
            return T;
        };
        T.showLegend = function(e) {
            if (!arguments.length) return c;
            c = e;
            return T;
        };
        T.tooltip = function(e) {
            if (!arguments.length) return d;
            d = e;
            return T;
        };
        T.tooltips = function(e) {
            if (!arguments.length) return p;
            p = e;
            return T;
        };
        T.tooltipContent = function(e) {
            if (!arguments.length) return d;
            d = e;
            return T;
        };
        T.state = function(e) {
            if (!arguments.length) return g;
            g = e;
            return T;
        };
        T.defaultState = function(e) {
            if (!arguments.length) return y;
            y = e;
            return T;
        };
        T.noData = function(e) {
            if (!arguments.length) return b;
            b = e;
            return T;
        };
        T.transitionDuration = function(e) {
            if (!arguments.length) return S;
            S = e;
            return T;
        };
        return T;
    };
    e.models.multiChart = function() {
        "use strict";
        function C(e) {
            e.each(function(e) {
                var u = d3.select(this), f = this;
                C.update = function() {
                    u.transition().call(C);
                };
                C.container = this;
                var k = (r || parseInt(u.style("width")) || 960) - t.left - t.right, L = (i || parseInt(u.style("height")) || 400) - t.top - t.bottom, A = e.filter(function(e) {
                    return !e.disabled && e.type == "line" && e.yAxis == 1;
                }), O = e.filter(function(e) {
                    return !e.disabled && e.type == "line" && e.yAxis == 2;
                }), M = e.filter(function(e) {
                    return !e.disabled && e.type == "bar" && e.yAxis == 1;
                }), _ = e.filter(function(e) {
                    return !e.disabled && e.type == "bar" && e.yAxis == 2;
                }), D = e.filter(function(e) {
                    return !e.disabled && e.type == "area" && e.yAxis == 1;
                }), P = e.filter(function(e) {
                    return !e.disabled && e.type == "area" && e.yAxis == 2;
                }), H = e.filter(function(e) {
                    return !e.disabled && e.yAxis == 1;
                }).map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: e.x,
                            y: e.y
                        };
                    });
                }), B = e.filter(function(e) {
                    return !e.disabled && e.yAxis == 2;
                }).map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: e.x,
                            y: e.y
                        };
                    });
                });
                a.domain(d3.extent(d3.merge(H.concat(B)), function(e) {
                    return e.x;
                })).range([ 0, k ]);
                var j = u.selectAll("g.wrap.multiChart").data([ e ]), F = j.enter().append("g").attr("class", "wrap nvd3 multiChart").append("g");
                F.append("g").attr("class", "x axis");
                F.append("g").attr("class", "y1 axis");
                F.append("g").attr("class", "y2 axis");
                F.append("g").attr("class", "lines1Wrap");
                F.append("g").attr("class", "lines2Wrap");
                F.append("g").attr("class", "bars1Wrap");
                F.append("g").attr("class", "bars2Wrap");
                F.append("g").attr("class", "stack1Wrap");
                F.append("g").attr("class", "stack2Wrap");
                F.append("g").attr("class", "legendWrap");
                var I = j.select("g");
                if (s) {
                    x.width(k / 2);
                    I.select(".legendWrap").datum(e.map(function(e) {
                        e.originalKey = e.originalKey === undefined ? e.key : e.originalKey;
                        e.key = e.originalKey + (e.yAxis == 1 ? "" : " (right axis)");
                        return e;
                    })).call(x);
                    if (t.top != x.height()) {
                        t.top = x.height();
                        L = (i || parseInt(u.style("height")) || 400) - t.top - t.bottom;
                    }
                    I.select(".legendWrap").attr("transform", "translate(" + k / 2 + "," + -t.top + ")");
                }
                d.width(k).height(L).interpolate("monotone").color(e.map(function(e, t) {
                    return e.color || n[t % n.length];
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 1 && e[n].type == "line";
                }));
                v.width(k).height(L).interpolate("monotone").color(e.map(function(e, t) {
                    return e.color || n[t % n.length];
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 2 && e[n].type == "line";
                }));
                m.width(k).height(L).color(e.map(function(e, t) {
                    return e.color || n[t % n.length];
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 1 && e[n].type == "bar";
                }));
                g.width(k).height(L).color(e.map(function(e, t) {
                    return e.color || n[t % n.length];
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 2 && e[n].type == "bar";
                }));
                y.width(k).height(L).color(e.map(function(e, t) {
                    return e.color || n[t % n.length];
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 1 && e[n].type == "area";
                }));
                b.width(k).height(L).color(e.map(function(e, t) {
                    return e.color || n[t % n.length];
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 2 && e[n].type == "area";
                }));
                I.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var q = I.select(".lines1Wrap").datum(A), R = I.select(".bars1Wrap").datum(M), U = I.select(".stack1Wrap").datum(D), z = I.select(".lines2Wrap").datum(O), W = I.select(".bars2Wrap").datum(_), X = I.select(".stack2Wrap").datum(P), V = D.length ? D.map(function(e) {
                    return e.values;
                }).reduce(function(e, t) {
                    return e.map(function(e, n) {
                        return {
                            x: e.x,
                            y: e.y + t[n].y
                        };
                    });
                }).concat([ {
                    x: 0,
                    y: 0
                } ]) : [], $ = P.length ? P.map(function(e) {
                    return e.values;
                }).reduce(function(e, t) {
                    return e.map(function(e, n) {
                        return {
                            x: e.x,
                            y: e.y + t[n].y
                        };
                    });
                }).concat([ {
                    x: 0,
                    y: 0
                } ]) : [];
                h.domain(l || d3.extent(d3.merge(H).concat(V), function(e) {
                    return e.y;
                })).range([ 0, L ]);
                p.domain(c || d3.extent(d3.merge(B).concat($), function(e) {
                    return e.y;
                })).range([ 0, L ]);
                d.yDomain(h.domain());
                m.yDomain(h.domain());
                y.yDomain(h.domain());
                v.yDomain(p.domain());
                g.yDomain(p.domain());
                b.yDomain(p.domain());
                D.length && d3.transition(U).call(y);
                P.length && d3.transition(X).call(b);
                M.length && d3.transition(R).call(m);
                _.length && d3.transition(W).call(g);
                A.length && d3.transition(q).call(d);
                O.length && d3.transition(z).call(v);
                w.ticks(k / 100).tickSize(-L, 0);
                I.select(".x.axis").attr("transform", "translate(0," + L + ")");
                d3.transition(I.select(".x.axis")).call(w);
                E.ticks(L / 36).tickSize(-k, 0);
                d3.transition(I.select(".y1.axis")).call(E);
                S.ticks(L / 36).tickSize(-k, 0);
                d3.transition(I.select(".y2.axis")).call(S);
                I.select(".y2.axis").style("opacity", B.length ? 1 : 0).attr("transform", "translate(" + a.range()[1] + ",0)");
                x.dispatch.on("stateChange", function(e) {
                    C.update();
                });
                T.on("tooltipShow", function(e) {
                    o && N(e, f.parentNode);
                });
            });
            return C;
        }
        var t = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, n = d3.scale.category20().range(), r = null, i = null, s = !0, o = !0, u = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>";
        }, a, f, l, c, a = d3.scale.linear(), h = d3.scale.linear(), p = d3.scale.linear(), d = e.models.line().yScale(h), v = e.models.line().yScale(p), m = e.models.multiBar().stacked(!1).yScale(h), g = e.models.multiBar().stacked(!1).yScale(p), y = e.models.stackedArea().yScale(h), b = e.models.stackedArea().yScale(p), w = e.models.axis().scale(a).orient("bottom").tickPadding(5), E = e.models.axis().scale(h).orient("left"), S = e.models.axis().scale(p).orient("right"), x = e.models.legend().height(30), T = d3.dispatch("tooltipShow", "tooltipHide"), N = function(t, n) {
            var r = t.pos[0] + (n.offsetLeft || 0), i = t.pos[1] + (n.offsetTop || 0), s = w.tickFormat()(d.x()(t.point, t.pointIndex)), o = (t.series.yAxis == 2 ? S : E).tickFormat()(d.y()(t.point, t.pointIndex)), a = u(t.series.key, s, o, t, C);
            e.tooltip.show([ r, i ], a, undefined, undefined, n.offsetParent);
        };
        d.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ];
            T.tooltipShow(e);
        });
        d.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e);
        });
        v.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ];
            T.tooltipShow(e);
        });
        v.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e);
        });
        m.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ];
            T.tooltipShow(e);
        });
        m.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e);
        });
        g.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ];
            T.tooltipShow(e);
        });
        g.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e);
        });
        y.dispatch.on("tooltipShow", function(e) {
            if (!Math.round(y.y()(e.point) * 100)) {
                setTimeout(function() {
                    d3.selectAll(".point.hover").classed("hover", !1);
                }, 0);
                return !1;
            }
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ], T.tooltipShow(e);
        });
        y.dispatch.on("tooltipHide", function(e) {
            T.tooltipHide(e);
        });
        b.dispatch.on("tooltipShow", function(e) {
            if (!Math.round(b.y()(e.point) * 100)) {
                setTimeout(function() {
                    d3.selectAll(".point.hover").classed("hover", !1);
                }, 0);
                return !1;
            }
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ], T.tooltipShow(e);
        });
        b.dispatch.on("tooltipHide", function(e) {
            T.tooltipHide(e);
        });
        d.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ];
            T.tooltipShow(e);
        });
        d.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e);
        });
        v.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ];
            T.tooltipShow(e);
        });
        v.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e);
        });
        T.on("tooltipHide", function() {
            o && e.tooltip.cleanup();
        });
        C.dispatch = T;
        C.lines1 = d;
        C.lines2 = v;
        C.bars1 = m;
        C.bars2 = g;
        C.stack1 = y;
        C.stack2 = b;
        C.xAxis = w;
        C.yAxis1 = E;
        C.yAxis2 = S;
        C.options = e.utils.optionsFunc.bind(C);
        C.x = function(e) {
            if (!arguments.length) return getX;
            getX = e;
            d.x(e);
            m.x(e);
            return C;
        };
        C.y = function(e) {
            if (!arguments.length) return getY;
            getY = e;
            d.y(e);
            m.y(e);
            return C;
        };
        C.yDomain1 = function(e) {
            if (!arguments.length) return l;
            l = e;
            return C;
        };
        C.yDomain2 = function(e) {
            if (!arguments.length) return c;
            c = e;
            return C;
        };
        C.margin = function(e) {
            if (!arguments.length) return t;
            t = e;
            return C;
        };
        C.width = function(e) {
            if (!arguments.length) return r;
            r = e;
            return C;
        };
        C.height = function(e) {
            if (!arguments.length) return i;
            i = e;
            return C;
        };
        C.color = function(e) {
            if (!arguments.length) return n;
            n = e;
            x.color(e);
            return C;
        };
        C.showLegend = function(e) {
            if (!arguments.length) return s;
            s = e;
            return C;
        };
        C.tooltips = function(e) {
            if (!arguments.length) return o;
            o = e;
            return C;
        };
        C.tooltipContent = function(e) {
            if (!arguments.length) return u;
            u = e;
            return C;
        };
        return C;
    };
    e.models.ohlcBar = function() {
        "use strict";
        function x(e) {
            e.each(function(e) {
                var g = n - t.left - t.right, x = r - t.top - t.bottom, T = d3.select(this);
                s.domain(y || d3.extent(e[0].values.map(u).concat(p)));
                v ? s.range(w || [ g * .5 / e[0].values.length, g * (e[0].values.length - .5) / e[0].values.length ]) : s.range(w || [ 0, g ]);
                o.domain(b || [ d3.min(e[0].values.map(h).concat(d)), d3.max(e[0].values.map(c).concat(d)) ]).range(E || [ x, 0 ]);
                if (s.domain()[0] === s.domain()[1] || o.domain()[0] === o.domain()[1]) singlePoint = !0;
                s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([ s.domain()[0] - s.domain()[0] * .01, s.domain()[1] + s.domain()[1] * .01 ]) : s.domain([ -1, 1 ]));
                o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([ o.domain()[0] + o.domain()[0] * .01, o.domain()[1] - o.domain()[1] * .01 ]) : o.domain([ -1, 1 ]));
                var N = d3.select(this).selectAll("g.nv-wrap.nv-ohlcBar").data([ e[0].values ]), C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-ohlcBar"), k = C.append("defs"), L = C.append("g"), A = N.select("g");
                L.append("g").attr("class", "nv-ticks");
                N.attr("transform", "translate(" + t.left + "," + t.top + ")");
                T.on("click", function(e, t) {
                    S.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: i
                    });
                });
                k.append("clipPath").attr("id", "nv-chart-clip-path-" + i).append("rect");
                N.select("#nv-chart-clip-path-" + i + " rect").attr("width", g).attr("height", x);
                A.attr("clip-path", m ? "url(#nv-chart-clip-path-" + i + ")" : "");
                var O = N.select(".nv-ticks").selectAll(".nv-tick").data(function(e) {
                    return e;
                });
                O.exit().remove();
                var M = O.enter().append("path").attr("class", function(e, t, n) {
                    return (f(e, t) > l(e, t) ? "nv-tick negative" : "nv-tick positive") + " nv-tick-" + n + "-" + t;
                }).attr("d", function(t, n) {
                    var r = g / e[0].values.length * .9;
                    return "m0,0l0," + (o(f(t, n)) - o(c(t, n))) + "l" + -r / 2 + ",0l" + r / 2 + ",0l0," + (o(h(t, n)) - o(f(t, n))) + "l0," + (o(l(t, n)) - o(h(t, n))) + "l" + r / 2 + ",0l" + -r / 2 + ",0z";
                }).attr("transform", function(e, t) {
                    return "translate(" + s(u(e, t)) + "," + o(c(e, t)) + ")";
                }).on("mouseover", function(t, n) {
                    d3.select(this).classed("hover", !0);
                    S.elementMouseover({
                        point: t,
                        series: e[0],
                        pos: [ s(u(t, n)), o(a(t, n)) ],
                        pointIndex: n,
                        seriesIndex: 0,
                        e: d3.event
                    });
                }).on("mouseout", function(t, n) {
                    d3.select(this).classed("hover", !1);
                    S.elementMouseout({
                        point: t,
                        series: e[0],
                        pointIndex: n,
                        seriesIndex: 0,
                        e: d3.event
                    });
                }).on("click", function(e, t) {
                    S.elementClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [ s(u(e, t)), o(a(e, t)) ],
                        e: d3.event,
                        id: i
                    });
                    d3.event.stopPropagation();
                }).on("dblclick", function(e, t) {
                    S.elementDblClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [ s(u(e, t)), o(a(e, t)) ],
                        e: d3.event,
                        id: i
                    });
                    d3.event.stopPropagation();
                });
                O.attr("class", function(e, t, n) {
                    return (f(e, t) > l(e, t) ? "nv-tick negative" : "nv-tick positive") + " nv-tick-" + n + "-" + t;
                });
                d3.transition(O).attr("transform", function(e, t) {
                    return "translate(" + s(u(e, t)) + "," + o(c(e, t)) + ")";
                }).attr("d", function(t, n) {
                    var r = g / e[0].values.length * .9;
                    return "m0,0l0," + (o(f(t, n)) - o(c(t, n))) + "l" + -r / 2 + ",0l" + r / 2 + ",0l0," + (o(h(t, n)) - o(f(t, n))) + "l0," + (o(l(t, n)) - o(h(t, n))) + "l" + r / 2 + ",0l" + -r / 2 + ",0z";
                });
            });
            return x;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = Math.floor(Math.random() * 1e4), s = d3.scale.linear(), o = d3.scale.linear(), u = function(e) {
            return e.x;
        }, a = function(e) {
            return e.y;
        }, f = function(e) {
            return e.open;
        }, l = function(e) {
            return e.close;
        }, c = function(e) {
            return e.high;
        }, h = function(e) {
            return e.low;
        }, p = [], d = [], v = !1, m = !0, g = e.utils.defaultColor(), y, b, w, E, S = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout");
        x.dispatch = S;
        x.options = e.utils.optionsFunc.bind(x);
        x.x = function(e) {
            if (!arguments.length) return u;
            u = e;
            return x;
        };
        x.y = function(e) {
            if (!arguments.length) return a;
            a = e;
            return x;
        };
        x.open = function(e) {
            if (!arguments.length) return f;
            f = e;
            return x;
        };
        x.close = function(e) {
            if (!arguments.length) return l;
            l = e;
            return x;
        };
        x.high = function(e) {
            if (!arguments.length) return c;
            c = e;
            return x;
        };
        x.low = function(e) {
            if (!arguments.length) return h;
            h = e;
            return x;
        };
        x.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return x;
        };
        x.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return x;
        };
        x.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return x;
        };
        x.xScale = function(e) {
            if (!arguments.length) return s;
            s = e;
            return x;
        };
        x.yScale = function(e) {
            if (!arguments.length) return o;
            o = e;
            return x;
        };
        x.xDomain = function(e) {
            if (!arguments.length) return y;
            y = e;
            return x;
        };
        x.yDomain = function(e) {
            if (!arguments.length) return b;
            b = e;
            return x;
        };
        x.xRange = function(e) {
            if (!arguments.length) return w;
            w = e;
            return x;
        };
        x.yRange = function(e) {
            if (!arguments.length) return E;
            E = e;
            return x;
        };
        x.forceX = function(e) {
            if (!arguments.length) return p;
            p = e;
            return x;
        };
        x.forceY = function(e) {
            if (!arguments.length) return d;
            d = e;
            return x;
        };
        x.padData = function(e) {
            if (!arguments.length) return v;
            v = e;
            return x;
        };
        x.clipEdge = function(e) {
            if (!arguments.length) return m;
            m = e;
            return x;
        };
        x.color = function(t) {
            if (!arguments.length) return g;
            g = e.utils.getColor(t);
            return x;
        };
        x.id = function(e) {
            if (!arguments.length) return i;
            i = e;
            return x;
        };
        return x;
    };
    e.models.pie = function() {
        "use strict";
        function E(e) {
            e.each(function(e) {
                function P(e) {
                    var t = (e.startAngle + e.endAngle) * 90 / Math.PI - 90;
                    return t > 90 ? t - 180 : t;
                }
                function H(e) {
                    e.endAngle = isNaN(e.endAngle) ? 0 : e.endAngle;
                    e.startAngle = isNaN(e.startAngle) ? 0 : e.startAngle;
                    v || (e.innerRadius = 0);
                    var t = d3.interpolate(this._current, e);
                    this._current = t(0);
                    return function(e) {
                        return L(t(e));
                    };
                }
                function B(e) {
                    e.innerRadius = 0;
                    var t = d3.interpolate({
                        startAngle: 0,
                        endAngle: 0
                    }, e);
                    return function(e) {
                        return L(t(e));
                    };
                }
                var o = n - t.left - t.right, f = r - t.top - t.bottom, E = Math.min(o, f) / 2, S = E - E / 5, x = d3.select(this), T = x.selectAll(".nv-wrap.nv-pie").data(e), N = T.enter().append("g").attr("class", "nvd3 nv-wrap nv-pie nv-chart-" + u), C = N.append("g"), k = T.select("g");
                C.append("g").attr("class", "nv-pie");
                T.attr("transform", "translate(" + t.left + "," + t.top + ")");
                k.select(".nv-pie").attr("transform", "translate(" + o / 2 + "," + f / 2 + ")");
                x.on("click", function(e, t) {
                    w.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: u
                    });
                });
                var L = d3.svg.arc().outerRadius(S);
                g && L.startAngle(g);
                y && L.endAngle(y);
                v && L.innerRadius(E * b);
                var A = d3.layout.pie().sort(null).value(function(e) {
                    return e.disabled ? 0 : s(e);
                }), O = T.select(".nv-pie").selectAll(".nv-slice").data(A);
                O.exit().remove();
                var M = O.enter().append("g").attr("class", "nv-slice").on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0);
                    w.elementMouseover({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        pointIndex: t,
                        pos: [ d3.event.pageX, d3.event.pageY ],
                        id: u
                    });
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1);
                    w.elementMouseout({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        id: u
                    });
                }).on("click", function(e, t) {
                    w.elementClick({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        pos: d3.event,
                        id: u
                    });
                    d3.event.stopPropagation();
                }).on("dblclick", function(e, t) {
                    w.elementDblClick({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        pos: d3.event,
                        id: u
                    });
                    d3.event.stopPropagation();
                });
                O.attr("fill", function(e, t) {
                    return a(e, t);
                }).attr("stroke", function(e, t) {
                    return a(e, t);
                });
                var _ = M.append("path").each(function(e) {
                    this._current = e;
                });
                d3.transition(O.select("path")).attr("d", L).attrTween("d", H);
                if (l) {
                    var D = d3.svg.arc().innerRadius(0);
                    c && (D = L);
                    h && (D = d3.svg.arc().outerRadius(L.outerRadius()));
                    M.append("g").classed("nv-label", !0).each(function(e, t) {
                        var n = d3.select(this);
                        n.attr("transform", function(e) {
                            if (m) {
                                e.outerRadius = S + 10;
                                e.innerRadius = S + 15;
                                var t = (e.startAngle + e.endAngle) / 2 * (180 / Math.PI);
                                (e.startAngle + e.endAngle) / 2 < Math.PI ? t -= 90 : t += 90;
                                return "translate(" + D.centroid(e) + ") rotate(" + t + ")";
                            }
                            e.outerRadius = E + 10;
                            e.innerRadius = E + 15;
                            return "translate(" + D.centroid(e) + ")";
                        });
                        n.append("rect").style("stroke", "#fff").style("fill", "#fff").attr("rx", 3).attr("ry", 3);
                        n.append("text").style("text-anchor", m ? (e.startAngle + e.endAngle) / 2 < Math.PI ? "start" : "end" : "middle").style("fill", "#000");
                    });
                    O.select(".nv-label").transition().attr("transform", function(e) {
                        if (m) {
                            e.outerRadius = S + 10;
                            e.innerRadius = S + 15;
                            var t = (e.startAngle + e.endAngle) / 2 * (180 / Math.PI);
                            (e.startAngle + e.endAngle) / 2 < Math.PI ? t -= 90 : t += 90;
                            return "translate(" + D.centroid(e) + ") rotate(" + t + ")";
                        }
                        e.outerRadius = E + 10;
                        e.innerRadius = E + 15;
                        return "translate(" + D.centroid(e) + ")";
                    });
                    O.each(function(e, t) {
                        var n = d3.select(this);
                        n.select(".nv-label text").style("text-anchor", m ? (e.startAngle + e.endAngle) / 2 < Math.PI ? "start" : "end" : "middle").text(function(e, t) {
                            var n = (e.endAngle - e.startAngle) / (2 * Math.PI), r = {
                                key: i(e.data),
                                value: s(e.data),
                                percent: d3.format("%")(n)
                            };
                            return e.value && n > d ? r[p] : "";
                        });
                        var r = n.select("text").node().getBBox();
                        n.select(".nv-label rect").attr("width", r.width + 10).attr("height", r.height + 10).attr("transform", function() {
                            return "translate(" + [ r.x - 5, r.y - 5 ] + ")";
                        });
                    });
                }
            });
            return E;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 500, r = 500, i = function(e) {
            return e.x;
        }, s = function(e) {
            return e.y;
        }, o = function(e) {
            return e.description;
        }, u = Math.floor(Math.random() * 1e4), a = e.utils.defaultColor(), f = d3.format(",.2f"), l = !0, c = !0, h = !1, p = "key", d = .02, v = !1, m = !1, g = !1, y = !1, b = .5, w = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout");
        E.dispatch = w;
        E.options = e.utils.optionsFunc.bind(E);
        E.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return E;
        };
        E.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return E;
        };
        E.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return E;
        };
        E.values = function(t) {
            e.log("pie.values() is no longer supported.");
            return E;
        };
        E.x = function(e) {
            if (!arguments.length) return i;
            i = e;
            return E;
        };
        E.y = function(e) {
            if (!arguments.length) return s;
            s = d3.functor(e);
            return E;
        };
        E.description = function(e) {
            if (!arguments.length) return o;
            o = e;
            return E;
        };
        E.showLabels = function(e) {
            if (!arguments.length) return l;
            l = e;
            return E;
        };
        E.labelSunbeamLayout = function(e) {
            if (!arguments.length) return m;
            m = e;
            return E;
        };
        E.donutLabelsOutside = function(e) {
            if (!arguments.length) return h;
            h = e;
            return E;
        };
        E.pieLabelsOutside = function(e) {
            if (!arguments.length) return c;
            c = e;
            return E;
        };
        E.labelType = function(e) {
            if (!arguments.length) return p;
            p = e;
            p = p || "key";
            return E;
        };
        E.donut = function(e) {
            if (!arguments.length) return v;
            v = e;
            return E;
        };
        E.donutRatio = function(e) {
            if (!arguments.length) return b;
            b = e;
            return E;
        };
        E.startAngle = function(e) {
            if (!arguments.length) return g;
            g = e;
            return E;
        };
        E.endAngle = function(e) {
            if (!arguments.length) return y;
            y = e;
            return E;
        };
        E.id = function(e) {
            if (!arguments.length) return u;
            u = e;
            return E;
        };
        E.color = function(t) {
            if (!arguments.length) return a;
            a = e.utils.getColor(t);
            return E;
        };
        E.valueFormat = function(e) {
            if (!arguments.length) return f;
            f = e;
            return E;
        };
        E.labelThreshold = function(e) {
            if (!arguments.length) return d;
            d = e;
            return E;
        };
        return E;
    };
    e.models.pieChart = function() {
        "use strict";
        function v(e) {
            e.each(function(e) {
                var u = d3.select(this), a = this, f = (i || parseInt(u.style("width")) || 960) - r.left - r.right, d = (s || parseInt(u.style("height")) || 400) - r.top - r.bottom;
                v.update = function() {
                    u.transition().call(v);
                };
                v.container = this;
                l.disabled = e.map(function(e) {
                    return !!e.disabled;
                });
                if (!c) {
                    var m;
                    c = {};
                    for (m in l) l[m] instanceof Array ? c[m] = l[m].slice(0) : c[m] = l[m];
                }
                if (!e || !e.length) {
                    var g = u.selectAll(".nv-noData").data([ h ]);
                    g.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    g.attr("x", r.left + f / 2).attr("y", r.top + d / 2).text(function(e) {
                        return e;
                    });
                    return v;
                }
                u.selectAll(".nv-noData").remove();
                var y = u.selectAll("g.nv-wrap.nv-pieChart").data([ e ]), b = y.enter().append("g").attr("class", "nvd3 nv-wrap nv-pieChart").append("g"), w = y.select("g");
                b.append("g").attr("class", "nv-pieWrap");
                b.append("g").attr("class", "nv-legendWrap");
                if (o) {
                    n.width(f).key(t.x());
                    y.select(".nv-legendWrap").datum(e).call(n);
                    if (r.top != n.height()) {
                        r.top = n.height();
                        d = (s || parseInt(u.style("height")) || 400) - r.top - r.bottom;
                    }
                    y.select(".nv-legendWrap").attr("transform", "translate(0," + -r.top + ")");
                }
                y.attr("transform", "translate(" + r.left + "," + r.top + ")");
                t.width(f).height(d);
                var E = w.select(".nv-pieWrap").datum([ e ]);
                d3.transition(E).call(t);
                n.dispatch.on("stateChange", function(e) {
                    l = e;
                    p.stateChange(l);
                    v.update();
                });
                t.dispatch.on("elementMouseout.tooltip", function(e) {
                    p.tooltipHide(e);
                });
                p.on("changeState", function(t) {
                    if (typeof t.disabled != "undefined") {
                        e.forEach(function(e, n) {
                            e.disabled = t.disabled[n];
                        });
                        l.disabled = t.disabled;
                    }
                    v.update();
                });
            });
            return v;
        }
        var t = e.models.pie(), n = e.models.legend(), r = {
            top: 30,
            right: 20,
            bottom: 20,
            left: 20
        }, i = null, s = null, o = !0, u = e.utils.defaultColor(), a = !0, f = function(e, t, n, r) {
            return "<h3>" + e + "</h3>" + "<p>" + t + "</p>";
        }, l = {}, c = null, h = "No Data Available.", p = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), d = function(n, r) {
            var i = t.description()(n.point) || t.x()(n.point), s = n.pos[0] + (r && r.offsetLeft || 0), o = n.pos[1] + (r && r.offsetTop || 0), u = t.valueFormat()(t.y()(n.point)), a = f(i, u, n, v);
            e.tooltip.show([ s, o ], a, n.value < 0 ? "n" : "s", null, r);
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + r.left, e.pos[1] + r.top ];
            p.tooltipShow(e);
        });
        p.on("tooltipShow", function(e) {
            a && d(e);
        });
        p.on("tooltipHide", function() {
            a && e.tooltip.cleanup();
        });
        v.legend = n;
        v.dispatch = p;
        v.pie = t;
        d3.rebind(v, t, "valueFormat", "values", "x", "y", "description", "id", "showLabels", "donutLabelsOutside", "pieLabelsOutside", "labelType", "donut", "donutRatio", "labelThreshold");
        v.options = e.utils.optionsFunc.bind(v);
        v.margin = function(e) {
            if (!arguments.length) return r;
            r.top = typeof e.top != "undefined" ? e.top : r.top;
            r.right = typeof e.right != "undefined" ? e.right : r.right;
            r.bottom = typeof e.bottom != "undefined" ? e.bottom : r.bottom;
            r.left = typeof e.left != "undefined" ? e.left : r.left;
            return v;
        };
        v.width = function(e) {
            if (!arguments.length) return i;
            i = e;
            return v;
        };
        v.height = function(e) {
            if (!arguments.length) return s;
            s = e;
            return v;
        };
        v.color = function(r) {
            if (!arguments.length) return u;
            u = e.utils.getColor(r);
            n.color(u);
            t.color(u);
            return v;
        };
        v.showLegend = function(e) {
            if (!arguments.length) return o;
            o = e;
            return v;
        };
        v.tooltips = function(e) {
            if (!arguments.length) return a;
            a = e;
            return v;
        };
        v.tooltipContent = function(e) {
            if (!arguments.length) return f;
            f = e;
            return v;
        };
        v.state = function(e) {
            if (!arguments.length) return l;
            l = e;
            return v;
        };
        v.defaultState = function(e) {
            if (!arguments.length) return c;
            c = e;
            return v;
        };
        v.noData = function(e) {
            if (!arguments.length) return h;
            h = e;
            return v;
        };
        return v;
    };
    e.models.scatter = function() {
        "use strict";
        function I(q) {
            q.each(function(I) {
                function Q() {
                    if (!g) return !1;
                    var e, i = d3.merge(I.map(function(e, t) {
                        return e.values.map(function(e, n) {
                            var r = f(e, n), i = l(e, n);
                            return [ o(r) + Math.random() * 1e-7, u(i) + Math.random() * 1e-7, t, n, e ];
                        }).filter(function(e, t) {
                            return b(e[4], t);
                        });
                    }));
                    if (D === !0) {
                        if (x) {
                            var a = X.select("defs").selectAll(".nv-point-clips").data([ s ]).enter();
                            a.append("clipPath").attr("class", "nv-point-clips").attr("id", "nv-points-clip-" + s);
                            var c = X.select("#nv-points-clip-" + s).selectAll("circle").data(i);
                            c.enter().append("circle").attr("r", T);
                            c.exit().remove();
                            c.attr("cx", function(e) {
                                return e[0];
                            }).attr("cy", function(e) {
                                return e[1];
                            });
                            X.select(".nv-point-paths").attr("clip-path", "url(#nv-points-clip-" + s + ")");
                        }
                        if (i.length) {
                            i.push([ o.range()[0] - 20, u.range()[0] - 20, null, null ]);
                            i.push([ o.range()[1] + 20, u.range()[1] + 20, null, null ]);
                            i.push([ o.range()[0] - 20, u.range()[0] + 20, null, null ]);
                            i.push([ o.range()[1] + 20, u.range()[1] - 20, null, null ]);
                        }
                        var h = d3.geom.polygon([ [ -10, -10 ], [ -10, r + 10 ], [ n + 10, r + 10 ], [ n + 10, -10 ] ]), p = d3.geom.voronoi(i).map(function(e, t) {
                            return {
                                data: h.clip(e),
                                series: i[t][2],
                                point: i[t][3]
                            };
                        }), d = X.select(".nv-point-paths").selectAll("path").data(p);
                        d.enter().append("path").attr("class", function(e, t) {
                            return "nv-path-" + t;
                        });
                        d.exit().remove();
                        d.attr("d", function(e) {
                            return e.data.length === 0 ? "M 0 0" : "M" + e.data.join("L") + "Z";
                        });
                        var v = function(e, n) {
                            if (F) return 0;
                            var r = I[e.series];
                            if (typeof r == "undefined") return;
                            var i = r.values[e.point];
                            n({
                                point: i,
                                series: r,
                                pos: [ o(f(i, e.point)) + t.left, u(l(i, e.point)) + t.top ],
                                seriesIndex: e.series,
                                pointIndex: e.point
                            });
                        };
                        d.on("click", function(e) {
                            v(e, _.elementClick);
                        }).on("mouseover", function(e) {
                            v(e, _.elementMouseover);
                        }).on("mouseout", function(e, t) {
                            v(e, _.elementMouseout);
                        });
                    } else X.select(".nv-groups").selectAll(".nv-group").selectAll(".nv-point").on("click", function(e, n) {
                        if (F || !I[e.series]) return 0;
                        var r = I[e.series], i = r.values[n];
                        _.elementClick({
                            point: i,
                            series: r,
                            pos: [ o(f(i, n)) + t.left, u(l(i, n)) + t.top ],
                            seriesIndex: e.series,
                            pointIndex: n
                        });
                    }).on("mouseover", function(e, n) {
                        if (F || !I[e.series]) return 0;
                        var r = I[e.series], i = r.values[n];
                        _.elementMouseover({
                            point: i,
                            series: r,
                            pos: [ o(f(i, n)) + t.left, u(l(i, n)) + t.top ],
                            seriesIndex: e.series,
                            pointIndex: n
                        });
                    }).on("mouseout", function(e, t) {
                        if (F || !I[e.series]) return 0;
                        var n = I[e.series], r = n.values[t];
                        _.elementMouseout({
                            point: r,
                            series: n,
                            seriesIndex: e.series,
                            pointIndex: t
                        });
                    });
                    F = !1;
                }
                var q = n - t.left - t.right, R = r - t.top - t.bottom, U = d3.select(this);
                I = I.map(function(e, t) {
                    e.values = e.values.map(function(e) {
                        e.series = t;
                        return e;
                    });
                    return e;
                });
                var W = N && C && A ? [] : d3.merge(I.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: f(e, t),
                            y: l(e, t),
                            size: c(e, t)
                        };
                    });
                }));
                o.domain(N || d3.extent(W.map(function(e) {
                    return e.x;
                }).concat(d)));
                w && I[0] ? o.range(k || [ (q * E + q) / (2 * I[0].values.length), q - q * (1 + E) / (2 * I[0].values.length) ]) : o.range(k || [ 0, q ]);
                u.domain(C || d3.extent(W.map(function(e) {
                    return e.y;
                }).concat(v))).range(L || [ R, 0 ]);
                a.domain(A || d3.extent(W.map(function(e) {
                    return e.size;
                }).concat(m))).range(O || [ 16, 256 ]);
                if (o.domain()[0] === o.domain()[1] || u.domain()[0] === u.domain()[1]) M = !0;
                o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([ o.domain()[0] - o.domain()[0] * .01, o.domain()[1] + o.domain()[1] * .01 ]) : o.domain([ -1, 1 ]));
                u.domain()[0] === u.domain()[1] && (u.domain()[0] ? u.domain([ u.domain()[0] - u.domain()[0] * .01, u.domain()[1] + u.domain()[1] * .01 ]) : u.domain([ -1, 1 ]));
                isNaN(o.domain()[0]) && o.domain([ -1, 1 ]);
                isNaN(u.domain()[0]) && u.domain([ -1, 1 ]);
                P = P || o;
                H = H || u;
                B = B || a;
                var X = U.selectAll("g.nv-wrap.nv-scatter").data([ I ]), V = X.enter().append("g").attr("class", "nvd3 nv-wrap nv-scatter nv-chart-" + s + (M ? " nv-single-point" : "")), $ = V.append("defs"), J = V.append("g"), K = X.select("g");
                J.append("g").attr("class", "nv-groups");
                J.append("g").attr("class", "nv-point-paths");
                X.attr("transform", "translate(" + t.left + "," + t.top + ")");
                $.append("clipPath").attr("id", "nv-edge-clip-" + s).append("rect");
                X.select("#nv-edge-clip-" + s + " rect").attr("width", q).attr("height", R);
                K.attr("clip-path", S ? "url(#nv-edge-clip-" + s + ")" : "");
                F = !0;
                var G = X.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e;
                }, function(e) {
                    return e.key;
                });
                G.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6);
                G.exit().remove();
                G.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t;
                }).classed("hover", function(e) {
                    return e.hover;
                });
                G.transition().style("fill", function(e, t) {
                    return i(e, t);
                }).style("stroke", function(e, t) {
                    return i(e, t);
                }).style("stroke-opacity", 1).style("fill-opacity", .5);
                if (p) {
                    var Y = G.selectAll("circle.nv-point").data(function(e) {
                        return e.values;
                    }, y);
                    Y.enter().append("circle").style("fill", function(e, t) {
                        return e.color;
                    }).style("stroke", function(e, t) {
                        return e.color;
                    }).attr("cx", function(t, n) {
                        return e.utils.NaNtoZero(P(f(t, n)));
                    }).attr("cy", function(t, n) {
                        return e.utils.NaNtoZero(H(l(t, n)));
                    }).attr("r", function(e, t) {
                        return Math.sqrt(a(c(e, t)) / Math.PI);
                    });
                    Y.exit().remove();
                    G.exit().selectAll("path.nv-point").transition().attr("cx", function(t, n) {
                        return e.utils.NaNtoZero(o(f(t, n)));
                    }).attr("cy", function(t, n) {
                        return e.utils.NaNtoZero(u(l(t, n)));
                    }).remove();
                    Y.each(function(e, t) {
                        d3.select(this).classed("nv-point", !0).classed("nv-point-" + t, !0).classed("hover", !1);
                    });
                    Y.transition().attr("cx", function(t, n) {
                        return e.utils.NaNtoZero(o(f(t, n)));
                    }).attr("cy", function(t, n) {
                        return e.utils.NaNtoZero(u(l(t, n)));
                    }).attr("r", function(e, t) {
                        return Math.sqrt(a(c(e, t)) / Math.PI);
                    });
                } else {
                    var Y = G.selectAll("path.nv-point").data(function(e) {
                        return e.values;
                    });
                    Y.enter().append("path").style("fill", function(e, t) {
                        return e.color;
                    }).style("stroke", function(e, t) {
                        return e.color;
                    }).attr("transform", function(e, t) {
                        return "translate(" + P(f(e, t)) + "," + H(l(e, t)) + ")";
                    }).attr("d", d3.svg.symbol().type(h).size(function(e, t) {
                        return a(c(e, t));
                    }));
                    Y.exit().remove();
                    G.exit().selectAll("path.nv-point").transition().attr("transform", function(e, t) {
                        return "translate(" + o(f(e, t)) + "," + u(l(e, t)) + ")";
                    }).remove();
                    Y.each(function(e, t) {
                        d3.select(this).classed("nv-point", !0).classed("nv-point-" + t, !0).classed("hover", !1);
                    });
                    Y.transition().attr("transform", function(e, t) {
                        return "translate(" + o(f(e, t)) + "," + u(l(e, t)) + ")";
                    }).attr("d", d3.svg.symbol().type(h).size(function(e, t) {
                        return a(c(e, t));
                    }));
                }
                clearTimeout(j);
                j = setTimeout(Q, 300);
                P = o.copy();
                H = u.copy();
                B = a.copy();
            });
            return I;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = e.utils.defaultColor(), s = Math.floor(Math.random() * 1e5), o = d3.scale.linear(), u = d3.scale.linear(), a = d3.scale.linear(), f = function(e) {
            return e.x;
        }, l = function(e) {
            return e.y;
        }, c = function(e) {
            return e.size || 1;
        }, h = function(e) {
            return e.shape || "circle";
        }, p = !0, d = [], v = [], m = [], g = !0, y = null, b = function(e) {
            return !e.notActive;
        }, w = !1, E = .1, S = !1, x = !0, T = function() {
            return 25;
        }, N = null, C = null, k = null, L = null, A = null, O = null, M = !1, _ = d3.dispatch("elementClick", "elementMouseover", "elementMouseout"), D = !0, P, H, B, j, F = !1;
        I.clearHighlights = function() {
            d3.selectAll(".nv-chart-" + s + " .nv-point.hover").classed("hover", !1);
        };
        I.highlightPoint = function(e, t, n) {
            d3.select(".nv-chart-" + s + " .nv-series-" + e + " .nv-point-" + t).classed("hover", n);
        };
        _.on("elementMouseover.point", function(e) {
            g && I.highlightPoint(e.seriesIndex, e.pointIndex, !0);
        });
        _.on("elementMouseout.point", function(e) {
            g && I.highlightPoint(e.seriesIndex, e.pointIndex, !1);
        });
        I.dispatch = _;
        I.options = e.utils.optionsFunc.bind(I);
        I.x = function(e) {
            if (!arguments.length) return f;
            f = d3.functor(e);
            return I;
        };
        I.y = function(e) {
            if (!arguments.length) return l;
            l = d3.functor(e);
            return I;
        };
        I.size = function(e) {
            if (!arguments.length) return c;
            c = d3.functor(e);
            return I;
        };
        I.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return I;
        };
        I.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return I;
        };
        I.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return I;
        };
        I.xScale = function(e) {
            if (!arguments.length) return o;
            o = e;
            return I;
        };
        I.yScale = function(e) {
            if (!arguments.length) return u;
            u = e;
            return I;
        };
        I.zScale = function(e) {
            if (!arguments.length) return a;
            a = e;
            return I;
        };
        I.xDomain = function(e) {
            if (!arguments.length) return N;
            N = e;
            return I;
        };
        I.yDomain = function(e) {
            if (!arguments.length) return C;
            C = e;
            return I;
        };
        I.sizeDomain = function(e) {
            if (!arguments.length) return A;
            A = e;
            return I;
        };
        I.xRange = function(e) {
            if (!arguments.length) return k;
            k = e;
            return I;
        };
        I.yRange = function(e) {
            if (!arguments.length) return L;
            L = e;
            return I;
        };
        I.sizeRange = function(e) {
            if (!arguments.length) return O;
            O = e;
            return I;
        };
        I.forceX = function(e) {
            if (!arguments.length) return d;
            d = e;
            return I;
        };
        I.forceY = function(e) {
            if (!arguments.length) return v;
            v = e;
            return I;
        };
        I.forceSize = function(e) {
            if (!arguments.length) return m;
            m = e;
            return I;
        };
        I.interactive = function(e) {
            if (!arguments.length) return g;
            g = e;
            return I;
        };
        I.pointKey = function(e) {
            if (!arguments.length) return y;
            y = e;
            return I;
        };
        I.pointActive = function(e) {
            if (!arguments.length) return b;
            b = e;
            return I;
        };
        I.padData = function(e) {
            if (!arguments.length) return w;
            w = e;
            return I;
        };
        I.padDataOuter = function(e) {
            if (!arguments.length) return E;
            E = e;
            return I;
        };
        I.clipEdge = function(e) {
            if (!arguments.length) return S;
            S = e;
            return I;
        };
        I.clipVoronoi = function(e) {
            if (!arguments.length) return x;
            x = e;
            return I;
        };
        I.useVoronoi = function(e) {
            if (!arguments.length) return D;
            D = e;
            D === !1 && (x = !1);
            return I;
        };
        I.clipRadius = function(e) {
            if (!arguments.length) return T;
            T = e;
            return I;
        };
        I.color = function(t) {
            if (!arguments.length) return i;
            i = e.utils.getColor(t);
            return I;
        };
        I.shape = function(e) {
            if (!arguments.length) return h;
            h = e;
            return I;
        };
        I.onlyCircles = function(e) {
            if (!arguments.length) return p;
            p = e;
            return I;
        };
        I.id = function(e) {
            if (!arguments.length) return s;
            s = e;
            return I;
        };
        I.singlePoint = function(e) {
            if (!arguments.length) return M;
            M = e;
            return I;
        };
        return I;
    };
    e.models.scatterChart = function() {
        "use strict";
        function F(e) {
            e.each(function(e) {
                function K() {
                    if (T) {
                        X.select(".nv-point-paths").style("pointer-events", "all");
                        return !1;
                    }
                    X.select(".nv-point-paths").style("pointer-events", "none");
                    var i = d3.mouse(this);
                    h.distortion(x).focus(i[0]);
                    p.distortion(x).focus(i[1]);
                    X.select(".nv-scatterWrap").call(t);
                    b && X.select(".nv-x.nv-axis").call(n);
                    w && X.select(".nv-y.nv-axis").call(r);
                    X.select(".nv-distributionX").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(o);
                    X.select(".nv-distributionY").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(u);
                }
                var C = d3.select(this), k = this, L = (f || parseInt(C.style("width")) || 960) - a.left - a.right, I = (l || parseInt(C.style("height")) || 400) - a.top - a.bottom;
                F.update = function() {
                    C.transition().duration(D).call(F);
                };
                F.container = this;
                A.disabled = e.map(function(e) {
                    return !!e.disabled;
                });
                if (!O) {
                    var q;
                    O = {};
                    for (q in A) A[q] instanceof Array ? O[q] = A[q].slice(0) : O[q] = A[q];
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var R = C.selectAll(".nv-noData").data([ _ ]);
                    R.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    R.attr("x", a.left + L / 2).attr("y", a.top + I / 2).text(function(e) {
                        return e;
                    });
                    return F;
                }
                C.selectAll(".nv-noData").remove();
                P = P || h;
                H = H || p;
                var U = C.selectAll("g.nv-wrap.nv-scatterChart").data([ e ]), z = U.enter().append("g").attr("class", "nvd3 nv-wrap nv-scatterChart nv-chart-" + t.id()), W = z.append("g"), X = U.select("g");
                W.append("rect").attr("class", "nvd3 nv-background");
                W.append("g").attr("class", "nv-x nv-axis");
                W.append("g").attr("class", "nv-y nv-axis");
                W.append("g").attr("class", "nv-scatterWrap");
                W.append("g").attr("class", "nv-distWrap");
                W.append("g").attr("class", "nv-legendWrap");
                W.append("g").attr("class", "nv-controlsWrap");
                if (y) {
                    var V = S ? L / 2 : L;
                    i.width(V);
                    U.select(".nv-legendWrap").datum(e).call(i);
                    if (a.top != i.height()) {
                        a.top = i.height();
                        I = (l || parseInt(C.style("height")) || 400) - a.top - a.bottom;
                    }
                    U.select(".nv-legendWrap").attr("transform", "translate(" + (L - V) + "," + -a.top + ")");
                }
                if (S) {
                    s.width(180).color([ "#444" ]);
                    X.select(".nv-controlsWrap").datum(j).attr("transform", "translate(0," + -a.top + ")").call(s);
                }
                U.attr("transform", "translate(" + a.left + "," + a.top + ")");
                E && X.select(".nv-y.nv-axis").attr("transform", "translate(" + L + ",0)");
                t.width(L).height(I).color(e.map(function(e, t) {
                    return e.color || c(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled;
                }));
                d !== 0 && t.xDomain(null);
                v !== 0 && t.yDomain(null);
                U.select(".nv-scatterWrap").datum(e.filter(function(e) {
                    return !e.disabled;
                })).call(t);
                if (d !== 0) {
                    var $ = h.domain()[1] - h.domain()[0];
                    t.xDomain([ h.domain()[0] - d * $, h.domain()[1] + d * $ ]);
                }
                if (v !== 0) {
                    var J = p.domain()[1] - p.domain()[0];
                    t.yDomain([ p.domain()[0] - v * J, p.domain()[1] + v * J ]);
                }
                (v !== 0 || d !== 0) && U.select(".nv-scatterWrap").datum(e.filter(function(e) {
                    return !e.disabled;
                })).call(t);
                if (b) {
                    n.scale(h).ticks(n.ticks() && n.ticks().length ? n.ticks() : L / 100).tickSize(-I, 0);
                    X.select(".nv-x.nv-axis").attr("transform", "translate(0," + p.range()[0] + ")").call(n);
                }
                if (w) {
                    r.scale(p).ticks(r.ticks() && r.ticks().length ? r.ticks() : I / 36).tickSize(-L, 0);
                    X.select(".nv-y.nv-axis").call(r);
                }
                if (m) {
                    o.getData(t.x()).scale(h).width(L).color(e.map(function(e, t) {
                        return e.color || c(e, t);
                    }).filter(function(t, n) {
                        return !e[n].disabled;
                    }));
                    W.select(".nv-distWrap").append("g").attr("class", "nv-distributionX");
                    X.select(".nv-distributionX").attr("transform", "translate(0," + p.range()[0] + ")").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(o);
                }
                if (g) {
                    u.getData(t.y()).scale(p).width(I).color(e.map(function(e, t) {
                        return e.color || c(e, t);
                    }).filter(function(t, n) {
                        return !e[n].disabled;
                    }));
                    W.select(".nv-distWrap").append("g").attr("class", "nv-distributionY");
                    X.select(".nv-distributionY").attr("transform", "translate(" + (E ? L : -u.size()) + ",0)").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(u);
                }
                if (d3.fisheye) {
                    X.select(".nv-background").attr("width", L).attr("height", I);
                    X.select(".nv-background").on("mousemove", K);
                    X.select(".nv-background").on("click", function() {
                        T = !T;
                    });
                    t.dispatch.on("elementClick.freezeFisheye", function() {
                        T = !T;
                    });
                }
                s.dispatch.on("legendClick", function(e, i) {
                    e.disabled = !e.disabled;
                    x = e.disabled ? 0 : 2.5;
                    X.select(".nv-background").style("pointer-events", e.disabled ? "none" : "all");
                    X.select(".nv-point-paths").style("pointer-events", e.disabled ? "all" : "none");
                    if (e.disabled) {
                        h.distortion(x).focus(0);
                        p.distortion(x).focus(0);
                        X.select(".nv-scatterWrap").call(t);
                        X.select(".nv-x.nv-axis").call(n);
                        X.select(".nv-y.nv-axis").call(r);
                    } else T = !1;
                    F.update();
                });
                i.dispatch.on("stateChange", function(e) {
                    A.disabled = e.disabled;
                    M.stateChange(A);
                    F.update();
                });
                t.dispatch.on("elementMouseover.tooltip", function(e) {
                    d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", function(t, n) {
                        return e.pos[1] - I;
                    });
                    d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", e.pos[0] + o.size());
                    e.pos = [ e.pos[0] + a.left, e.pos[1] + a.top ];
                    M.tooltipShow(e);
                });
                M.on("tooltipShow", function(e) {
                    N && B(e, k.parentNode);
                });
                M.on("changeState", function(t) {
                    if (typeof t.disabled != "undefined") {
                        e.forEach(function(e, n) {
                            e.disabled = t.disabled[n];
                        });
                        A.disabled = t.disabled;
                    }
                    F.update();
                });
                P = h.copy();
                H = p.copy();
            });
            return F;
        }
        var t = e.models.scatter(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.models.legend(), o = e.models.distribution(), u = e.models.distribution(), a = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 75
        }, f = null, l = null, c = e.utils.defaultColor(), h = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : t.xScale(), p = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : t.yScale(), d = 0, v = 0, m = !1, g = !1, y = !0, b = !0, w = !0, E = !1, S = !!d3.fisheye, x = 0, T = !1, N = !0, C = function(e, t, n) {
            return "<strong>" + t + "</strong>";
        }, k = function(e, t, n) {
            return "<strong>" + n + "</strong>";
        }, L = null, A = {}, O = null, M = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), _ = "No Data Available.", D = 250;
        t.xScale(h).yScale(p);
        n.orient("bottom").tickPadding(10);
        r.orient(E ? "right" : "left").tickPadding(10);
        o.axis("x");
        u.axis("y");
        s.updateState(!1);
        var P, H, B = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0), u = i.pos[1] + (s.offsetTop || 0), f = i.pos[0] + (s.offsetLeft || 0), l = p.range()[0] + a.top + (s.offsetTop || 0), c = h.range()[0] + a.left + (s.offsetLeft || 0), d = i.pos[1] + (s.offsetTop || 0), v = n.tickFormat()(t.x()(i.point, i.pointIndex)), m = r.tickFormat()(t.y()(i.point, i.pointIndex));
            C != null && e.tooltip.show([ f, l ], C(i.series.key, v, m, i, F), "n", 1, s, "x-nvtooltip");
            k != null && e.tooltip.show([ c, d ], k(i.series.key, v, m, i, F), "e", 1, s, "y-nvtooltip");
            L != null && e.tooltip.show([ o, u ], L(i.series.key, v, m, i, F), i.value < 0 ? "n" : "s", null, s);
        }, j = [ {
            key: "Magnify",
            disabled: !0
        } ];
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            M.tooltipHide(e);
            d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", 0);
            d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", u.size());
        });
        M.on("tooltipHide", function() {
            N && e.tooltip.cleanup();
        });
        F.dispatch = M;
        F.scatter = t;
        F.legend = i;
        F.controls = s;
        F.xAxis = n;
        F.yAxis = r;
        F.distX = o;
        F.distY = u;
        d3.rebind(F, t, "id", "interactive", "pointActive", "x", "y", "shape", "size", "xScale", "yScale", "zScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "sizeRange", "forceX", "forceY", "forceSize", "clipVoronoi", "clipRadius", "useVoronoi");
        F.options = e.utils.optionsFunc.bind(F);
        F.margin = function(e) {
            if (!arguments.length) return a;
            a.top = typeof e.top != "undefined" ? e.top : a.top;
            a.right = typeof e.right != "undefined" ? e.right : a.right;
            a.bottom = typeof e.bottom != "undefined" ? e.bottom : a.bottom;
            a.left = typeof e.left != "undefined" ? e.left : a.left;
            return F;
        };
        F.width = function(e) {
            if (!arguments.length) return f;
            f = e;
            return F;
        };
        F.height = function(e) {
            if (!arguments.length) return l;
            l = e;
            return F;
        };
        F.color = function(t) {
            if (!arguments.length) return c;
            c = e.utils.getColor(t);
            i.color(c);
            o.color(c);
            u.color(c);
            return F;
        };
        F.showDistX = function(e) {
            if (!arguments.length) return m;
            m = e;
            return F;
        };
        F.showDistY = function(e) {
            if (!arguments.length) return g;
            g = e;
            return F;
        };
        F.showControls = function(e) {
            if (!arguments.length) return S;
            S = e;
            return F;
        };
        F.showLegend = function(e) {
            if (!arguments.length) return y;
            y = e;
            return F;
        };
        F.showXAxis = function(e) {
            if (!arguments.length) return b;
            b = e;
            return F;
        };
        F.showYAxis = function(e) {
            if (!arguments.length) return w;
            w = e;
            return F;
        };
        F.rightAlignYAxis = function(e) {
            if (!arguments.length) return E;
            E = e;
            r.orient(e ? "right" : "left");
            return F;
        };
        F.fisheye = function(e) {
            if (!arguments.length) return x;
            x = e;
            return F;
        };
        F.xPadding = function(e) {
            if (!arguments.length) return d;
            d = e;
            return F;
        };
        F.yPadding = function(e) {
            if (!arguments.length) return v;
            v = e;
            return F;
        };
        F.tooltips = function(e) {
            if (!arguments.length) return N;
            N = e;
            return F;
        };
        F.tooltipContent = function(e) {
            if (!arguments.length) return L;
            L = e;
            return F;
        };
        F.tooltipXContent = function(e) {
            if (!arguments.length) return C;
            C = e;
            return F;
        };
        F.tooltipYContent = function(e) {
            if (!arguments.length) return k;
            k = e;
            return F;
        };
        F.state = function(e) {
            if (!arguments.length) return A;
            A = e;
            return F;
        };
        F.defaultState = function(e) {
            if (!arguments.length) return O;
            O = e;
            return F;
        };
        F.noData = function(e) {
            if (!arguments.length) return _;
            _ = e;
            return F;
        };
        F.transitionDuration = function(e) {
            if (!arguments.length) return D;
            D = e;
            return F;
        };
        return F;
    };
    e.models.scatterPlusLineChart = function() {
        "use strict";
        function B(e) {
            e.each(function(e) {
                function $() {
                    if (S) {
                        z.select(".nv-point-paths").style("pointer-events", "all");
                        return !1;
                    }
                    z.select(".nv-point-paths").style("pointer-events", "none");
                    var i = d3.mouse(this);
                    h.distortion(E).focus(i[0]);
                    p.distortion(E).focus(i[1]);
                    z.select(".nv-scatterWrap").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(t);
                    g && z.select(".nv-x.nv-axis").call(n);
                    y && z.select(".nv-y.nv-axis").call(r);
                    z.select(".nv-distributionX").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(o);
                    z.select(".nv-distributionY").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(u);
                }
                var T = d3.select(this), N = this, C = (f || parseInt(T.style("width")) || 960) - a.left - a.right, j = (l || parseInt(T.style("height")) || 400) - a.top - a.bottom;
                B.update = function() {
                    T.transition().duration(M).call(B);
                };
                B.container = this;
                k.disabled = e.map(function(e) {
                    return !!e.disabled;
                });
                if (!L) {
                    var F;
                    L = {};
                    for (F in k) k[F] instanceof Array ? L[F] = k[F].slice(0) : L[F] = k[F];
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var I = T.selectAll(".nv-noData").data([ O ]);
                    I.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    I.attr("x", a.left + C / 2).attr("y", a.top + j / 2).text(function(e) {
                        return e;
                    });
                    return B;
                }
                T.selectAll(".nv-noData").remove();
                h = t.xScale();
                p = t.yScale();
                _ = _ || h;
                D = D || p;
                var q = T.selectAll("g.nv-wrap.nv-scatterChart").data([ e ]), R = q.enter().append("g").attr("class", "nvd3 nv-wrap nv-scatterChart nv-chart-" + t.id()), U = R.append("g"), z = q.select("g");
                U.append("rect").attr("class", "nvd3 nv-background").style("pointer-events", "none");
                U.append("g").attr("class", "nv-x nv-axis");
                U.append("g").attr("class", "nv-y nv-axis");
                U.append("g").attr("class", "nv-scatterWrap");
                U.append("g").attr("class", "nv-regressionLinesWrap");
                U.append("g").attr("class", "nv-distWrap");
                U.append("g").attr("class", "nv-legendWrap");
                U.append("g").attr("class", "nv-controlsWrap");
                q.attr("transform", "translate(" + a.left + "," + a.top + ")");
                b && z.select(".nv-y.nv-axis").attr("transform", "translate(" + C + ",0)");
                if (m) {
                    i.width(C / 2);
                    q.select(".nv-legendWrap").datum(e).call(i);
                    if (a.top != i.height()) {
                        a.top = i.height();
                        j = (l || parseInt(T.style("height")) || 400) - a.top - a.bottom;
                    }
                    q.select(".nv-legendWrap").attr("transform", "translate(" + C / 2 + "," + -a.top + ")");
                }
                if (w) {
                    s.width(180).color([ "#444" ]);
                    z.select(".nv-controlsWrap").datum(H).attr("transform", "translate(0," + -a.top + ")").call(s);
                }
                t.width(C).height(j).color(e.map(function(e, t) {
                    return e.color || c(e, t);
                }).filter(function(t, n) {
                    return !e[n].disabled;
                }));
                q.select(".nv-scatterWrap").datum(e.filter(function(e) {
                    return !e.disabled;
                })).call(t);
                q.select(".nv-regressionLinesWrap").attr("clip-path", "url(#nv-edge-clip-" + t.id() + ")");
                var W = q.select(".nv-regressionLinesWrap").selectAll(".nv-regLines").data(function(e) {
                    return e;
                });
                W.enter().append("g").attr("class", "nv-regLines");
                var X = W.selectAll(".nv-regLine").data(function(e) {
                    return [ e ];
                }), V = X.enter().append("line").attr("class", "nv-regLine").style("stroke-opacity", 0);
                X.transition().attr("x1", h.range()[0]).attr("x2", h.range()[1]).attr("y1", function(e, t) {
                    return p(h.domain()[0] * e.slope + e.intercept);
                }).attr("y2", function(e, t) {
                    return p(h.domain()[1] * e.slope + e.intercept);
                }).style("stroke", function(e, t, n) {
                    return c(e, n);
                }).style("stroke-opacity", function(e, t) {
                    return e.disabled || typeof e.slope == "undefined" || typeof e.intercept == "undefined" ? 0 : 1;
                });
                if (g) {
                    n.scale(h).ticks(n.ticks() ? n.ticks() : C / 100).tickSize(-j, 0);
                    z.select(".nv-x.nv-axis").attr("transform", "translate(0," + p.range()[0] + ")").call(n);
                }
                if (y) {
                    r.scale(p).ticks(r.ticks() ? r.ticks() : j / 36).tickSize(-C, 0);
                    z.select(".nv-y.nv-axis").call(r);
                }
                if (d) {
                    o.getData(t.x()).scale(h).width(C).color(e.map(function(e, t) {
                        return e.color || c(e, t);
                    }).filter(function(t, n) {
                        return !e[n].disabled;
                    }));
                    U.select(".nv-distWrap").append("g").attr("class", "nv-distributionX");
                    z.select(".nv-distributionX").attr("transform", "translate(0," + p.range()[0] + ")").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(o);
                }
                if (v) {
                    u.getData(t.y()).scale(p).width(j).color(e.map(function(e, t) {
                        return e.color || c(e, t);
                    }).filter(function(t, n) {
                        return !e[n].disabled;
                    }));
                    U.select(".nv-distWrap").append("g").attr("class", "nv-distributionY");
                    z.select(".nv-distributionY").attr("transform", "translate(" + (b ? C : -u.size()) + ",0)").datum(e.filter(function(e) {
                        return !e.disabled;
                    })).call(u);
                }
                if (d3.fisheye) {
                    z.select(".nv-background").attr("width", C).attr("height", j);
                    z.select(".nv-background").on("mousemove", $);
                    z.select(".nv-background").on("click", function() {
                        S = !S;
                    });
                    t.dispatch.on("elementClick.freezeFisheye", function() {
                        S = !S;
                    });
                }
                s.dispatch.on("legendClick", function(e, i) {
                    e.disabled = !e.disabled;
                    E = e.disabled ? 0 : 2.5;
                    z.select(".nv-background").style("pointer-events", e.disabled ? "none" : "all");
                    z.select(".nv-point-paths").style("pointer-events", e.disabled ? "all" : "none");
                    if (e.disabled) {
                        h.distortion(E).focus(0);
                        p.distortion(E).focus(0);
                        z.select(".nv-scatterWrap").call(t);
                        z.select(".nv-x.nv-axis").call(n);
                        z.select(".nv-y.nv-axis").call(r);
                    } else S = !1;
                    B.update();
                });
                i.dispatch.on("stateChange", function(e) {
                    k = e;
                    A.stateChange(k);
                    B.update();
                });
                t.dispatch.on("elementMouseover.tooltip", function(e) {
                    d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", e.pos[1] - j);
                    d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", e.pos[0] + o.size());
                    e.pos = [ e.pos[0] + a.left, e.pos[1] + a.top ];
                    A.tooltipShow(e);
                });
                A.on("tooltipShow", function(e) {
                    x && P(e, N.parentNode);
                });
                A.on("changeState", function(t) {
                    if (typeof t.disabled != "undefined") {
                        e.forEach(function(e, n) {
                            e.disabled = t.disabled[n];
                        });
                        k.disabled = t.disabled;
                    }
                    B.update();
                });
                _ = h.copy();
                D = p.copy();
            });
            return B;
        }
        var t = e.models.scatter(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.models.legend(), o = e.models.distribution(), u = e.models.distribution(), a = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 75
        }, f = null, l = null, c = e.utils.defaultColor(), h = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : t.xScale(), p = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : t.yScale(), d = !1, v = !1, m = !0, g = !0, y = !0, b = !1, w = !!d3.fisheye, E = 0, S = !1, x = !0, T = function(e, t, n) {
            return "<strong>" + t + "</strong>";
        }, N = function(e, t, n) {
            return "<strong>" + n + "</strong>";
        }, C = function(e, t, n, r) {
            return "<h3>" + e + "</h3>" + "<p>" + r + "</p>";
        }, k = {}, L = null, A = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), O = "No Data Available.", M = 250;
        t.xScale(h).yScale(p);
        n.orient("bottom").tickPadding(10);
        r.orient(b ? "right" : "left").tickPadding(10);
        o.axis("x");
        u.axis("y");
        s.updateState(!1);
        var _, D, P = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0), u = i.pos[1] + (s.offsetTop || 0), f = i.pos[0] + (s.offsetLeft || 0), l = p.range()[0] + a.top + (s.offsetTop || 0), c = h.range()[0] + a.left + (s.offsetLeft || 0), d = i.pos[1] + (s.offsetTop || 0), v = n.tickFormat()(t.x()(i.point, i.pointIndex)), m = r.tickFormat()(t.y()(i.point, i.pointIndex));
            T != null && e.tooltip.show([ f, l ], T(i.series.key, v, m, i, B), "n", 1, s, "x-nvtooltip");
            N != null && e.tooltip.show([ c, d ], N(i.series.key, v, m, i, B), "e", 1, s, "y-nvtooltip");
            C != null && e.tooltip.show([ o, u ], C(i.series.key, v, m, i.point.tooltip, i, B), i.value < 0 ? "n" : "s", null, s);
        }, H = [ {
            key: "Magnify",
            disabled: !0
        } ];
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            A.tooltipHide(e);
            d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", 0);
            d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", u.size());
        });
        A.on("tooltipHide", function() {
            x && e.tooltip.cleanup();
        });
        B.dispatch = A;
        B.scatter = t;
        B.legend = i;
        B.controls = s;
        B.xAxis = n;
        B.yAxis = r;
        B.distX = o;
        B.distY = u;
        d3.rebind(B, t, "id", "interactive", "pointActive", "x", "y", "shape", "size", "xScale", "yScale", "zScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "sizeRange", "forceX", "forceY", "forceSize", "clipVoronoi", "clipRadius", "useVoronoi");
        B.options = e.utils.optionsFunc.bind(B);
        B.margin = function(e) {
            if (!arguments.length) return a;
            a.top = typeof e.top != "undefined" ? e.top : a.top;
            a.right = typeof e.right != "undefined" ? e.right : a.right;
            a.bottom = typeof e.bottom != "undefined" ? e.bottom : a.bottom;
            a.left = typeof e.left != "undefined" ? e.left : a.left;
            return B;
        };
        B.width = function(e) {
            if (!arguments.length) return f;
            f = e;
            return B;
        };
        B.height = function(e) {
            if (!arguments.length) return l;
            l = e;
            return B;
        };
        B.color = function(t) {
            if (!arguments.length) return c;
            c = e.utils.getColor(t);
            i.color(c);
            o.color(c);
            u.color(c);
            return B;
        };
        B.showDistX = function(e) {
            if (!arguments.length) return d;
            d = e;
            return B;
        };
        B.showDistY = function(e) {
            if (!arguments.length) return v;
            v = e;
            return B;
        };
        B.showControls = function(e) {
            if (!arguments.length) return w;
            w = e;
            return B;
        };
        B.showLegend = function(e) {
            if (!arguments.length) return m;
            m = e;
            return B;
        };
        B.showXAxis = function(e) {
            if (!arguments.length) return g;
            g = e;
            return B;
        };
        B.showYAxis = function(e) {
            if (!arguments.length) return y;
            y = e;
            return B;
        };
        B.rightAlignYAxis = function(e) {
            if (!arguments.length) return b;
            b = e;
            r.orient(e ? "right" : "left");
            return B;
        };
        B.fisheye = function(e) {
            if (!arguments.length) return E;
            E = e;
            return B;
        };
        B.tooltips = function(e) {
            if (!arguments.length) return x;
            x = e;
            return B;
        };
        B.tooltipContent = function(e) {
            if (!arguments.length) return C;
            C = e;
            return B;
        };
        B.tooltipXContent = function(e) {
            if (!arguments.length) return T;
            T = e;
            return B;
        };
        B.tooltipYContent = function(e) {
            if (!arguments.length) return N;
            N = e;
            return B;
        };
        B.state = function(e) {
            if (!arguments.length) return k;
            k = e;
            return B;
        };
        B.defaultState = function(e) {
            if (!arguments.length) return L;
            L = e;
            return B;
        };
        B.noData = function(e) {
            if (!arguments.length) return O;
            O = e;
            return B;
        };
        B.transitionDuration = function(e) {
            if (!arguments.length) return M;
            M = e;
            return B;
        };
        return B;
    };
    e.models.sparkline = function() {
        "use strict";
        function d(e) {
            e.each(function(e) {
                var i = n - t.left - t.right, d = r - t.top - t.bottom, v = d3.select(this);
                s.domain(l || d3.extent(e, u)).range(h || [ 0, i ]);
                o.domain(c || d3.extent(e, a)).range(p || [ d, 0 ]);
                var m = v.selectAll("g.nv-wrap.nv-sparkline").data([ e ]), g = m.enter().append("g").attr("class", "nvd3 nv-wrap nv-sparkline"), b = g.append("g"), w = m.select("g");
                m.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var E = m.selectAll("path").data(function(e) {
                    return [ e ];
                });
                E.enter().append("path");
                E.exit().remove();
                E.style("stroke", function(e, t) {
                    return e.color || f(e, t);
                }).attr("d", d3.svg.line().x(function(e, t) {
                    return s(u(e, t));
                }).y(function(e, t) {
                    return o(a(e, t));
                }));
                var S = m.selectAll("circle.nv-point").data(function(e) {
                    function n(t) {
                        if (t != -1) {
                            var n = e[t];
                            n.pointIndex = t;
                            return n;
                        }
                        return null;
                    }
                    var t = e.map(function(e, t) {
                        return a(e, t);
                    }), r = n(t.lastIndexOf(o.domain()[1])), i = n(t.indexOf(o.domain()[0])), s = n(t.length - 1);
                    return [ i, r, s ].filter(function(e) {
                        return e != null;
                    });
                });
                S.enter().append("circle");
                S.exit().remove();
                S.attr("cx", function(e, t) {
                    return s(u(e, e.pointIndex));
                }).attr("cy", function(e, t) {
                    return o(a(e, e.pointIndex));
                }).attr("r", 2).attr("class", function(e, t) {
                    return u(e, e.pointIndex) == s.domain()[1] ? "nv-point nv-currentValue" : a(e, e.pointIndex) == o.domain()[0] ? "nv-point nv-minValue" : "nv-point nv-maxValue";
                });
            });
            return d;
        }
        var t = {
            top: 2,
            right: 0,
            bottom: 2,
            left: 0
        }, n = 400, r = 32, i = !0, s = d3.scale.linear(), o = d3.scale.linear(), u = function(e) {
            return e.x;
        }, a = function(e) {
            return e.y;
        }, f = e.utils.getColor([ "#000" ]), l, c, h, p;
        d.options = e.utils.optionsFunc.bind(d);
        d.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return d;
        };
        d.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return d;
        };
        d.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return d;
        };
        d.x = function(e) {
            if (!arguments.length) return u;
            u = d3.functor(e);
            return d;
        };
        d.y = function(e) {
            if (!arguments.length) return a;
            a = d3.functor(e);
            return d;
        };
        d.xScale = function(e) {
            if (!arguments.length) return s;
            s = e;
            return d;
        };
        d.yScale = function(e) {
            if (!arguments.length) return o;
            o = e;
            return d;
        };
        d.xDomain = function(e) {
            if (!arguments.length) return l;
            l = e;
            return d;
        };
        d.yDomain = function(e) {
            if (!arguments.length) return c;
            c = e;
            return d;
        };
        d.xRange = function(e) {
            if (!arguments.length) return h;
            h = e;
            return d;
        };
        d.yRange = function(e) {
            if (!arguments.length) return p;
            p = e;
            return d;
        };
        d.animate = function(e) {
            if (!arguments.length) return i;
            i = e;
            return d;
        };
        d.color = function(t) {
            if (!arguments.length) return f;
            f = e.utils.getColor(t);
            return d;
        };
        return d;
    };
    e.models.sparklinePlus = function() {
        "use strict";
        function v(e) {
            e.each(function(c) {
                function O() {
                    if (a) return;
                    var e = C.selectAll(".nv-hoverValue").data(u), r = e.enter().append("g").attr("class", "nv-hoverValue").style("stroke-opacity", 0).style("fill-opacity", 0);
                    e.exit().transition().duration(250).style("stroke-opacity", 0).style("fill-opacity", 0).remove();
                    e.attr("transform", function(e) {
                        return "translate(" + s(t.x()(c[e], e)) + ",0)";
                    }).transition().duration(250).style("stroke-opacity", 1).style("fill-opacity", 1);
                    if (!u.length) return;
                    r.append("line").attr("x1", 0).attr("y1", -n.top).attr("x2", 0).attr("y2", b);
                    r.append("text").attr("class", "nv-xValue").attr("x", -6).attr("y", -n.top).attr("text-anchor", "end").attr("dy", ".9em");
                    C.select(".nv-hoverValue .nv-xValue").text(f(t.x()(c[u[0]], u[0])));
                    r.append("text").attr("class", "nv-yValue").attr("x", 6).attr("y", -n.top).attr("text-anchor", "start").attr("dy", ".9em");
                    C.select(".nv-hoverValue .nv-yValue").text(l(t.y()(c[u[0]], u[0])));
                }
                function M() {
                    function r(e, n) {
                        var r = Math.abs(t.x()(e[0], 0) - n), i = 0;
                        for (var s = 0; s < e.length; s++) if (Math.abs(t.x()(e[s], s) - n) < r) {
                            r = Math.abs(t.x()(e[s], s) - n);
                            i = s;
                        }
                        return i;
                    }
                    if (a) return;
                    var e = d3.mouse(this)[0] - n.left;
                    u = [ r(c, Math.round(s.invert(e))) ];
                    O();
                }
                var m = d3.select(this), g = (r || parseInt(m.style("width")) || 960) - n.left - n.right, b = (i || parseInt(m.style("height")) || 400) - n.top - n.bottom;
                v.update = function() {
                    v(e);
                };
                v.container = this;
                if (!c || !c.length) {
                    var w = m.selectAll(".nv-noData").data([ d ]);
                    w.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    w.attr("x", n.left + g / 2).attr("y", n.top + b / 2).text(function(e) {
                        return e;
                    });
                    return v;
                }
                m.selectAll(".nv-noData").remove();
                var E = t.y()(c[c.length - 1], c.length - 1);
                s = t.xScale();
                o = t.yScale();
                var S = m.selectAll("g.nv-wrap.nv-sparklineplus").data([ c ]), T = S.enter().append("g").attr("class", "nvd3 nv-wrap nv-sparklineplus"), N = T.append("g"), C = S.select("g");
                N.append("g").attr("class", "nv-sparklineWrap");
                N.append("g").attr("class", "nv-valueWrap");
                N.append("g").attr("class", "nv-hoverArea");
                S.attr("transform", "translate(" + n.left + "," + n.top + ")");
                var k = C.select(".nv-sparklineWrap");
                t.width(g).height(b);
                k.call(t);
                var L = C.select(".nv-valueWrap"), A = L.selectAll(".nv-currentValue").data([ E ]);
                A.enter().append("text").attr("class", "nv-currentValue").attr("dx", p ? -8 : 8).attr("dy", ".9em").style("text-anchor", p ? "end" : "start");
                A.attr("x", g + (p ? n.right : 0)).attr("y", h ? function(e) {
                    return o(e);
                } : 0).style("fill", t.color()(c[c.length - 1], c.length - 1)).text(l(E));
                N.select(".nv-hoverArea").append("rect").on("mousemove", M).on("click", function() {
                    a = !a;
                }).on("mouseout", function() {
                    u = [];
                    O();
                });
                C.select(".nv-hoverArea rect").attr("transform", function(e) {
                    return "translate(" + -n.left + "," + -n.top + ")";
                }).attr("width", g + n.left + n.right).attr("height", b + n.top);
            });
            return v;
        }
        var t = e.models.sparkline(), n = {
            top: 15,
            right: 100,
            bottom: 10,
            left: 50
        }, r = null, i = null, s, o, u = [], a = !1, f = d3.format(",r"), l = d3.format(",.2f"), c = !0, h = !0, p = !1, d = "No Data Available.";
        v.sparkline = t;
        d3.rebind(v, t, "x", "y", "xScale", "yScale", "color");
        v.options = e.utils.optionsFunc.bind(v);
        v.margin = function(e) {
            if (!arguments.length) return n;
            n.top = typeof e.top != "undefined" ? e.top : n.top;
            n.right = typeof e.right != "undefined" ? e.right : n.right;
            n.bottom = typeof e.bottom != "undefined" ? e.bottom : n.bottom;
            n.left = typeof e.left != "undefined" ? e.left : n.left;
            return v;
        };
        v.width = function(e) {
            if (!arguments.length) return r;
            r = e;
            return v;
        };
        v.height = function(e) {
            if (!arguments.length) return i;
            i = e;
            return v;
        };
        v.xTickFormat = function(e) {
            if (!arguments.length) return f;
            f = e;
            return v;
        };
        v.yTickFormat = function(e) {
            if (!arguments.length) return l;
            l = e;
            return v;
        };
        v.showValue = function(e) {
            if (!arguments.length) return c;
            c = e;
            return v;
        };
        v.alignValue = function(e) {
            if (!arguments.length) return h;
            h = e;
            return v;
        };
        v.rightAlignValue = function(e) {
            if (!arguments.length) return p;
            p = e;
            return v;
        };
        v.noData = function(e) {
            if (!arguments.length) return d;
            d = e;
            return v;
        };
        return v;
    };
    e.models.stackedArea = function() {
        "use strict";
        function g(e) {
            e.each(function(e) {
                var a = n - t.left - t.right, g = r - t.top - t.bottom, b = d3.select(this);
                p = v.xScale();
                d = v.yScale();
                e = e.map(function(e, t) {
                    e.seriesIndex = t;
                    e.values = e.values.map(function(e, n) {
                        e.index = n;
                        e.seriesIndex = t;
                        return e;
                    });
                    return e;
                });
                var w = e.filter(function(e) {
                    return !e.disabled;
                });
                e = d3.layout.stack().order(l).offset(f).values(function(e) {
                    return e.values;
                }).x(o).y(u).out(function(e, t, n) {
                    var r = u(e) === 0 ? 0 : n;
                    e.display = {
                        y: r,
                        y0: t
                    };
                })(w);
                var E = b.selectAll("g.nv-wrap.nv-stackedarea").data([ e ]), S = E.enter().append("g").attr("class", "nvd3 nv-wrap nv-stackedarea"), T = S.append("defs"), N = S.append("g"), C = E.select("g");
                N.append("g").attr("class", "nv-areaWrap");
                N.append("g").attr("class", "nv-scatterWrap");
                E.attr("transform", "translate(" + t.left + "," + t.top + ")");
                v.width(a).height(g).x(o).y(function(e) {
                    return e.display.y + e.display.y0;
                }).forceY([ 0 ]).color(e.map(function(e, t) {
                    return e.color || i(e, e.seriesIndex);
                }));
                var k = C.select(".nv-scatterWrap").datum(e);
                k.call(v);
                T.append("clipPath").attr("id", "nv-edge-clip-" + s).append("rect");
                E.select("#nv-edge-clip-" + s + " rect").attr("width", a).attr("height", g);
                C.attr("clip-path", h ? "url(#nv-edge-clip-" + s + ")" : "");
                var L = d3.svg.area().x(function(e, t) {
                    return p(o(e, t));
                }).y0(function(e) {
                    return d(e.display.y0);
                }).y1(function(e) {
                    return d(e.display.y + e.display.y0);
                }).interpolate(c), A = d3.svg.area().x(function(e, t) {
                    return p(o(e, t));
                }).y0(function(e) {
                    return d(e.display.y0);
                }).y1(function(e) {
                    return d(e.display.y0);
                }), O = C.select(".nv-areaWrap").selectAll("path.nv-area").data(function(e) {
                    return e;
                });
                O.enter().append("path").attr("class", function(e, t) {
                    return "nv-area nv-area-" + t;
                }).attr("d", function(e, t) {
                    return A(e.values, e.seriesIndex);
                }).on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0);
                    m.areaMouseover({
                        point: e,
                        series: e.key,
                        pos: [ d3.event.pageX, d3.event.pageY ],
                        seriesIndex: t
                    });
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1);
                    m.areaMouseout({
                        point: e,
                        series: e.key,
                        pos: [ d3.event.pageX, d3.event.pageY ],
                        seriesIndex: t
                    });
                }).on("click", function(e, t) {
                    d3.select(this).classed("hover", !1);
                    m.areaClick({
                        point: e,
                        series: e.key,
                        pos: [ d3.event.pageX, d3.event.pageY ],
                        seriesIndex: t
                    });
                });
                O.exit().transition().attr("d", function(e, t) {
                    return A(e.values, t);
                }).remove();
                O.style("fill", function(e, t) {
                    return e.color || i(e, e.seriesIndex);
                }).style("stroke", function(e, t) {
                    return e.color || i(e, e.seriesIndex);
                });
                O.transition().attr("d", function(e, t) {
                    return L(e.values, t);
                });
                v.dispatch.on("elementMouseover.area", function(e) {
                    C.select(".nv-chart-" + s + " .nv-area-" + e.seriesIndex).classed("hover", !0);
                });
                v.dispatch.on("elementMouseout.area", function(e) {
                    C.select(".nv-chart-" + s + " .nv-area-" + e.seriesIndex).classed("hover", !1);
                });
            });
            return g;
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = e.utils.defaultColor(), s = Math.floor(Math.random() * 1e5), o = function(e) {
            return e.x;
        }, u = function(e) {
            return e.y;
        }, a = "stack", f = "zero", l = "default", c = "linear", h = !1, p, d, v = e.models.scatter(), m = d3.dispatch("tooltipShow", "tooltipHide", "areaClick", "areaMouseover", "areaMouseout");
        v.size(2.2).sizeDomain([ 2.2, 2.2 ]);
        v.dispatch.on("elementClick.area", function(e) {
            m.areaClick(e);
        });
        v.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [ e.pos[0] + t.left, e.pos[1] + t.top ], m.tooltipShow(e);
        });
        v.dispatch.on("elementMouseout.tooltip", function(e) {
            m.tooltipHide(e);
        });
        g.dispatch = m;
        g.scatter = v;
        d3.rebind(g, v, "interactive", "size", "xScale", "yScale", "zScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "forceX", "forceY", "forceSize", "clipVoronoi", "useVoronoi", "clipRadius", "highlightPoint", "clearHighlights");
        g.options = e.utils.optionsFunc.bind(g);
        g.x = function(e) {
            if (!arguments.length) return o;
            o = d3.functor(e);
            return g;
        };
        g.y = function(e) {
            if (!arguments.length) return u;
            u = d3.functor(e);
            return g;
        };
        g.margin = function(e) {
            if (!arguments.length) return t;
            t.top = typeof e.top != "undefined" ? e.top : t.top;
            t.right = typeof e.right != "undefined" ? e.right : t.right;
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom;
            t.left = typeof e.left != "undefined" ? e.left : t.left;
            return g;
        };
        g.width = function(e) {
            if (!arguments.length) return n;
            n = e;
            return g;
        };
        g.height = function(e) {
            if (!arguments.length) return r;
            r = e;
            return g;
        };
        g.clipEdge = function(e) {
            if (!arguments.length) return h;
            h = e;
            return g;
        };
        g.color = function(t) {
            if (!arguments.length) return i;
            i = e.utils.getColor(t);
            return g;
        };
        g.offset = function(e) {
            if (!arguments.length) return f;
            f = e;
            return g;
        };
        g.order = function(e) {
            if (!arguments.length) return l;
            l = e;
            return g;
        };
        g.style = function(e) {
            if (!arguments.length) return a;
            a = e;
            switch (a) {
              case "stack":
                g.offset("zero");
                g.order("default");
                break;
              case "stream":
                g.offset("wiggle");
                g.order("inside-out");
                break;
              case "stream-center":
                g.offset("silhouette");
                g.order("inside-out");
                break;
              case "expand":
                g.offset("expand");
                g.order("default");
            }
            return g;
        };
        g.interpolate = function(e) {
            if (!arguments.length) return c;
            c = e;
            return g;
        };
        return g;
    };
    e.models.stackedAreaChart = function() {
        "use strict";
        function O(y) {
            y.each(function(y) {
                var M = d3.select(this), _ = this, D = (a || parseInt(M.style("width")) || 960) - u.left - u.right, P = (f || parseInt(M.style("height")) || 400) - u.top - u.bottom;
                O.update = function() {
                    M.transition().duration(L).call(O);
                };
                O.container = this;
                S.disabled = y.map(function(e) {
                    return !!e.disabled;
                });
                if (!x) {
                    var H;
                    x = {};
                    for (H in S) S[H] instanceof Array ? x[H] = S[H].slice(0) : x[H] = S[H];
                }
                if (!y || !y.length || !y.filter(function(e) {
                    return e.values.length;
                }).length) {
                    var B = M.selectAll(".nv-noData").data([ T ]);
                    B.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle");
                    B.attr("x", u.left + D / 2).attr("y", u.top + P / 2).text(function(e) {
                        return e;
                    });
                    return O;
                }
                M.selectAll(".nv-noData").remove();
                b = t.xScale();
                w = t.yScale();
                var j = M.selectAll("g.nv-wrap.nv-stackedAreaChart").data([ y ]), F = j.enter().append("g").attr("class", "nvd3 nv-wrap nv-stackedAreaChart").append("g"), I = j.select("g");
                F.append("rect").style("opacity", 0);
                F.append("g").attr("class", "nv-x nv-axis");
                F.append("g").attr("class", "nv-y nv-axis");
                F.append("g").attr("class", "nv-stackedWrap");
                F.append("g").attr("class", "nv-legendWrap");
                F.append("g").attr("class", "nv-controlsWrap");
                F.append("g").attr("class", "nv-interactive");
                I.select("rect").attr("width", D).attr("height", P);
                if (h) {
                    var q = c ? D - C : D;
                    i.width(q);
                    I.select(".nv-legendWrap").datum(y).call(i);
                    if (u.top != i.height()) {
                        u.top = i.height();
                        P = (f || parseInt(M.style("height")) || 400) - u.top - u.bottom;
                    }
                    I.select(".nv-legendWrap").attr("transform", "translate(" + (D - q) + "," + -u.top + ")");
                }
                if (c) {
                    var R = [ {
                        key: "Stacked",
                        disabled: t.offset() != "zero"
                    }, {
                        key: "Stream",
                        disabled: t.offset() != "wiggle"
                    }, {
                        key: "Expanded",
                        disabled: t.offset() != "expand"
                    } ];
                    C = k.length / 3 * 260;
                    R = R.filter(function(e) {
                        return k.indexOf(e.key) > -1;
                    });
                    s.width(C).color([ "#444", "#444", "#444" ]);
                    I.select(".nv-controlsWrap").datum(R).call(s);
                    if (u.top != Math.max(s.height(), i.height())) {
                        u.top = Math.max(s.height(), i.height());
                        P = (f || parseInt(M.style("height")) || 400) - u.top - u.bottom;
                    }
                    I.select(".nv-controlsWrap").attr("transform", "translate(0," + -u.top + ")");
                }
                j.attr("transform", "translate(" + u.left + "," + u.top + ")");
                v && I.select(".nv-y.nv-axis").attr("transform", "translate(" + D + ",0)");
                if (m) {
                    o.width(D).height(P).margin({
                        left: u.left,
                        top: u.top
                    }).svgContainer(M).xScale(b);
                    j.select(".nv-interactive").call(o);
                }
                t.width(D).height(P);
                var U = I.select(".nv-stackedWrap").datum(y);
                U.transition().call(t);
                if (p) {
                    n.scale(b).ticks(D / 100).tickSize(-P, 0);
                    I.select(".nv-x.nv-axis").attr("transform", "translate(0," + P + ")");
                    I.select(".nv-x.nv-axis").transition().duration(0).call(n);
                }
                if (d) {
                    r.scale(w).ticks(t.offset() == "wiggle" ? 0 : P / 36).tickSize(-D, 0).setTickFormat(t.offset() == "expand" ? d3.format("%") : E);
                    I.select(".nv-y.nv-axis").transition().duration(0).call(r);
                }
                t.dispatch.on("areaClick.toggle", function(e) {
                    y.filter(function(e) {
                        return !e.disabled;
                    }).length === 1 ? y = y.map(function(e) {
                        e.disabled = !1;
                        return e;
                    }) : y = y.map(function(t, n) {
                        t.disabled = n != e.seriesIndex;
                        return t;
                    });
                    S.disabled = y.map(function(e) {
                        return !!e.disabled;
                    });
                    N.stateChange(S);
                    O.update();
                });
                i.dispatch.on("stateChange", function(e) {
                    S.disabled = e.disabled;
                    N.stateChange(S);
                    O.update();
                });
                s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled) return;
                    R = R.map(function(e) {
                        e.disabled = !0;
                        return e;
                    });
                    e.disabled = !1;
                    switch (e.key) {
                      case "Stacked":
                        t.style("stack");
                        break;
                      case "Stream":
                        t.style("stream");
                        break;
                      case "Expanded":
                        t.style("expand");
                    }
                    S.style = t.style();
                    N.stateChange(S);
                    O.update();
                });
                o.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var s, a, f, c = [];
                    y.filter(function(e, t) {
                        e.seriesIndex = t;
                        return !e.disabled;
                    }).forEach(function(n, r) {
                        a = e.interactiveBisect(n.values, i.pointXValue, O.x());
                        t.highlightPoint(r, a, !0);
                        var o = n.values[a];
                        if (typeof o == "undefined") return;
                        typeof s == "undefined" && (s = o);
                        typeof f == "undefined" && (f = O.xScale()(O.x()(o, a)));
                        c.push({
                            key: n.key,
                            value: O.y()(o, a),
                            color: l(n, n.seriesIndex)
                        });
                    });
                    var h = n.tickFormat()(O.x()(s, a));
                    o.tooltip.position({
                        left: f + u.left,
                        top: i.mouseY + u.top
                    }).chartContainer(_.parentNode).enabled(g).valueFormatter(function(e, t) {
                        return r.tickFormat()(e);
                    }).data({
                        value: h,
                        series: c
                    })();
                    o.renderGuideLine(f);
                });
                o.dispatch.on("elementMouseout", function(e) {
                    N.tooltipHide();
                    t.clearHighlights();
                });
                N.on("tooltipShow", function(e) {
                    g && A(e, _.parentNode);
                });
                N.on("changeState", function(e) {
                    if (typeof e.disabled != "undefined") {
                        y.forEach(function(t, n) {
                            t.disabled = e.disabled[n];
                        });
                        S.disabled = e.disabled;
                    }
                    typeof e.style != "undefined" && t.style(e.style);
                    O.update();
                });
            });
            return O;
        }
        var t = e.models.stackedArea(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.models.legend(), o = e.interactiveGuideline(), u = {
            top: 30,
            right: 25,
            bottom: 50,
            left: 60
        }, a = null, f = null, l = e.utils.defaultColor(), c = !0, h = !0, p = !0, d = !0, v = !1, m = !1, g = !0, y = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " on " + t + "</p>";
        }, b, w, E = d3.format(",.2f"), S = {
            style: t.style()
        }, x = null, T = "No Data Available.", N = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), C = 250, k = [ "Stacked", "Stream", "Expanded" ], L = 250;
        n.orient("bottom").tickPadding(7);
        r.orient(v ? "right" : "left");
        s.updateState(!1);
        var A = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0), u = i.pos[1] + (s.offsetTop || 0), a = n.tickFormat()(t.x()(i.point, i.pointIndex)), f = r.tickFormat()(t.y()(i.point, i.pointIndex)), l = y(i.series.key, a, f, i, O);
            e.tooltip.show([ o, u ], l, i.value < 0 ? "n" : "s", null, s);
        };
        t.dispatch.on("tooltipShow", function(e) {
            e.pos = [ e.pos[0] + u.left, e.pos[1] + u.top ], N.tooltipShow(e);
        });
        t.dispatch.on("tooltipHide", function(e) {
            N.tooltipHide(e);
        });
        N.on("tooltipHide", function() {
            g && e.tooltip.cleanup();
        });
        O.dispatch = N;
        O.stacked = t;
        O.legend = i;
        O.controls = s;
        O.xAxis = n;
        O.yAxis = r;
        O.interactiveLayer = o;
        d3.rebind(O, t, "x", "y", "size", "xScale", "yScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "interactive", "useVoronoi", "offset", "order", "style", "clipEdge", "forceX", "forceY", "forceSize", "interpolate");
        O.options = e.utils.optionsFunc.bind(O);
        O.margin = function(e) {
            if (!arguments.length) return u;
            u.top = typeof e.top != "undefined" ? e.top : u.top;
            u.right = typeof e.right != "undefined" ? e.right : u.right;
            u.bottom = typeof e.bottom != "undefined" ? e.bottom : u.bottom;
            u.left = typeof e.left != "undefined" ? e.left : u.left;
            return O;
        };
        O.width = function(e) {
            if (!arguments.length) return a;
            a = e;
            return O;
        };
        O.height = function(e) {
            if (!arguments.length) return f;
            f = e;
            return O;
        };
        O.color = function(n) {
            if (!arguments.length) return l;
            l = e.utils.getColor(n);
            i.color(l);
            t.color(l);
            return O;
        };
        O.showControls = function(e) {
            if (!arguments.length) return c;
            c = e;
            return O;
        };
        O.showLegend = function(e) {
            if (!arguments.length) return h;
            h = e;
            return O;
        };
        O.showXAxis = function(e) {
            if (!arguments.length) return p;
            p = e;
            return O;
        };
        O.showYAxis = function(e) {
            if (!arguments.length) return d;
            d = e;
            return O;
        };
        O.rightAlignYAxis = function(e) {
            if (!arguments.length) return v;
            v = e;
            r.orient(e ? "right" : "left");
            return O;
        };
        O.useInteractiveGuideline = function(e) {
            if (!arguments.length) return m;
            m = e;
            if (e === !0) {
                O.interactive(!1);
                O.useVoronoi(!1);
            }
            return O;
        };
        O.tooltip = function(e) {
            if (!arguments.length) return y;
            y = e;
            return O;
        };
        O.tooltips = function(e) {
            if (!arguments.length) return g;
            g = e;
            return O;
        };
        O.tooltipContent = function(e) {
            if (!arguments.length) return y;
            y = e;
            return O;
        };
        O.state = function(e) {
            if (!arguments.length) return S;
            S = e;
            return O;
        };
        O.defaultState = function(e) {
            if (!arguments.length) return x;
            x = e;
            return O;
        };
        O.noData = function(e) {
            if (!arguments.length) return T;
            T = e;
            return O;
        };
        O.transitionDuration = function(e) {
            if (!arguments.length) return L;
            L = e;
            return O;
        };
        O.controlsData = function(e) {
            if (!arguments.length) return k;
            k = e;
            return O;
        };
        r.setTickFormat = r.tickFormat;
        r.tickFormat = function(e) {
            if (!arguments.length) return E;
            E = e;
            return r;
        };
        return O;
    };
})();