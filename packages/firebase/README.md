# Firebase

Lib for use with Firebase

## Usage

### Auth

#### SignIn

Make SignIn passing provider. Google is the only supported for now

```ts
import { signIn } from '@igorjacauna/vue-lib-firebase';

signIn('google');
```

#### SignOut

```ts
import { signOut } from '@igorjacauna/vue-lib-firebase';

signOut();
```

#### IsAuthenticated

Returns `User` object if authenticated else `null`

```ts
import { isAuthenticated } from '@igorjacauna/vue-lib-firebase';

const authenticated = await isAuthenticated();
```

#### User object

You can use `provide` and `inject` from Vue on your `App.vue` to get user object on any componente on your application

On your `App.vue`
```vue
<script lant="ts" setup>
import { User } from '@firebase/auth';
import { provide, Ref } from 'vue';
import { onAuthStateChanged } from '@igorjacauna/vue-lib-firebase';

const user = ref<User | null>();

provide<Ref<User | null>>('user', user);

onAuthStateChanged((u) => { 
  user.value = u; 
});
</script>
```

On any other component

```vue
<script setup lang="ts">
import { User } from '@firebase/auth';
import { Ref, inject } from 'vue';
const user = inject<Ref<User | null>>('user');
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
