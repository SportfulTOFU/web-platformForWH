<template>
 
<div id="sidebar-nav" class="sidebar">
      <div class="sidebar-scroll">
        <nav>
          <ul class="nav">
         
            <li ><router-link to="/vueapp/module" class=""><i
                class="lnr lnr-code"></i> <span>项目下达</span></router-link></li>
           
            <li><router-link to="/vueapp/overview" class=""><i
                class="lnr lnr-dice"></i> <span>项目进度总览</span></router-link></li>

          </ul>
        </nav>
      </div>
    </div>
</template>

<script >

export default {
 name: 'Sidebar1',
}
</script>

<style scoped>



</style>
