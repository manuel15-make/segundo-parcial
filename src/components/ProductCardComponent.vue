<template>
  <div class="product-card">
    <div class="card-img-wrapper">
      <img :src="producto.imagen" :alt="producto.nombre" class="card-img" />
      <span class="categoria-badge">{{ producto.categoria }}</span>
    </div>
    <div class="card-body">
      <h6 class="card-title">{{ producto.nombre }}</h6>
      <p class="card-desc">{{ producto.descripcion }}</p>
      <div class="card-footer-row">
        <span class="card-price">{{ formatPrecio(producto.precio) }}</span>
        <div class="card-actions">
          <button class="btn-edit" @click="$emit('editar', producto)">✏️</button>
          <button class="btn-delete" @click="$emit('eliminar', producto.id)">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  emits: ['editar', 'eliminar'],
  methods: {
    formatPrecio(precio) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(precio)
    }
  }
}
</script>

<style scoped>
.product-card {
  background: #141414;
  border: 1px solid #222;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s, border-color 0.2s;
}
.product-card:hover {
  transform: translateY(-4px);
  border-color: #e8ff00;
}
.card-img-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.product-card:hover .card-img {
  transform: scale(1.05);
}
.categoria-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e8ff00;
  color: #0a0a0a;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 1px;
}
.card-body {
  padding: 1rem;
}
.card-title {
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  margin: 0 0 0.3rem;
}
.card-desc {
  color: #777;
  font-size: 0.8rem;
  margin: 0 0 0.75rem;
  line-height: 1.4;
}
.card-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-price {
  color: #e8ff00;
  font-weight: 800;
  font-size: 1rem;
}
.card-actions {
  display: flex;
  gap: 0.4rem;
}
.btn-edit, .btn-delete {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.btn-edit:hover { border-color: #e8ff00; }
.btn-delete:hover { border-color: #ff4444; }
</style>