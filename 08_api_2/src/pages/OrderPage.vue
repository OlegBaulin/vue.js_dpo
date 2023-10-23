<!-- eslint-disable -->
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalProduct }} {{ totalProduct | endingsFormat }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name"
              title="ФИО" placeholder="Введите ваше полное имя" />

            <BaseFormText v-model="formData.address" :error="formError.address"
              title="Адрес доставки" placeholder="Введите ваш адрес" />

            <BaseFormText v-model="formData.phone" :error="formError.phone"
              title="Телефон" placeholder="Введите ваш телефон" type="tel" />

            <BaseFormText v-model="formData.email" :error="formError.email"
              title="Email" placeholder="Введи ваш Email" type="email" />

            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу"
              placeholder="Ваши пожелания" :error="formError.comment" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                    name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <OrderList :products="products" :total-price="totalPrice" :total-product="totalProduct"/>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
            <PreloaderSmall v-show="orderLoad"/>
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import PreloaderSmall from '@/components/PreloaderSmall.vue';
import OrderList from '@/components/OrderList.vue';
import { API_BASE_URL } from '@/config';
import endingsFormat from '@/helpers/endingsFormat';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  filters: {
    endingsFormat,
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
    PreloaderSmall,
    OrderList,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoad: false,
    };
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalProduct: 'cartTotalProduct',
    }),
  },
  methods: {
    order() {
      this.orderLoad = true;
      this.formError = {};
      this.formErrorMessage = '';

      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      }).then((response) => {
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        this.orderLoad = false;
      }).catch((error) => {
        this.formError = error.response.data.error.request || {};
        this.formErrorMessage = error.response.data.error.message;
        this.orderLoad = false;
      });
    },
  },
};
</script>
