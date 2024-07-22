<script setup lang="ts">
import {ref} from "vue";
import Toast from "./components/Toast.vue";
import {fileToBase64} from "./utils/file.ts";
import {splitAmount} from "./utils/number.ts";

const width = ref("28")
const height = ref("45")


const visible = ref(true)


const avatar = ref("")
const nickName = ref("")
const money = ref()
const moneys = ref<string[]>()

const toastRef = ref()

const handleAvatarChange = async (event: any) => {
  const file = event.target.files[0];
  if (!file) {
    toastRef.value.showToast("请选择图片", "error")
    return
  }
  const toBase64 = await fileToBase64(file);
  console.log(toBase64)
  avatar.value = toBase64
}

const generate = () => {
  if (!avatar.value) {
    toastRef.value.showToast("请选择头像", "error")
    return
  }
  if (!nickName.value) {
    toastRef.value.showToast("请填写昵称", "error")
    return
  }
  if (!money.value) {
    toastRef.value.showToast("请填写金额", "error")
    return
  }
  const amounts = splitAmount(money.value);
  moneys.value = amounts

  visible.value = false

}
const close = () => {
  avatar.value = ''
  nickName.value = ''
  money.value = ''
  visible.value = true
}

</script>

<template>
  <div class="form-container" v-if="visible">
    <div>
      选择头像:
      <input type="file" class="custom-file-input" accept="image/*" @change="handleAvatarChange" id="fileInput"/>
      <label v-if="!avatar" for="fileInput" class="custom-file-label">+</label>
      <img v-else :src="avatar" width="50px" height="50px"
           style="" alt="头像"/>
    </div>
    <div>
      昵称: <input type="text" v-model="nickName" placeholder="请输入昵称"
                   style="margin-top: 20px; margin-bottom: 20px; width: 70%; height: 30px;"/>
    </div>
    <div>
      金额: <input type="number" v-model="money" placeholder="请输入金额, 例如: 1640.00"
                   style="margin-top: 20px; margin-bottom: 20px; width: 70%; height: 30px;"/>
    </div>

    <div style="width: 100%;display: flex; justify-content: center;">
      <button style="width: 60px; height: 40px" @click="generate">确认</button>
    </div>
  </div>
  <div class="container" v-else>
    <img src="../public/img/img.png" width="100%" style="margin-top: 35px"/>
    <img :src="avatar" width="50px" height="50px" style="border-radius: 50%; margin-top: 85px;"/>
    <div style="margin-top: 20px; font-size: 16px;">{{ nickName }}</div>
    <div class="row-container">
      <img src="../public/img/symbol.png" :width="width" :height="height"/>
      <div v-for="money in moneys">
        <img v-if="money != '.'" :src="`../public/img/${money}.jpg`" :width="width" :height="height"/>
        <img v-else :src="`../public/img/dot.jpg`" width="14" :height="height"/>

      </div>
    </div>
    <button class="btn" @click="close">完成</button>
  </div>
  <Toast ref="toastRef"/>
</template>

<style scoped>

.form-container {
  padding: 20px;
}

/* 隐藏默认的文件选择按钮 */
.custom-file-input {
  display: none;
}

/* 自定义选择图片按钮样式 */
.custom-file-label {
  width: 50px;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #e0e0e0;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.row-container {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.row-container img {
  padding: 0 1px;

}

.btn {
  margin-top: 360px;
  width: 160px;
  height: 40px;
  background-color: #f2f1f1;
  border: none;
  outline: none;
  border-radius: 8px;
  color: #181918;
  font-size: 16px;
  font-weight: bold;
}
</style>
