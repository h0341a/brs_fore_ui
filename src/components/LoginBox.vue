<template>
  <div>
    <v-card>
      <v-card-title>
        <span v-if="showLoginForm" class="headline">登录面板</span>
        <span v-else class="headline">注册面板</span>
        <v-divider></v-divider>
        <v-btn v-if="showLoginForm" color="blue darken-1" text @click="gotoAnotherPannel">前往注册面板</v-btn>
        <v-btn v-else color="blue darken-1" text @click="gotoAnotherPannel">前往登录面板</v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-if="showLoginForm" ref="form" lazy-validation>
            <v-row>
              <v-text-field
                v-model="loginForm.username"
                :rules="loginFormRules.usernameRules"
                :counter="16"
                label="用户名/邮箱"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="loginForm.password"
                :rules="loginFormRules.passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-1"
                label="密码"
                :counter="16"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-btn @click="submitLoginForm" block color="secondary">登录</v-btn>
            </v-row>
          </v-form>
          <v-form v-else ref="form" lazy-validation>
            <v-text-field
              v-model="registerUsername"
              :rules="registerFormRules.usernameRules"
              :counter="32"
              label="用户名*"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.nickname"
              :rules="registerFormRules.nicknameRules"
              label="昵称"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.email"
              :rules="registerFormRules.emailRules"
              label="邮箱*"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.password"
              :rules="registerFormRules.passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="密码*"
              :counter="16"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="registerForm.repeatPasssword"
              :rules="registerFormRules.repeatPassswordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="重复密码*"
              :counter="16"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn @click="submitRegisterForm" block color="secondary">注册</v-btn>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.status" :timeout="4000" :top="true">
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { usernameIsSave, userRegister, userLogin } from "../api/index";
export default {
  data() {
    return {
      snackbar: {
        visible: false,
        text: "",
        status: ""
      },
      showLoginForm: true,
      showPassword: false,
      nameIsSave: false,
      loginForm: {
        username: "user2",
        password: "user"
      },
      loginFormRules: {
        usernameRules: [v => !!v || "名字不能为空"],
        passwordRules: [
          v => !!v || "密码不能为空",
          v => (v && v.length <= 16) || "密码不能超过16个字符"
        ]
      },
      //从registerForm提取到外部使其能应用于watch
      registerUsername: "",
      registerForm: {
        nickname: "",
        email: "",
        password: "",
        repeatPasssword: ""
      },
      registerFormRules: {
        usernameRules: [
          v => !!v || "用户名不能为空",
          v => (v && v.length <= 32) || "用户名不能超过32个字符",
          v => (v && v.length >= 4) || "用户名不能少于4个字符",
          v => (v && !this.nameIsSave) || "用户名已存在"
        ],
        nicknameRules: [],
        emailRules: [
          v => !!v || "邮箱不能为空",
          v => /.+@.+\..+/.test(v) || "邮箱格式不正确"
        ],
        passwordRules: [
          v => !!v || "密码不能为空",
          v => (v && v.length <= 16) || "密码不能超过16个字符"
        ],
        repeatPassswordRules: [
          v => (v && v == this.registerForm.password) || "两次输入的密码不匹配"
        ]
      }
    };
  },
  watch: {
    registerUsername(val) {
      this.nameIsSave = false;
      if (val.length >= 4 && val.length <= 32)
        usernameIsSave({ username: val }).then(resp => {
          if (resp.data.success) {
            this.nameIsSave = true;
            this.$refs.form.resetValidation();
          }
        });
    }
  },
  methods: {
    submitLoginForm() {
      if (this.$refs.form.validate()) {
        userLogin(this.loginForm).then(resp => {
          if (resp.data.success) {
            this.snackbar.text = "登录成功";
            this.showPassword = false;
            this.showLoginForm = true;
            this.snackbar.status = "success";
            this.snackbar.visible = true;
            this.$store.commit("updateShowFormState");
            this.$store.commit("updateLoginState");
            this.$emit("loginSuccess");
          } else {
            this.snackbar.text = "登录失败,账号密码不匹配";
            this.snackbar.status = "error";
            this.snackbar.visible = true;
          }
        });
      }
    },
    submitRegisterForm() {
      this.registerForm["username"] = this.registerUsername;
      if (this.registerForm["nickname"] === "") {
        this.registerForm["nickname"] = this.registerUsername;
      }
      if (this.$refs.form.validate()) {
        userRegister(this.registerForm).then(resp => {
          if (resp.data.success) {
            this.loginForm.username = this.registerUsername;
            this.snackbar.text = "注册成功，已前往登陆";
            this.showPassword = false;
            this.showLoginForm = true;
            this.snackbar.status = "success";
            this.snackbar.visible = true;
            this.loginForm.username = "";
            this.loginForm.password = "";
          } else {
            this.snackbar.text = "注册失败，原因为:" + resp.data.errMsg;
            this.snackbar.status = "error";
            this.snackbar.visible = true;
          }
        });
      }
    },
    gotoAnotherPannel() {
      this.showLoginForm = !this.showLoginForm;
      this.showPassword = false;
    }
  }
};
</script>

<style>
</style>