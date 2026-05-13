<template>
  <nav class="navbar-gym">
    <div class="navbar-brand">
      <span class="brand-icon">💪</span>
      <span class="brand-name">GYM<span class="brand-accent">SPORT</span></span>
    </div>
    <div class="navbar-user">
      <span class="user-greeting">Hola, {{ nombreUsuario }}</span>
      <button class="btn-logout" @click="cerrarSesion">
        <span>⏻</span> Salir
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  computed: {
    nombreUsuario() {
      const u = localStorage.getItem('usuarioGym')
      return u ? JSON.parse(u).nombre : 'Usuario'
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('usuarioGym')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar-gym {
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
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.brand-icon {
  font-size: 1.6rem;
}
.brand-name {
  font-family: 'Black Han Sans', 'Arial Black', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 2px;
}
.brand-accent {
  color: #e8ff00;
}
.navbar-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.user-greeting {
  color: #aaa;
  font-size: 0.9rem;
}
.btn-logout {
  background: transparent;
  border: 1px solid #e8ff00;
  color: #e8ff00;
  padding: 0.3rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.btn-logout:hover {
  background: #e8ff00;
  color: #0a0a0a;
  font-weight: 700;
}
</style>