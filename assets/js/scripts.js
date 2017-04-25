// jshint browser: true
(function() {
    "use strict";

    /**
     * Countdown constructor
     * @param object args - param to set Countdown object
     * @return object
     */
    window.Countdown = function(args) {

        if ("undefined" === typeof args) {
            args = {};
        }
        this.timer = document.querySelector(args.timer || ".timer");
        this.cdTime = document.querySelector(args.cdTime || ".timer__display");
        this.cdStart = document.querySelector(args.cdStart || ".timer__btn-on");
        this.controller = document.querySelectorAll(args.controller || ".timer__controller > a");
        this.timerOnClass = args.timerOnClass || "timer--on";
        this.timeNotice = document.querySelector(args.timeNotice || ".notice:first-of-type > time");
        this.intervalT = args.intervalT || null;
        this.timeoutT = args.timeoutT || null;
    };

    window.Countdown.prototype = {
        init: function() {
            var self = this;

            // adding listener to the button to handle start and stop
            self.cdStart.addEventListener('click', function(e) {

                // the countdown stops, if it was running
                if (-1 !== self.timer.className.indexOf(self.timerOnClass)) {
                    self.reset();
                    e.stopPropagation();
                    return false;
                }
                // check if no countdowns were set
                else if (!self.getCurrTime()) {
                    e.stopPropagation();
                    return false;
                }

                // request authorization to browser notification features
                Notification.requestPermission(function() {
                    // notify activation
                    var notification = new Notification("Countdown", {
                            body: "Countdown activated",
                            tag: "countdown-activated"
                        }),
                        notificationEnd,
                        currTime = new Date(),
                        endTime = new Date(),
                        currCDTime = self.getCurrTime();

                    // start countdown visually
                    self.timer.classList.add(self.timerOnClass);

                    // update timer
                    self.intervalT = setInterval(function() {
                        self.updTimer(false, true);
                    }, 1000);

                    // set timeout for notify countdown end
                    self.timeoutT = setTimeout(function() {
                        if (self.isOn()) {
                            notificationEnd = new Notification("Countdown", {
                                body: "Countdown ended",
                                tag: "countdown-ended"
                            });
                            self.reset();
                        }
                    }, currCDTime);

                    // retrive countdown time and set countdown end time             
                    endTime.setTime(currTime.getTime() + currCDTime);

                    // print end time
                    self.timeNotice.innerText = self.toTimeFormat(endTime);

                    [].forEach.call(document.querySelectorAll(".notice:not(.notice--not-supported)"), function(e, i) {
                        e.style.display = 'block';
                    });

                });
            });

            // adding listener to the timer
            self.timer.addEventListener("wheel", function(e) {
                self.updTimer(e.deltaY < 0);
            });
            self.timer.addEventListener("click", function(e) {
                if (-1 !== self.timer.className.indexOf(self.timerOnClass)) {
                    self.reset();
                }
            });

            // handle buttons to set countdown time
            [].forEach.call(self.controller, function(e) {
                e.addEventListener("click", function(e) {
                    if (-1 !== e.target.className.indexOf("up")) {
                        self.updTimer(true, false);
                    } else {
                        self.updTimer(false, false);
                    }
                });
            });
        },
        updTimer: function(up, countdown) {
            up = up || false; // default values, when nothing is passed
            countdown = countdown || false;
            var unit, // milliseconds
                currTime = this.stringToMillisec(this.cdTime.innerText);
            // countdown is on
            if (countdown) {
                unit = 1 * 1000;
            }
            // setting countdown timer
            else {
                unit = 10 * 1000;
            }
            if (up) {
                currTime += unit;
            } else {
                currTime -= unit;
            }
            if (currTime >= 0) {
                this.cdTime.innerText = this.milliSecToString(currTime);
            }
        },
        stringToMillisec: function(d) {
            var t = d.split(":");
            return (parseInt(t[0]) * 60 * 60 + parseInt(t[1]) * 60 + parseInt(t[2])) * 1000;
        },
        milliSecToString: function(d) {
            d = d / 1000;
            var hours = parseInt(d / (60 * 60)),
                minutes = parseInt((d % (60 * 60)) / 60),
                seconds = (d % (60 * 60)) % 60;
            return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        },
        toTimeFormat: function(d) {

            return d.toLocaleTimeString(this.getLanguage(), {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
        },
        getLanguage: function() {
            if ("undefined" !== typeof navigator.languages) {
                return (-1 !== navigator.languages.indexOf("it-IT")) ? "it-IT" : "en-EN";
            } else {
                return ("it-IT" === navigator.language) ? "it-IT" : "en-EN";
            }
        },
        getCurrTime: function() {
            return this.stringToMillisec(this.cdTime.innerText);
        },
        isOn: function() {
            return (-1 !== this.timer.className.indexOf(this.timerOnClass));
        },
        reset: function() {
            this.timer.classList.remove(this.timerOnClass);
            this.cdTime.innerText = "00:00:00";
            this.timeNotice.innerText = "";
            clearTimeout(this.timeoutT);
            clearInterval(this.intervalT);
            [].forEach.call(document.querySelectorAll(".notice"), function(e, i) {
                e.style.display = 'none';
            });
        }
    };

    // notification not supported, nothing is done
    if (!("Notification" in window)) {
        document.querySelector(".notice--not-supported").style.display = 'block';
    }
    // notification supported
    else {
        var cntdwn = new window.Countdown();
        cntdwn.init();
    }
}());
