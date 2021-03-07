import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactsMain from '../views/ContactsMain.vue'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Contacts Main',
    component: ContactsMain
  },
  {
    path: '/contact/:id',
    name: 'Contact Info',
    component: Contact
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
