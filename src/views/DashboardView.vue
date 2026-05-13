<template>
  <div class="dashboard-wrapper">
    <NavbarComponent />
    <div class="dashboard-body">
      <SidebarComponent @filtrar="filtrarCategoria" />
      <main class="dashboard-main">
        <router-view v-if="$route.path !== '/dashboard'" />
        <div v-else class="dashboard-home">
          <h2 class="dash-title">Bienvenido al Panel <span>GymSport</span></h2>
          <p class="dash-sub">Gestiona tu inventario deportivo desde aquí</p>

          <div class="stats-row">
            <div class="stat-card">
              <span class="stat-icon">📦</span>
              <div>
                <p class="stat-num">{{ totalProductos }}</p>
                <p class="stat-label">Productos</p>
              </div>
            </div>
            <div class="stat-card">
              <span class="stat-icon">👕</span>
              <div>
                <p class="stat-num">{{ totalRopa }}</p>
                <p class="stat-label">Ropa</p>
              </div>
            </div>
            <div class="stat-card">
              <span class="stat-icon">💊</span>
              <div>
                <p class="stat-num">{{ totalSuplementos }}</p>
                <p class="stat-label">Suplementos</p>
              </div>
            </div>
            <div class="stat-card">
              <span class="stat-icon">🥊</span>
              <div>
                <p class="stat-num">{{ totalImplementos }}</p>
                <p class="stat-label">Implementos</p>
              </div>
            </div>
          </div>

          <h3 class="section-title">Todos los productos</h3>
          <div class="products-grid">
            <ProductCardComponent
              v-for="p in productosFiltrados"
              :key="p.id"
              :producto="p"
              @editar="irAEditar"
              @eliminar="eliminarProducto"
            />
          </div>
        </div>
        <FooterComponent />
      </main>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ProductCardComponent from '../components/ProductCardComponent.vue'
import { productService } from '../services/productService.js'

export default {
  name: 'DashboardView',
  components: { NavbarComponent, SidebarComponent, FooterComponent, ProductCardComponent },
  data() {
    return {
      productos: [],
      categoriaActiva: 'todas'
    }
  },
  computed: {
    productosFiltrados() {
      if (this.categoriaActiva === 'todas') return this.productos
      return this.productos.filter(p => p.categoria === this.categoriaActiva)
    },
    totalProductos() { return this.productos.length },
    totalRopa() { return this.productos.filter(p => p.categoria === 'ropa').length },
    totalSuplementos() { return this.productos.filter(p => p.categoria === 'suplementos').length },
    totalImplementos() { return this.productos.filter(p => p.categoria === 'implementos').length }
  },
  mounted() {
    this.productos = productService.getAll()
  },
  methods: {
    filtrarCategoria(cat) {
      this.categoriaActiva = cat
      if (this.$route.path !== '/dashboard') {
        this.$router.push('/dashboard')
      }
    },
    irAEditar(producto) {
      this.$router.push({ name: 'Productos', query: { editar: producto.id } })
    },
    eliminarProducto(id) {
      if (confirm('¿Eliminar este producto?')) {
        productService.delete(id)
        this.productos = productService.getAll()
      }
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper { display: flex; flex-direction: column; min-height: 100vh; background: #0d0d0d; }
.dashboard-body { display: flex; flex: 1; }
.dashboard-main { flex: 1; display: flex; flex-direction: column; overflow: auto; }
.dashboard-home { flex: 1; padding: 2rem; }
.dash-title { color: #fff; font-size: 1.6rem; font-weight: 800; margin: 0; }
.dash-title span { color: #e8ff00; }
.dash-sub { color: #666; margin: 0.3rem 0 2rem; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
.stat-card {
  background: #141414;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: border-color 0.2s;
}
.stat-card:hover { border-color: #e8ff00; }
.stat-icon { font-size: 2rem; }
.stat-num { color: #e8ff00; font-size: 1.6rem; font-weight: 800; margin: 0; }
.stat-label { color: #666; font-size: 0.82rem; margin: 0; }
.section-title { color: #fff; font-size: 1.1rem; font-weight: 700; margin: 0 0 1.2rem; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.2rem; }
@media (max-width: 900px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }
</style>