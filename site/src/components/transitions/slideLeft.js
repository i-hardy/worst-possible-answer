import Velocity from 'velocity-animate';

export default {
  functional: true,
  render(createElement, context) {
    const data = {
      props: {
        appear: true,
        name: 'slide-left',
        mode: 'out-in',
        enterClass: 'velocity-hidden',
      },
      on: {
        enter(el, done) {
          Velocity(
            el,
            {
              translateX: ['0%', '100%'],
              opacity: [1, 0],
            },
            {
              duration: 300,
              complete: done,
            },
          );
        },
        leave(el, done) {
          Velocity(
            el,
            {
              translateX: ['-100%', '0%'],
              opacity: [0, 1],
            },
            {
              duration: 300,
              complete: done,
            },
          );
        },
      },
    };

    return createElement('transition', data, context.children);
  },
};
