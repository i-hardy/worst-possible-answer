import Velocity from 'velocity-animate';

export default {
  functional: true,
  render(createElement, context) {
    const data = {
      props: {
        appear: true,
        name: 'pop-up',
        mode: 'out-in',
        enterClass: 'velocity-hidden',
      },
      on: {
        enter(el, done) {
          Velocity(
            el,
            {
              scale: [1, 2, 0],
              opacity: [1, 0],
            },
            {
              easing: 'spring',
              duration: 400,
              complete: done,
            },
          );
        },
        leave(el, done) {
          Velocity(
            el,
            {
              scale: [0, 1.5, 1],
              opacity: [0, 1],
            },
            {
              easing: 'spring',
              duration: 400,
              complete: done,
            },
          );
        },
      },
    };

    return createElement('transition', data, context.children);
  },
};
