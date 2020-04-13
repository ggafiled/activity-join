<template>
  <div class="container-fluid login-clean">
    <form @submit.prevent="login">
      <h2 class="sr-only">Login Form</h2>
      <div class="illustration">
        <a href="/login" class="navbar-brand justify-content-center">
          <img src="../assets/navbar.png" height="48" alt="CoolBrand" />
        </a>
      </div>
      <v-text-field solo type="text" v-model="u_email"
        placeholder="Username" autofocus />
      <v-text-field solo type="password" v-model="u_pwd"
        placeholder="Password" />
      <button class="btn btn-primary btn-block" type="submit">Log In</button>

      <a href="#" class="forgot p-3">Forgot your email or password?</a>
    </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        u_email: "",
        u_pwd: ""
      };
    },
    computed: {
      getUser() {
        return this.$store.getters.userInformation.u_name
      }
    },
    methods: {
      login: function () {
        let u_email = this.u_email;
        let u_pwd = this.u_pwd;
        this.$store
          .dispatch("login", {
            u_email,
            u_pwd
          })
          .then(() => this.$router.push({ name: 'Home', params: { username: getUser() }}))
          .catch(err => console.log(err));
      }
    },
    created() {
      if (this.$store.getters.isLoggedIn) {
        this.$router.push({ name: 'Home', params: { username: getUser() }})
      }
    }
  };

</script>
<style lang="css" scoped>
  .login-clean {
    width: 100vw;
    height: 100vh;
    background: white;
    padding: 80px 0;
  }

  .login-clean form {
    max-width: 380px;
    width: 90%;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 4px;
    color: #aaaaaa;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  }

  .login-clean .illustration {
    text-align: center;
    padding: 0 0 20px;
    font-size: 18px;
    color: rgb(244, 71, 107);
  }

  .login-clean form .form-control {
    background: #f7f9fc;
    border: none;
    border-bottom: 1px solid #dfe7f1;
    border-radius: 0;
    font-size: smaller;
    box-shadow: none;
    outline: none;
    color: #aaaaaa;
    text-indent: 8px;
    height: 42px;
  }

  .login-clean form .btn-primary {
    background: #ff4500;
    border: none;
    border-radius: 4px;
    padding: 11px;
    box-shadow: none;
    margin-top: 26px;
    text-shadow: none;
    outline: none !important;
  }

  .login-clean form .btn-primary:hover,
  .login-clean form .btn-primary:active {
    background: #eb3b60;
  }

  .login-clean form .btn-primary:active {
    transform: translateY(1px);
  }

  .login-clean form .forgot {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #6f7a85;
    opacity: 0.9;
    text-decoration: none;
  }

  .login-clean form .forgot:hover,
  .login-clean form .forgot:active {
    opacity: 1;
    text-decoration: none;
  }

</style>
