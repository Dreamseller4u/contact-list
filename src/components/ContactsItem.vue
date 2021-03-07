<template>
  <li class="contacts-card" @click="choiceOfContact">
      <div class="contacts-table">
        <div class="contacts-table__field"  v-for="(contactField, index) in contactInfo" :key="index">
            <span class="contacts-table__name">{{contactField.name}} : </span>
            <span class="contacts-table__value">{{contactField.value}}</span>
        </div>
      </div>
    <template v-if="confirmationTemplate">
      <div class="confirm-card" @click.stop>
        <span class="confirm-card__text">Delete contact?</span>
        <div class="confirm-card__buttons">
          <button @click="onDeleteContact" class="green">Yes</button>
          <button @click="confirmationTemplate = false" class="red">No</button>
        </div>
      </div>
    </template>
    <div class="contacts-card__buttons" v-if="!confirmationTemplate"  @click.stop>
      <button class="contacts-card__delete" @click.stop="confirmationTemplate = true">Delete Contact</button>
    </div>
  </li>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "ContactsItem",
    props: {
      contactInfo: {
        type: Array,
        default: () => ([]),
      },
      index: {
        type: Number,
        default: 0,
      }
    },
    data: () => ({
      confirmationTemplate: false
    }),
    methods: {
      ...mapActions('contacts', ['deleteContact']),
      choiceOfContact() {
        this.$router.push('/contact/' + (this.index + 1));
      },
      onDeleteContact() {
        this.deleteContact(this.index);
        this.confirmationTemplate = false;
      },
    }
  }
</script>

<style scoped lang="scss">
.confirm-card{
  width: 90%;
  padding: 10px;
  margin: 0px auto;
  border-radius: 10px;
  background: transparent;
  border: 1px solid red;
}
.green{
    border: none;
    background: none;
    color: green;
    &:hover{
      font-size: 15px;
    }
}
.red{
    border: none;
    background: none;
    color: red;
    &:hover{
      font-size: 15px;
    }
}
.contacts-card{
  list-style: none;
  width: 260px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  &:hover{
    background: #f9f9f9;
    -webkit-box-shadow: 1px 0px 34px -16px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 1px 0px 34px -16px rgba(34, 60, 80, 0.2);
    box-shadow: 1px 0px 34px -16px rgba(34, 60, 80, 0.2);
  }
  &__delete{
    background: #FF6666;
    border: none;
    padding: 10px;
    color: white;
    border-radius: 10px;
    position: relative;
    float: right;
    &:hover{
      background: #ff7f7f;
    }
  }
}
.contacts-table{
  &__name{
    position: absolute;
    left: 0px;
    top: -15px;
    font-size: 10px;
    text-transform: capitalize;
  }
  &__field{
    margin: 20px 10px;
    position: relative;
    display: flex;
  }
}

</style>