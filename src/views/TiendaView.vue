<template>
  <div class="tienda-page">
    <!-- Header -->
    <header class="tienda-header">
      <div class="header-brand">
        <span>💪</span>
        <span class="brand-text">GYM<span class="brand-accent">SPORT</span></span>
      </div>
      <div class="header-actions">
        <span class="header-user">Hola, {{ nombreUsuario }} 👋</span>
        <button class="btn-salir" @click="cerrarSesion">⏻ Salir</button>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">TODO LO QUE<br/>NECESITAS PARA<br/><span>ENTRENAR</span></h1>
        <p class="hero-sub">Ropa, suplementos e implementos deportivos de alta calidad</p>
        <button class="btn-hero" @click="scrollProductos">Ver productos</button>
      </div>
    </section>

    <!-- Filtros -->
    <section class="tienda-body" ref="productos">
      <div class="filtros-row">
        <button
          v-for="cat in categorias"
          :key="cat.value"
          class="btn-cat"
          :class="{ activo: categoriaActiva === cat.value }"
          @click="categoriaActiva = cat.value"
        >
          {{ cat.icono }} {{ cat.label }}
        </button>
      </div>

      <!-- Grid de productos -->
      <div class="tienda-grid">
        <div
          v-for="p in productosFiltrados"
          :key="p.id"
          class="tienda-card"
        >
          <div class="tienda-card-img">
            <img :src="p.imagen" :alt="p.nombre" />
            <span class="tienda-badge">{{ p.categoria }}</span>
          </div>
          <div class="tienda-card-body">
            <p class="tienda-card-nombre">{{ p.nombre }}</p>
            <p class="tienda-card-desc">{{ p.descripcion }}</p>
            <div class="tienda-card-footer">
              <span class="tienda-precio">{{ formatPrecio(p.precio) }}</span>
              <button class="btn-agregar" @click="agregar(p)">🛒 Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Carrito flotante -->
    <div class="carrito-flotante" @click="toggleCarrito">
      🛒 <span class="carrito-count">{{ totalItems }}</span>
    </div>

    <!-- Panel carrito -->
    <div v-if="carritoAbierto" class="carrito-panel">
      <div class="carrito-header">
        <h3>Tu carrito</h3>
        <button @click="carritoAbierto = false">✕</button>
      </div>
      <div v-if="carrito.length === 0" class="carrito-vacio">
        Tu carrito está vacío
      </div>
      <div v-else>
        <div v-for="item in carrito" :key="item.id" class="carrito-item">
          <img :src="item.imagen" :alt="item.nombre" />
          <div class="carrito-item-info">
            <p class="carrito-item-nombre">{{ item.nombre }}</p>
            <p class="carrito-item-precio">{{ formatPrecio(item.precio) }}</p>
          </div>
          <div class="carrito-item-qty">
            <button @click="cambiarCantidad(item, -1)">−</button>
            <span>{{ item.cantidad }}</span>
            <button @click="cambiarCantidad(item, 1)">+</button>
          </div>
        </div>
        <div class="carrito-total">
          <span>Total:</span>
          <span class="total-precio">{{ formatPrecio(totalPrecio) }}</span>
        </div>
        <button class="btn-comprar">Finalizar compra</button>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from '../components/FooterComponent.vue'
import { productService } from '../services/productService.js'

export default {
  name: 'TiendaView',
  components: { FooterComponent },
  data() {
    return {
      productos: [],
      categoriaActiva: 'todas',
      carrito: [],
      carritoAbierto: false,
      categorias: [
        { value: 'todas', label: 'Todos', icono: '📦' },
        { value: 'ropa', label: 'Ropa', icono: '👕' },
        { value: 'suplementos', label: 'Suplementos', icono: '💊' },
        { value: 'implementos', label: 'Implementos', icono: '🥊' }
      ]
    }
  },
  computed: {
    nombreUsuario() {
      const u = localStorage.getItem('usuarioGym')
      return u ? JSON.parse(u).nombre : 'Cliente'
    },
    productosFiltrados() {
      if (this.categoriaActiva === 'todas') return this.productos
      return this.productos.filter(p => p.categoria === this.categoriaActiva)
    },
    totalItems() {
      return this.carrito.reduce((acc, item) => acc + item.cantidad, 0)
    },
    totalPrecio() {
      return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    }
  },
  mounted() {
    const u = localStorage.getItem('usuarioGym')
    if (!u || JSON.parse(u).rol !== 'cliente') {
      this.$router.push('/login')
      return
    }
    this.productos = productService.getAll()
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('usuarioGym')
      this.$router.push('/login')
    },
    scrollProductos() {
      this.$refs.productos.scrollIntoView({ behavior: 'smooth' })
    },
    agregar(producto) {
      const existente = this.carrito.find(i => i.id === producto.id)
      if (existente) {
        existente.cantidad++
      } else {
        this.carrito.push({ ...producto, cantidad: 1 })
      }
      this.carritoAbierto = true
    },
    cambiarCantidad(item, delta) {
      item.cantidad += delta
      if (item.cantidad <= 0) {
        this.carrito = this.carrito.filter(i => i.id !== item.id)
      }
    },
    toggleCarrito() {
      this.carritoAbierto = !this.carritoAbierto
    },
    formatPrecio(precio) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency', currency: 'COP', minimumFractionDigits: 0
      }).format(precio)
    }
  }
}
</script>

