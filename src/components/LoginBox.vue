<template>
  <v-card>
    <v-card-title>
      <span v-if="loginForm" class="headline">Login Pannel</span>
      <span v-else class="headline">Register Pannel</span>
      <v-divider></v-divider>
      <v-btn v-if="loginForm" color="blue darken-1" text @click="loginForm = !loginForm">Go to register</v-btn>
      <v-btn v-else color="blue darken-1" text @click="loginForm = !loginForm">Go to Login</v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-if="loginForm" ref="form" lazy-validation>
          <v-row>
            <v-text-field :counter="16" label="Username" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn block color="secondary">Login</v-btn>
          </v-row>
        </v-form>
        <v-form v-else ref="form" lazy-validation>
          <v-text-field :counter="16" label="Username" required></v-text-field>
          <v-text-field :counter="16" label="Nickname" required></v-text-field>
          <v-text-field :counter="16" label="Email" required></v-text-field>
          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Repeat Password"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn block color="secondary">register</v-btn>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      loginForm: true
    };
  }
};
</script>

<style>
</style>