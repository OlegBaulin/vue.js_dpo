<template>
  <li class="catalog__item">
    <router-link class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" :alt="product.title">
  </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} &#8381;
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="colouring in product.colors" :key="colouring">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="colouring"
            v-model="color">
          <span class="colors__value" :style="{ backgroundColor: colouring, }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
  props: ['product'],
};
</script>
