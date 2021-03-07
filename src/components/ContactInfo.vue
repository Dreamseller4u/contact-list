<template>
  <div class="contact-card">
    <div class="contact-table">
      <template v-for="({name, value}, index) in contactInfo">
        <ContactField :name="name" :value="value" :index="index"/>
      </template>
      <button class="contact-table__button_add" v-if="!addTemplate" @click="addTemplate = true">
        <span>Add field</span>
        <span> + </span>
      </button>
      <div v-else class="contact-add">
        <div class="contact-add__form">
          <div class="contact-add__item">
            <input id="nameInput" ref="nameInput" type="text" class="contact-add__name" placeholder="name">
            <label v-if="emptyName" class="contact-add__label" for="nameInput">The field must not be empty</label>
          </div>
          <div class="contact-add__item">
            <input id="valueInput" ref="valueInput" type="text" class="contact-add__value" placeholder="value">
            <label v-if="emptyValue" class="contact-add__label" for="valueInput">The field must not be empty</label>
          </div>
        </div>
        <div class="contact-add__buttons">
          <button class="contact-add__add" @click="confirmAdd">+</button>
          <button class="contact-add__cancel" @click="cancelAdd" >x</button>
        </div>
      </div>
    </div>
    <div
        v-if="this.lastAction.nameAction !== '' &&
        this.lastAction.indexContact === this.indexOfCurrentContact"
        class="contact-card__buttons">
      <span>Cancel last action</span>
      <button class="cancel" @click="onCancelLastAction"><</button>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import ContactField from "./ContactField";

  export default {
    name: "ContactInfo",
    data: () => ({
      idContact: 0,
      contactInfo: [],
      addTemplate: false,
      emptyName: false,
      emptyValue: false,
    }),
    components: {
      ContactField
    },
    mounted() {
      this.idContact = this.$route.params.id - 1;
      this.contactInfo = this.contactsList[this.idContact];
      this.setCurrentContact(
        {
          indexOfCurrentContact: this.idContact
        });
    },
    computed: {
      ...mapGetters('contacts', ['contactsList', 'lastAction', 'indexOfCurrentContact'])
    },
    methods: {
      ...mapActions('contacts', ['setCurrentContact', 'addField', 'setLastAction', "cancelLastAction"]),
      onCancelLastAction() {
        this.cancelLastAction();
      },
      confirmAdd() {
          this.emptyName = this.emptyValue = false;
          const name = this.$refs.nameInput.value;
          const value = this.$refs.valueInput.value;
          if(name && value) {
            this.setLastAction({
              nameAction: 'add',
              nameField: name,
              valueField: value,
              indexField: Object.keys(this.contactInfo).length,
            });
            this.addField({
              name: name,
              value: value,
            });
          }
          if(!name && !value) {
            return this.emptyName = this.emptyValue = true;
          }
          if(!name) {
            return this.emptyName = true;
          }
          if(!value) {
            return this.emptyValue = true;
          }
          this.emptyName = this.emptyValue = this.addTemplate = false;
      },
      cancelAdd() {
        return this.addTemplate = this.emptyName = this.emptyValue = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .cancel{
    background: #FF6666;
    border: none;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
    position: relative;
    left: 10px;
    &:hover{
      background: #ff7f7f;
    }
  }
  .contact-card{
    width: fit-content;
    padding: 20px;
    margin: 20px auto;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  .contact-table{
    display: flex;
    flex-direction: column;
    font-size: 22px;
    justify-content: space-between;
    &__item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin:10px;
      position: relative;
    }
    &__name{
      text-transform: capitalize;
      margin-right: auto;
      position: absolute;
      font-size: .8rem;
      left: 0;
      top: 0;
    }
    &__button_add{
      background: #408f00;
      border-radius: 5px;
      border: none;
      color: white;
      font-size: 14px;
      padding: 9px;
      margin-bottom: 20px;
    }
  }
  .contact-add{
    &__item{
      display: flex;
      flex-direction: column;
    }
    &__label{
      font-size: 12px;
      margin-top: 2px;
      padding: 0;
      color: red;
    }
    &__name{
      font-size: 1rem;
      border-width: 0 0 2px 2px; 
      padding-left: 10px;
      border-radius: 5px;
      border-width: 0 0 1px;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
    }
    &__value{
      font-size: 1rem;
      border-width: 0 0 2px 2px; 
      padding-left: 10px;
      border-radius: 5px;
      border-width: 0 0 1px;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
    }
    &__buttons{
     margin-top: 25px;
    }
    &__add{
      font-size: 20px;
      background: #408f00;
      border: none;
      padding: 5px 10px;
      color: white;
      border-radius: 5px;
      margin-right: 20px;
      }
    &__cancel{
      font-size: 20px;
      background: #FF6666;
      border: none;
      padding: 5px 10px;
      color: white;
      border-radius: 5px;
      }
  }
</style>