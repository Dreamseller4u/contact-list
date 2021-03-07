<template>
  <div class="contact-table__item">
    <template v-if="currentTemplate === 'change'">
      <input v-if="name !== 'name'" ref="nameInput" type="text" class="contact-table__name" placeholder="name" :value="name">
      <span v-if="name === 'name'" ref="nameInput" class="contact-table__name name">{{name}} : </span>
      <input ref="valueInput" type="text" class="contact-table__value" placeholder="value" :value="value">
      <div class="contact-table__buttons">
        <button class="contact-table__button ok" @click="setCurrentTemplate('ok')">ok</button>
        <button class="contact-table__button cancel" @click="setCurrentTemplate('cancel')">No</button>
      </div>
    </template>
    <template v-else-if="currentTemplate === 'delete'">
        <span>Delete a field?</span>
      <div class="contact-table__buttons">
      <button class="contact-table__button ok" @click="onAcceptDelete" >Yes</button>
      <button class="contact-table__button cancel" @click="onCancel">No</button>
      </div>
    </template>
    <template v-else-if="currentTemplate === 'ok'">
        <span>Accept changes?</span>
        <div class="contact-table__buttons">
          <button class="contact-table__button ok" @click="onAcceptChanges" >Yes</button>
          <button class="contact-table__button cancel" @click="setCurrentTemplate('change')">No</button>
        </div>
    </template>
    <template v-else-if="currentTemplate === 'cancel'">
      <span>Cancel changes?</span>
      <div class="contact-table__buttons">
        <button class="contact-table__button ok" @click="onCancel">Yes</button>
        <button class="contact-table__button cancel" @click="setCurrentTemplate('change')" >No</button>
      </div>
    </template>
    <template v-else>
      <span class="contact-table__name">{{name}} : </span>
      <span class="contact-table__value">{{value}}</span>
      <div class="contact-table__buttons">
        <button class="contact-table__button change" :class="isName" @click="setCurrentTemplate('change')" >Edit</button>
        <button class="contact-table__button delete" v-if="name !== 'name'" @click="setCurrentTemplate('delete')" >Delete</button>
      </div>
    </template>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    name: "ContactField",
    props: {
      name: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0,
      }
    },
    data: () =>({
      currentTemplate: '',
      newName: '',
      newValue: '',
    }),
    computed: {
      isName() {
        if(this.name === 'name') {
          return 'name';
        }
      }
    },
    methods: {
      ...mapActions('contacts', ['changeField', "deleteField", "setLastAction"]),
      objLastAction(action) {
        return {
          nameAction: action,
          nameField: this.name,
          valueField: this.value,
          indexField: this.index,
        }
      },
      onAcceptChanges() {
       if((this.newName || this.name === 'name') &&
         this.newValue &&
         (this.name !== this.newName || this.value !== this.newValue)
       ) {
          this.setLastAction(this.objLastAction('change'));
          this.changeField({
            name: this.newName || this.name,
            value: this.newValue,
            index: this.index,
          });
       }
        this.newName = this.newValue = this.currentTemplate = '';
      },
      onCancel() {
        this.currentTemplate = '';
      },
      onAcceptDelete() {
        this.setLastAction(this.objLastAction('delete'));
        this.deleteField(this.index);
        this.currentTemplate = '';
      },
      setCurrentTemplate(command) {
        if(this.currentTemplate === 'change') {
          this.newName = this.$refs.nameInput.value;
          this.newValue = this.$refs.valueInput.value;
          if ((this.name === 'name' || this.name === this.newName) && this.value === this.newValue) {

            return this.newName = this.newValue = this.currentTemplate = '';
          }
        }
          this.currentTemplate = command;
      }
    }
  }
</script>

<style scoped lang="scss">
.ok{
    background: #408f00;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 14px;
    padding: 9px;
    margin-right: 20px;
}
.cancel{
  background: #FF6666;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 5px;
  position: relative;
  float: right;
  &:hover{
    background: #ff7f7f;
  }
}
.change{
    background: #e6a400;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 14px;
    padding: 9px;
    margin-right: 20px;
}
.delete{
  background: #FF6666;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 5px;
  position: relative;
  float: right;
  &:hover{
    background: #ff7f7f;
  }
    
}
.contact-table{
  
  &__name{
    text-transform: capitalize;
    margin-right: auto;
    position: absolute;
    font-size: .8rem;
    left: 0;
    top: 0;

  }
  &__item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &__value{
    margin-top: 15px;
    margin-right: 20px;
    
  }
  &__buttons{
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 3px;
  }
input{
    &.contact-table__name{
    font-size: 1rem;
    border-width: 0 0 2px 2px; 
    padding-left: 10px;
    border-radius: 5px;
    border-width: 0 0 1px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    } 
    &.contact-table__value{
    margin-top: 30px;
    font-size: 1rem;
    padding-left: 10px;
    border-radius: 5px;
    border-width: 0 0 1px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    }
  }
}
  
</style>