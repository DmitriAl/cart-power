document.addEventListener("DOMContentLoaded", function () {
    function activate(selector, toggleSelector) {
        const selector_elements = document.querySelectorAll(selector);

        for (const selector_element of selector_elements) {
            selector_element.addEventListener('click', function (event) {
                event.preventDefault();
                toggleClass(selector_element, toggleSelector);
            });
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
        const sticky_element = document.querySelector(sticky);
        const neighbour_element = document.querySelector(neighbour);

        const stickyHeight = sticky_element.offsetHeight;
        const stickyWidth = sticky_element.clientWidth;

        window.addEventListener('scroll', function () {
            let scrollDistance = window.scrollY;

            if (scrollDistance >= stickyHeight && stickyWidth > 1440) {
                sticky_element.classList.add(selectorByClass);
                neighbour_element.style.paddingTop = `${stickyHeight}px`;
            } else {
                sticky_element.classList.remove(selectorByClass);
                neighbour_element.style.paddingTop = null;
            }
        });
    }

    /* маска */
    const tel_inputs = document.querySelectorAll('input[type="tel"]');
    const inputMask = new Inputmask('+7(999)-999-99-99');
    /* конец маски */

    /* валидация */
    const validateForms = function (selector, rules) {
        new window.JustValidate(selector, {
            rules: rules,
            submitHandler: function (form) {
                let formData = new FormData(form);
                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log('отправлено');
                        }
                    }
                }

                xhr.open('POST', /* путь к обработчику */ 'mail.php', true);
                xhr.send(formData);

                form.reset();
            }
        })
    }
    /* конец валидации */

    const burger = document.querySelector('.burger');
    const nav_element = document.querySelector('.nav');
    const burger_close_element = document.querySelector('.nav__close');
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
            maxLength: 25
        },
        email: {
            required: true,
            email: true
        },
        tel: {
            required: true,
            phone: true
        }
    })
});