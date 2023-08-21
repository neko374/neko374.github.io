<template>
  <div>
    <Header></Header>
    <swiper
      :modules="modules"
      :pagination="{ clickable: true }"
      :autoplay="true"
    >
      <swiper-slide><img src="../assets/index/banner_03.jpg" /></swiper-slide>
      <swiper-slide><img src="../assets/index/banner_02.png" /></swiper-slide>
      <swiper-slide><img src="../assets/index/banner_04.jpg" /></swiper-slide>
    </swiper>
  </div>
</template>

<script>
import Header from "../components/header/header.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default {
  components: {
    Header,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
}
</style>