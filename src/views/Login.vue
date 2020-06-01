<template>
  <div class="fillcontain" style="background: #2d3a4b;">
    <div class="login-container">
      <div class="title-container">
        <h3>图书推荐系统</h3>
      </div>
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-text-field dark :counter="16" label="Username" required></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            dark
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-row>
        <v-btn block color="secondary" dark>Login</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
// import { login } from "../api/index";
export default {
  data() {
    return {
      showPassword: false,
      labelPosition: "right",
      loginForm: {
        username: "",
        password: ""
      }
    };
  }
  //   methods: {
  //     submitForm(formName) {
  //       this.$refs[formName].validate(valid => {
  //         if (valid) {
  //           login(this.loginForm).then(resp => {
  //             var data = resp.data;
  //             if (data.success) {
  //               if (!this.$store.state.isLogin) {
  //                 this.$store.commit("updateLoginState");
  //               }
  //               this.$router.push("/home");
  //               this.$message({
  //                 message: "登陆成功",
  //                 type: "success"
  //               });
  //             } else {
  //               this.$message.error("登录失败，用户或密码错误");
  //             }
  //           });
  //         } else {
  //           console.log("error submit!!");
  //           return false;
  //         }
  //       });
  //     }
  //   }
};
</script>
<style scoped>
.fillcontain {
  widows: 100%;
  height: 100%;
}
.login-container {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.title-container {
  position: relative;
  font-size: 26px;
  color: #eee;
  margin: 0 auto 40px auto;
  text-align: center;
  font-weight: 700;
}
</style>⏎