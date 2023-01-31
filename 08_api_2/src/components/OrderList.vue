<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order" v-for="product in products" :key="product.productId">
        <h3>{{ product.product.title }}</h3>
        <b>{{ product.product.price | numberFormat}}</b>
        <span>Артикул: {{ product.productId }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ totalProduct }}</b> {{ totalProduct | endingsFormat }} на сумму <b>{{ totalPrice | numberFormat}}</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import endingsFormat from '@/helpers/endingsFormat';

export default {
  props: ['products', 'totalProduct', 'totalPrice'],
  filters: {
    numberFormat,
    endingsFormat,
  },
};
</script>
