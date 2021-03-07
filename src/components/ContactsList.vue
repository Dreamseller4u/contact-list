<template>
  <ul>
    <AddContact/>
    <template v-for="(contactInfo, index) in contactsList">
      <ContactsItem :contactInfo="contactInfo" :index="index"/>
    </template>
  </ul>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ContactsItem from "./ContactsItem";
  import AddContact from "./AddContact";

  export default {
    name: "ContactsList",
    components: {
      AddContact,
      ContactsItem,
    },
    computed: {
      ...mapGetters('contacts' , ['contactsList'])
    }
  }
</script>

<style scoped>
ul{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
</style>