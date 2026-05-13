<template>
  <div class="product-view">
    <div class="pv-header">
      <div>
        <h2 class="pv-title">Gestión de <span>Productos</span></h2>
        <p class="pv-sub">CRUD completo con LocalStorage</p>
      </div>
      <button class="btn-nuevo" @click="abrirModal()">+ Nuevo Producto</button>
    </div>

    <!-- Filtros -->
    <div class="filtros">
      <button
        v-for="cat in categorias"
        :key="cat.value"
        class="btn-filtro"
        :class="{ activo: categoriaActiva === cat.value }"
        @click="categoriaActiva = cat.value"
      >
        {{ cat.icono }} {{ cat.label }}
      </button>
    </div>

    <!-- Tabla -->
    <div class="table-wrapper">
      <table class="tabla-productos">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in productosFiltrados" :key="p.id">
            <td>
              <img :src="p.imagen" :alt="p.nombre" class="tabla-img" />
              <div class="img-nombre">{{ p.nombre }}</div>
            </td>
            <td class="td-nombre">{{ p.nombre }}</td>
            <td><span class="badge-cat" :class="p.categoria">{{ p.categoria }}</span></td>
            <td class="td-precio">{{ formatPrecio(p.precio) }}</td>
            <td class="td-desc">{{ p.descripcion }}</td>
            <td>
              <div class="acciones">
                <button class="btn-accion editar" @click="abrirModal(p)">✏️ Editar</button>
                <button class="btn-accion eliminar" @click="eliminar(p.id)">🗑️ Borrar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="modal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-box">
        <h3 class="modal-title">{{ editando ? 'Editar Producto' : 'Nuevo Producto' }}</h3>
        <div class="modal-form">
          <div class="mf-group">
            <label>Nombre</label>
            <input v-model="form.nombre" placeholder="Nombre del producto" />
          </div>
          <div class="mf-group">
            <label>Categoría</label>
            <select v-model="form.categoria">
              <option value="ropa">Ropa</option>
              <option value="suplementos">Suplementos</option>
              <option value="implementos">Implementos</option>
            </select>
          </div>
          <div class="mf-group">
            <label>Precio (COP)</label>
            <input v-model.number="form.precio" type="number" placeholder="0" />
          </div>
          <div class="mf-group">
            <label>URL de imagen</label>
            <input v-model="form.imagen" placeholder="https://..." />
          </div>
          <div class="mf-group full">
            <label>Descripción</label>
            <textarea v-model="form.descripcion" rows="2" placeholder="Descripción breve..."></textarea>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-cancelar" @click="cerrarModal">Cancelar</button>
          <button class="btn-guardar" @click="guardar">{{ editando ? 'Actualizar' : 'Crear' }}</button>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from '../components/FooterComponent.vue'
import { productService } from '../services/productService.js'

export default {
  name: 'ProductView',
  components: { FooterComponent },
  data() {
    return {
      productos: [],
      categoriaActiva: 'todas',
      categorias: [
        { value: 'todas', label: 'Todos', icono: '📦' },
        { value: 'ropa', label: 'Ropa', icono: '👕' },
        { value: 'suplementos', label: 'Suplementos', icono: '💊' },
        { value: 'implementos', label: 'Implementos', icono: '🥊' }
      ],
      modal: false,
      editando: null,
      form: { nombre: '', categoria: 'ropa', precio: 0, imagen: '', descripcion: '' }
    }
  },
  computed: {
    productosFiltrados() {
      if (this.categoriaActiva === 'todas') return this.productos
      return this.productos.filter(p => p.categoria === this.categoriaActiva)
    }
  },
  mounted() {
    this.productos = productService.getAll()
    const editarId = this.$route.query.editar
    if (editarId) {
      const p = productService.getById(Number(editarId))
      if (p) this.abrirModal(p)
    }
  },
  methods: {
    formatPrecio(precio) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(precio)
    },
    abrirModal(producto = null) {
      if (producto) {
        this.editando = producto.id
        this.form = { ...producto }
      } else {
        this.editando = null
        this.form = { nombre: '', categoria: 'ropa', precio: 0, imagen: '', descripcion: '' }
      }
      this.modal = true
    },
    cerrarModal() {
      this.modal = false
      this.editando = null
    },
    guardar() {
      if (!this.form.nombre || !this.form.precio) return
      if (this.editando) {
        productService.update(this.editando, this.form)
      } else {
        productService.create(this.form)
      }
      this.productos = productService.getAll()
      this.cerrarModal()
    },
    eliminar(id) {
      if (confirm('¿Estás seguro de eliminar este producto?')) {
        productService.delete(id)
        this.productos = productService.getAll()
      }
    }
  }
}
</script>

