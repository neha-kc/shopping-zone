<template>
  <form class="container">
    <div class="form-group">
      <label for="exampleInputEmail1">Username</label>
      <input
        type="text"
        class="form-control"
        id="InputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter Username (Must contain '@')"
        required
        v-model="userName"
      />
      <div id="emailHelp" class="form-text">Make sure you add a '@'.</div>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="InputPassword1"
        placeholder="Password"
        required
        v-model="password"
        @input="validation()"
      />
      <ul>
        <li :class="lengthContraint">8 Characters</li>
        <li :class="capitalLetter">Capital letter[A-Z]</li>
        <li :class="smallLetter">Small letter[a-z]</li>
        <li :class="digits">Digits [0-9]</li>
      </ul>
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="validation()"
      @click="handleSubmit()"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import router from "../route";
import User from "../domain/types/User";

export default defineComponent({
  name: "SignUp",
  setup() {
    const userState = reactive<User>({ userName: "", password: "" });
    const validateClassName = reactive({
      lengthContraint: "text-danger",
      capitalLetter: "text-danger",
      smallLetter: "text-danger",
      digits: "text-danger",
    });

    function validation(): boolean {
      var minMaxLength = /^[\s\S]{8,32}$/,
        upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/;

      validateClassName.lengthContraint = minMaxLength.test(userState.password)
        ? "fw-bold text-success"
        : "text-danger";

      validateClassName.capitalLetter = upper.test(userState.password)
        ? "fw-bold text-success"
        : "text-danger";

      validateClassName.smallLetter = lower.test(userState.password)
        ? "fw-bold text-success"
        : "text-danger";

      validateClassName.digits = number.test(userState.password)
        ? "fw-bold text-success"
        : "text-danger";

      if (userState.userName.includes("@") && userState.userName.length != 0) {
        var emailvalidation = true;
      } else {
        emailvalidation = false;
      }
      if (
        minMaxLength.test(userState.password) &&
        upper.test(userState.password) &&
        lower.test(userState.password) &&
        number.test(userState.password) &&
        emailvalidation
      ) {
        return false;
      } else return true;
    }

    function handleSubmit() {
      localStorage.setItem("user", JSON.stringify(userState));
      router.push({ name: "LogIn" });
    }
    return {
      handleSubmit,
      validation,
      ...toRefs(userState),
      ...toRefs(validateClassName),
    };
  },
});
</script>
