<template>
  <div>
    <PreloaderSmall class="header__cart" v-show="$store.state.cartProductsLoading"/>
    <router-link v-show="!$store.state.cartProductsLoading"
      class="header__cart" aria-label="Корзина с товарами" :to="{ name: 'cart' }">
      <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">
        {{ $store.state.cartProducts.length }}
      </span>
    </router-link>
  </div>
</template>

<script>
import PreloaderSmall from './PreloaderSmall.vue';

export default {
  components: {
    PreloaderSmall,
  },
};
</script>
