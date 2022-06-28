# Firebase

Lib for use with Firebase

## Usage

### Initialize the Firebase app

This can be done on `main.ts`

```ts
import { initFirebase } from '@igorjacauna/lib-services';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const firebaseApp = initFirebase(firebaseConfig);

```

### Auth

#### SignIn

Make SignIn passing provider. Google is the only supported for now

```ts
import { signIn } from '@igorjacauna/lib-services';

signIn('google');
```

#### SignOut

```ts
import { signOut } from '@igorjacauna/lib-services';

signOut();
```

#### IsAuthenticated

Returns `User` object if authenticated else `null`

```ts
import { isAuthenticated } from '@igorjacauna/lib-services';

const authenticated = await isAuthenticated();
```

#### User object

You can use the composables `useUserProvider` and `useUserInject` to get user object on any componente on your application

On your `App.vue`
```vue
<script lant="ts" setup>
import { onUnmounted } from 'vue';
import { onAuthStateChanged } from '@igorjacauna/lib-services';

const { unsubscribe } = useUserProvider();

// We use onAuthStateChanged observer from Firebase
// to get User object changes
// For best practice we must unsubscribe when needed
onUnmounted(() => unsubscribe());
</script>
```

On any other child component of `App.vue`, you can inject

```vue
<script setup lang="ts">
import { useUserInject } from '@igorjacauna/lib-services';

const user = useUserInject();
</script>

<template>
  <div>
    <div v-if="user">
      Authenticated
    </div>
    <div v-else>
    </div>
  </div>
</template>
```

#### Navigation Guard

Use with meta configs of `vue-router`. The route protected must have `meta.auth === true`

When a route has `meta.auth === true` we will use `beforeResolve` from `vue-router` navigation guard and allow navigation if authenticated

```ts
import { createRouter } from 'vue-router';
import { configureAuthGuard } from '@igorjacauna/lib-services';

const router = createRouter({
  ...
});

configureAuthGuard(router);
```