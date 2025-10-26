<template>
  <div class="space-y-1">
    <label class="text-sm text-gray-700 font-medium">{{ label }}</label>
    <div
      class="flex items-center border border-gray-200 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#E040FB]"
    >
      <component
        :is="iconComponent"
        class="text-gray-400"
        size="18"
      />
      <input
        class="ml-2 w-full outline-none placeholder-gray-400"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        v-model="model"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Mail, Lock, User, Phone } from "lucide-vue-next";

const props = defineProps({
  label: String,
  name: String,
  type: {
    type: String,
    default: "text",
  },
  icon: String,
  placeholder: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// Map icon name to component
const iconComponent = computed(() => {
  switch (props.icon) {
    case "mail":
      return Mail;
    case "lock":
      return Lock;
    case "user":
      return User;
    case "phone":
      return Phone;
    default:
      return null;
  }
});
</script>
