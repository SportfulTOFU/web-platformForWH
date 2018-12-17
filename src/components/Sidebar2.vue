<template>
 
<div id="sidebar-nav" class="sidebar">
      <div class="sidebar-scroll">
        <nav>
          <ul class="nav">
         
          
                <li><router-link to="/leadapp/unload1" class=""><i class="lnr lnr-home"></i>
                <span>任务下载</span></router-link></li>
         
          
            <li><router-link to="/leadapp/task" class=""><i
                class="lnr lnr-pie-chart"></i> <span>任务分配</span></router-link></li>
            <li><router-link to="/leadapp/overview" class=""><i
                class="lnr lnr-dice"></i> <span>项目总览</span></router-link></li>

          </ul>
        </nav>
      </div>
    </div>
</template>

<script >

export default {
 name: 'Sidebar2',
}
</script>

<style scoped>



</style>
