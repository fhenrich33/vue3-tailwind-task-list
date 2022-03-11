<template>
  <div class="flex flex-col p-6 rounded-lg shadow-lg bg-white">
    <header>
      <h2 class="text-gray-900 text-xl leading-tight mb-2 font-semibold truncate">
        <slot name="title" />
      </h2>
      <slot name="header" />
    </header>
    <div role="sub-title" class="mb-2">
      <slot name="sub-title" />
    </div>
    <div class="text-gray-700 text-base mb-4"><slot /></div>
    <div role="actions" class="mt-auto"><slot name="actions" /></div>
  </div>
</template>
