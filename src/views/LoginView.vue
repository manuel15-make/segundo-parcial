<template>
  <div class="login-page">
    <div class="login-left">
      <div class="login-overlay">
        <h1 class="login-hero-title">ENTRENA.<br/>COMPRA.<br/>SUPÉRATE.</h1>
        <p class="login-hero-sub">Tu tienda de implementos, suplementos y ropa deportiva</p>
      </div>
    </div>
    <div class="login-right">
      <div class="login-box">
        <div class="login-logo">
          <span>💪</span>
          <span class="logo-text">GYM<span class="logo-accent">SPORT</span></span>
        </div>
        <h2 class="login-title">Iniciar Sesión</h2>
        <p class="login-subtitle">Panel de administración</p>

        <div v-if="error" class="alert-error">
          ⚠️ {{ error }}
        </div>

        <div class="form-group">
          <label>Usuario</label>
          <input
            v-model="form.usuario"
            type="text"
            placeholder="Ingresa tu usuario"
            @keyup.enter="login"
          />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Ingresa tu contraseña"
            @keyup.enter="login"
          />
        </div>

        <button class="btn-login" @click="login" :disabled="cargando">
          {{ cargando ? 'Verificando...' : 'INGRESAR' }}
        </button>

        <p class="login-hint">
          <small>Demo: usuario <strong>admin</strong> / contraseña <strong>1234</strong></small>
        </p>
        <p class="login-disclaimer">
          <small>⚠️ Esta validación es solo educativa y no representa un sistema de autenticación real.</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import usuarios from '../data/usuarios.json'

export default {
  name: 'LoginView',
  data() {
    return {
      form: { usuario: '', password: '' },
      error: '',
      cargando: false
    }
  },
  methods: {
    login() {
      this.error = ''
      if (!this.form.usuario || !this.form.password) {
        this.error = 'Por favor completa todos los campos.'
        return
      }
      this.cargando = true
      setTimeout(() => {
        const encontrado = usuarios.find(
          u => u.usuario === this.form.usuario && u.password === this.form.password
        )
        if (encontrado) {
          localStorage.setItem('usuarioGym', JSON.stringify(encontrado))
          this.$router.push('/dashboard')
        } else {
          this.error = 'Usuario o contraseña incorrectos.'
        }
        this.cargando = false
      }, 600)
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
}
.login-left {
  flex: 1;
  background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80') center/cover;
  position: relative;
}
.login-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3rem;
}
.login-hero-title {
  font-family: 'Black Han Sans', 'Arial Black', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: #e8ff00;
  line-height: 1.05;
  letter-spacing: 2px;
}
.login-hero-sub {
  color: #ccc;
  font-size: 1rem;
  margin-top: 1rem;
  max-width: 320px;
}
.login-right {
  width: 420px;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.login-box {
  width: 100%;
}
.login-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.8rem;
  margin-bottom: 2rem;
}
.logo-text {
  font-family: 'Black Han Sans', 'Arial Black', sans-serif;
  font-weight: 900;
  color: #fff;
  letter-spacing: 3px;
}
.logo-accent { color: #e8ff00; }
.login-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}
.login-subtitle {
  color: #666;
  font-size: 0.9rem;
  margin: 0.3rem 0 1.5rem;
}
.alert-error {
  background: #1a0000;
  border: 1px solid #ff4444;
  color: #ff8080;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1.2rem;
}
.form-group label {
  display: block;
  color: #888;
  font-size: 0.82rem;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.form-group input {
  width: 100%;
  background: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.form-group input:focus {
  border-color: #e8ff00;
}
.btn-login {
  width: 100%;
  background: #e8ff00;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  padding: 0.85rem;
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.2s;
}
.btn-login:hover:not(:disabled) {
  background: #fff;
  transform: translateY(-1px);
}
.btn-login:disabled { opacity: 0.6; cursor: not-allowed; }
.login-hint {
  text-align: center;
  color: #555;
  margin-top: 1.2rem;
}
.login-hint strong { color: #e8ff00; }
.login-disclaimer {
  text-align: center;
  color: #444;
  margin-top: 0.5rem;
  font-size: 0.78rem;
}
@media (max-width: 768px) {
  .login-left { display: none; }
  .login-right { width: 100%; }
}
</style>