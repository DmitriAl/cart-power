'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) {
    var it =
        (typeof Symbol !== 'undefined' && o[Symbol.iterator]) ||
        o['@@iterator'];
    if (!it) {
        if (
            Array.isArray(o) ||
            (it = _unsupportedIterableToArray(o)) ||
            (allowArrayLike && o && typeof o.length === 'number')
        ) {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return { done: true };
                    return { done: false, value: o[i++] };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F,
            };
        }
        throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
    }
    var normalCompletion = true,
        didErr = false,
        err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it['return'] != null) it['return']();
            } finally {
                if (didErr) throw err;
            }
        },
    };
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

document.addEventListener('DOMContentLoaded', function () {
    function activate(selector, toggleSelector) {
        var selector_elements = document.querySelectorAll(selector);

        var _iterator = _createForOfIteratorHelper(selector_elements),
            _step;

        try {
            var _loop = function _loop() {
                var selector_element = _step.value;
                selector_element.addEventListener('click', function (event) {
                    event.preventDefault();
                    toggleClass(selector_element, toggleSelector);
                });
            };

            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                _loop();
            }
        } catch (err) {
            _iterator.e(err);
        } finally {
            _iterator.f();
        }
    }

    function toggleClass(selector, classToToggle) {
        if (selector.classList.contains(classToToggle)) {
            selector.classList.remove(classToToggle);
        } else {
            selector.classList.add(classToToggle);
        }
    }

    function sticky(sticky, neighbour, selectorByClass) {
        var sticky_element = document.querySelector(sticky);
        var neighbour_element = document.querySelector(neighbour);
        var stickyHeight = sticky_element.offsetHeight;
        var stickyWidth = sticky_element.clientWidth;
        window.addEventListener('scroll', function () {
            var scrollDistance = window.scrollY;

            if (scrollDistance >= stickyHeight && stickyWidth > 1440) {
                sticky_element.classList.add(selectorByClass);
                neighbour_element.style.paddingTop = ''.concat(
                    stickyHeight,
                    'px'
                );
            } else {
                sticky_element.classList.remove(selectorByClass);
                neighbour_element.style.paddingTop = null;
            }
        });
    }
    /* маска */

    var tel_inputs = document.querySelectorAll('input[type="tel"]');
    var inputMask = new Inputmask('+7(999)-999-99-99');
    /* конец маски */

    /* валидация */

    var validateForms = function validateForms(selector, rules) {
        new window.JustValidate(selector, {
            rules: rules,
            submitHandler: function submitHandler(form) {
                var formData = new FormData(form);
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log('отправлено');
                        }
                    }
                };

                xhr.open(
                    'POST',
                    /* путь к обработчику */
                    'mail.php',
                    true
                );
                xhr.send(formData);
                form.reset();
            },
        });
    };
    /* конец валидации */

    var burger = document.querySelector('.burger');
    var nav_element = document.querySelector('.nav');
    var burger_close_element = document.querySelector('.nav__close');
    burger.addEventListener('click', function (event) {
        event.preventDefault();
        nav_element.classList.add('active');
    });
    burger_close_element.addEventListener('click', function (event) {
        event.preventDefault();
        nav_element.classList.remove('active');
    });
    inputMask.mask(tel_inputs);
    activate('.like', 'filled');
    sticky('.header', '.main', 'header--fixed');
    validateForms('.form', {
        name: {
            required: true,
            minLength: 5,
            maxLength: 25,
        },
        email: {
            required: true,
            email: true,
        },
        tel: {
            required: true,
            phone: true,
        },
    });
});
