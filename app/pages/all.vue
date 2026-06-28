<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useTranslation } from 'i18next-vue'
import { useRouter } from 'vue-router'

const { t } = useTranslation()
const router = useRouter()

useHead({ title: computed(() => t('title.notfound')) })
</script>

<template>
  <main class="not-found">
    <p class="not-found__code">404</p>
    <h1>{{ t('notFound.title') }}</h1>
    <button class="not-found__back" type="button" @click="router.back()">
      {{ t('notFound.back') }}
    </button>
  </main>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100dvh;
  padding: 80px 24px;
  text-align: center;
}

.not-found__code {
  margin: 0;
  font-size: clamp(72px, 18vw, 180px);
  font-weight: 760;
  line-height: 0.85;
  color: var(--color-accent);
}

.not-found h1 {
  margin: 28px 0 0;
  font-size: clamp(22px, 4vw, 34px);
  line-height: 1.2;
}

.not-found__back {
  min-height: 44px;
  padding: 0 18px;
  margin-top: 28px;
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  background: var(--color-accent);
  border: 1px solid color-mix(in srgb, var(--color-accent-strong) 34%, transparent);
  border-radius: var(--radius-sm);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.not-found__back:hover {
  box-shadow: 0 10px 26px rgb(245 184 0 / 0.22);
  transform: translateY(-1px);
}
</style>
