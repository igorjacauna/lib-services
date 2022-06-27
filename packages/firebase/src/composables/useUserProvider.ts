import { User } from '@firebase/auth';
import { provide, ref, Ref } from 'vue';
import { onAuthStateChanged } from '../auth';

const useUserProvider = () => {

  const user = ref<User | null>(null);

  provide<Ref<User | null>>('user', user);

  const unsubscribe = onAuthStateChanged((u) => { 
    user.value = u; 
  });

  return {
    user,
    unsubscribe,
  };
};

export default useUserProvider;
