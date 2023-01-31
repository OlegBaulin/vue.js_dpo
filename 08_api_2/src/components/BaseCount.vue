<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decreaseProduct">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentAmount"
      @input="$emit('update:amount', +$event.target.value)">

    <button type="button" aria-label="Добавить один товар" @click="increaseProduct">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['amount'],
  data() {
    return {
      currentAmount: this.amount,
    };
  },
  watch: {
    amount(value) {
      this.currentAmount = value;
    },
  },
  methods: {
    decreaseProduct() {
      if (this.currentAmount > 1) {
        this.currentAmount -= 1;
      }
      this.$emit('update:amount', this.currentAmount);
    },
    increaseProduct() {
      this.currentAmount += 1;
      this.$emit('update:amount', this.currentAmount);
    },
  },
};
</script>