<style scoped>
.tienda-page { background: #0d0d0d; min-height: 100vh; }
.tienda-header {
  background: #0a0a0a;
  border-bottom: 2px solid #e8ff00;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-brand { display: flex; align-items: center; gap: 0.5rem; font-size: 1.5rem; }
.brand-text { font-family: 'Arial Black', sans-serif; font-weight: 900; color: #fff; letter-spacing: 3px; }
.brand-accent { color: #e8ff00; }
.header-actions { display: flex; align-items: center; gap: 1rem; }
.header-user { color: #aaa; font-size: 0.9rem; }
.btn-salir { background: transparent; border: 1px solid #e8ff00; color: #e8ff00; padding: 0.3rem 1rem; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
.btn-salir:hover { background: #e8ff00; color: #0a0a0a; font-weight: 700; }

.hero {
  background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80') center/cover;
  position: relative;
  height: 480px;
  display: flex;
  align-items: center;
}
.hero::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.75); }
.hero-content { position: relative; padding: 0 4rem; }
.hero-title { font-family: 'Arial Black', sans-serif; font-size: 3.5rem; font-weight: 900; color: #fff; line-height: 1.05; margin: 0 0 1rem; }
.hero-title span { color: #e8ff00; }
.hero-sub { color: #ccc; font-size: 1rem; margin: 0 0 2rem; }
.btn-hero { background: #e8ff00; color: #0a0a0a; border: none; padding: 0.8rem 2rem; border-radius: 8px; font-weight: 900; font-size: 1rem; cursor: pointer; letter-spacing: 1px; transition: all 0.2s; }
.btn-hero:hover { background: #fff; transform: translateY(-2px); }

.tienda-body { padding: 2rem; }
.filtros-row { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
.btn-cat { background: #141414; border: 1px solid #2a2a2a; color: #888; padding: 0.5rem 1.2rem; border-radius: 20px; cursor: pointer; font-size: 0.88rem; transition: all 0.2s; }
.btn-cat.activo, .btn-cat:hover { border-color: #e8ff00; color: #e8ff00; }

.tienda-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
.tienda-card { background: #141414; border: 1px solid #1e1e1e; border-radius: 12px; overflow: hidden; transition: transform 0.2s, border-color 0.2s; }
.tienda-card:hover { transform: translateY(-5px); border-color: #e8ff00; }
.tienda-card-img { position: relative; height: 200px; overflow: hidden; }
.tienda-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.tienda-card:hover .tienda-card-img img { transform: scale(1.06); }
.tienda-badge { position: absolute; top: 10px; left: 10px; background: #e8ff00; color: #0a0a0a; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 20px; }
.tienda-card-body { padding: 1rem; }
.tienda-card-nombre { color: #fff; font-weight: 700; font-size: 0.95rem; margin: 0 0 0.3rem; }
.tienda-card-desc { color: #777; font-size: 0.8rem; margin: 0 0 1rem; line-height: 1.4; }
.tienda-card-footer { display: flex; align-items: center; justify-content: space-between; }
.tienda-precio { color: #e8ff00; font-weight: 800; font-size: 1.05rem; }
.btn-agregar { background: #e8ff00; color: #0a0a0a; border: none; padding: 0.4rem 0.9rem; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; }
.btn-agregar:hover { background: #fff; }

.carrito-flotante { position: fixed; bottom: 2rem; right: 2rem; background: #e8ff00; color: #0a0a0a; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; cursor: pointer; box-shadow: 0 4px 20px rgba(232,255,0,0.4); z-index: 200; transition: transform 0.2s; }
.carrito-flotante:hover { transform: scale(1.1); }
.carrito-count { position: absolute; top: -4px; right: -4px; background: #ff4444; color: #fff; font-size: 0.7rem; font-weight: 700; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

.carrito-panel { position: fixed; right: 0; top: 0; bottom: 0; width: 360px; background: #111; border-left: 1px solid #222; z-index: 300; padding: 1.5rem; overflow-y: auto; box-shadow: -4px 0 30px rgba(0,0,0,0.5); }
.carrito-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.carrito-header h3 { color: #fff; font-size: 1.1rem; margin: 0; }
.carrito-header button { background: #1e1e1e; border: 1px solid #333; color: #aaa; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 0.9rem; }
.carrito-vacio { color: #555; text-align: center; padding: 3rem 0; }
.carrito-item { display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem 0; border-bottom: 1px solid #1e1e1e; }
.carrito-item img { width: 52px; height: 52px; object-fit: cover; border-radius: 8px; }
.carrito-item-info { flex: 1; }
.carrito-item-nombre { color: #eee; font-size: 0.85rem; margin: 0; font-weight: 600; }
.carrito-item-precio { color: #e8ff00; font-size: 0.82rem; margin: 0; }
.carrito-item-qty { display: flex; align-items: center; gap: 0.5rem; }
.carrito-item-qty button { background: #1e1e1e; border: 1px solid #333; color: #fff; width: 26px; height: 26px; border-radius: 4px; cursor: pointer; font-size: 1rem; }
.carrito-item-qty span { color: #fff; font-size: 0.9rem; min-width: 20px; text-align: center; }
.carrito-total { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; color: #aaa; font-size: 0.9rem; }
.total-precio { color: #e8ff00; font-size: 1.1rem; font-weight: 800; }
.btn-comprar { width: 100%; background: #e8ff00; color: #0a0a0a; border: none; padding: 0.85rem; border-radius: 8px; font-weight: 900; font-size: 1rem; cursor: pointer; margin-top: 0.5rem; transition: all 0.2s; }
.btn-comprar:hover { background: #fff; }
</style>