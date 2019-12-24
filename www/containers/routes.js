// import ButtonExample from '../examples/ButtonExample';
import ButtonExample from '../mdexamples/Buttons.mdx';
import AccordionExample from '../mdexamples/Accordion.mdx';
// import AccordionExample from '../examples/AccordionExample';
import GettingStarted from '../components/GettingStarted.md';

const routes = [
  {
    path: '/',
    component: GettingStarted,
    title: 'Installation',
    group: 'Getting Started',
  },
  {
    path: '/button',
    component: ButtonExample,
    title: 'Button',
    group: 'Components',
  },
  {
    path: '/accordion',
    component: AccordionExample,
    title: 'Accordion',
    group: 'Components',
  },
];

export default routes;
