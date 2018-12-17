<template>
    <div id="App">
        <div id="wrapper">
            <!-- NAVBAR -->
            <Nav></Nav>
            <!-- END NAVBAR -->
            <!-- LEFT SIDEBAR -->
            <Sidebar1></Sidebar1>
            <!-- END LEFT SIDEBAR -->
            <!-- MAIN -->
            <transition name="fade">
                <router-view>
                </router-view>
            </transition>
            <!-- END MAIN -->
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Nav from './components/Nav.vue'
import Sidebar1 from './components/Sidebar1.vue'
import Footer from './components/Footer.vue'

export default {

    name: 'Vueapp',
    mounted() {
        // console.log(this.$store)
    },
    methods: {

    },
    components: {
        Nav,
        Sidebar1,
        Footer,
    }
}
</script>
<style>
.fade-enter-active,
.fade-leave-actve {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>