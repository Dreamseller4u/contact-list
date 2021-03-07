<template>
  <div class="add-block">
    <template >
      <div class="add-field">
        <span class="add-field__name-span">Name </span>
        <div class="add-field__name-block">
          <input id="nameValue" class="add-field__name-input" type="text" placeholder="value" v-model="nameValue">
          <label v-if="validateMessage" class="add-field__name-label"  for="nameValue">Field "Name" is required</label>
        </div>
      </div>
      <template v-for="(field, index) in arrOfFields">
        <div class="add-field">
          <input type="text" class="add-field__name" placeholder="name" v-model="field.name">
          <input type="text" class="add-field__value" placeholder="value" v-model="field.value">
          <button @click="arrOfFields.splice(index, 1)" class="add-field__delete red">Delete</button>
        </div>
      </template>
      <div class="add-field__button">
        <button @click="arrOfFields.push({name: '', value: ''})" class="green">Add Field</button>
      </div>
      <div class="add-block__buttons" v-if="nameValue">
        <button class="add-block__button green" @click="onAddContact">Create</button>
        <button class="add-block__button red" @click="onCloseTemplate">Cancel</button>
      </div>
    </template>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "addContact",
    data: () => ({
      addTemplate: false,
      validateMessage: false,
      nameValue: '',
      arrOfFields: []
    }),
    methods: {
      ...mapActions('contacts', ['addContact']),
      onAddContact() {
        if(!this.nameValue) {
          return this.validateMessage = true
        }
        const newContact = [{
          name: 'name',
          value: this.nameValue,
        }].concat(this.arrOfFields.filter(field => field.name && field.value));

        this.addContact(newContact);
        this.arrOfFields = [];
        this.nameValue = '';
        this.validateMessage = this.addTemplate = false;
      },
      onCloseTemplate() {
        this.arrOfFields = [];
        this.nameValue = '';
        this.addTemplate = this.validateMessage = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .green{
    border: none;
    background: #379000;
    color: white;
    padding: 10px;
    border-radius: 10px;
    &:hover{
      color:white;
      background: #47b602;
    }
  }
  .red{
    border: none;
    background: #FF6666;
    color: white;
    padding: 10px;
    border-radius: 10px;
    &:hover{
      background:  #ff7f7f;
      color: white;
    }
  }
  .add-block{
    width: 260px;
    position: relative;
    margin: 20px auto;
    border: 1px solid lightgrey;
    padding: 20px;
    border-radius: 5px;
    &__button{
        margin: 10px;
      }
    
  }
  .add-field{
    position: relative;
    display: flow-root;
    
      &__name-span{
        position: absolute;
        top: -5px;
        left: 10px;
        font-size: 10px;
      }
      &__name-block{
        display: flex;
      }
      &__name-input{
        margin: 10px;
        border: none;
        border-bottom: 1px solid grey;
        &:focus{
          border:none;
          border-bottom: 1px solid green;
        }        
      }
      &__button{
        margin: 10px;
      }
      &__name{
        margin: 10px;
        border: none;
        border-bottom: 1px solid grey;
        float: left;
      }
      &__value{
        margin: 10px;
        border: none;
        border-bottom: 1px solid grey;
        float:left;
      }
      &__delete{
        position: absolute;
        bottom: 5px;
        right: 0px;
        padding: 5px;
      }
    }
</style>