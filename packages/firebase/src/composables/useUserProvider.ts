import { User } from '@firebase/auth';
import { provide, ref, Ref } from 'vue';
import { onAuthStateChanged } from '../auth';

const useUserProvider = () => {

  const user = ref<User | null>(null);

  provide<Ref<User | null>>('user', user);

  return onAuthStateChanged((u) => { 
    user.value = u; 
  });
};

export default useUserProvider;
