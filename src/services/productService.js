import productosJSON from '../data/products.json'

const STORAGE_KEY = 'gymsport_productos'

export const productService = {
  // Inicializa LocalStorage con el JSON si está vacío
  init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productosJSON))
    }
  },

  getAll() {
    this.init()
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  },

  getById(id) {
    return this.getAll().find(p => p.id === id)
  },

  create(producto) {
    const productos = this.getAll()
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1
    const nuevo = { ...producto, id: nuevoId }
    productos.push(nuevo)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
    return nuevo
  },

  update(id, datos) {
    const productos = this.getAll()
    const index = productos.findIndex(p => p.id === id)
    if (index !== -1) {
      productos[index] = { ...productos[index], ...datos }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
      return productos[index]
    }
    return null
  },

  delete(id) {
    const productos = this.getAll().filter(p => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
  },

  getByCategoria(categoria) {
    return this.getAll().filter(p => p.categoria === categoria)
  }
}