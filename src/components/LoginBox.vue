<template>
  <v-card>
    <v-card-title>
      <span v-if="showLoginForm" class="headline">登录面板</span>
      <span v-else class="headline">注册面板</span>
      <v-divider></v-divider>
      <v-btn
        v-if="showLoginForm"
        color="blue darken-1"
        text
        @click="showLoginForm = !showLoginForm"
      >前往注册面板</v-btn>
      <v-btn v-else color="blue darken-1" text @click="showLoginForm = !lshowLoginForm">前往登录面板</v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-if="showLoginForm" ref="form" lazy-validation>
          <v-row>
            <v-text-field
              v-model="loginForm.username"
              :rules="loginForm.usernameRules"
              :counter="16"
              label="用户名/邮箱"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="loginForm.password"
              :rules="loginForm.passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="密码"
              :counter="16"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn block color="secondary">登录</v-btn>
          </v-row>
        </v-form>
        <v-form v-else ref="form" lazy-validation>
          <v-text-field
            v-model="registerForm.username"
            :rules="registerForm.usernameRules"
            :counter="32"
            label="用户名"
            required
          ></v-text-field>
          <v-text-field
            v-model="registerForm.nickname"
            :rules="registerForm.nicknameRules"
            label="昵称"
            required
          ></v-text-field>
          <v-text-field
            v-model="registerForm.email"
            :rules="registerForm.emailRules"
            :counter="16"
            label="邮箱"
            required
          ></v-text-field>
          <v-text-field
            v-model="registerForm.password"
            :rules="registerForm.passwordRules"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="密码"
            :counter="16"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            v-model="registerForm.repeatPasssword"
            :rules="registerForm.repeatPassswordRules"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="重复密码"
            :counter="16"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn block color="secondary">注册</v-btn>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showLoginForm: true,
      showPassword: false,
      loginForm: {
        username: "",
        password: "",
        usernameRules: [v => !!v || "名字不能为空"],
        passwordRules: [
          v => !!v || "密码不能为空",
          v => (v && v.length <= 16) || "密码不能超过16个字符"
        ]
      },
      registerForm: {
        username: "",
        nickname: "",
        email: "",
        password: "",
        repeatPasssword: "",
        usernameRules: [
          v => !!v || "用户名不能为空",
          v => (v && v.length <= 32) || "用户名不能超过32个字符",
          v => (v && v.length >= 4) || "用户名不能少于4个字符"
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
  }
};
</script>

<style>
</style>