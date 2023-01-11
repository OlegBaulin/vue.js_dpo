<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} &#8381;
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
      <!-- <li class="colors__item">
        <label class="colors__label" for="color-2">
          <input class="colors__radio sr-only" type="radio" value="#8BE000"
            v-model="color">
          <span class="colors__value" style="background-color: #8BE000;">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label" for="color-3">
          <input class="colors__radio sr-only" type="radio" value="#222"
            v-model="color">
          <span class="colors__value" style="background-color: #222;">
          </span>
        </label>
      </li> -->
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  props: ['product'],
};
</script>
