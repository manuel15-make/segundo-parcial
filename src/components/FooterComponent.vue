<template>
  <footer class="footer-gym">
    <div class="footer-content">
      <div class="footer-brand">
        <span>💪</span>
        <strong>GYM<span style="color:#e8ff00">SPORT</span></strong>
      </div>
      <p class="footer-text">Venta de ropa, suplementos e implementos deportivos</p>
      <p class="footer-copy">© 2024 GymSport — Todos los derechos reservados</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer-gym {
  background: #0a0a0a;
  border-top: 1px solid #222;
  padding: 1.5rem 2rem;
  text-align: center;
}
.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 0.4rem;
}
.footer-text {
  color: #666;
  font-size: 0.85rem;
  margin: 0;
}
.footer-copy {
  color: #444;
  font-size: 0.78rem;
  margin: 0.3rem 0 0;
}
</style>