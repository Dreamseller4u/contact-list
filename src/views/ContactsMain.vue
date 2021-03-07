<template>
  <div class="main">
    <ContactsList/>
  </div>
</template>

<script>
  import ContactsList from "../components/ContactsList";

export default {
  name: 'Main',
  components: {
    ContactsList,
  }
}
</script>
