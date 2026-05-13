<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link to="/dashboard" exact class="nav-item" active-class="active">
        <span class="nav-icon">🏠</span>
        <span>Inicio</span>
      </router-link>
      <router-link to="/dashboard/productos" class="nav-item" active-class="active">
        <span class="nav-icon">🏋️</span>
        <span>Productos</span>
      </router-link>
      <div class="nav-section-title">Categorías</div>
      <a class="nav-item sub" @click="$emit('filtrar', 'ropa')">
        <span class="nav-icon">👕</span>
        <span>Ropa</span>
      </a>
      <a class="nav-item sub" @click="$emit('filtrar', 'suplementos')">
        <span class="nav-icon">💊</span>
        <span>Suplementos</span>
      </a>
      <a class="nav-item sub" @click="$emit('filtrar', 'implementos')">
        <span class="nav-icon">🥊</span>
        <span>Implementos</span>
      </a>
    </nav>
    <div class="sidebar-footer-text">GymSport © 2024</div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarComponent',
  emits: ['filtrar']
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-height: calc(100vh - 64px);
  background: #111;
  border-right: 1px solid #222;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 0 1rem;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.nav-section-title {
  color: #555;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 1rem 1.5rem 0.3rem;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1.5rem;
  color: #aaa;
  text-decoration: none;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}
.nav-item:hover, .nav-item.active {
  color: #e8ff00;
  background: #1a1a1a;
  border-left-color: #e8ff00;
}
.nav-item.sub {
  padding-left: 2.5rem;
  font-size: 0.88rem;
}
.nav-icon {
  font-size: 1.1rem;
}
.sidebar-footer-text {
  color: #333;
  font-size: 0.75rem;
  text-align: center;
  padding: 1rem;
}
</style>