<style scoped>
.product-view { flex: 1; padding: 2rem; }
.pv-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.5rem; }
.pv-title { color: #fff; font-size: 1.5rem; font-weight: 800; margin: 0; }
.pv-title span { color: #e8ff00; }
.pv-sub { color: #666; margin: 0.2rem 0 0; font-size: 0.85rem; }
.btn-nuevo { background: #e8ff00; color: #0a0a0a; border: none; padding: 0.6rem 1.4rem; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 0.92rem; transition: all 0.2s; }
.btn-nuevo:hover { background: #fff; }
.filtros { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.btn-filtro { background: #141414; border: 1px solid #2a2a2a; color: #888; padding: 0.4rem 1rem; border-radius: 20px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
.btn-filtro.activo, .btn-filtro:hover { border-color: #e8ff00; color: #e8ff00; }
.table-wrapper { overflow-x: auto; border-radius: 10px; border: 1px solid #1e1e1e; }
.tabla-productos { width: 100%; border-collapse: collapse; }
.tabla-productos thead tr { background: #111; border-bottom: 2px solid #e8ff00; }
.tabla-productos th { padding: 0.9rem 1rem; color: #e8ff00; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; text-align: left; }
.tabla-productos tbody tr { border-bottom: 1px solid #1a1a1a; transition: background 0.15s; }
.tabla-productos tbody tr:hover { background: #131313; }
.tabla-productos td { padding: 0.75rem 1rem; color: #ccc; font-size: 0.88rem; vertical-align: middle; }
.tabla-img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; display: block; }
.img-nombre { color: #555; font-size: 0.72rem; margin-top: 3px; max-width: 80px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.td-nombre { font-weight: 600; color: #eee; max-width: 160px; }
.td-precio { color: #e8ff00; font-weight: 700; white-space: nowrap; }
.td-desc { color: #666; font-size: 0.82rem; max-width: 200px; }
.badge-cat { padding: 2px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }
.badge-cat.ropa { background: #1a2a1a; color: #4ade80; }
.badge-cat.suplementos { background: #1a1a2a; color: #60a5fa; }
.badge-cat.implementos { background: #2a1a1a; color: #f87171; }
.acciones { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.btn-accion { border: none; border-radius: 6px; padding: 0.35rem 0.7rem; font-size: 0.78rem; cursor: pointer; font-weight: 600; transition: all 0.2s; }
.btn-accion.editar { background: #1e2a1e; color: #4ade80; }
.btn-accion.editar:hover { background: #4ade80; color: #0a0a0a; }
.btn-accion.eliminar { background: #2a1e1e; color: #f87171; }
.btn-accion.eliminar:hover { background: #f87171; color: #0a0a0a; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 999; }
.modal-box { background: #141414; border: 1px solid #2a2a2a; border-radius: 14px; padding: 2rem; width: 520px; max-width: 95vw; }
.modal-title { color: #fff; font-size: 1.2rem; font-weight: 700; margin: 0 0 1.5rem; }
.modal-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.mf-group { display: flex; flex-direction: column; gap: 0.4rem; }
.mf-group.full { grid-column: 1 / -1; }
.mf-group label { color: #888; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1px; }
.mf-group input, .mf-group select, .mf-group textarea { background: #0d0d0d; border: 1px solid #2a2a2a; border-radius: 8px; padding: 0.6rem 0.9rem; color: #fff; font-size: 0.9rem; outline: none; transition: border-color 0.2s; resize: none; }
.mf-group input:focus, .mf-group select:focus, .mf-group textarea:focus { border-color: #e8ff00; }
.modal-actions { display: flex; justify-content: flex-end; gap: 0.8rem; margin-top: 1.5rem; }
.btn-cancelar { background: #1e1e1e; border: 1px solid #333; color: #888; padding: 0.6rem 1.4rem; border-radius: 8px; cursor: pointer; }
.btn-guardar { background: #e8ff00; color: #0a0a0a; border: none; padding: 0.6rem 1.4rem; border-radius: 8px; font-weight: 800; cursor: pointer; }
.btn-guardar:hover { background: #fff; }
</style>