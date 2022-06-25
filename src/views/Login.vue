<template>
  <form class="container">
    <div class="form-group">
      <label for="exampleInputEmail1">Username</label>
      <input
        type="email"
        class="form-control"
        id="InputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter Username"
        v-model="userName"
      />
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
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      @click.prevent="handleSubmit()"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, inject } from "vue";
import router from "../route";
import User from "../domain/types/User";

export default defineComponent({
  name: "LogIn",
  setup() {
    const userState = reactive<User>({ userName: "", password: "" });
    const validateClass = reactive({
      lengthContraint: "text-danger",
      capitalLetter: "text-danger",
      smallLetter: "text-danger",
      digits: "text-danger",
    });

    function handleSubmit() {
      var tempStoreUser = localStorage.getItem("user") as string;
      var userStored = JSON.parse(tempStoreUser) as User;

      if (
        userState.userName === userStored.userName &&
        userState.password === userStored.password
      ) {
        router.push("/home");
      } else {
        window.alert("Wrong credentials");
      }
    }
    return {
      handleSubmit,
      ...toRefs(userState),
      ...toRefs(validateClass),
    };
  },
});
</script>
