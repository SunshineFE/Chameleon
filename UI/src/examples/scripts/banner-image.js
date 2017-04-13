!function () {
    var Banner = function (element, opts) {
        // 默认控制参数
        var defaultOptions = {
            pager: false,
            nav: true,
            speeds: 500,
            button: false,
            autoPlay: true,
            autoPlayTimes: 3000,
            resetHeight:false
        }

        opts = opts || {};

        for (var i in defaultOptions) {
            if ('undefined' == typeof (opts[i])) {
                opts[i] = defaultOptions[i]
            }
        }

        this.element = element;
        this.params = opts;  //控制参数
        this.switching = false;  //当前是否可切换
        this.timer = null;  //循环播放控制器
        this.index = 1;  //当前显示的序号
        this.container = $(element);
        this.wrapper = this.container.find(':first');
        this.silders = this.wrapper.children();
        
        this.slideHeigth = this.silders[0].offsetHeight;
        //先设置父类容器的高度再去取宽度，这样才能避免取到错误的宽度
        // this.container[0].style.height = this.slideHeigth + 'px';

        this.slideWidth = this.silders[0].offsetWidth;        
        this.length = this.silders.length;
        this.init();
    }

    Banner.prototype = {
        //初始化参数
        init: function () {
            var params = this.params;

            this.clone();
            this.length = this.silders.length;
            this.wrapper.css({
                left: -this.slideWidth + 'px'
            })

            if (params.nav) {
                this.showNav();
            }

            if (params.button) {
                this.showButton();
            }

            if (params.autoPlay) {
                this.play();
                this.bindOverEvent();
            }
            this.slideEndHandler();
        },

        bindOverEvent: function () {
            var that = this;

            this.container.on('moustout', function () {
                that.play();
            }, false);

            this.container.on('mouseover', function () {
                that.stop();
            }, false);
        },

        //补全头尾
        clone: function () {
            var children = this.wrapper.children();
            var first = children[0].cloneNode(true);
            var last = children[this.length - 1].cloneNode(true);

            this.wrapper.append(first);
            this.wrapper.prepend(last);
            this.silders = this.wrapper.children();

        },

        //播放控制
        play: function () {
            var that = this;

            if(!this.params.autoPlay){
                return;
            }
            
            this.timer = setInterval(function () {
                that.go(-that.slideWidth);
            }, this.params.autoPlayTimes);
        },

        //
        stop: function () {
            clearInterval(this.timer);
        },

        //图片导航条
        showNav: function () {
            var count = this.length - 2;
            var pagination = document.createElement('div');
            var that = this;

            pagination.className = 'banner-pagination';

            for (var i = 0; i < count; i++) {
                var className = i === 0 ? 'banner-pagination-bullet active' : 'banner-pagination-bullet';
                var child = document.createElement('span');

                child.className = className;
                pagination.append(child);
            }

            this.container.append(pagination);
            this.bullets = this.container.find('.banner-pagination-bullet');
            this.bullets.map(function (index, bullet) {
                bullet.addEventListener('click', function () {
                    if (that.switching) {
                        return;
                    }

                    if (this.className.indexOf('active') > -1) {
                        return;
                    }

                    var deviation = (that.index - (index + 1)) * that.slideWidth;

                    that.stop();
                    that.go(deviation);
                    that.num = index + 1;
                    that.play();
                })
            })

        },

        //切换按钮
        showButton: function () {
            var count = this.length - 2;
            var buttonNext = document.createElement('section');
            var buttonPrev = document.createElement('section');

            buttonNext.className = 'banner-button banner-button-next';
            buttonPrev.className = 'banner-button banner-button-prev';

            this.container.append(buttonNext);
            this.container.append(buttonPrev);
            this.bindButtonEvent();

        },

        bindButtonEvent: function () {
            var bannerButtons = this.container.find('.banner-button');
            var that = this;

            bannerButtons.map(function (index, button) {
                button.addEventListener('click', function (e) {
                    that.buttonHandler(e);
                }, false);
            });
        },

        buttonHandler: function (e) {
            var target = e.srcElement || e.target;

            if (this.switching) {
                return;
            }

            this.stop();

            if (target.className.indexOf('banner-button-next') > -1) {
                this.go(-this.slideWidth);
            } else {
                this.go(this.slideWidth);
            }

            this.play();
        },

        changeBulletState: function () {
            var bullets = this.container.find('.banner-pagination-bullet');
            var curIndex = this.index;
            var that = this;

            bullets.map(function (index, bullet) {

                if (index + 1 === curIndex) {
                    bullet.classList.add('active');
                } else {
                    bullet.classList.remove('active');
                }
            })
        },

        slideEndHandler() {
            var that = this;
            var handler = function(){
                if (that.index >= that.length - 1) {
                    that.index = 1;
                    that.wrapper.css({
                        transition: '',
                        left: -that.index * that.slideWidth
                    })
                }

                if (that.index <= 0) {
                    that.index = that.length - 2;

                    that.wrapper.css({
                        transition: '',
                        left: -that.index * that.slideWidth
                    })
                }

                that.switching = false;
                that.changeBulletState();
            };
            var target = document.querySelector(that.element+' .banner-wrapper');

            target.addEventListener('webkitTransitionEnd', handler, false);
            target.addEventListener('mozTransitionEnd', handler, false);
            target.addEventListener('transitionend', handler, false);
        },

        go: function (distance) {
            var silders = this.silders;
            var changeNum = -parseInt(distance / this.slideWidth);
            var index = this.index + changeNum;
            var speeds = parseInt(this.params.speeds / changeNum);

            if (distance == 0 || this.switching) {
                return;
            }

            this.switching = true;
            this.index = index;

            this.wrapper.css({
                transition: 'left ' + this.params.speeds + 'ms ease-in',
                left: -index * this.slideWidth
            });

        }
    }

    window.__SY__BannerImage__ = Banner;
} ()